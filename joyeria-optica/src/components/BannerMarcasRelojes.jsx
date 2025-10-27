import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function BannerMarcasRelojes() {
  const navigate = useNavigate();

  const marcas = [
    {
      nombre: "Casio",
      descripcion: "Tecnología y precisión japonesa",
      imagen: "/casio-banner.jpg",
      slug: "casio",
      color: "from-blue-900/80 to-black/80",
    },
    {
      nombre: "Fossil",
      descripcion: "Estilo americano clásico",
      imagen: "/fossil-banner.jpg",
      slug: "fossil",
      color: "from-amber-900/80 to-black/80",
    },
    {
      nombre: "Seiko",
      descripcion: "Excelencia relojera desde 1881",
      imagen: "/seiko-banner.jpg",
      slug: "seiko",
      color: "from-gray-900/80 to-black/80",
    },
    {
      nombre: "Orient",
      descripcion: "Innovación en relojes mecánicos",
      imagen: "/orient-banner.jpg",
      slug: "orient",
      color: "from-cyan-900/80 to-black/80",
    },
  ];

  const handleClickMarca = (marca) => {
    window.scrollTo(0, 0);
    navigate(`/catalogo/relojes?marca=${marca.slug}`);
  };

  const handleVerTodas = () => {
    window.scrollTo(0, 0);
    navigate("/catalogo/relojes");
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
            className="mb-6 text-3xl font-bold text-left sm:text-center sm:mb-8"
          >
            Marcas de Relojería
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
                  alt={`${marca.nombre} relojes`}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = "/placeholder-brand.jpg";
                  }}
                />
              </div>

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
