import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { fetchProductos } from "../../api/productos";
import OptimizedImage from "../common/OptimizedImage";
import { ArrowRight, Sparkles } from "lucide-react";

/**
 * TimelineMarcas - Timeline horizontal mostrando marcas con sus productos destacados
 *
 * @param {Array} marcas - Array de objetos con marca y configuración
 * Ejemplo: [
 *   {
 *     nombre: "TOUS",
 *     slug: "tous",
 *     descripcion: "Joyería y accesorios de lujo",
 *     color: "#FFC0CB",
 *     logo: "/logos/tous.png" // opcional
 *   }
 * ]
 * @param {string} titulo - Título del timeline
 * @param {string} subtitulo - Subtítulo descriptivo
 */
export default function TimelineMarcas({
  marcas = [],
  titulo = "Nuestras Marcas",
  subtitulo = "Descubre las marcas más prestigiosas en un solo lugar",
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Configuración por defecto si no se pasan marcas
  const marcasDefault = [
    {
      nombre: "TOUS",
      slug: "tous",
      descripcion: "Joyería, relojes y accesorios de lujo",
      color: "#D4AF37",
    },
    {
      nombre: "Ray-Ban",
      slug: "ray-ban",
      descripcion: "Gafas de sol icónicas desde 1937",
      color: "#FF6B6B",
    },
    {
      nombre: "Salvatore Plata",
      slug: "salvatore plata",
      descripcion: "Joyería artesanal en plata de ley 925",
      color: "#C0C0C0",
    },
    {
      nombre: "Tommy Hilfiger",
      slug: "tommy hilfiger",
      descripcion: "Relojes con estilo americano clásico",
      color: "#002B5C",
    },
    {
      nombre: "Seiko",
      slug: "seiko",
      descripcion: "Precisión japonesa en relojería",
      color: "#1E3A8A",
    },
  ];

  const marcasAMostrar = marcas.length > 0 ? marcas : marcasDefault;

  return (
    <section
      ref={containerRef}
      className="relative w-full py-20 md:py-28 lg:py-32 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white"
    >
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-gray-400" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-[0.2em] uppercase">
              {titulo}
            </h2>
            <Sparkles className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-600 text-base md:text-lg lg:text-xl max-w-3xl mx-auto font-light">
            {subtitulo}
          </p>
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Línea horizontal decorativa */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent transform -translate-y-1/2 hidden md:block" />

        {/* Marcas */}
        <div className="container mx-auto px-4 sm:px-6">
          <div className="space-y-16 md:space-y-24">
            {marcasAMostrar.map((marca, index) => (
              <MarcaTimeline
                key={marca.slug}
                marca={marca}
                index={index}
                scrollProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Componente individual de marca en el timeline
function MarcaTimeline({ marca, index, scrollProgress }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const marcaRef = useRef(null);

  const isEven = index % 2 === 0;

  // Animación de entrada basada en scroll
  const opacity = useTransform(
    scrollProgress,
    [index * 0.15, index * 0.15 + 0.1],
    [0, 1]
  );

  const y = useTransform(
    scrollProgress,
    [index * 0.15, index * 0.15 + 0.1],
    [50, 0]
  );

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        const resultados = await fetchProductos({
          marca: [marca.slug],
        });

        // Tomar solo 3 productos destacados
        setProductos(resultados.slice(0, 3));
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, [marca.slug]);

  return (
    <motion.div
      ref={marcaRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`relative flex flex-col ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } items-center gap-8 md:gap-12 lg:gap-16`}
    >
      {/* Punto decorativo en la línea */}
      <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative"
        >
          <div
            className="w-6 h-6 rounded-full border-4 border-white shadow-lg"
            style={{ backgroundColor: marca.color || "#000" }}
          />
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-30"
            style={{ backgroundColor: marca.color || "#000" }}
          />
        </motion.div>
      </div>

      {/* Contenido de la marca */}
      <div className="flex-1 w-full md:w-1/2">
        <motion.div
          initial={{ opacity: 0, x: isEven ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`${
            isEven ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
          }`}
        >
          {/* Logo o nombre de la marca */}
          <div className="mb-6">
            {marca.logo ? (
              <img
                src={marca.logo}
                alt={marca.nombre}
                className="h-12 md:h-16 object-contain mx-auto md:mx-0"
              />
            ) : (
              <h3
                className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wider uppercase"
                style={{ color: marca.color || "#000" }}
              >
                {marca.nombre}
              </h3>
            )}
          </div>

          {/* Descripción */}
          <p className="text-gray-600 text-sm md:text-base lg:text-lg mb-6 max-w-md mx-auto md:mx-0 font-light">
            {marca.descripcion}
          </p>

          {/* CTA */}
          <Link
            to={`/catalogo?marca=${marca.slug}`}
            className="inline-flex items-center gap-2 text-black hover:gap-4 transition-all duration-300 group"
          >
            <span className="text-sm md:text-base uppercase tracking-widest font-light">
              Explorar {marca.nombre}
            </span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Productos de la marca */}
      <div className="flex-1 w-full md:w-1/2">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
          </div>
        ) : productos.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={`grid grid-cols-3 gap-3 md:gap-4 ${
              isEven ? "md:pl-0 md:pr-12" : "md:pr-0 md:pl-12"
            }`}
          >
            {productos.map((producto, idx) => (
              <Link
                key={producto.id || idx}
                to={`/producto/${producto.slug}`}
                className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 hover:shadow-2xl transition-all duration-500"
              >
                <OptimizedImage
                  src={producto.imagen || producto.imagenes?.[0]}
                  alt={producto.nombre || producto.titulo}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay con info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                  <p className="text-white text-xs md:text-sm font-light line-clamp-2 mb-1">
                    {producto.nombre || producto.titulo}
                  </p>
                  <p className="text-white text-sm md:text-base font-light">
                    {producto.precio?.toFixed(2)}€
                  </p>
                </div>

                {/* Badge de oferta */}
                {producto.precioAnterior &&
                  producto.precioAnterior > producto.precio && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs uppercase tracking-wide">
                      Sale
                    </div>
                  )}
              </Link>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p>No hay productos disponibles</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
