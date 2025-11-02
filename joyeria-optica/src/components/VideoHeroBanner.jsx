import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * VideoHeroBanner - Hero banner con video de fondo en autoplay loop
 *
 * @param {string} videoSrc - URL del video (MP4, WebM)
 * @param {string} posterSrc - Imagen placeholder mientras carga el video
 * @param {string} title - Título principal
 * @param {string} subtitle - Subtítulo/descripción
 * @param {string} ctaText - Texto del botón CTA
 * @param {string} ctaLink - Link del botón
 * @param {string} overlayOpacity - Opacidad del overlay oscuro (0-100)
 * @param {string} height - Altura del banner (h-screen, h-[600px], etc.)
 */
export default function VideoHeroBanner({
  videoSrc,
  posterSrc,
  title = "COLECCIÓN EXCLUSIVA",
  subtitle = "Descubre las últimas tendencias en joyería y relojería",
  ctaText = "Explorar colección",
  ctaLink = "/catalogo",
  overlayOpacity = "40",
  height = "h-screen",
  secondaryCta = null, // { text: "Ver más", link: "/about" }
}) {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className={`relative ${height} w-full overflow-hidden`}>
      {/* Video de fondo */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={posterSrc}
          className="md:min-w-full md:min-h-full w-auto h-full md:h-auto max-w-none"
          style={{
            objectFit: "contain",
            objectPosition: "center center",
          }}
          preload="metadata"
          loading="lazy"
        >
          <source src={videoSrc} type="video/mp4" />
          {/* Fallback: imagen si el video no carga */}
          Tu navegador no soporta videos HTML5.
        </video>

        {/* Overlay oscuro para mejorar legibilidad */}
        <div
          className={`absolute inset-0 bg-black`}
          style={{ opacity: overlayOpacity / 100 }}
        />

        {/* Gradiente adicional para el texto */}
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
          {/* Título principal */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-[0.2em] md:tracking-[0.3em] text-white mb-6 uppercase px-2">
            {title}
          </h1>

          {/* Subtítulo */}
          <p className="text-lg md:text-xl lg:text-2xl font-light text-white/90 mb-12 max-w-2xl mx-auto tracking-wide px-2">
            {subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch w-full max-w-2xl mx-auto px-2">
            {/* CTA Principal */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:flex-1 flex"
            >
              <Link
                to={ctaLink}
                className="group relative w-full flex items-center justify-center text-center px-6 sm:px-8 md:px-12 py-4 bg-white text-black font-light tracking-widest uppercase text-xs sm:text-sm overflow-hidden"
              >
                {/* Efecto hover */}
                <span className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-500 break-words">
                  {ctaText}
                </span>
              </Link>
            </motion.div>

            {/* CTA Secundario (opcional) */}
            {secondaryCta && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:flex-1 flex"
              >
                <Link
                  to={secondaryCta.link}
                  className="group w-full flex items-center justify-center text-center px-6 sm:px-8 md:px-12 py-4 border-2 border-white text-white font-light tracking-widest uppercase text-xs sm:text-sm hover:bg-white hover:text-black transition-all duration-300"
                >
                  <span className="break-words">{secondaryCta.text}</span>
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Indicador de scroll animado */}
        <motion.button
          onClick={scrollToContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 hover:text-white transition-colors cursor-pointer"
          aria-label="Scroll hacia abajo"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </motion.button>
      </div>

      {/* Línea decorativa inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </section>
  );
}
