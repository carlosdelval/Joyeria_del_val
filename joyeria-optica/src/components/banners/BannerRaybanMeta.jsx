import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Phone, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BannerRaybanMeta() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [key, setKey] = useState(0); // Key para forzar reinicio del useEffect
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Array de imágenes del carrusel
  const carouselImages = [
    "/raybanmeta3.avif",
    "/raybanmeta2.avif",
    "/raybanmeta1.avif",
    "/raybanmeta-banner.jpg",
  ];

  // Distancia mínima para considerar un swipe (en px)
  const minSwipeDistance = 50;

  // Carrusel automático cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % carouselImages.length
      );
    }, 5000); // Cambiar cada 5 segundos

    return () => clearInterval(interval);
  }, [carouselImages.length, key]); // Añadido 'key' como dependencia

  const handleContacto = () => {
    window.scrollTo(0, 0);
    navigate("/contacto");
  };

  const handleManualChange = (index) => {
    setCurrentImageIndex(index);
    setKey((prevKey) => prevKey + 1); // Reinicia el temporizador
  };

  // Handlers para touch/swipe en mobile
  const onTouchStart = (e) => {
    setTouchEnd(0); // Reset para evitar swipes accidentales
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Swipe izquierda → siguiente imagen
      const nextIndex = (currentImageIndex + 1) % carouselImages.length;
      handleManualChange(nextIndex);
    }

    if (isRightSwipe) {
      // Swipe derecha → imagen anterior
      const prevIndex =
        (currentImageIndex - 1 + carouselImages.length) % carouselImages.length;
      handleManualChange(prevIndex);
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Patrón de fondo decorativo */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        ></div>
      </div>

      {/* Efectos de luz */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[800px] lg:min-h-[700px]">
        {/* Carrusel de Imágenes - PRIMERO en móvil (arriba), SEGUNDO en desktop (derecha) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative order-1 lg:order-2"
        >
          <div className="relative w-full h-[400px] lg:h-full">
            {/* Glow effect detrás de la imagen */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl"></div>

            {/* Contenedor del carrusel - Full width sin márgenes con altura fija */}
            <div
              className="absolute inset-0 overflow-hidden bg-white/5 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={carouselImages[currentImageIndex]}
                  alt={`Ray-Ban Meta Smart Glasses ${currentImageIndex + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  onError={(e) => {
                    e.target.src = "/rayban.jpg"; // Fallback
                  }}
                  draggable={false}
                />
              </AnimatePresence>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>

              {/* Indicadores de carrusel */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleManualChange(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "bg-white w-8"
                        : "bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Ir a imagen ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Badge flotante "Disponible ahora" - Oculto en móvil */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.8,
                type: "spring",
                stiffness: 200,
              }}
              className="hidden sm:block absolute px-6 py-3 text-xs sm:text-sm font-bold text-black uppercase bg-white shadow-2xl right-4 lg:right-8 bottom-4 lg:bottom-8 backdrop-blur-sm z-20"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Disponible ahora
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Contenido - SEGUNDO en móvil (abajo), PRIMERO en desktop (izquierda) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4 sm:space-y-6 order-2 lg:order-1 px-5 py-8 sm:px-8 md:px-12 lg:py-16 lg:flex lg:flex-col lg:justify-center"
        >
          {/* Badge "Novedad" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wider text-white uppercase border border-white/20 bg-white/10 backdrop-blur-sm w-fit"
          >
            <Sparkles className="w-4 h-4" />
            Novedad en tienda
          </motion.div>

          {/* Título */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white"
          >
            Ray-Ban
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Meta Smart Glasses
            </span>
          </motion.h2>

          {/* Descripción - Oculta en móvil */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden md:block text-lg leading-relaxed text-gray-300 md:text-xl"
          >
            Descubre el futuro de las gafas inteligentes. Captura fotos, escucha
            música y realiza llamadas sin usar las manos. La perfecta fusión
            entre estilo icónico y tecnología innovadora.
          </motion.p>

          {/* Lista de características - Oculta en móvil */}
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="hidden md:block md:space-y-3"
          >
            {[
              "📸 Cámara integrada de alta resolución",
              "🎵 Audio inmersivo con altavoces direccionales",
              "🤖 Asistente con IA Meta",
              "⚡ Conectividad Bluetooth y 5G",
            ].map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="flex items-center text-white/90"
              >
                <span className="mr-3 text-xl">{feature.split(" ")[0]}</span>
                <span className="text-sm md:text-base">
                  {feature.split(" ").slice(1).join(" ")}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          {/* Botones de acción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex flex-col gap-3 sm:gap-4 pt-2 sm:pt-4 sm:flex-row"
          >
            <button
              onClick={handleContacto}
              className="group cursor-pointer relative px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-medium tracking-wider text-black uppercase transition-all duration-300 bg-white overflow-hidden hover:scale-105"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Visítanos en tienda
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 transition-transform duration-300 scale-x-0 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:scale-x-100 origin-left"></div>
            </button>

            <a
              href="tel:+34957602193"
              className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-medium tracking-wider text-white uppercase transition-all duration-300 border border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/50"
            >
              <Phone className="w-4 h-4" />
              Llámanos
            </a>
          </motion.div>

          {/* Info de ubicación */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex items-start gap-3 pt-4 sm:pt-6 border-t border-white/10"
          >
            <MapPin className="flex-shrink-0 w-5 h-5 text-blue-400" />
            <div>
              <p className="text-sm font-medium text-white">
                Ven a probarlas a nuestro local
              </p>
              <p className="text-sm text-gray-400">
                C/ Cristobal Castillo, 13 - Puente Genil, Córdoba
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decoración inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
    </div>
  );
}
