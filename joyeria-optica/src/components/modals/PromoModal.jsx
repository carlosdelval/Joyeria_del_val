import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight } from "lucide-react";

/**
 * PromoModal - Modal promocional para anuncios temporales
 *
 * Mejores prácticas implementadas:
 * - Se muestra solo una vez por sesión (localStorage)
 * - Delay de 2 segundos tras cargar para no ser intrusivo
 * - Fácil de cerrar (botón X y clic fuera)
 * - Responsive y accesible
 * - Puede deshabilitarse cambiando PROMO_ACTIVE a false
 */

// ⚙️ CONFIGURACIÓN DE LA PROMOCIÓN
const PROMO_CONFIG = {
  active: true, // ← Cambiar a false para desactivar el modal
  storageKey: "tomford_bf_2024_seen", // Identificador único de esta promoción
  delayMs: 2000, // Tiempo de espera antes de mostrar (2 segundos)
  expiryDays: 3, // Días hasta que vuelva a mostrarse si se cierra
};

const PromoModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [carouselKey, setCarouselKey] = useState(0);

  // Array de imágenes del carrusel
  const carouselImages = [
    "/rayban-promo.jpg", // Ray-Ban
    "/tomford-banner.jpeg", // Tom Ford
    "/guess-promo.jpg", // Guess
    "/tous-promo.jpg", // TOUS
    "/dolce-gabbana-promo.jpg", // Dolce & Gabbana
    "/persol-promo.jpg", // Persol
  ];

  // Carrusel automático
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % carouselImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isVisible, carouselImages.length, carouselKey]);

  const handleManualChange = (index) => {
    setCurrentImageIndex(index);
    setCarouselKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    // No mostrar si la promoción está inactiva
    if (!PROMO_CONFIG.active) return;

    // Verificar si se cerró recientemente (localStorage para persistencia entre sesiones)
    const closedTimestamp = localStorage.getItem(
      `${PROMO_CONFIG.storageKey}_closed`
    );

    if (closedTimestamp) {
      const daysSinceClosed =
        (Date.now() - parseInt(closedTimestamp)) / (1000 * 60 * 60 * 24);
      if (daysSinceClosed < PROMO_CONFIG.expiryDays) {
        return; // No mostrar si se cerró hace menos de X días
      } else {
        // Limpiar el timestamp si ya expiró
        localStorage.removeItem(`${PROMO_CONFIG.storageKey}_closed`);
      }
    }

    // Verificar si ya se mostró en esta sesión
    const hasSeenThisSession = sessionStorage.getItem(PROMO_CONFIG.storageKey);

    if (!hasSeenThisSession) {
      // Mostrar después del delay configurado
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem(PROMO_CONFIG.storageKey, "true");
      }, PROMO_CONFIG.delayMs);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Guardar timestamp de cierre
    localStorage.setItem(
      `${PROMO_CONFIG.storageKey}_closed`,
      Date.now().toString()
    );
  };

  const handleCTA = () => {
    handleClose();
    // Scroll suave al banner de Black Friday Gafas
    const bannerSection = document.getElementById("banner-blackfriday-gafas");
    if (bannerSection) {
      bannerSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center md:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="relative w-full max-w-4xl overflow-hidden bg-black shadow-2xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="promo-title"
          >
            {/* Botón Cerrar */}
            <button
              onClick={handleClose}
              className="absolute z-20 p-1.5 md:p-2 text-white transition-all duration-200 bg-black/70 rounded-full top-2 right-2 md:top-4 md:right-4 hover:bg-black/90 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Cerrar promoción"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {/* Layout Vertical */}
            <div className="relative">
              {/* Carrusel de Imágenes */}
              <div className="relative overflow-hidden bg-gray-900 h-[60vh] md:h-[500px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={carouselImages[currentImageIndex]}
                    alt={`Gafas de Sol Black Friday - Marca ${
                      currentImageIndex + 1
                    }`}
                    className="object-cover w-full h-full"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.7,
                      ease: "easeInOut",
                    }}
                  />
                </AnimatePresence>

                {/* Overlay gradient para legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 pointer-events-none"></div>

                {/* Badge Superior - Black Friday Exclusivo */}
                <div className="absolute top-4 left-4 md:top-6 md:left-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-bold tracking-wider uppercase bg-red-600 rounded-full shadow-2xl animate-pulse">
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                    <span>Oferta Exclusiva Black Friday</span>
                  </div>
                </div>
                {/* Oferta Destacada - Parte inferior de la imagen */}
                <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
                  <div className="p-4 border-2 border-amber-500 rounded-lg md:p-6 bg-black/80 backdrop-blur-sm">
                    <p className="mb-1 text-xs font-medium tracking-wide uppercase md:mb-2 md:text-sm text-amber-400">
                      Oferta Especial
                    </p>
                    <p className="text-3xl font-bold text-white md:text-5xl">
                      2ª Gafas
                      <span className="ml-2 text-transparent bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text">
                        -50%
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-gray-200 md:mt-2 md:text-sm">
                      En todas nuestras marcas de gafas de sol
                    </p>
                  </div>
                </div>
              </div>

              {/* Contenido Inferior - Fondo Negro */}
              <div className="flex flex-col p-5 space-y-4 bg-black md:p-8 md:space-y-5">
                {/* Botones CTA */}
                <div className="flex flex-col gap-2 md:gap-3">
                  <button
                    onClick={handleCTA}
                    className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold tracking-wide text-black uppercase transition-all duration-300 shadow-lg md:text-base bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-500/50"
                  >
                    Ver Oferta
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>

                  <button
                    onClick={handleClose}
                    className="text-xs text-gray-400 transition-colors md:text-sm hover:text-white focus:outline-none"
                  >
                    Continuar navegando
                  </button>
                </div>

                {/* Info Adicional */}
                <p className="text-[10px] md:text-xs text-gray-500 text-center">
                  * Oferta válida solo en tienda física. No acumulable con otras
                  promociones.
                </p>
              </div>
            </div>

            {/* Decoración inferior */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PromoModal;
