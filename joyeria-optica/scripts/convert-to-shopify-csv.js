/**
 * Script para convertir PLANTILLA-PRODUCTOS.csv al formato de Shopify
 * Ejecutar: node scripts/convert-to-shopify-csv.js
 */

import fs from "fs";
import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";

// Leer el CSV original
const inputFile = "PLANTILLA-PRODUCTOS.csv";
const outputFile = "SHOPIFY-PRODUCTOS.csv";

console.log("🔄 Convirtiendo productos al formato Shopify...\n");

try {
  const csvContent = fs.readFileSync(inputFile, "utf8");

  // Parsear CSV
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  console.log(`📦 Productos encontrados: ${records.length}\n`);

  // Transformar cada producto al formato Shopify
  const shopifyProducts = [];

  records.forEach((product, index) => {
    // Dividir las imágenes
    const imageUrls = product.imagenes
      ? product.imagenes.split("|").map((url) => url.trim())
      : [];

    // Primera variante (fila principal del producto)
    const mainRow = {
      Handle: product.id.toLowerCase(),
      Title: product.titulo,
      "Body (HTML)": product.descripcion,
      Vendor: product.marca || "TOUS",
      "Product Category": "", // Shopify usa su propia taxonomía
      Type: product.categorias.split(",")[0].trim(), // Primera categoría como tipo
      Tags: product.categorias, // Todas las categorías como tags
      Published: "TRUE",
      "Option1 Name": "Title",
      "Option1 Value": "Default Title",
      "Option2 Name": "",
      "Option2 Value": "",
      "Option3 Name": "",
      "Option3 Value": "",
      "Variant SKU": product.sku || product.id,
      "Variant Grams": "", // Peso en gramos (opcional)
      "Variant Inventory Tracker": "shopify",
      "Variant Inventory Qty": product.stock || "0",
      "Variant Inventory Policy": "deny", // deny = no permitir compra sin stock
      "Variant Fulfillment Service": "manual",
      "Variant Price": product.precio.replace(",", "."),
      "Variant Compare At Price": product.precioAnterior
        ? product.precioAnterior.replace(",", ".")
        : "",
      "Variant Requires Shipping": "TRUE",
      "Variant Taxable": "TRUE",
      "Variant Barcode": "",
      "Image Src": imageUrls[0] || "",
      "Image Position": "1",
      "Image Alt Text": product.titulo,
      "Gift Card": "FALSE",
      "SEO Title": product.titulo,
      "SEO Description": product.descripcion.substring(0, 160),
      "Google Shopping / Google Product Category": "",
      "Google Shopping / Gender": "",
      "Google Shopping / Age Group": "",
      "Google Shopping / MPN": product.sku || product.id,
      "Google Shopping / AdWords Grouping": "",
      "Google Shopping / AdWords Labels": "",
      "Google Shopping / Condition": "new",
      "Google Shopping / Custom Product": "FALSE",
      "Google Shopping / Custom Label 0": "",
      "Google Shopping / Custom Label 1": "",
      "Google Shopping / Custom Label 2": "",
      "Google Shopping / Custom Label 3": "",
      "Google Shopping / Custom Label 4": "",
      "Variant Image": "",
      "Variant Weight Unit": "kg",
      "Variant Tax Code": "",
      "Cost per item": "",
      "Included / International": "",
      "Included / Japan": "",
      "Included / Switzerland": "",
      Status: "active",
    };

    shopifyProducts.push(mainRow);

    // Añadir filas adicionales para cada imagen extra
    for (let i = 1; i < imageUrls.length; i++) {
      const imageRow = {
        Handle: product.id.toLowerCase(),
        Title: "",
        "Body (HTML)": "",
        Vendor: "",
        "Product Category": "",
        Type: "",
        Tags: "",
        Published: "",
        "Option1 Name": "",
        "Option1 Value": "",
        "Option2 Name": "",
        "Option2 Value": "",
        "Option3 Name": "",
        "Option3 Value": "",
        "Variant SKU": "",
        "Variant Grams": "",
        "Variant Inventory Tracker": "",
        "Variant Inventory Qty": "",
        "Variant Inventory Policy": "",
        "Variant Fulfillment Service": "",
        "Variant Price": "",
        "Variant Compare At Price": "",
        "Variant Requires Shipping": "",
        "Variant Taxable": "",
        "Variant Barcode": "",
        "Image Src": imageUrls[i],
        "Image Position": (i + 1).toString(),
        "Image Alt Text": `${product.titulo} - Vista ${i + 1}`,
        "Gift Card": "",
        "SEO Title": "",
        "SEO Description": "",
        "Google Shopping / Google Product Category": "",
        "Google Shopping / Gender": "",
        "Google Shopping / Age Group": "",
        "Google Shopping / MPN": "",
        "Google Shopping / AdWords Grouping": "",
        "Google Shopping / AdWords Labels": "",
        "Google Shopping / Condition": "",
        "Google Shopping / Custom Product": "",
        "Google Shopping / Custom Label 0": "",
        "Google Shopping / Custom Label 1": "",
        "Google Shopping / Custom Label 2": "",
        "Google Shopping / Custom Label 3": "",
        "Google Shopping / Custom Label 4": "",
        "Variant Image": "",
        "Variant Weight Unit": "",
        "Variant Tax Code": "",
        "Cost per item": "",
        "Included / International": "",
        "Included / Japan": "",
        "Included / Switzerland": "",
        Status: "",
      };

      shopifyProducts.push(imageRow);
    }

    // Progreso
    if ((index + 1) % 20 === 0) {
      console.log(`✅ Procesados ${index + 1}/${records.length} productos...`);
    }
  });

  // Generar el CSV de Shopify
  const shopifyCSV = stringify(shopifyProducts, {
    header: true,
    quoted: true,
    quoted_empty: true,
  });

  // Guardar el archivo
  fs.writeFileSync(outputFile, shopifyCSV, "utf8");

  console.log(`\n✅ Conversión completada!`);
  console.log(`📄 Archivo generado: ${outputFile}`);
  console.log(`📊 Total de filas en Shopify CSV: ${shopifyProducts.length}`);
  console.log(`   (${records.length} productos + imágenes adicionales)\n`);

  console.log("📋 Próximos pasos:");
  console.log("1. Ve a Shopify Admin > Productos > Importar");
  console.log("2. Sube el archivo SHOPIFY-PRODUCTOS.csv");
  console.log("3. Shopify mapeará las columnas automáticamente");
  console.log('4. Click en "Importar productos"\n');
} catch (error) {
  console.error("❌ Error al procesar el CSV:", error.message);
  process.exit(1);
}
