import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/**
 * BannerMarcas - Carrusel infinito de marcas con autoplay y controles
 *
 * @param {string} titulo - Título de la sección
 * @param {Array} marcas - Array de objetos con: nombre, imagen, slug, categoria
 * @param {string} categoriaBase - Categoría base para la navegación (ej: "gafas")
 */
export default function BannerMarcas({
  titulo = "",
  subtitulo = "",
  marcas = [],
  categoriaBase = "",
}) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleClickMarca = (marca) => {
    window.scrollTo(0, 0);
    const categoria = marca.categoria || categoriaBase;
    navigate(`/catalogo/${categoria}?marca=${marca.slug}`);
  };

  // Navegación manual
  const scrollToDirection = (direction) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const itemWidth = scrollContainer.clientWidth / 4;
    const targetScroll = scrollContainer.scrollLeft + (direction === 'next' ? itemWidth : -itemWidth);
    scrollContainer.scrollTo({ left: targetScroll, behavior: 'smooth' });
  };

  // Arrastre con mouse
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full flex flex-col md:flex-row justify center gap-2">
      {/* Título de sección */}
      <div className="px-4 sm:px-6 lg:px-8 md:mb-12 text-center w-full md:w-1/4 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-12 h-px bg-gray-300"></div>
          <h2 className="text-2xl font-light tracking-widest text-black uppercase sm:text-3xl">
            {titulo}
          </h2>
          <div className="w-12 h-px bg-gray-300"></div>
        </div>
        {subtitulo && (
          <p className="max-w-2xl mx-auto text-base font-light text-gray-600">
            {subtitulo}
          </p>
        )}
        {/* Indicador de scroll */}
        <div className="mt-6 flex items-center gap-2 text-gray-400 text-xs tracking-wider uppercase">
          <span>←</span>
          <span>Desliza</span>
          <span>→</span>
        </div>
      </div>
      <div className="w-full bg-black overflow-hidden relative group/carousel">
        {/* Botones de navegación - solo visible en desktop */}
        <button
          onClick={() => scrollToDirection('prev')}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center bg-white/10 hover:bg-white/90 backdrop-blur-sm border border-white/30 hover:border-white transition-all duration-300 opacity-0 group-hover/carousel:opacity-100"
          aria-label="Anterior"
        >
          <span className="text-white hover:text-black text-xl transition-colors duration-300">←</span>
        </button>
        <button
          onClick={() => scrollToDirection('next')}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center bg-white/10 hover:bg-white/90 backdrop-blur-sm border border-white/30 hover:border-white transition-all duration-300 opacity-0 group-hover/carousel:opacity-100"
          aria-label="Siguiente"
        >
          <span className="text-white hover:text-black text-xl transition-colors duration-300">→</span>
        </button>

        {/* Carrusel horizontal con scroll infinito y arrastre */}
        <div 
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className={`flex overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {marcas.map((marca, index) => (
            <motion.div
              key={`${marca.slug}-${index}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % marcas.length) * 0.1 }}
              onClick={() => handleClickMarca(marca)}
              className="relative overflow-hidden group/marca aspect-square bg-black cursor-pointer flex-shrink-0 w-full md:w-1/4 snap-start"
            >
              {/* Imagen de fondo */}
              <img
                src={marca.imagen}
                alt={marca.nombre}
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/marca:scale-110 ${
                  marca.objectPosition || "object-center"
                }`}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover/marca:bg-black/10 transition-colors duration-300" />

              {/* Contenido */}
              <div className="relative z-10 h-full flex flex-col items-center justify-end p-4 sm:p-6 pb-6 sm:pb-8 text-center pointer-events-none md:pointer-events-auto">
                {/* Botón ver colección con animación */}
                <div className="absolute z-10 bottom-4 left-4 right-4 sm:left-6 sm:right-6">
                  <div className="relative overflow-hidden px-4 py-2.5 sm:py-3 border border-white/30 backdrop-blur-sm bg-white/5 group-hover/marca:bg-white group-hover/marca:border-white transition-all duration-300">
                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-light tracking-widest uppercase text-white group-hover/marca:text-black transition-colors duration-300">
                      <span className="transition-transform duration-300 group-hover/marca:translate-x-[-4px]">
                        VER COLECCIÓN {marca.nombre}
                      </span>
                      <span className="transition-transform duration-300 group-hover/marca:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
