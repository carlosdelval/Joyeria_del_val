// Servicio de checkout adaptable para Shopify
import { shopifyService } from './shopify';

class CheckoutService {
  constructor() {
    this.useShopify = import.meta.env.VITE_USE_SHOPIFY === 'true';
  }

  // Crear checkout session
  async createCheckout(items, customerInfo = null) {
    if (this.useShopify) {
      return this.createShopifyCheckout(items, customerInfo);
    }
    return this.createLocalCheckout(items, customerInfo);
  }

  // Checkout con Shopify
  async createShopifyCheckout(items, customerInfo) {
    const mutation = `
      mutation checkoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout {
            id
            webUrl
            subtotalPrice {
              amount
              currencyCode
            }
            totalTax {
              amount
              currencyCode
            }
            totalPrice {
              amount
              currencyCode
            }
            lineItems(first: 100) {
              edges {
                node {
                  id
                  title
                  quantity
                  variant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                  }
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

    // Transformar items a formato Shopify
    const lineItems = items.map(item => ({
      variantId: item.variantId || item.id, // En Shopify necesitamos variant ID
      quantity: item.quantity
    }));

    const input = {
      lineItems,
      email: customerInfo?.email,
      shippingAddress: customerInfo?.shippingAddress ? {
        firstName: customerInfo.shippingAddress.firstName,
        lastName: customerInfo.shippingAddress.lastName,
        company: customerInfo.shippingAddress.company,
        address1: customerInfo.shippingAddress.address1,
        address2: customerInfo.shippingAddress.address2,
        city: customerInfo.shippingAddress.city,
        province: customerInfo.shippingAddress.province,
        country: customerInfo.shippingAddress.country,
        zip: customerInfo.shippingAddress.zipCode,
        phone: customerInfo.shippingAddress.phone
      } : null
    };

    const response = await shopifyService.graphqlRequest(mutation, { input });
    
    if (response.data?.checkoutCreate?.checkoutUserErrors?.length > 0) {
      throw new Error(response.data.checkoutCreate.checkoutUserErrors[0].message);
    }

    return {
      id: response.data.checkoutCreate.checkout.id,
      url: response.data.checkoutCreate.checkout.webUrl,
      subtotal: parseFloat(response.data.checkoutCreate.checkout.subtotalPrice.amount),
      tax: parseFloat(response.data.checkoutCreate.checkout.totalTax.amount),
      total: parseFloat(response.data.checkoutCreate.checkout.totalPrice.amount),
      items: response.data.checkoutCreate.checkout.lineItems.edges.map(edge => edge.node)
    };
  }

  // Checkout local (simulado)
  async createLocalCheckout(items, customerInfo) {
    // Simular procesamiento
    await new Promise(resolve => setTimeout(resolve, 1000));

    const subtotal = items.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
    const tax = subtotal * 0.21; // IVA del 21%
    const shipping = subtotal >= 50 ? 0 : 4.95;
    const total = subtotal + tax + shipping;

    return {
      id: 'local-checkout-' + Date.now(),
      url: null, // Para checkout local no hay URL externa
      subtotal,
      tax,
      shipping,
      total,
      items: items.map(item => ({
        id: item.id,
        title: item.titulo,
        quantity: item.quantity,
        price: item.precio,
        image: item.imagen
      })),
      customer: customerInfo
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
      shippingAddress: address
    });

    if (response.data?.checkoutShippingAddressUpdateV2?.checkoutUserErrors?.length > 0) {
      throw new Error(response.data.checkoutShippingAddressUpdateV2.checkoutUserErrors[0].message);
    }

    return response.data.checkoutShippingAddressUpdateV2.checkout.availableShippingRates;
  }

  async updateLocalShippingAddress(checkoutId, address) {
    // Simulación local
    return {
      ready: true,
      shippingRates: [
        {
          handle: 'standard',
          title: 'Envío Estándar',
          price: { amount: '4.95', currencyCode: 'EUR' }
        },
        {
          handle: 'express',
          title: 'Envío Express',
          price: { amount: '9.95', currencyCode: 'EUR' }
        }
      ]
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
        shippingRateHandle
      });

      if (response.data?.checkoutShippingLineUpdate?.checkoutUserErrors?.length > 0) {
        throw new Error(response.data.checkoutShippingLineUpdate.checkoutUserErrors[0].message);
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
        message: 'Redirigiendo al checkout de Shopify'
      };
    }

    // Simulación de procesamiento de pago local
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Validaciones básicas
    if (!paymentData.cardNumber || paymentData.cardNumber.length < 16) {
      throw new Error('Número de tarjeta inválido');
    }

    if (!paymentData.cvv || paymentData.cvv.length < 3) {
      throw new Error('CVV inválido');
    }

    // Simular éxito/fallo aleatoriamente (90% éxito)
    if (Math.random() < 0.1) {
      throw new Error('Pago rechazado. Verifique los datos de su tarjeta.');
    }

    return {
      success: true,
      transactionId: 'txn_' + Date.now(),
      orderId: 'order_' + Date.now(),
      message: 'Pago procesado exitosamente'
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
      status: 'confirmed',
      paymentStatus: 'paid',
      fulfillmentStatus: 'unfulfilled',
      items: checkoutData.items,
      shippingAddress: checkoutData.customer?.shippingAddress,
      paymentDetails: {
        transactionId: paymentResult.transactionId,
        method: 'credit_card',
        last4: paymentResult.last4 || '****'
      },
      createdAt: new Date().toISOString(),
      estimatedDelivery: this.calculateEstimatedDelivery()
    };

    // En producción, esto se guardaría en la base de datos
    console.log('Order created:', orderData);

    return orderData;
  }

  // Utilidades
  generateOrderNumber() {
    const prefix = 'OPT';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
  }

  calculateEstimatedDelivery(shippingMethod = 'standard') {
    const days = shippingMethod === 'express' ? 2 : 5;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + days);
    return deliveryDate.toISOString();
  }

  // Validaciones
  validateCheckoutData(data) {
    const errors = [];

    if (!data.customer?.email) {
      errors.push('Email es requerido');
    }

    if (!data.customer?.shippingAddress?.address1) {
      errors.push('Dirección de envío es requerida');
    }

    if (!data.customer?.shippingAddress?.city) {
      errors.push('Ciudad es requerida');
    }

    if (!data.customer?.shippingAddress?.zipCode) {
      errors.push('Código postal es requerido');
    }

    if (data.items.length === 0) {
      errors.push('No hay productos en el carrito');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export const checkoutService = new CheckoutService();
