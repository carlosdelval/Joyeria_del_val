/**
 * Script para convertir PLANTILLA-PRODUCTOS.csv al formato de Shopify simplificado
 * Ejecutar: node scripts/convert-to-shopify-csv.js
 *
 * Formato de salida:
 * Handle, Title, Body (HTML), Vendor, Product Type, Tags, Published,
 * Option1 Name, Option1 Value, Variant SKU, Variant Inventory Qty,
 * Variant Price, Variant Compare At Price, Image Src
 */

import fs from "fs";
import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";

// Rutas de archivos
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
    relax_column_count: true,
  });

  console.log(`📦 Productos encontrados: ${records.length}`);

  // Transformar cada producto al formato Shopify
  const shopifyRows = [];
  let totalImages = 0;
  let productosProcesados = 0;

  records.forEach((product) => {
    // Saltar productos sin id o sin título
    if (!product.id || !product.titulo) {
      return;
    }

    productosProcesados++;

    // Extraer y limpiar datos
    const handle = product.id.trim().toLowerCase();
    const title = product.titulo.trim();
    const descripcion = product.descripcion ? product.descripcion.trim() : "";
    const bodyHTML = descripcion ? `<p>${descripcion}</p>` : "";
    const vendor = product.marca ? product.marca.trim() : "";
    const sku = product.sku ? product.sku.trim() : "";
    const precio = product.precio ? product.precio.trim() : "";
    const precioAnterior = product.precioAnterior
      ? product.precioAnterior.trim()
      : "";
    const stock = product.stock ? product.stock.trim() : "0";
    const disponible = product.disponible
      ? product.disponible.toLowerCase().trim() === "sí"
      : false;
    const published = disponible ? "TRUE" : "FALSE";

    // Procesar categorías (separadas por comas)
    const categorias = product.categorias
      ? product.categorias
          .split(",")
          .map((c) => c.trim())
          .filter((c) => c)
      : [];

    // Primera categoría es el "Product Type", el resto son "Tags"
    const productType = categorias.length > 0 ? categorias[0] : "";
    const tags = categorias.length > 1 ? categorias.slice(1).join(", ") : "";

    // Procesar imágenes (separadas por " | ")
    const imagenesRaw = product.imagenes ? product.imagenes.trim() : "";
    const imagenes = imagenesRaw
      ? imagenesRaw
          .split("|")
          .map((img) => img.trim())
          .filter((img) => img)
      : [];

    // Si no hay imágenes, crear una fila sin imagen
    if (imagenes.length === 0) {
      shopifyRows.push({
        Handle: handle,
        Title: title,
        "Body (HTML)": bodyHTML,
        Vendor: vendor,
        "Product Type": productType,
        Tags: tags,
        Published: published,
        "Option1 Name": "Title",
        "Option1 Value": "Default Title",
        "Variant SKU": sku,
        "Variant Inventory Qty": stock,
        "Variant Price": precio,
        "Variant Compare At Price": precioAnterior,
        "Image Src": "",
      });
    } else {
      // Crear una fila por cada imagen
      imagenes.forEach((imageSrc) => {
        shopifyRows.push({
          Handle: handle,
          Title: title,
          "Body (HTML)": bodyHTML,
          Vendor: vendor,
          "Product Type": productType,
          Tags: tags,
          Published: published,
          "Option1 Name": "Title",
          "Option1 Value": "Default Title",
          "Variant SKU": sku,
          "Variant Inventory Qty": stock,
          "Variant Price": precio,
          "Variant Compare At Price": precioAnterior,
          "Image Src": imageSrc,
        });
        totalImages++;
      });
    }
  });

  console.log(`✅ Productos procesados: ${productosProcesados}`);
  console.log(`🖼️  Total de imágenes: ${totalImages}`);
  console.log(`📄 Total de filas generadas: ${shopifyRows.length}\n`);

  // Generar el CSV de Shopify con las 14 columnas especificadas
  const shopifyCSV = stringify(shopifyRows, {
    header: true,
    columns: [
      "Handle",
      "Title",
      "Body (HTML)",
      "Vendor",
      "Product Type",
      "Tags",
      "Published",
      "Option1 Name",
      "Option1 Value",
      "Variant SKU",
      "Variant Inventory Qty",
      "Variant Price",
      "Variant Compare At Price",
      "Image Src",
    ],
    quoted: true,
  });

  // Guardar el archivo
  fs.writeFileSync(outputFile, shopifyCSV, "utf8");

  console.log("✅ Conversión completada con éxito!");
  console.log(`� Archivo guardado en: ${outputFile}\n`);

  console.log("📋 Próximos pasos:");
  console.log("1. Ve a Shopify Admin → Productos → Importar");
  console.log("2. Sube el archivo SHOPIFY-PRODUCTOS.csv");
  console.log("3. Verifica el mapeo de columnas");
  console.log('4. Click en "Importar productos"\n');

  console.log("🎉 ¡Listo para importar a Shopify!");
} catch (error) {
  console.error("❌ Error al procesar el CSV:", error.message);
  console.error(error);
  process.exit(1);
}
