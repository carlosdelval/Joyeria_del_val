import { exec } from "child_process";
import { promisify } from "util";
import { existsSync, statSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const execPromise = promisify(exec);

const publicDir = join(__dirname, "..", "public");
const backupDir = join(publicDir, "original-videos");

// Videos a optimizar
const videosToOptimize = [
  {
    input: "marinagarcia-video.mp4",
    targetSizeMB: 2.5,
    bitrate: "2000k",
    maxrate: "2500k",
  },
  {
    input: "rayban-video.mp4",
    targetSizeMB: 2.0,
    bitrate: "1800k",
    maxrate: "2200k",
  },
  {
    input: "viceroy-video.mp4",
    targetSizeMB: 1.8,
    bitrate: "1600k",
    maxrate: "2000k",
  },
];

// Crear carpeta de backup si no existe
if (!existsSync(backupDir)) {
  mkdirSync(backupDir, { recursive: true });
  console.log("📁 Carpeta de backup creada:", backupDir);
}

// Función para obtener tamaño de archivo
function getFileSizeMB(filePath) {
  const stats = statSync(filePath);
  return (stats.size / 1024 / 1024).toFixed(2);
}

// Función para verificar si ffmpeg está instalado
async function checkFFmpeg() {
  try {
    await execPromise("ffmpeg -version");
    return true;
  } catch (error) {
    console.error("❌ FFmpeg no está instalado o no está en el PATH");
    console.log("\n📥 Instalar FFmpeg:");
    console.log("Windows: choco install ffmpeg");
    console.log("        o descargar de https://ffmpeg.org/download.html");
    console.log("Mac:     brew install ffmpeg");
    console.log("Linux:   sudo apt install ffmpeg");
    return false;
  }
}

// Función para optimizar un video
async function optimizeVideo(videoConfig) {
  const { input, targetSizeMB, bitrate, maxrate } = videoConfig;

  const inputPath = join(publicDir, input);
  const backupPath = join(backupDir, input);
  const outputPath = join(publicDir, input.replace(".mp4", "-optimized.mp4"));

  if (!existsSync(inputPath)) {
    console.error(`❌ No se encontró el archivo: ${input}`);
    return;
  }

  try {
    // Backup del original si no existe
    if (!existsSync(backupPath)) {
      console.log(`\n📦 Haciendo backup de ${input}...`);
      const copyCmd =
        process.platform === "win32"
          ? `copy "${inputPath}" "${backupPath}"`
          : `cp "${inputPath}" "${backupPath}"`;
      await execPromise(copyCmd);
      console.log(`✅ Backup guardado en original-videos/`);
    }

    // Obtener info del video original
    const originalSize = getFileSizeMB(inputPath);
    console.log(`\n🎬 Optimizando: ${input}`);
    console.log(`📊 Tamaño original: ${originalSize} MB`);
    console.log(`🎯 Tamaño objetivo: ${targetSizeMB} MB`);

    // Comando FFmpeg optimizado para videos hero
    const ffmpegCmd = `ffmpeg -i "${inputPath}" \
      -c:v libx264 \
      -preset slow \
      -crf 23 \
      -b:v ${bitrate} \
      -maxrate ${maxrate} \
      -bufsize ${parseInt(maxrate) * 2}k \
      -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2" \
      -r 30 \
      -an \
      -movflags +faststart \
      -y \
      "${outputPath}"`;

    console.log(`⚙️  Procesando con FFmpeg...`);
    console.log(`   Bitrate: ${bitrate}, Maxrate: ${maxrate}`);

    // Ejecutar FFmpeg (puede tardar varios minutos)
    await execPromise(ffmpegCmd, { maxBuffer: 1024 * 1024 * 50 });

    // Verificar resultado
    const optimizedSize = getFileSizeMB(outputPath);
    const reduction = (
      ((originalSize - optimizedSize) / originalSize) *
      100
    ).toFixed(1);

    console.log(`✅ Optimización completada!`);
    console.log(`📊 Tamaño final: ${optimizedSize} MB`);
    console.log(`📉 Reducción: ${reduction}%`);

    // Recomendación
    if (parseFloat(optimizedSize) > targetSizeMB * 1.2) {
      console.log(`⚠️  El video quedó más pesado de lo esperado. Puedes:`);
      console.log(`   - Reducir el bitrate (actual: ${bitrate})`);
      console.log(`   - Aumentar CRF de 23 a 25-28 (más compresión)`);
      console.log(`   - Reducir la resolución`);
    } else if (parseFloat(optimizedSize) < targetSizeMB * 0.7) {
      console.log(`✨ Excelente! El video quedó más ligero de lo esperado.`);
      console.log(`   Puedes aumentar la calidad si lo deseas:`);
      console.log(`   - Aumentar bitrate (actual: ${bitrate})`);
      console.log(`   - Reducir CRF de 23 a 20-22 (menos compresión)`);
    }

    console.log(
      `\n📝 Archivo generado: ${input.replace(".mp4", "-optimized.mp4")}`
    );
    console.log(`   Para usar el video optimizado:`);
    console.log(`   1. Revisa la calidad del video optimizado`);
    console.log(`   2. Si está bien, reemplaza el original con el optimizado`);
    console.log(`   3. El backup está en public/original-videos/`);
  } catch (error) {
    console.error(`❌ Error optimizando ${input}:`, error.message);
  }
}

// Función principal
async function optimizeAll() {
  console.log("🚀 Optimizador de Videos para Web Comercial\n");
  console.log("=".repeat(60));

  // Verificar FFmpeg
  const hasFFmpeg = await checkFFmpeg();
  if (!hasFFmpeg) {
    return;
  }

  console.log("\n📋 Videos a procesar:");
  videosToOptimize.forEach((video, idx) => {
    console.log(`   ${idx + 1}. ${video.input} → ~${video.targetSizeMB} MB`);
  });

  console.log("\n⏱️  Este proceso puede tardar 5-15 minutos por video.");
  console.log("   Puedes continuar trabajando mientras se procesa.\n");

  // Procesar cada video
  for (const videoConfig of videosToOptimize) {
    await optimizeVideo(videoConfig);
  }

  console.log("\n" + "=".repeat(60));
  console.log("✅ Optimización completada!\n");

  console.log("📊 Resumen:");
  console.log("   - Videos originales respaldados en: public/original-videos/");
  console.log("   - Videos optimizados generados con sufijo: -optimized.mp4");
  console.log("   - Revisa la calidad antes de reemplazar los originales");

  console.log("\n🔄 Próximos pasos:");
  console.log("   1. Reproduce cada video optimizado para verificar calidad");
  console.log("   2. Si están bien, renombra eliminando '-optimized'");
  console.log("   3. Actualiza las referencias en el código si es necesario");
  console.log("   4. Haz commit de los cambios");

  console.log("\n💡 Tips adicionales:");
  console.log(
    "   - Usa Chrome DevTools → Network para verificar tiempos de carga"
  );
  console.log("   - Prueba en conexión 3G simulada");
  console.log("   - Considera usar un CDN para mejor rendimiento global");
}

// Ejecutar
optimizeAll().catch(console.error);
