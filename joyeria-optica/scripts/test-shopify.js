/**
 * Script de prueba para verificar la conexión con Shopify
 * Ejecutar: node scripts/test-shopify.js
 */

// Cargar variables de entorno desde .env
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, "../.env") });

const SHOPIFY_DOMAIN = process.env.VITE_SHOPIFY_DOMAIN;
const STOREFRONT_TOKEN = process.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

console.log("🛍️  Test de Conexión Shopify\n");
console.log("════════════════════════════════════════");
console.log(`Dominio: ${SHOPIFY_DOMAIN}`);
console.log(
  `Token: ${STOREFRONT_TOKEN ? "✅ Configurado" : "❌ No encontrado"}`
);
console.log("════════════════════════════════════════\n");

if (!SHOPIFY_DOMAIN || !STOREFRONT_TOKEN) {
  console.error("❌ Error: Variables de entorno no configuradas");
  console.log("\nVerifica que tu archivo .env contenga:");
  console.log("VITE_SHOPIFY_DOMAIN=opticadelvaljoyeros.myshopify.com");
  console.log("VITE_SHOPIFY_STOREFRONT_TOKEN=tu_token_aqui");
  process.exit(1);
}

// Test 1: Obtener información de la tienda
async function testShopInfo() {
  console.log("📋 Test 1: Información de la tienda...");

  const query = `
    query {
      shop {
        name
        description
        primaryDomain {
          url
        }
        paymentSettings {
          currencyCode
        }
      }
    }
  `;

  try {
    const response = await fetch(
      `https://${SHOPIFY_DOMAIN}/api/2024-10/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ query }),
      }
    );

    const data = await response.json();

    if (data.errors) {
      console.error("❌ Error en la consulta:", data.errors);
      return false;
    }

    console.log("✅ Conexión exitosa!");
    console.log(`   Nombre: ${data.data.shop.name}`);
    console.log(`   Dominio: ${data.data.shop.primaryDomain.url}`);
    console.log(`   Moneda: ${data.data.shop.paymentSettings.currencyCode}`);
    console.log("");
    return true;
  } catch (error) {
    console.error("❌ Error de conexión:", error.message);
    return false;
  }
}

// Test 2: Obtener productos
async function testProducts() {
  console.log("📦 Test 2: Obteniendo productos...");

  const query = `
    query {
      products(first: 5) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
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
      }
    }
  `;

  try {
    const response = await fetch(
      `https://${SHOPIFY_DOMAIN}/api/2024-10/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ query }),
      }
    );

    const data = await response.json();

    if (data.errors) {
      console.error("❌ Error al obtener productos:", data.errors);
      return false;
    }

    const products = data.data.products.edges;
    console.log(`✅ Se encontraron ${products.length} productos`);

    if (products.length > 0) {
      console.log("\n📋 Primeros productos:");
      products.forEach((edge, index) => {
        const product = edge.node;
        const price = product.priceRange.minVariantPrice.amount;
        const currency = product.priceRange.minVariantPrice.currencyCode;
        const available = product.variants.edges[0]?.node.availableForSale;

        console.log(`   ${index + 1}. ${product.title}`);
        console.log(`      Precio: ${price} ${currency}`);
        console.log(`      Disponible: ${available ? "✅" : "❌"}`);
        console.log(`      Handle: ${product.handle}`);
      });
    } else {
      console.log("⚠️  No hay productos en la tienda todavía");
      console.log("   Puedes importarlos desde el CSV usando Shopify Admin");
    }

    console.log("");
    return true;
  } catch (error) {
    console.error("❌ Error al obtener productos:", error.message);
    return false;
  }
}

// Test 3: Crear un checkout de prueba
async function testCheckout() {
  console.log("🛒 Test 3: Crear checkout de prueba...");

  // Primero necesitamos un producto para crear el checkout
  const productsQuery = `
    query {
      products(first: 1) {
        edges {
          node {
            id
            title
            variants(first: 1) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    // Obtener un producto
    const productsResponse = await fetch(
      `https://${SHOPIFY_DOMAIN}/api/2024-10/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ query: productsQuery }),
      }
    );

    const productsData = await productsResponse.json();

    if (productsData.errors || !productsData.data.products.edges.length) {
      console.log(
        "⚠️  No se puede crear checkout: No hay productos disponibles"
      );
      console.log("   Este test requiere al menos 1 producto en la tienda");
      console.log("");
      return true; // No es un error crítico
    }

    const variantId =
      productsData.data.products.edges[0].node.variants.edges[0].node.id;
    const productTitle = productsData.data.products.edges[0].node.title;

    // Crear checkout
    const checkoutMutation = `
      mutation checkoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout {
            id
            webUrl
            lineItems(first: 5) {
              edges {
                node {
                  title
                  quantity
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

    const checkoutResponse = await fetch(
      `https://${SHOPIFY_DOMAIN}/api/2024-10/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
        },
        body: JSON.stringify({
          query: checkoutMutation,
          variables: {
            input: {
              lineItems: [{ variantId, quantity: 1 }],
            },
          },
        }),
      }
    );

    const checkoutData = await checkoutResponse.json();

    if (checkoutData.data.checkoutCreate.checkoutUserErrors.length > 0) {
      console.error(
        "❌ Error al crear checkout:",
        checkoutData.data.checkoutCreate.checkoutUserErrors
      );
      return false;
    }

    console.log("✅ Checkout creado exitosamente!");
    console.log(`   Producto: ${productTitle}`);
    console.log(`   URL: ${checkoutData.data.checkoutCreate.checkout.webUrl}`);
    console.log(
      "   ⚠️  Este es un checkout de prueba, puedes ignorarlo en Shopify Admin"
    );
    console.log("");
    return true;
  } catch (error) {
    console.error("❌ Error al crear checkout:", error.message);
    return false;
  }
}

// Ejecutar todos los tests
async function runTests() {
  console.log("🚀 Iniciando pruebas de integración...\n");

  const test1 = await testShopInfo();
  const test2 = await testProducts();
  const test3 = await testCheckout();

  console.log("════════════════════════════════════════");
  console.log("📊 RESUMEN DE PRUEBAS:");
  console.log("════════════════════════════════════════");
  console.log(`Conexión a tienda:    ${test1 ? "✅" : "❌"}`);
  console.log(`Consulta productos:   ${test2 ? "✅" : "❌"}`);
  console.log(`Crear checkout:       ${test3 ? "✅" : "❌"}`);
  console.log("════════════════════════════════════════\n");

  if (test1 && test2) {
    console.log("✅ ¡INTEGRACIÓN LISTA!");
    console.log("\n📝 Próximos pasos:");
    console.log(
      "1. Importar productos a Shopify (si no hay productos todavía)"
    );
    console.log(
      "2. Cambiar VITE_USE_SHOPIFY=true en .env para activar Shopify"
    );
    console.log("3. Reiniciar el servidor de desarrollo (npm run dev)");
    console.log("4. Probar compra completa en la aplicación\n");
  } else {
    console.log("❌ Hay errores en la integración");
    console.log("\n🔧 Soluciones:");
    console.log("1. Verifica las credenciales en .env");
    console.log(
      "2. Asegúrate de que la app tenga los permisos correctos en Shopify"
    );
    console.log("3. Revisa que el dominio sea correcto (sin https://)\n");
  }
}

runTests();
