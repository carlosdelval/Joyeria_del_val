#!/usr/bin/env node

/**
 * Script para convertir CSV de productos a JSON compatible con Shopify
 * Uso: node scripts/csv-to-json.js [archivo-entrada.csv] [archivo-salida.json]
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para parsear CSV manualmente (sin dependencias externas)
function parseCSV(content) {
  const lines = content.split("\n").filter((line) => line.trim());
  if (lines.length === 0) return [];

  const headers = lines[0]
    .split(",")
    .map((h) => h.trim().replace(/^"|"$/g, ""));
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === 0) continue;

    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || "";
    });
    rows.push(row);
  }

  return rows;
}

// Parser de línea CSV que maneja comillas y comas dentro de campos
function parseCSVLine(line) {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      values.push(current.trim().replace(/^"|"$/g, ""));
      current = "";
    } else {
      current += char;
    }
  }

  values.push(current.trim().replace(/^"|"$/g, ""));
  return values;
}

// Función para limpiar y normalizar texto
function cleanText(text) {
  return text ? text.trim() : "";
}

// Función para crear slug desde título
function createSlug(title) {
  return cleanText(title)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
    .replace(/[^a-z0-9\s-]/g, "") // Solo letras, números, espacios y guiones
    .replace(/\s+/g, "-") // Espacios a guiones
    .replace(/-+/g, "-") // Múltiples guiones a uno
    .replace(/^-|-$/g, ""); // Eliminar guiones al inicio/fin
}

// Función para parsear arrays separados por pipe |
function parseArray(value) {
  if (!value) return [];
  return value
    .split("|")
    .map((v) => cleanText(v))
    .filter((v) => v);
}

// Función para parsear número
function parseNumber(value) {
  const num = parseFloat(cleanText(value).replace(",", "."));
  return isNaN(num) ? 0 : num;
}

// Función para parsear entero
function parseInteger(value) {
  const num = parseInt(cleanText(value), 10);
  return isNaN(num) ? 0 : num;
}

// Función para convertir fila CSV a producto JSON
function csvRowToProduct(row, index) {
  const id = cleanText(row.id) || `producto-${index + 1}`;
  const titulo = cleanText(row.titulo) || cleanText(row.title) || "Sin título";
  const slug = cleanText(row.slug) || createSlug(titulo);
  const descripcion =
    cleanText(row.descripcion) || cleanText(row.description) || "";

  // Precios
  const precio = parseNumber(row.precio || row.price);
  const precioAnterior = parseNumber(
    row.precioAnterior || row.compare_at_price
  );

  // Stock
  const stock = parseInteger(row.stock || row.inventory_quantity);
  const disponible = cleanText(row.disponible || row.available).toLowerCase();
  const available =
    disponible === "true" ||
    disponible === "si" ||
    disponible === "sí" ||
    stock > 0;

  // Imágenes (pueden estar separadas por pipe |)
  let imagenes = parseArray(row.imagenes || row.images);
  // Asegurar al menos 2 imágenes (duplicar la primera si solo hay una)
  if (imagenes.length === 0) imagenes = [""];
  if (imagenes.length === 1) imagenes.push(imagenes[0]);

  // Categorías y etiquetas
  const categorias = parseArray(
    row.categorias || row.categories || row.product_type
  );
  const etiquetas = parseArray(row.etiquetas || row.tags);

  // Campos específicos de nuestra web
  const marca = cleanText(row.marca || row.vendor);
  const material = cleanText(row.material);
  const genero = cleanText(row.genero || row.gender) || "unisex";
  const coleccion = cleanText(row.coleccion || row.collection);
  const sku = cleanText(row.sku) || id;
  const estilo = cleanText(row.estilo || row.style);
  const color = cleanText(row.color);

  // Campos específicos para RELOJES
  const tipo = cleanText(row.tipo || row.type);
  const materialCorrea = cleanText(row.materialCorrea || row.strapMaterial);
  const colorCorrea = cleanText(row.colorCorrea || row.strapColor);
  const resistenciaAgua = cleanText(row.resistenciaAgua || row.waterResistance);
  const funciones = parseArray(row.funciones || row.features);

  // Campos específicos para GAFAS
  const forma = cleanText(row.forma || row.shape);
  const materialMarco = cleanText(row.materialMarco || row.frameMaterial);
  const colorMarco = cleanText(row.colorMarco || row.frameColor);
  const colorLente = cleanText(row.colorLente || row.lensColor);
  const proteccion = parseArray(row.proteccion || row.protection);

  // Campos específicos para BOLSOS
  const tamano = cleanText(row.tamano || row.size);
  const compartimentos = parseArray(row.compartimentos || row.compartments);
  const cierre = cleanText(row.cierre || row.closure);
  const asa = cleanText(row.asa || row.handle);

  // Crear producto en formato compatible con Shopify y nuestra web
  const producto = {
    id,
    titulo,
    descripcion,
    precio,
    precioAnterior: precioAnterior > precio ? precioAnterior : null,
    imagenes,
    categorias,
    etiquetas,
    slug,
    stock,
    disponible: available,
    marca,
    material,
    genero,
    coleccion,
    sku,
    estilo,
    color,

    // Campos condicionales según categoría
    ...(tipo && { tipo }),
    ...(materialCorrea && { materialCorrea }),
    ...(colorCorrea && { colorCorrea }),
    ...(resistenciaAgua && { resistenciaAgua }),
    ...(funciones.length > 0 && { funciones }),
    ...(forma && { forma }),
    ...(materialMarco && { materialMarco }),
    ...(colorMarco && { colorMarco }),
    ...(colorLente && { colorLente }),
    ...(proteccion.length > 0 && { proteccion }),
    ...(tamano && { tamano }),
    ...(compartimentos.length > 0 && { compartimentos }),
    ...(cierre && { cierre }),
    ...(asa && { asa }),

    // Estructura Shopify-compatible
    shopify: {
      id,
      title: titulo,
      handle: slug,
      description: descripcion,
      vendor: marca || null,
      product_type: categorias[0] || "General",
      tags: etiquetas,
      published: available,
      images: imagenes.map((src, idx) => ({
        id: `${id}-img-${idx}`,
        src,
        position: idx + 1,
        alt: `${titulo} - Vista ${idx + 1}`,
      })),
      variants: [
        {
          id: `${id}-variant-1`,
          product_id: id,
          title: "Default Title",
          sku,
          price: precio.toFixed(2),
          compare_at_price: precioAnterior ? precioAnterior.toFixed(2) : null,
          inventory_quantity: stock,
          inventory_management: "shopify",
          available,
          weight: parseNumber(row.peso || row.weight) || 0,
          weight_unit: "kg",
        },
      ],
      options: [
        {
          name: "Title",
          position: 1,
          values: ["Default Title"],
        },
      ],
    },
  };

  return producto;
}

// Función principal
function convertCSVtoJSON(inputFile, outputFile) {
  try {
    console.log("🔄 Leyendo archivo CSV:", inputFile);

    // Leer archivo CSV
    const csvContent = fs.readFileSync(inputFile, "utf-8");

    console.log("📋 Parseando CSV...");
    const rows = parseCSV(csvContent);

    if (rows.length === 0) {
      console.error("❌ El archivo CSV está vacío o no tiene formato válido");
      process.exit(1);
    }

    console.log(`✅ Encontradas ${rows.length} filas`);
    console.log("🔄 Convirtiendo productos...");

    // Convertir cada fila a producto
    const productos = rows.map((row, index) => csvRowToProduct(row, index));

    console.log(`✅ Convertidos ${productos.length} productos`);
    console.log("💾 Guardando JSON...");

    // Guardar JSON
    const jsonContent = JSON.stringify(productos, null, 2);
    fs.writeFileSync(outputFile, jsonContent, "utf-8");

    console.log("✅ Archivo JSON generado:", outputFile);
    console.log("\n📊 Resumen:");
    console.log(`   - Total productos: ${productos.length}`);
    console.log(
      `   - Con stock: ${productos.filter((p) => p.stock > 0).length}`
    );
    console.log(
      `   - Disponibles: ${productos.filter((p) => p.disponible).length}`
    );
    console.log(
      `   - Con descuento: ${productos.filter((p) => p.precioAnterior).length}`
    );

    // Mostrar categorías únicas
    const categoriasUnicas = [
      ...new Set(productos.flatMap((p) => p.categorias)),
    ];
    console.log(`   - Categorías: ${categoriasUnicas.join(", ")}`);

    return productos;
  } catch (error) {
    console.error("❌ Error durante la conversión:", error.message);
    process.exit(1);
  }
}

// Ejecutar desde línea de comandos
const args = process.argv.slice(2);

if (args.length < 1) {
  console.log(
    "📝 Uso: node scripts/csv-to-json.js [archivo-entrada.csv] [archivo-salida.json]"
  );
  console.log("\nEjemplos:");
  console.log(
    "  node scripts/csv-to-json.js productos.csv public/data/productos.json"
  );
  console.log(
    "  node scripts/csv-to-json.js stock.csv src/data/productos.json"
  );
  process.exit(1);
}

const inputFile = args[0];
const outputFile = args[1] || "public/data/productos.json";

if (!fs.existsSync(inputFile)) {
  console.error(`❌ El archivo no existe: ${inputFile}`);
  process.exit(1);
}

convertCSVtoJSON(inputFile, outputFile);

export { convertCSVtoJSON, csvRowToProduct };
