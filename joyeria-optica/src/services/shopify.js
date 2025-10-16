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
      `https://${this.domain}/api/2023-10/graphql.json`,
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

  // Convertir datos de Shopify al formato actual
  transformProductData(shopifyProduct) {
    const product = shopifyProduct.node || shopifyProduct;
    const variant = product.variants?.edges[0]?.node;
    const images = product.images?.edges.map((edge) => edge.node.url) || [];

    return {
      id: product.id,
      slug: product.handle,
      titulo: product.title,
      descripcion: product.description,
      precio: parseFloat(product.priceRange.minVariantPrice.amount),
      precioAnterior: product.compareAtPriceRange?.minVariantPrice?.amount
        ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
        : null,
      imagenes: images,
      categorias: [product.productType, ...product.tags],
      etiquetas: product.tags,
      disponible: variant?.availableForSale || false,
      stock: variant?.quantityAvailable || 0,
      variantes:
        product.variants?.edges.map((edge) => ({
          id: edge.node.id,
          titulo: edge.node.title,
          precio: parseFloat(edge.node.price.amount),
          disponible: edge.node.availableForSale,
          opciones: edge.node.selectedOptions,
        })) || [],
    };
  }
}

export const shopifyService = new ShopifyService();
