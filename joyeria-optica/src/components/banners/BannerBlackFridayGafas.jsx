import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Glasses, Sparkles, MapPin } from "lucide-react";

/**
 * BannerBlackFridayGafas - Banner promocional Black Friday Gafas de Sol
 * Ofrece la segunda gafa al 50% de descuento en tienda física
 * Aplica a todas las marcas: Ray-Ban, Tom Ford, Oakley, etc.
 */
const BannerBlackFridayGafas = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [key, setKey] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Array de imágenes de las diferentes marcas
  const carouselImages = [
    "/rayban-promo.jpg", // Ray-Ban
    "/tomford-banner.jpeg", // Tom Ford
    "/guess-promo.jpg", // Guess
    "/tous-promo.jpg", // TOUS
    "/dolce-gabbana-promo.jpg", // Dolce & Gabbana
    "/persol-promo.jpg", // Persol
  ];

  const minSwipeDistance = 50;

  // Carrusel automático cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % carouselImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselImages.length, key]);

  const handleManualChange = (index) => {
    setCurrentImageIndex(index);
    setKey((prevKey) => prevKey + 1);
  };

  const onTouchStart = (e) => {
    setTouchEnd(0);
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
      const nextIndex = (currentImageIndex + 1) % carouselImages.length;
      handleManualChange(nextIndex);
    }

    if (isRightSwipe) {
      const prevIndex =
        (currentImageIndex - 1 + carouselImages.length) % carouselImages.length;
      handleManualChange(prevIndex);
    }
  };

  const handleCTAClick = () => {
    const contactoSection = document.getElementById("contactooptica");
    if (contactoSection) {
      const yOffset = -20; // Pequeño margen superior
      const y =
        contactoSection.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      id="banner-blackfriday-gafas"
      className="relative w-full overflow-hidden bg-black"
    >
      <div className="container relative z-10 px-4 py-16 mx-auto md:py-20 lg:py-24">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Carrusel de Imágenes - Arriba en Móvil - Izquierda en Desktop */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative order-1 lg:order-1"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-square">
              {/* Contenedor del carrusel */}
              <div
                className="relative h-full overflow-hidden"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={carouselImages[currentImageIndex]}
                    alt={`Gafas de Sol Black Friday - Marca ${
                      currentImageIndex + 1
                    }`}
                    className="object-cover w-full h-full"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                    }}
                    loading="lazy"
                    draggable={false}
                  />
                </AnimatePresence>

                {/* Overlay sutil */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

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
                      aria-label={`Ir a imagen de marca ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Badge flotante */}
                <div className="absolute top-6 right-6 z-10">
                  <div className="px-4 py-2 text-xs font-bold tracking-wider text-white uppercase bg-red-600 rounded-full shadow-xl animate-pulse">
                    -50% 2ª Unidad
                  </div>
                </div>
              </div>
            </div>

            {/* Elementos decorativos flotantes */}
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-amber-500/20 blur-2xl animate-pulse"></div>
            <div
              className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-yellow-500/20 blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </motion.div>

          {/* Contenido Debajo en Móvil - Derecha en Desktop */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="space-y-6 text-white order-2 lg:order-2"
          >
            {/* Badge Black Friday */}
            <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold tracking-wider uppercase bg-red-600 rounded-full shadow-lg">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>Black Friday Exclusivo</span>
            </div>

            {/* Título */}
            <div className="space-y-3">
              <h2 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                GAFAS DE SOL
                <span className="block mt-2 text-transparent bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text">
                  Black Friday
                </span>
              </h2>
            </div>

            {/* Oferta Destacada */}
            <div className="p-6 border-2 border-amber-500 rounded-xl bg-gradient-to-br from-amber-900/30 to-black">
              <div className="space-y-2">
                <p className="text-sm font-medium tracking-wide uppercase text-amber-400">
                  Oferta Especial en Tienda
                </p>
                <div className="space-y-1">
                  <p className="text-3xl font-bold md:text-4xl">
                    2ª Gafa al
                    <span className="ml-2 text-transparent bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text">
                      50% DTO
                    </span>
                  </p>
                  <p className="text-sm text-gray-300">
                    En todas nuestras marcas de gafas de sol
                  </p>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="space-y-3">
              <p className="text-base leading-relaxed text-gray-300 md:text-lg">
                Descubre nuestras exclusivas marcas de{" "}
                <strong className="text-white">gafas de sol</strong> en tienda.
                Ray-Ban, Tom Ford, Guess, Tous, Persol, Dolce & Gabbana y muchas
                más. Calidad premium y estilo inconfundible.
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-amber-500"></span>
                  <span>Las mejores marcas internacionales</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-amber-500"></span>
                  <span>Lentes con protección UV certificada</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-amber-500"></span>
                  <span>Modelos exclusivos de las últimas colecciones</span>
                </li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <button
                onClick={handleCTAClick}
                className="px-8 py-4 text-base font-semibold tracking-wide text-black uppercase transition-all duration-300 transform rounded-lg shadow-lg bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-500/50"
              >
                Visítanos en Tienda
              </button>
              <a
                href="tel:+34664146433"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold tracking-wide text-white uppercase transition-all duration-300 border-2 border-white rounded-lg hover:bg-white hover:text-black focus:outline-none focus:ring-4 focus:ring-white/50"
              >
                <span>Llamar Ahora</span>
              </a>
            </div>

            {/* Ubicación */}
            <div className="flex items-start gap-3 pt-4 text-sm text-gray-400">
              <MapPin
                className="flex-shrink-0 w-5 h-5 mt-0.5 text-amber-500"
                aria-hidden="true"
              />
              <div>
                <p className="font-medium text-white">Óptica Del Val Joyeros</p>
                <p>C/ Cristobal Castillo, 13 - Puente Genil, Córdoba</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Patrón de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>
    </section>
  );
};

export default BannerBlackFridayGafas;
