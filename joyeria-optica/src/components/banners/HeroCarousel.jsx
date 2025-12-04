import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

/**
 * HeroCarousel - Carrusel hero full width con transiciones cinematográficas
 * Alterna entre videos, imágenes y CTAs con efectos elegantes
 *
 * @param {Array} slides - Array de slides con configuración
 * Ejemplo: [
 *   {
 *     tipo: "video",
 *     videoSrc: "/video.mp4",
 *     videoSrcWebm: "/video.webm",
 *     poster: "/poster.jpg",
 *     titulo: "Colección Premium",
 *     subtitulo: "Descubre lo último",
 *     cta: { text: "Ver colección", link: "/catalogo" },
 *     overlayOpacity: 50
 *   },
 *   {
 *     tipo: "imagen",
 *     imagenSrc: "/hero.jpg",
 *     titulo: "Nueva temporada",
 *     subtitulo: "Descuentos hasta 40%",
 *     cta: { text: "Comprar ahora", link: "/ofertas" },
 *     overlayOpacity: 40
 *   }
 * ]
 * @param {number} intervalo - Tiempo entre slides en ms (default: 7000)
 * @param {boolean} autoplay - Auto-reproducción (default: true)
 * @param {string} height - Altura del carrusel (default: "h-screen")
 */
export default function HeroCarousel({
  slides = [],
  intervalo = 7000,
  autoplay = true,
  height = "h-screen",
}) {
  const [slideActual, setSlideActual] = useState(0);
  const [direccion, setDireccion] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  // Slides por defecto si no se pasan
  const slidesDefault = [
    {
      tipo: "imagen",
      imagenSrc: "/salvatore-plata-banner.jpg", // Imagen para desktop
      titulo: "SALVATORE PLATA",
      subtitulo: "Plata de Ley 925",
      cta: {
        text: "Ver Colección",
        link: "/catalogo/joyeria?marca=salvatore+plata",
      },
    },
    {
      tipo: "imagen",
      imagenSrc: "/tous-bolsos-banner.jpg", // Imagen para desktop
      titulo: "TOUS",
      subtitulo: "Relojería y accesorios de lujo",
      cta: {
        text: "Explorar TOUS",
        link: "/catalogo/tous",
      },
      objectPosition: "object-top md:object-center",
    },
    {
      tipo: "imagen",
      imagenSrc: "/rayban-banner.jpg",
      imagenSrcMobile: "/rayban-banner-movil.jpg",
      titulo: "RAY-BAN",
      subtitulo: "Gafas de sol icónicas",
      cta: { text: "Ir a catálogo", link: "/catalogo/gafas?marca=ray-ban" },
      overlayOpacity: 40,
    },
  ];

  const slidesAMostrar = slides.length > 0 ? slides : slidesDefault;

  // Navegación al siguiente slide
  const siguienteSlide = useCallback(() => {
    setDireccion(1);
    setSlideActual((prev) => (prev + 1) % slidesAMostrar.length);
  }, [slidesAMostrar.length]);

  // Navegación al slide anterior
  const anteriorSlide = useCallback(() => {
    setDireccion(-1);
    setSlideActual(
      (prev) => (prev - 1 + slidesAMostrar.length) % slidesAMostrar.length
    );
  }, [slidesAMostrar.length]);

  // Ir a un slide específico
  const irASlide = (index) => {
    setDireccion(index > slideActual ? 1 : -1);
    setSlideActual(index);
  };

  // Autoplay
  useEffect(() => {
    if (!autoplay || isPaused || slidesAMostrar.length <= 1) return;

    const timer = setInterval(siguienteSlide, intervalo);
    return () => clearInterval(timer);
  }, [
    autoplay,
    isPaused,
    intervalo,
    siguienteSlide,
    slidesAMostrar.length,
    lastInteraction,
  ]);

  // Scroll suave hacia abajo
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  // Handlers para swipe en móvil
  const minSwipeDistance = 50;

  const handleTouchStart = (e) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      siguienteSlide();
      setLastInteraction(Date.now()); // Resetear contador de autoplay
    } else if (isRightSwipe) {
      anteriorSlide();
      setLastInteraction(Date.now()); // Resetear contador de autoplay
    }
  };

  // Variantes de animación para transiciones cinematográficas
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 1,
    }),
  };

  return (
    <section
      className={`relative ${height} w-full overflow-hidden`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={direccion} mode="sync">
        <motion.div
          key={slideActual}
          custom={direccion}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "tween", duration: 0.6, ease: "easeInOut" },
            opacity: { duration: 0 },
          }}
          className="absolute inset-0 w-full h-full"
        >
          <SlideContent slide={slidesAMostrar[slideActual]} />
        </motion.div>
      </AnimatePresence>

      {/* Controles de navegación */}
      {slidesAMostrar.length > 1 && (
        <>
          {/* Flechas laterales - Solo desktop */}
          <button
            onClick={() => {
              anteriorSlide();
              setLastInteraction(Date.now());
            }}
            className="hidden md:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all duration-300 group items-center justify-center"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 transform group-hover:-translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              siguienteSlide();
              setLastInteraction(Date.now());
            }}
            className="hidden md:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all duration-300 group items-center justify-center"
            aria-label="Siguiente slide"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </>
      )}

      {/* Indicador de scroll */}
      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 hover:text-white transition-colors cursor-pointer z-10 hidden md:block"
        aria-label="Scroll hacia abajo"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.button>
    </section>
  );
}

