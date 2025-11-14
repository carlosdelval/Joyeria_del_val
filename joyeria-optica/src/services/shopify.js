// Servicio para integración futura con Shopify
export class ShopifyService {
  constructor() {
    this.domain = import.meta.env.VITE_SHOPIFY_DOMAIN;
    this.storefrontToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
    this.adminToken = import.meta.env.VITE_SHOPIFY_ADMIN_TOKEN;
  }

  // Configuración GraphQL para Shopify Storefront API
  async graphqlRequest(query, variables = {}) {
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

    return response.json();
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

    // Extraer categorías de tags (ignorar productType si es una marca)
    const marcasConocidas = [
      "tous",
      "ray-ban",
      "oakley",
      "viceroy",
      "casio",
      "citizen",
      "seiko",
      "orient",
      "festina",
      "lotus",
      "tissot",
      "certina",
      "hamilton",
      "longines",
    ];
    const productTypeEsMarca = marcasConocidas.includes(
      product.productType?.toLowerCase()
    );

    // Si productType no es una marca, incluirlo; si no, solo usar tags
    const categorias = productTypeEsMarca
      ? [...product.tags].filter(Boolean)
      : [
          product.productType,
          ...product.tags.filter(
            (tag) => tag?.toLowerCase() !== product.productType?.toLowerCase()
          ),
        ].filter(Boolean);

    // Extraer marca del vendor, productType (si es marca) o de los tags
    const marca =
      product.vendor ||
      (productTypeEsMarca ? product.productType : null) ||
      product.tags.find(
        (tag) => tag && marcasConocidas.includes(tag.toLowerCase())
      ) ||
      null;

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
}

export const shopifyService = new ShopifyService();
