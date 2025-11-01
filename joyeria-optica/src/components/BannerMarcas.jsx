import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
    <div className="container mx-auto">
      {/* Header */}
      <div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hidden mb-6 text-3xl font-bold text-left sm:text-center sm:mb-8 md:block"
        >
          {titulo}
        </motion.h2>
      </div>

      {/* Grid de marcas - 2x2 */}
      <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2 md:gap-6">
        {marcas.map((marca, index) => (
          <motion.div
            key={marca.slug}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onClick={() => handleClickMarca(marca)}
            className="relative overflow-hidden transition-all duration-500 bg-white rounded-lg shadow-md cursor-pointer group h-72 md:h-80 hover:shadow-2xl"
          >
            {/* Imagen de fondo */}
            <div className="absolute inset-0">
              <img
                src={marca.imagen}
                alt={`${marca.nombre} ${marca.descripcion || ""}`}
                loading="lazy"
                className={`object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 ${
                  marca.objectPosition || ""
                }`}
                onError={(e) => {
                  e.target.src = "/placeholder-brand.jpg";
                }}
              />
            </div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

            {/* Contenido */}
            <div className="relative z-10 flex flex-col justify-end h-full p-6">
              <motion.div
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
              >
                <h3 className="mb-2 text-3xl font-bold text-white transition-transform duration-300 md:text-4xl group-hover:scale-105">
                  {marca.nombre}
                </h3>

                {/* Descripción opcional */}
                {marca.descripcion && (
                  <p className="mb-3 text-sm text-white/80">
                    {marca.descripcion}
                  </p>
                )}

                {/* Botón ver más */}
                <div className="flex items-center text-white transition-transform duration-300 group-hover:translate-x-2">
                  <span className="mr-2 text-sm font-medium">
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
              </motion.div>
            </div>

            {/* Línea decorativa en hover */}
            <div className="absolute bottom-0 left-0 w-full h-1 transition-all duration-500 scale-x-0 bg-gradient-to-r from-transparent via-white to-transparent group-hover:scale-x-100"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
