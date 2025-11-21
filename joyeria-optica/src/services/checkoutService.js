// Servicio de checkout adaptable para Shopify
import { shopifyService } from "./shopify";

class CheckoutService {
  constructor() {
    this.useShopify = import.meta.env.VITE_USE_SHOPIFY === "true";
    this.variantCache = new Map(); // Cache para variant IDs
  }

  // Buscar producto en Shopify por SKU
  async findVariantBySKU(sku) {
    // Verificar cache primero
    if (this.variantCache.has(sku)) {
      return this.variantCache.get(sku);
    }

    const query = `
      query getProductBySKU($query: String!) {
        products(first: 1, query: $query) {
          edges {
            node {
              id
              title
              variants(first: 1) {
                edges {
                  node {
                    id
                    sku
                    price {
                      amount
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    try {
      const response = await shopifyService.graphqlRequest(query, {
        query: `sku:${sku}`,
      });

      const product = response.data?.products?.edges[0]?.node;
      if (product?.variants?.edges[0]?.node) {
        const variant = product.variants.edges[0].node;
        this.variantCache.set(sku, variant.id);
        return variant.id;
      }

      return null;
    } catch (error) {
      console.error(`Error buscando producto con SKU ${sku}:`, error);
      return null;
    }
  }

  // Crear checkout session
  async createCheckout(items, customerInfo = null) {
    if (this.useShopify) {
      return this.createShopifyCheckout(items, customerInfo);
    }
    return this.createLocalCheckout(items, customerInfo);
  }

  // Checkout con Shopify (usando Cart API - Storefront API 2024-10)
  async createShopifyCheckout(items, customerInfo) {
    console.log("📦 Items recibidos para checkout:", items);

    const mutation = `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
              totalTaxAmount {
                amount
                currencyCode
              }
            }
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      product {
                        title
                      }
                      price {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    // Transformar items a formato Shopify
    const lineItems = [];

    for (const item of items) {
      // Intentar obtener el variantId de diferentes fuentes (priorizar shopifyVariantId)
      let variantId =
        item.shopifyVariantId ||
        item.variantId ||
        item.variant?.id ||
        item.variant?.shopifyId;

      // Si no hay variantId pero hay un shopify ID, construirlo
      if (!variantId && item.shopify?.variants?.[0]?.id) {
        variantId = item.shopify.variants[0].id;
      }

      // Si hay SKU, buscar en Shopify
      if (!variantId && (item.sku || item.productId)) {
        const sku = item.sku || item.productId;
        console.log(`🔍 Buscando variant ID para SKU: ${sku}`);
        variantId = await this.findVariantBySKU(sku);

        if (!variantId) {
          console.error(
            `❌ No se encontró el producto con SKU: ${sku} en Shopify`
          );
          throw new Error(
            `El producto "${item.titulo}" (SKU: ${sku}) no se encontró en Shopify. Asegúrate de que el producto esté importado.`
          );
        }
      }

      if (!variantId) {
        console.warn("⚠️ Producto sin variantId:", item);
        throw new Error(
          `El producto "${item.titulo}" no tiene un variantId válido de Shopify. Asegúrate de que los productos se carguen desde Shopify.`
        );
      }

      console.log(`  ✅ ${item.titulo}: ${variantId} x${item.quantity}`);

      // Construir el line item
      const lineItem = {
        merchandiseId: variantId, // Cart API usa merchandiseId en lugar de variantId
        quantity: item.quantity,
      };

      // Añadir atributos personalizados (talla de gafas, etc.)
      const attributes = [];

      // Si hay talla seleccionada (gafas)
      if (item.tallaSeleccionada) {
        attributes.push({
          key: "Talla",
          value: item.tallaSeleccionada,
        });
        console.log(`    📏 Talla: ${item.tallaSeleccionada}`);
      }

      // Si hay customAttributes adicionales
      if (item.customAttributes && Array.isArray(item.customAttributes)) {
        item.customAttributes.forEach((attr) => {
          // Evitar duplicados
          if (!attributes.some((a) => a.key === attr.key)) {
            attributes.push(attr);
          }
        });
      }

      // Añadir attributes si hay alguno
      if (attributes.length > 0) {
        lineItem.attributes = attributes;
      }

      lineItems.push(lineItem);
    }

    console.log("📝 Line items para Shopify:", lineItems);

    const input = {
      lines: lineItems,
    };

    // Añadir información del cliente si está disponible
    if (customerInfo?.email) {
      input.buyerIdentity = {
        email: customerInfo.email,
      };
    }

    console.log("📤 Creando cart en Shopify con input:", input);

    const response = await shopifyService.graphqlRequest(mutation, { input });

    console.log("📦 Respuesta de Shopify:", JSON.stringify(response, null, 2));

    // Verificar si hay errores en la respuesta
    if (response.errors) {
      console.error("❌ Errores GraphQL:", response.errors);
      throw new Error(`Error en GraphQL: ${response.errors[0].message}`);
    }

    if (!response.data || !response.data.cartCreate) {
      console.error("❌ Respuesta inesperada:", response);
      throw new Error("Respuesta de Shopify no válida");
    }

    if (response.data?.cartCreate?.userErrors?.length > 0) {
      const error = response.data.cartCreate.userErrors[0];
      console.error("❌ Error de usuario:", error);
      throw new Error(`${error.field}: ${error.message}`);
    }

    const cart = response.data.cartCreate.cart;
    console.log("✅ Cart creado:", cart.checkoutUrl);

    return {
      success: true,
      checkoutUrl: cart.checkoutUrl,
      id: cart.id,
      url: cart.checkoutUrl,
      subtotal: parseFloat(cart.cost.subtotalAmount.amount),
      tax: parseFloat(cart.cost.totalTaxAmount?.amount || 0),
      total: parseFloat(cart.cost.totalAmount.amount),
      items: cart.lines.edges.map((edge) => edge.node),
    };
  }

