import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { existsSync, mkdirSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const imagesToOptimize = [
  "tienda1.jpg",
  "tienda2.jpg",
  "tienda3.jpg",
  "reconocimiento2.jpg",
  "joyeria_acordeon.jpg",
  "gafas_acordeon.jpg",
  "reloj_acordeon.jpg",
  // Imágenes pesadas que requieren optimización urgente
  "reconocimiento1.jpg", // 8.15 MB
  "joyeria-acordeon3.jpg", // 3.91 MB
  "dolce-gabbana.jpg", // 1.10 MB
  "marinagarcia-banner.jpg", // 0.66 MB
];

const publicDir = join(__dirname, "..", "public");
const backupDir = join(publicDir, "original-images");

// Crear carpeta de backup si no existe
if (!existsSync(backupDir)) {
  mkdirSync(backupDir, { recursive: true });
  console.log("📁 Carpeta de backup creada:", backupDir);
}

async function optimizeImage(filename) {
  const inputPath = join(publicDir, filename);
  const backupPath = join(backupDir, filename);
  const tempPath = join(publicDir, "temp_" + filename);
  const outputPath = join(publicDir, filename);

  try {
    // Primero hacer backup del original
    const image = sharp(inputPath);
    await image.toFile(backupPath);
    console.log(`✅ Backup guardado: ${filename}`);

    // Obtener metadata
    const metadata = await sharp(inputPath).metadata();
    const originalSizeMB = metadata.size
      ? (metadata.size / 1024 / 1024).toFixed(2)
      : "N/A";
    console.log(
      `📊 ${filename} original: ${metadata.width}x${metadata.height}, ${originalSizeMB} MB`
    );

    // Optimizar y redimensionar si es necesario (max 1920px ancho)
    const maxWidth = 1920;
    await sharp(inputPath)
      .resize(maxWidth, null, {
        withoutEnlargement: true,
        fit: "inside",
      })
      .jpeg({
        quality: 80,
        progressive: true,
        mozjpeg: true,
      })
      .toFile(tempPath);

    // Obtener metadata del archivo temporal
    const tempMetadata = await sharp(tempPath).metadata();
    const newSizeMB = tempMetadata.size
      ? (tempMetadata.size / 1024 / 1024).toFixed(2)
      : "N/A";
    const reduction =
      metadata.size && tempMetadata.size
        ? ((1 - tempMetadata.size / metadata.size) * 100).toFixed(1)
        : "N/A";

    console.log(
      `✨ ${filename} optimizado: ${tempMetadata.width}x${tempMetadata.height}, ${newSizeMB} MB (reducción: ${reduction}%)`
    );

    // Reemplazar el original con la versión optimizada
    const fs = await import("fs");
    fs.unlinkSync(outputPath); // Eliminar original
    fs.renameSync(tempPath, outputPath); // Renombrar temp a original
  } catch (error) {
    console.error(`❌ Error optimizando ${filename}:`, error.message);
  }
}

async function optimizeAll() {
  console.log("🚀 Iniciando optimización de imágenes...\n");

  for (const image of imagesToOptimize) {
    await optimizeImage(image);
    console.log("");
  }

  console.log("✅ Optimización completada!\n");
  console.log("📝 Notas:");
  console.log(
    "- Las imágenes originales están guardadas en public/original-images/"
  );
  console.log(
    "- Las imágenes optimizadas tienen calidad 80% y max width 1920px"
  );
  console.log(
    "- Si quieres restaurar los originales, cópialos desde original-images/"
  );
}

optimizeAll();
