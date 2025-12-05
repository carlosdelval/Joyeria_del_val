import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * BannerMarcas - Grid full-width de 4 marcas sin márgenes
 *
 * @param {string} titulo - Título de la sección
 * @param {Array} marcas - Array de objetos con: nombre, imagen, slug, categoria
 * @param {string} categoriaBase - Categoría base para la navegación (ej: "gafas")
 */
export default function BannerMarcas({
  titulo = "Nuestras Marcas",
  marcas = [],
  categoriaBase = "",
}) {
  const navigate = useNavigate();

  const handleClickMarca = (marca) => {
    window.scrollTo(0, 0);
    const categoria = marca.categoria || categoriaBase;
    navigate(`/catalogo/${categoria}?marca=${marca.slug}`);
  };

  return (
    <div className="w-full">
      {/* Título de sección */}
      <div className="px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-12 h-px bg-gray-300"></div>
          <h2 className="text-2xl font-light tracking-widest text-black uppercase sm:text-3xl">
            {titulo}
          </h2>
          <div className="w-12 h-px bg-gray-300"></div>
        </div>
      </div>

      <div className="w-full bg-black">
        {/* Grid 1 columna en móvil, 4 columnas en desktop - Full width sin márgenes */}
        <div className="grid grid-cols-1 md:grid-cols-4">
          {marcas.slice(0, 4).map((marca, index) => (
            <motion.div
              key={marca.slug}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleClickMarca(marca)}
              className="relative overflow-hidden group aspect-square bg-black cursor-pointer"
            >
              {/* Imagen de fondo */}
              <img
                src={marca.imagen}
                alt={marca.nombre}
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                  marca.objectPosition || "object-center"
                }`}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />

              {/* Contenido */}
              <div className="relative z-10 h-full flex flex-col items-center justify-end p-4 sm:p-6 pb-6 sm:pb-8 text-center pointer-events-none md:pointer-events-auto">
                {/* Botón ver colección con animación */}
                <div className="absolute z-10 bottom-4 left-4 right-4 sm:left-6 sm:right-6">
                  <div className="relative overflow-hidden px-4 py-2.5 sm:py-3 border border-white/30 backdrop-blur-sm bg-white/5 group-hover:bg-white group-hover:border-white transition-all duration-300">
                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-light tracking-widest uppercase text-white group-hover:text-black transition-colors duration-300">
                      <span className="transition-transform duration-300 group-hover:translate-x-[-4px]">
                        VER COLECCIÓN {marca.nombre}
                      </span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
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
