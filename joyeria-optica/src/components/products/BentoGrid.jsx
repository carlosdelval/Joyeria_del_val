import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProductos } from "../../api/productos";
import OptimizedImage from "../common/OptimizedImage";
import { ArrowRight } from "lucide-react";

/**
 * BentoGrid - Grid moderno estilo mosaico para mostrar productos destacados
 *
 * @param {string} marca - Marca de los productos a mostrar (ej: "tous", "ray-ban", "salvatore plata")
 * @param {string} titulo - Título del grid (opcional)
 * @param {string} subtitulo - Subtítulo descriptivo (opcional)
 * @param {string} ctaText - Texto del botón (opcional)
 * @param {string} ctaLink - Link del botón (opcional)
 */
export default function BentoGrid({
  marca = "tous",
  titulo = "Colección Destacada",
  subtitulo = "Descubre nuestra selección premium",
  ctaText = "Ver toda la colección",
  ctaLink = `/catalogo?marca=${marca}`,
}) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        const resultados = await fetchProductos({
          marca: [marca],
        });

        // Tomar los primeros 6 productos para el layout
        setProductos(resultados.slice(0, 6));
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, [marca]);

  if (loading) {
    return (
      <div className="w-full py-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (productos.length === 0) {
    return null;
  }

  // Layout del Bento Grid - Diferentes tamaños de tarjetas
  const gridLayout = [
    { size: "large", span: "md:col-span-2 md:row-span-2" }, // Producto 1 - Grande
    { size: "medium", span: "md:col-span-1 md:row-span-1" }, // Producto 2
    { size: "medium", span: "md:col-span-1 md:row-span-1" }, // Producto 3
    { size: "tall", span: "md:col-span-1 md:row-span-2" }, // Producto 4 - Alto
    { size: "wide", span: "md:col-span-2 md:row-span-1" }, // Producto 5 - Ancho
  ];

  return (
    <section className="w-full py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wider uppercase mb-4">
            {titulo}
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            {subtitulo}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          {productos.slice(0, 5).map((producto, index) => {
            const layout = gridLayout[index];
            const isLarge = layout.size === "large";
            const isTall = layout.size === "tall";

            return (
              <motion.div
                key={producto.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative overflow-hidden bg-gray-50 rounded-2xl ${layout.span} h-[300px] md:h-auto md:aspect-auto`}
                style={{
                  minHeight: isLarge ? "500px" : isTall ? "500px" : "240px",
                }}
              >
                <Link
                  to={`/producto/${producto.slug}`}
                  className="block w-full h-full"
                >
                  {/* Imagen del producto */}
                  <div className="absolute inset-0">
                    <OptimizedImage
                      src={producto.imagen || producto.imagenes?.[0]}
                      alt={producto.nombre || producto.titulo}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  </div>

                  {/* Contenido */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      {/* Marca */}
                      <p className="text-white/80 text-xs md:text-sm uppercase tracking-widest mb-2">
                        {producto.marca}
                      </p>

                      {/* Nombre del producto */}
                      <h3
                        className={`text-white font-light mb-3 line-clamp-2 ${
                          isLarge
                            ? "text-2xl md:text-3xl lg:text-4xl"
                            : "text-lg md:text-xl lg:text-2xl"
                        }`}
                      >
                        {producto.nombre || producto.titulo}
                      </h3>

                      {/* Precio */}
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className={`text-white font-light ${
                            isLarge
                              ? "text-2xl md:text-3xl"
                              : "text-xl md:text-2xl"
                          }`}
                        >
                          {producto.precio?.toFixed(2)}€
                        </span>
                        {producto.precioAnterior && (
                          <span className="text-white/60 line-through text-sm md:text-base">
                            {producto.precioAnterior.toFixed(2)}€
                          </span>
                        )}
                      </div>

                      {/* CTA - Solo en productos grandes */}
                      {isLarge && (
                        <div className="flex items-center text-white text-sm md:text-base uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span>Ver detalles</span>
                          <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Badge de oferta */}
                  {producto.precioAnterior &&
                    producto.precioAnterior > producto.precio && (
                      <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs md:text-sm font-medium uppercase tracking-wide">
                        Oferta
                      </div>
                    )}
                </Link>
              </motion.div>
            );
          })}

          {/* Tarjeta CTA final */}
          {productos.length > 5 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="group relative overflow-hidden bg-black rounded-2xl md:col-span-1 md:row-span-1 h-[300px] md:h-auto flex items-center justify-center"
              style={{ minHeight: "240px" }}
            >
              <Link
                to={ctaLink}
                className="w-full h-full flex flex-col items-center justify-center p-8 text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-white/60 text-sm uppercase tracking-widest mb-4">
                    +{productos.length - 5} productos más
                  </p>
                  <h3 className="text-white text-2xl md:text-3xl font-light mb-6 tracking-wide">
                    Explorar más
                  </h3>
                  <div className="flex items-center justify-center text-white text-base uppercase tracking-wider group-hover:gap-4 gap-2 transition-all duration-300">
                    <span>Ver todos</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          )}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            to={ctaLink}
            className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white uppercase tracking-widest text-sm hover:bg-gray-900 transition-colors duration-300"
          >
            {ctaText}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