// Componente para renderizar el contenido de cada slide
function SlideContent({ slide }) {
  const { tipo, overlayOpacity = 40 } = slide;
  const navigate = useNavigate();

  // Handler para hacer todo el slide clickable en móvil
  const handleMobileClick = (e) => {
    // Solo en móvil (< 768px)
    if (window.innerWidth < 768 && slide.cta?.link) {
      // Si el click no fue en el botón CTA, navegar
      if (!e.target.closest("a")) {
        navigate(slide.cta.link);
      }
    }
  };

  return (
    <div
      className="relative w-full h-full md:cursor-default cursor-pointer"
      onClick={handleMobileClick}
    >
      {/* Fondo: Video o Imagen */}
      <div className="absolute inset-0 w-full h-full">
        {tipo === "video" ? (
          <VideoBackground slide={slide} />
        ) : (
          <ImageBackground slide={slide} />
        )}

        {/* Overlay oscuro */}
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity / 100 }}
        />

        {/* Gradiente adicional */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-4xl w-full"
        >
          {/* Título */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-[0.2em] md:tracking-[0.3em] text-white mb-6 uppercase px-2">
            {slide.titulo}
          </h1>

          {/* Subtítulo */}
          {slide.subtitulo && (
            <p className="text-lg md:text-xl lg:text-2xl font-light text-white/90 mb-12 max-w-2xl mx-auto tracking-wide px-2">
              {slide.subtitulo}
            </p>
          )}

          {/* CTA */}
          {slide.cta && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                to={slide.cta.link}
                className="group relative inline-flex items-center justify-center px-8 md:px-12 py-4 bg-white text-black font-light tracking-widest uppercase text-xs sm:text-sm overflow-hidden"
              >
                {/* Efecto hover */}
                <span className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                  {slide.cta.text}
                </span>
              </Link>
            </motion.div>
          )}

          {/* CTA secundario opcional */}
          {slide.ctaSecundario && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block mt-4 ml-4"
            >
              <Link
                to={slide.ctaSecundario.link}
                className="inline-flex items-center justify-center px-8 md:px-12 py-4 border-2 border-white text-white font-light tracking-widest uppercase text-xs sm:text-sm hover:bg-white hover:text-black transition-all duration-300"
              >
                {slide.ctaSecundario.text}
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Línea decorativa inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </div>
  );
}

// Componente de video background
function VideoBackground({ slide }) {
  return (
    <>
      {/* Imagen de poster siempre visible como fondo */}
      {slide.poster && (
        <img
          src={slide.poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
      )}

      {/* Video encima */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={slide.poster}
        className="absolute inset-0 w-full h-full object-cover [&::-webkit-media-controls]:hidden [&::-webkit-media-controls-start-playback-button]:hidden"
        preload="metadata"
        disablePictureInPicture
        disableRemotePlayback
        controlsList="nodownload nofullscreen noremoteplayback"
        style={{
          pointerEvents: "none",
          WebkitMaskImage: "-webkit-radial-gradient(white, black)",
        }}
      >
        {slide.videoSrc && <source src={slide.videoSrc} type="video/mp4" />}
        {slide.videoSrcWebm && (
          <source src={slide.videoSrcWebm} type="video/webm" />
        )}
      </video>
    </>
  );
}

// Componente de imagen background
function ImageBackground({ slide }) {
  // Si no hay imagen móvil, mostrar la misma en todos los tamaños
  if (!slide.imagenSrcMobile) {
    return (
      <img
        src={slide.imagenSrc}
        alt={slide.titulo}
        loading="eager"
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover ${
          slide.objectPosition || "object-center"
        }`}
      />
    );
  }

  // Si hay imagen móvil, usar picture para carga condicional
  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={slide.imagenSrcMobile} />
      <source media="(min-width: 768px)" srcSet={slide.imagenSrc} />
      <img
        src={slide.imagenSrc}
        alt={slide.titulo}
        loading="eager"
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover ${
          slide.objectPosition || "object-center"
        }`}
      />
    </picture>
  );
}
