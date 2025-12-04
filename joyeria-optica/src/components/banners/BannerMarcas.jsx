import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

/**
 * BannerMarcas - Componente reutilizable para mostrar marcas en grid 2x2
 *
 * @param {string} titulo - Título de la sección
 * @param {Array} marcas - Array de objetos con: nombre, descripcion (opcional), imagen, slug, categoria (opcional)
 * @param {string} categoriaBase - Categoría base para la navegación (ej: "relojes", "gafas")
 */
export default function BannerMarcas({
  titulo = "Nuestras Marcas",
  marcas = [],
  categoriaBase = "",
}) {
  const navigate = useNavigate();
  const [loadedImages, setLoadedImages] = useState({});

  const handleClickMarca = (marca) => {
    window.scrollTo(0, 0);
    const categoria = marca.categoria || categoriaBase;
    navigate(`/catalogo/${categoria}?marca=${marca.slug}`);
  };

  const handleVerTodas = () => {
    window.scrollTo(0, 0);
    navigate(`/catalogo/${categoriaBase}`);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Título de sección */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-12 h-px bg-gray-300"></div>
          <h2 className="text-2xl font-light tracking-widest text-black uppercase sm:text-3xl">
            {titulo}
          </h2>
          <div className="w-12 h-px bg-gray-300"></div>
        </div>
      </motion.div>

      {/* Grid de marcas - 2x2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
        {marcas.map((marca, index) => {
          const isImageLoaded = loadedImages[marca.slug];

          return (
            <motion.div
              key={marca.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isImageLoaded ? 1 : 0,
                y: isImageLoaded ? 0 : 20,
              }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              onClick={() => handleClickMarca(marca)}
              className="relative overflow-hidden transition-all duration-300 bg-white border-2 border-gray-200 cursor-pointer group h-72 md:h-80 hover:border-black"
            >
              {/* Imagen de fondo */}
              <div className="absolute inset-0">
                <img
                  src={marca.imagen}
                  alt={`${marca.nombre} ${marca.descripcion || ""}`}
                  loading="lazy"
                  className={`object-cover w-full h-full transition-all duration-500 group-hover:scale-105 ${
                    marca.objectPosition || ""
                  } ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
                  onLoad={() => {
                    setLoadedImages((prev) => ({
                      ...prev,
                      [marca.slug]: true,
                    }));
                  }}
                  onError={(e) => {
                    e.target.src = "/placeholder-brand.jpg";
                    setLoadedImages((prev) => ({
                      ...prev,
                      [marca.slug]: true,
                    }));
                  }}
                />
              </div>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              {/* Contenido */}
              <div className="relative z-10 flex flex-col justify-end h-full p-6">
                <div>
                  <h3 className="mb-2 text-3xl font-light tracking-wide text-white uppercase transition-transform duration-300 md:text-4xl group-hover:translate-x-1">
                    {marca.nombre}
                  </h3>

                  {/* Descripción opcional */}
                  {marca.descripcion && (
                    <p className="mb-3 text-sm font-light text-white/90">
                      {marca.descripcion}
                    </p>
                  )}

                  {/* Botón ver más */}
                  <div className="flex items-center text-white transition-transform duration-300 group-hover:translate-x-2">
                    <span className="mr-2 text-sm font-light tracking-wide">
                      Explorar colección
                    </span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
