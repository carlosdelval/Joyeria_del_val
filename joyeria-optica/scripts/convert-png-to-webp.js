import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { existsSync, statSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = join(__dirname, "..", "public");

// Archivos PNG a convertir a WebP
const pngToWebp = [
  "marinagarcia-video-miniatura.png",
  // Agregar más PNGs aquí si los encuentras
];

// Función para obtener tamaño de archivo
function getFileSizeMB(filePath) {
  const stats = statSync(filePath);
  return (stats.size / 1024 / 1024).toFixed(2);
}

async function convertToWebP(filename) {
  const inputPath = join(publicDir, filename);
  const outputPath = join(publicDir, filename.replace(".png", ".webp"));

  if (!existsSync(inputPath)) {
    console.error(`❌ No se encontró: ${filename}`);
    return;
  }

  try {
    const originalSize = getFileSizeMB(inputPath);
    console.log(`\n🖼️  Convirtiendo: ${filename}`);
    console.log(`📊 Tamaño original (PNG): ${originalSize} MB`);

    // Convertir a WebP con alta calidad
    await sharp(inputPath)
      .webp({
        quality: 80,
        effort: 6, // Máximo esfuerzo de compresión (0-6)
        lossless: false,
      })
      .toFile(outputPath);

    const newSize = getFileSizeMB(outputPath);
    const reduction = (((originalSize - newSize) / originalSize) * 100).toFixed(
      1
    );

    console.log(`✅ WebP generado: ${filename.replace(".png", ".webp")}`);
    console.log(`📊 Tamaño final: ${newSize} MB`);
    console.log(`📉 Reducción: ${reduction}%`);

    if (reduction > 50) {
      console.log(`✨ ¡Excelente compresión!`);
    }
  } catch (error) {
    console.error(`❌ Error convirtiendo ${filename}:`, error.message);
  }
}

async function convertAll() {
  console.log("🚀 Convertidor PNG → WebP\n");
  console.log("=".repeat(60));

  console.log("\n📋 Archivos a procesar:");
  pngToWebp.forEach((file, idx) => {
    console.log(`   ${idx + 1}. ${file}`);
  });

  console.log("");

  for (const file of pngToWebp) {
    await convertToWebP(file);
  }

  console.log("\n" + "=".repeat(60));
  console.log("✅ Conversión completada!\n");

  console.log("📝 Próximos pasos:");
  console.log("   1. Verifica la calidad de las imágenes WebP generadas");
  console.log("   2. Actualiza las referencias en el código para usar .webp");
  console.log("   3. Mantén los PNG originales como fallback si quieres");
  console.log("   4. Considera eliminar los PNG si los WebP funcionan bien");

  console.log("\n💡 Nota:");
  console.log("   WebP tiene ~97% de soporte en navegadores modernos.");
  console.log("   Para máxima compatibilidad, usa <picture> con fallback PNG.");
}

convertAll().catch(console.error);
