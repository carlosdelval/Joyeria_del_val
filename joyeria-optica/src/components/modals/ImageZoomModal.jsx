import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut } from "lucide-react";

/**
 * ImageZoomModal - Modal con zoom táctil para imágenes de producto
 * Optimizado para joyería con controles intuitivos
 */
export default function ImageZoomModal({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  productTitle,
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  // Pinch zoom state
  const [touchDistance, setTouchDistance] = useState(0);
  const [initialScale, setInitialScale] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setScale(1);
      setPosition({ x: 0, y: 0 });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, initialIndex]);

  // Calcular distancia entre dos toques
  const getDistance = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Manejar pinch zoom
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      // Pinch zoom
      const distance = getDistance(e.touches);
      setTouchDistance(distance);
      setInitialScale(scale);
    } else if (e.touches.length === 1 && scale > 1) {
      // Drag cuando está zoomeado
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      // Pinch zoom
      e.preventDefault();
      const distance = getDistance(e.touches);
      const newScale = Math.max(
        1,
        Math.min(4, initialScale * (distance / touchDistance))
      );
      setScale(newScale);

      // Resetear posición si vuelve a escala 1
      if (newScale === 1) {
        setPosition({ x: 0, y: 0 });
      }
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      // Drag
      e.preventDefault();
      const newX = e.touches[0].clientX - dragStart.x;
      const newY = e.touches[0].clientY - dragStart.y;

      // Limitar el arrastre al tamaño de la imagen
      const maxX = ((imageRef.current?.offsetWidth || 0) * (scale - 1)) / 2;
      const maxY = ((imageRef.current?.offsetHeight || 0) * (scale - 1)) / 2;

      setPosition({
        x: Math.max(-maxX, Math.min(maxX, newX)),
        y: Math.max(-maxY, Math.min(maxY, newY)),
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Navegación entre imágenes
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      resetZoom();
    }
  };

  const goToNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
      resetZoom();
    }
  };

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Zoom con botones
  const zoomIn = () => {
    setScale(Math.min(4, scale + 0.5));
  };

  const zoomOut = () => {
    const newScale = Math.max(1, scale - 0.5);
    setScale(newScale);
    if (newScale === 1) {
      setPosition({ x: 0, y: 0 });
    }
  };

  // Double tap para zoom o cerrar
  const lastTapRef = useRef(0);
  const handleDoubleTap = (e) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    // Si es doble tap sobre la imagen
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      e.stopPropagation(); // Evitar que cierre
      if (scale === 1) {
        setScale(2.5);
      } else {
        resetZoom();
      }
    }
    lastTapRef.current = now;
  };

  // Single tap para cerrar (solo cuando no está zoomeado)
  const handleSingleTap = (e) => {
    // Verificar si es tap en el contenedor (fuera de la imagen)
    if (scale === 1 && e.target === containerRef.current) {
      setTimeout(() => {
        const now = Date.now();
        // Si no fue seguido de otro tap (doble tap), cerrar
        if (now - lastTapRef.current > 300) {
          onClose();
        }
      }, 310);
    }
  };

  if (!isOpen) return null;

  // Cerrar con swipe down cuando no está zoomeado
  const handleSwipeDown = (e) => {
    if (scale === 1 && e.touches.length === 1) {
      const deltaY = e.touches[0].clientY - dragStart.y;
      if (deltaY > 100) {
        onClose();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black"
          onClick={(e) => {
            // Cerrar al tocar el fondo negro (fuera de la imagen)
            if (e.target === e.currentTarget && scale === 1) {
              onClose();
            }
          }}
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/90 to-transparent">
            <div className="flex-1">
              <p className="text-sm font-medium text-white truncate">
                {productTitle}
              </p>
              <p className="text-xs text-gray-300">
                {currentIndex + 1} / {images.length}
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-2 ml-4 transition-all rounded-full bg-white/20 hover:bg-white/30 active:scale-95 backdrop-blur-sm"
              aria-label="Cerrar visor"
            >
              <X className="w-5 h-5 text-white" />
              <span className="text-sm font-medium text-white">Cerrar</span>
            </button>
          </div>

          {/* Imagen con zoom */}
          <div
            ref={containerRef}
            className="relative flex items-center justify-center w-full h-full"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={(e) => {
              // Si se toca el fondo (no la imagen) y no está zoomeado, cerrar
              if (e.target === containerRef.current && scale === 1) {
                onClose();
              }
            }}
          >
            <motion.img
              ref={imageRef}
              src={images[currentIndex]}
              alt={`${productTitle} - Vista ${currentIndex + 1}`}
              className="max-w-full max-h-full select-none"
              onClick={handleDoubleTap}
              style={{
                scale: scale,
                x: position.x,
                y: position.y,
                touchAction: scale > 1 ? "none" : "auto",
              }}
              drag={scale > 1}
              dragConstraints={containerRef}
              dragElastic={0.1}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>

          {/* Controles de zoom */}
          <div className="absolute z-10 flex flex-col gap-2 bottom-24 right-4">
            <button
              onClick={zoomIn}
              disabled={scale >= 4}
              className={`p-3 rounded-full shadow-lg ${
                scale >= 4
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-white/90 active:scale-95"
              }`}
              aria-label="Aumentar zoom"
            >
              <ZoomIn className="w-5 h-5 text-black" />
            </button>
            <button
              onClick={zoomOut}
              disabled={scale <= 1}
              className={`p-3 rounded-full shadow-lg ${
                scale <= 1
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-white/90 active:scale-95"
              }`}
              aria-label="Reducir zoom"
            >
              <ZoomOut className="w-5 h-5 text-black" />
            </button>
          </div>

          {/* Navegación entre imágenes */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                className={`absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg ${
                  currentIndex === 0
                    ? "bg-gray-600 cursor-not-allowed opacity-30"
                    : "bg-white/90 active:scale-95"
                }`}
                aria-label="Imagen anterior"
              >
                <svg
                  className="w-6 h-6 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={goToNext}
                disabled={currentIndex === images.length - 1}
                className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg ${
                  currentIndex === images.length - 1
                    ? "bg-gray-600 cursor-not-allowed opacity-30"
                    : "bg-white/90 active:scale-95"
                }`}
                aria-label="Imagen siguiente"
              >
                <svg
                  className="w-6 h-6 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Indicadores de imagen */}
          {images.length > 1 && (
            <div className="absolute flex gap-2 transform -translate-x-1/2 bottom-8 left-1/2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    resetZoom();
                  }}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === index ? "w-8 bg-white" : "w-2 bg-white/50"
                  }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Ayuda de controles */}
          {scale === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute text-xs text-center text-white/70 bottom-20 left-4 right-4"
            >
              Pellizca para hacer zoom • Toca dos veces para ampliar
              <br />
              <span className="text-white/90">
                Toca fuera de la imagen para cerrar
              </span>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
