import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Phone, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BannerRaybanMeta() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [key, setKey] = useState(0); // Key para forzar reinicio del useEffect

  // Array de imágenes del carrusel
  const carouselImages = [
    "/raybanmeta1.jpg",
    "/raybanmeta3.avif",
    "/raybanmeta2.avif",
    "/raybanmeta1.avif",
    "/raybanmeta-banner.jpg",
  ];

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

      <div className="container relative px-5 py-12 mx-auto sm:px-4 md:px-8 lg:py-16">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
          {/* Carrusel de Imágenes - PRIMERO en móvil, SEGUNDO en desktop */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative aspect-[4/3] sm:aspect-square lg:aspect-auto lg:h-[600px]">
              {/* Glow effect detrás de la imagen */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl"></div>

              {/* Contenedor del carrusel */}
              <div className="relative h-full overflow-hidden bg-white/5 backdrop-blur-sm rounded-lg lg:rounded-none">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={carouselImages[currentImageIndex]}
                    alt={`Ray-Ban Meta Smart Glasses ${currentImageIndex + 1}`}
                    className="object-cover w-full h-full"
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
                className="hidden sm:block absolute px-6 py-3 text-xs sm:text-sm font-bold text-black uppercase bg-white shadow-2xl -right-4 -bottom-4 backdrop-blur-sm z-20"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Disponible ahora
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contenido - SEGUNDO en móvil, PRIMERO en desktop */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 sm:space-y-6 order-2 lg:order-1"
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
              Descubre el futuro de las gafas inteligentes. Captura fotos,
              escucha música y realiza llamadas sin usar las manos. La perfecta
              fusión entre estilo icónico y tecnología innovadora.
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
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col gap-3 sm:gap-4 pt-2 sm:pt-4 sm:flex-row"
            >
              <button
                onClick={handleContacto}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-medium tracking-wider text-black uppercase transition-all duration-300 bg-white overflow-hidden hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Visítanos en tienda
                  <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 transition-transform duration-300 scale-x-0 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:scale-x-100 origin-left"></div>
              </button>

              <a
                href="tel:+34957600293"
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
              transition={{ duration: 0.6, delay: 1 }}
              className="flex items-start gap-3 pt-4 sm:pt-6 border-t border-white/10"
            >
              <MapPin className="flex-shrink-0 w-5 h-5 text-blue-400" />
              <div>
                <p className="text-sm font-medium text-white">
                  Ven a probarlas en nuestro local
                </p>
                <p className="text-sm text-gray-400">
                  C/ Cristobal Castillo, 13 - Puente Genil, Córdoba
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decoración inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
    </div>
  );
}