  // Checkout local (simulado)
  async createLocalCheckout(items, customerInfo) {
    // Simular procesamiento
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const subtotal = items.reduce(
      (sum, item) => sum + item.precio * item.quantity,
      0
    );
    const tax = subtotal * 0.21; // IVA del 21%
    const shipping = subtotal >= 50 ? 0 : 4.95;
    const total = subtotal + tax + shipping;

    return {
      success: true,
      orderId: "local-checkout-" + Date.now(),
      id: "local-checkout-" + Date.now(),
      url: null, // Para checkout local no hay URL externa
      checkoutUrl: null,
      subtotal,
      tax,
      shipping,
      total,
      items: items.map((item) => ({
        id: item.id,
        title: item.titulo,
        quantity: item.quantity,
        price: item.precio,
        image: item.imagen,
      })),
      customer: customerInfo,
    };
  }

  // Actualizar dirección de envío
  async updateShippingAddress(checkoutId, address) {
    if (this.useShopify) {
      return this.updateShopifyShippingAddress(checkoutId, address);
    }
    return this.updateLocalShippingAddress(checkoutId, address);
  }

  async updateShopifyShippingAddress(checkoutId, address) {
    const mutation = `
      mutation checkoutShippingAddressUpdate($checkoutId: ID!, $shippingAddress: MailingAddressInput!) {
        checkoutShippingAddressUpdateV2(checkoutId: $checkoutId, shippingAddress: $shippingAddress) {
          checkout {
            id
            availableShippingRates {
              ready
              shippingRates {
                handle
                title
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
          checkoutUserErrors {
            field
            message
          }
        }
      }
    `;

    const response = await shopifyService.graphqlRequest(mutation, {
      checkoutId,
      shippingAddress: address,
    });

    if (
      response.data?.checkoutShippingAddressUpdateV2?.checkoutUserErrors
        ?.length > 0
    ) {
      throw new Error(
        response.data.checkoutShippingAddressUpdateV2.checkoutUserErrors[0].message
      );
    }

    return response.data.checkoutShippingAddressUpdateV2.checkout
      .availableShippingRates;
  }

  async updateLocalShippingAddress(checkoutId, address) {
    // Simulación local
    return {
      ready: true,
      shippingRates: [
        {
          handle: "standard",
          title: "Envío Estándar",
          price: { amount: "4.95", currencyCode: "EUR" },
        },
        {
          handle: "express",
          title: "Envío Express",
          price: { amount: "9.95", currencyCode: "EUR" },
        },
      ],
    };
  }

