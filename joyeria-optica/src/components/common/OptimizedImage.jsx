import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Componente de imagen optimizada con soporte para WebP, lazy loading y CDN
 * @param {string} src - URL de la imagen original
 * @param {string} alt - Texto alternativo
 * @param {string} className - Clases CSS adicionales
 * @param {boolean} lazy - Activar lazy loading (default: true)
 * @param {string} sizes - Atributo sizes para responsive images
 * @param {number} quality - Calidad de la imagen (1-100, default: 80)
 */
export default function OptimizedImage({
  src,
  alt,
  className = "",
  lazy = true,
  sizes,
  quality = 80,
  onLoad,
  onError,
  ...props
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState("");

  useEffect(() => {
    // Detectar si el navegador soporta WebP
    const checkWebPSupport = () => {
      const canvas = document.createElement("canvas");
      if (canvas.getContext && canvas.getContext("2d")) {
        return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
      }
      return false;
    };

    const supportsWebP = checkWebPSupport();

    // Convertir URL a WebP si está soportado y la imagen no es ya WebP
    let optimizedSrc = src;

    if (supportsWebP && src && !src.endsWith(".webp")) {
      // Si usas un CDN como Cloudinary, Imgix, etc., puedes transformar aquí
      // Ejemplo para Cloudinary: src.replace('/upload/', '/upload/f_webp,q_auto:eco/')
      // Por ahora, intentamos cargar .webp si existe
      const extension = src.match(/\.(jpg|jpeg|png)$/i);
      if (extension) {
        optimizedSrc = src.replace(extension[0], ".webp");
      }
    }

    setCurrentSrc(optimizedSrc);
  }, [src]);

  const handleLoad = (e) => {
    setImageLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    // Si falla la carga de WebP, intentar con la imagen original
    if (currentSrc.endsWith(".webp") && currentSrc !== src) {
      setCurrentSrc(src);
    } else {
      setImageError(true);
      if (onError) onError(e);
    }
  };

  if (imageError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 ${className}`}
      >
        <div className="text-center p-4">
          <svg
            className="w-12 h-12 mx-auto text-gray-400 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-xs text-gray-500">Imagen no disponible</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Skeleton/Loading placeholder */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* Imagen optimizada */}
      <motion.img
        src={currentSrc}
        alt={alt}
        loading={lazy ? "lazy" : "eager"}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        initial={{ opacity: 0 }}
        animate={{ opacity: imageLoaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={className}
        decoding="async"
        {...props}
      />
    </div>
  );
}
