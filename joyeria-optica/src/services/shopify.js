// Servicio para integración futura con Shopify
export class ShopifyService {
  constructor() {
    this.domain = import.meta.env.VITE_SHOPIFY_DOMAIN;
    this.storefrontToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
    this.adminToken = import.meta.env.VITE_SHOPIFY_ADMIN_TOKEN;
  }

  // Configuración GraphQL para Shopify Storefront API con retry logic
  async graphqlRequest(query, variables = {}, retries = 3) {
    try {
      const response = await fetch(
        `https://${this.domain}/api/2024-10/graphql.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": this.storefrontToken,
          },
          body: JSON.stringify({ query, variables }),
        }
      );

      if (!response.ok && retries > 0) {
        console.warn(
          `⚠️ Shopify request failed, retrying... (${retries} attempts left)`
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return this.graphqlRequest(query, variables, retries - 1);
      }

      return response.json();
    } catch (error) {
      if (
        retries > 0 &&
        (error.message.includes("network") || error.message.includes("fetch"))
      ) {
        console.warn(
          `⚠️ Network error, retrying... (${retries} attempts left)`
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return this.graphqlRequest(query, variables, retries - 1);
      }
      throw error;
    }
  }

  // Obtener productos con paginación
  async getProducts(filters = {}) {
    const { category, minPrice, maxPrice, first = 20, after = null } = filters;

    const query = `
      query getProducts($first: Int!, $after: String, $query: String) {
        products(first: $first, after: $after, query: $query) {
          edges {
            node {
              id
              title
              handle
              description
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              compareAtPriceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 5) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              tags
              productType
              variants(first: 1) {
                edges {
                  node {
                    id
                    availableForSale
                    quantityAvailable
                  }
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

    // Construir query de filtros para Shopify
    let queryString = "";
    if (category) queryString += `product_type:${category}`;
    if (minPrice) queryString += ` AND variants.price:>=${minPrice}`;
    if (maxPrice) queryString += ` AND variants.price:<=${maxPrice}`;

    return this.graphqlRequest(query, {
      first,
      after,
      query: queryString || null,
    });
  }

  // Obtener producto individual
  async getProduct(handle) {
    const query = `
      query getProduct($handle: String!) {
        productByHandle(handle: $handle) {
          id
          title
          handle
          description
          descriptionHtml
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 10) {
            edges {
              node {
                url
                altText
              }
            }
          }
          tags
          productType
          options {
            name
            values
          }
          variants(first: 50) {
            edges {
              node {
                id
                title
                availableForSale
                quantityAvailable
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    `;

    return this.graphqlRequest(query, { handle });
  }

  // Crear carrito
  async createCart() {
    const query = `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
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
                        handle
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
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
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

    return this.graphqlRequest(query, { input: {} });
  }

  // Añadir productos al carrito
  async addToCart(cartId, variantId, quantity = 1) {
    const query = `
      mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
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
                        handle
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
            cost {
              totalAmount {
                amount
                currencyCode
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

    return this.graphqlRequest(query, {
      cartId,
      lines: [{ merchandiseId: variantId, quantity }],
    });
  }

  // Crear checkout con productos
  async checkoutCreate(lineItems, customerInfo = null) {
    const mutation = `
      mutation checkoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout {
            id
            webUrl
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

    const input = {
      lineItems: lineItems.map((item) => ({
        variantId: item.variantId || item.id,
        quantity: item.quantity,
      })),
    };

    // Añadir información del cliente si está disponible
    if (customerInfo) {
      if (customerInfo.email) {
        input.email = customerInfo.email;
      }
      if (customerInfo.shippingAddress) {
        input.shippingAddress = customerInfo.shippingAddress;
      }
    }

    return this.graphqlRequest(mutation, { input });
  }

  // Convertir datos de Shopify al formato actual de la app
  transformProductData(shopifyProduct) {
    const product = shopifyProduct.node || shopifyProduct;
    const variant = product.variants?.edges[0]?.node;
    const images = product.images?.edges.map((edge) => edge.node.url) || [];

    // Categorías genéricas conocidas
    const categoriasGenericas = [
      "joyeria",
      "joyería",
      "gafas",
      "relojes",
      "bolsos",
    ];

    // Normalizar productType
    const productTypeLower = product.productType?.toLowerCase()?.trim() || "";

    // Si productType NO es una categoría genérica, entonces es una marca
    const productTypeEsMarca =
      productTypeLower && !categoriasGenericas.includes(productTypeLower);

    // Extraer categorías desde tags
    const categorias = [...product.tags].filter(Boolean);

    // Extraer marca del productType (si no es categoría genérica) o del vendor
    // Normalizar: eliminar acentos y convertir a minúsculas
    let marca = null;
    if (productTypeEsMarca) {
      marca = product.productType
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
        .toLowerCase()
        .trim();
    } else {
      marca = product.vendor
        ? product.vendor
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim()
        : null;
    }

    return {
      // IDs y referencias
      id: product.handle, // Usar handle como ID para consistencia
      slug: product.handle,
      shopifyId: product.id, // ID real de Shopify

      // Información básica
      titulo: product.title,
      nombre: product.title,
      descripcion: product.description,
      descripcionHtml:
        product.descriptionHtml || `<p>${product.description}</p>`,

      // Precios (del primer variant)
      precio: parseFloat(product.priceRange.minVariantPrice.amount),
      precioAnterior: product.compareAtPriceRange?.minVariantPrice?.amount
        ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
        : null,

      // Imágenes
      imagenes: images,

      // Categorías y etiquetas
      categorias: categorias,
      etiquetas: product.tags,
      categoria: product.productType,
      marca: marca,

      // Stock y disponibilidad (TIEMPO REAL desde Shopify)
      disponible: variant?.availableForSale || false,
      stock: variant?.quantityAvailable || 0,

      // Variantes completas
      variantes:
        product.variants?.edges.map((edge) => ({
          id: edge.node.id,
          shopifyId: edge.node.id,
          titulo: edge.node.title,
          precio: edge.node.price?.amount
            ? parseFloat(edge.node.price.amount)
            : 0,
          precioAnterior: edge.node.compareAtPrice?.amount
            ? parseFloat(edge.node.compareAtPrice.amount)
            : null,
          disponible: edge.node.availableForSale,
          stock: edge.node.quantityAvailable, // STOCK EN TIEMPO REAL
          opciones: edge.node.selectedOptions,
        })) || [],

      // Opciones de producto
      opciones: product.options || [],

      // Extraer tallas disponibles (para anillos y otros productos con variantes de talla)
      tallas: this.extractTallas(product.variants, product.options),

      // Información adicional extraída
      tipo: this.extractTipoFromTags(product.tags),
      genero: this.extractGeneroFromTags(product.tags),
      material: this.extractMaterialFromTags(product.tags),
      estilo: this.extractEstiloFromTags(product.tags),

      // Flags
      novedad: product.tags.some((tag) => tag?.toLowerCase().includes("nuevo")),
      oferta:
        product.compareAtPriceRange?.minVariantPrice?.amount &&
        product.priceRange?.minVariantPrice?.amount
          ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount) >
            parseFloat(product.priceRange.minVariantPrice.amount)
          : false,
    };
  }

  // Helpers para extraer información de tags
  extractTipoFromTags(tags) {
    const tipoMap = {
      sol: "sol",
      graduadas: "graduadas",
      digital: "digital",
      analogico: "analogico",
      analógico: "analogico",
      smartwatch: "smartwatch",
    };

    for (const tag of tags) {
      if (tag) {
        const tipo = tipoMap[tag.toLowerCase()];
        if (tipo) return tipo;
      }
    }
    return null;
  }

  extractGeneroFromTags(tags) {
    const generoMap = {
      mujer: "mujer",
      hombre: "hombre",
      niño: "infantil",
      niña: "infantil",
      niños: "infantil",
      unisex: "unisex",
    };

    for (const tag of tags) {
      if (tag) {
        const genero = generoMap[tag.toLowerCase()];
        if (genero) return genero;
      }
    }
    return "unisex";
  }

  extractMaterialFromTags(tags) {
    const materialMap = {
      oro: "oro-18k",
      "18k": "oro-18k",
      plata: "plata-925",
      acero: "acero-inox",
      cuero: "cuero",
      metal: "metal",
    };

    for (const tag of tags) {
      if (tag) {
        const material = materialMap[tag.toLowerCase()];
        if (material) return material;
      }
    }
    return null;
  }

  extractEstiloFromTags(tags) {
    const estiloMap = {
      clasico: "clasico",
      clásico: "clasico",
      elegante: "elegante",
      minimalista: "minimalista",
      vintage: "vintage",
      deportivo: "deportivo",
    };

    for (const tag of tags) {
      if (tag) {
        const estilo = estiloMap[tag.toLowerCase()];
        if (estilo) return estilo;
      }
    }
    return "clasico";
  }

  // Extraer tallas desde las variantes de producto
  extractTallas(variants, options) {
    if (!variants || !options) return [];

    // Buscar si hay una opción llamada "Talla", "Size", "Tamaño"
    const tallaOption = options.find(
      (opt) =>
        opt.name &&
        (opt.name.toLowerCase() === "talla" ||
          opt.name.toLowerCase() === "size" ||
          opt.name.toLowerCase() === "tamaño")
    );

    if (!tallaOption) return [];

    // Extraer tallas únicas de las variantes disponibles
    const tallasDisponibles = variants.edges
      .map((edge) => {
        const variant = edge.node;
        // Buscar la opción de talla en selectedOptions
        const tallaOption = variant.selectedOptions?.find(
          (opt) =>
            opt.name &&
            (opt.name.toLowerCase() === "talla" ||
              opt.name.toLowerCase() === "size" ||
              opt.name.toLowerCase() === "tamaño")
        );

        if (tallaOption && variant.availableForSale) {
          return {
            valor: tallaOption.value,
            label: tallaOption.value,
            disponible: variant.availableForSale,
            stock: variant.quantityAvailable || 0,
            variantId: variant.id,
          };
        }
        return null;
      })
      .filter(Boolean);

    // Eliminar duplicados y ordenar numéricamente si son números
    const tallasUnicas = Array.from(
      new Map(tallasDisponibles.map((t) => [t.valor, t])).values()
    ).sort((a, b) => {
      const numA = parseFloat(a.valor);
      const numB = parseFloat(b.valor);
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB;
      }
      return a.valor.localeCompare(b.valor);
    });

    return tallasUnicas;
  }

  // ========== CUSTOMER API METHODS ==========

  // Obtener datos completos del cliente
  async getCustomer(customerAccessToken) {
    const query = `
      query getCustomer($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
          id
          email
          firstName
          lastName
          phone
          displayName
          acceptsMarketing
          defaultAddress {
            id
            firstName
            lastName
            company
            address1
            address2
            city
            province
            country
            zip
            phone
          }
          addresses(first: 10) {
            edges {
              node {
                id
                firstName
                lastName
                company
                address1
                address2
                city
                province
                country
                zip
                phone
              }
            }
          }
        }
      }
    `;

    const response = await this.graphqlRequest(query, { customerAccessToken });

    if (response.errors) {
      throw new Error(response.errors[0].message);
    }

    return response.data.customer;
  }

  // Obtener pedidos del cliente
  async getCustomerOrders(customerAccessToken, first = 20, after = null) {
    const query = `
      query getCustomerOrders($customerAccessToken: String!, $first: Int!, $after: String) {
        customer(customerAccessToken: $customerAccessToken) {
          orders(first: $first, after: $after, sortKey: PROCESSED_AT, reverse: true) {
            edges {
              node {
                id
                name
                orderNumber
                processedAt
                financialStatus
                fulfillmentStatus
                totalPrice {
                  amount
                  currencyCode
                }
                subtotalPrice {
                  amount
                  currencyCode
                }
                totalShippingPrice {
                  amount
                  currencyCode
                }
                lineItems(first: 100) {
                  edges {
                    node {
                      quantity
                      title
                      variant {
                        id
                        title
                        image {
                          url
                          altText
                        }
                        price {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
                }
                shippingAddress {
                  firstName
                  lastName
                  address1
                  address2
                  city
                  province
                  country
                  zip
                  phone
                }
                successfulFulfillments(first: 10) {
                  trackingCompany
                  trackingInfo {
                    number
                    url
                  }
                }
                statusUrl
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }
    `;

    const response = await this.graphqlRequest(query, {
      customerAccessToken,
      first,
      after,
    });

    if (response.errors) {
      throw new Error(response.errors[0].message);
    }

    return response.data.customer.orders;
  }

  // Actualizar información del cliente
  async updateCustomer(customerAccessToken, customerData) {
    const mutation = `
      mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
        customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
          customer {
            id
            email
            firstName
            lastName
            phone
            acceptsMarketing
          }
          customerUserErrors {
            field
            message
          }
        }
      }
    `;

    const response = await this.graphqlRequest(mutation, {
      customerAccessToken,
      customer: customerData,
    });

    if (response.data?.customerUpdate?.customerUserErrors?.length > 0) {
      throw new Error(
        response.data.customerUpdate.customerUserErrors[0].message
      );
    }

    return response.data.customerUpdate.customer;
  }

  // Actualizar dirección del cliente
  async updateCustomerAddress(customerAccessToken, addressId, address) {
    const mutation = `
      mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
        customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
          customerAddress {
            id
          }
          customerUserErrors {
            field
            message
          }
        }
      }
    `;

    const response = await this.graphqlRequest(mutation, {
      customerAccessToken,
      id: addressId,
      address,
    });

    if (response.data?.customerAddressUpdate?.customerUserErrors?.length > 0) {
      throw new Error(
        response.data.customerAddressUpdate.customerUserErrors[0].message
      );
    }

    return response.data.customerAddressUpdate.customerAddress;
  }

  // Crear nueva dirección
  async createCustomerAddress(customerAccessToken, address) {
    const mutation = `
      mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
        customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
          customerAddress {
            id
          }
          customerUserErrors {
            field
            message
          }
        }
      }
    `;

    const response = await this.graphqlRequest(mutation, {
      customerAccessToken,
      address,
    });

    if (response.data?.customerAddressCreate?.customerUserErrors?.length > 0) {
      throw new Error(
        response.data.customerAddressCreate.customerUserErrors[0].message
      );
    }

    return response.data.customerAddressCreate.customerAddress;
  }

  // Establecer dirección por defecto
  async setDefaultAddress(customerAccessToken, addressId) {
    const mutation = `
      mutation customerDefaultAddressUpdate($customerAccessToken: String!, $addressId: ID!) {
        customerDefaultAddressUpdate(customerAccessToken: $customerAccessToken, addressId: $addressId) {
          customer {
            id
          }
          customerUserErrors {
            field
            message
          }
        }
      }
    `;

    const response = await this.graphqlRequest(mutation, {
      customerAccessToken,
      addressId,
    });

    if (
      response.data?.customerDefaultAddressUpdate?.customerUserErrors?.length >
      0
    ) {
      throw new Error(
        response.data.customerDefaultAddressUpdate.customerUserErrors[0].message
      );
    }

    return response.data.customerDefaultAddressUpdate.customer;
  }
}

export const shopifyService = new ShopifyService();