  // Aplicar método de envío
  async applyShippingRate(checkoutId, shippingRateHandle) {
    if (this.useShopify) {
      const mutation = `
        mutation checkoutShippingLineUpdate($checkoutId: ID!, $shippingRateHandle: String!) {
          checkoutShippingLineUpdate(checkoutId: $checkoutId, shippingRateHandle: $shippingRateHandle) {
            checkout {
              id
              shippingLine {
                handle
                title
                price {
                  amount
                  currencyCode
                }
              }
              totalPrice {
                amount
                currencyCode
              }
            }
            checkoutUserErrors {
              field
              message
            }
          }
        }
      `;

      const response = await shopifyService.graphqlRequest(mutation, {
        checkoutId,
        shippingRateHandle,
      });

      if (
        response.data?.checkoutShippingLineUpdate?.checkoutUserErrors?.length >
        0
      ) {
        throw new Error(
          response.data.checkoutShippingLineUpdate.checkoutUserErrors[0].message
        );
      }

      return response.data.checkoutShippingLineUpdate.checkout;
    }

    // Simulación local
    return { success: true };
  }

  // Procesar pago
  async processPayment(checkoutData, paymentData) {
    if (this.useShopify) {
      // En Shopify, el pago se maneja en el checkout web
      // Aquí solo necesitamos redirigir al checkout URL
      return {
        success: true,
        redirectUrl: checkoutData.url,
        message: "Redirigiendo al checkout de Shopify",
      };
    }

    // Simulación de procesamiento de pago local
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Validaciones básicas
    if (!paymentData.cardNumber || paymentData.cardNumber.length < 16) {
      throw new Error("Número de tarjeta inválido");
    }

    if (!paymentData.cvv || paymentData.cvv.length < 3) {
      throw new Error("CVV inválido");
    }

    // Simular éxito/fallo aleatoriamente (90% éxito)
    if (Math.random() < 0.1) {
      throw new Error("Pago rechazado. Verifique los datos de su tarjeta.");
    }

    return {
      success: true,
      transactionId: "txn_" + Date.now(),
      orderId: "order_" + Date.now(),
      message: "Pago procesado exitosamente",
    };
  }

  // Crear pedido final
  async createOrder(checkoutData, paymentResult) {
    const orderData = {
      id: paymentResult.orderId,
      number: this.generateOrderNumber(),
      email: checkoutData.customer?.email,
      total: checkoutData.total,
      subtotal: checkoutData.subtotal,
      tax: checkoutData.tax,
      shipping: checkoutData.shipping,
      status: "confirmed",
      paymentStatus: "paid",
      fulfillmentStatus: "unfulfilled",
      items: checkoutData.items,
      shippingAddress: checkoutData.customer?.shippingAddress,
      paymentDetails: {
        transactionId: paymentResult.transactionId,
        method: "credit_card",
        last4: paymentResult.last4 || "****",
      },
      createdAt: new Date().toISOString(),
      estimatedDelivery: this.calculateEstimatedDelivery(),
    };

    // En producción, esto se guardaría en la base de datos
    console.log("Order created:", orderData);

    return orderData;
  }

  // Utilidades
  generateOrderNumber() {
    const prefix = "OPT";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `${prefix}${timestamp}${random}`;
  }

  calculateEstimatedDelivery(shippingMethod = "standard") {
    const days = shippingMethod === "express" ? 2 : 5;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + days);
    return deliveryDate.toISOString();
  }

  // Validaciones
  validateCheckoutData(data) {
    const errors = [];

    if (!data.customer?.email) {
      errors.push("Email es requerido");
    }

    if (!data.customer?.shippingAddress?.address1) {
      errors.push("Dirección de envío es requerida");
    }

    if (!data.customer?.shippingAddress?.city) {
      errors.push("Ciudad es requerida");
    }

    if (!data.customer?.shippingAddress?.zipCode) {
      errors.push("Código postal es requerido");
    }

    if (data.items.length === 0) {
      errors.push("No hay productos en el carrito");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

export const checkoutService = new CheckoutService();
