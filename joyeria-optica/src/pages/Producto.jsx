// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProducto } from "../api/productos";
import { ShoppingBag } from "lucide-react";

const ProductoPage = () => {
  const { slug } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imagenPrincipal, setImagenPrincipal] = useState("");

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        setLoading(true);
        const data = await fetchProducto(slug);
        setProducto(data);
        setImagenPrincipal(data.imagenes[0]);
      } catch (error) {
        console.error("Error cargando producto:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarProducto();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-2 border-black rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Producto no encontrado</p>
      </div>
    );
  }

  // Calcular descuento si existe precio anterior
  const descuento = producto.precioAnterior
    ? Math.round(((producto.precioAnterior - producto.precio) / producto.precioAnterior) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      {/* Contenedor principal */}
      <div className="container px-4 py-12 mx-auto max-w-7xl">
        {/* Ruta de navegación */}
        <nav className="flex mb-6 text-sm text-gray-500">
          <a href="/" className="hover:underline">Inicio</a>
          <span className="mx-2">/</span>
          <a href="/catalogo" className="hover:underline">Catálogo</a>
          <span className="mx-2">/</span>
          <span className="text-black">{producto.titulo}</span>
        </nav>

        {/* Grid de producto */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Galería de imágenes */}
          <div>
            {/* Imagen principal */}
            <div className="relative overflow-hidden bg-gray-50 aspect-square">
              <motion.img
                src={imagenPrincipal}
                alt={producto.titulo}
                className="object-cover w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              {descuento && (
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="absolute px-3 py-1 text-xs font-light tracking-wider text-white bg-red-600 rounded top-4 right-4"
                >
                  -{descuento}%
                </motion.div>
              )}
            </div>

            {/* Miniaturas */}
            {producto.imagenes.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-4">
                {producto.imagenes.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setImagenPrincipal(img)}
                    className={`aspect-square bg-gray-50 ${imagenPrincipal === img ? 'ring-2 ring-black' : 'hover:ring-1 hover:ring-gray-300'}`}
                  >
                    <img
                      src={img}
                      alt={`Vista ${index + 1} de ${producto.titulo}`}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div className="flex flex-col">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-2xl font-light tracking-wider text-black md:text-3xl"
            >
              {producto.titulo}
            </motion.h1>

            {/* Precio */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4"
            >
              <div className="flex items-center">
                <span className="text-xl font-medium text-black">
                  {producto.precio.toLocaleString("es-ES", {
                    style: "currency",
                    currency: "EUR",
                    minimumFractionDigits: 0
                  })}
                </span>
                {producto.precioAnterior && (
                  <span className="ml-3 text-sm text-gray-400 line-through">
                    {producto.precioAnterior.toLocaleString("es-ES", {
                      style: "currency",
                      currency: "EUR",
                      minimumFractionDigits: 0
                    })}
                  </span>
                )}
              </div>
              {descuento && (
                <p className="mt-1 text-sm text-red-600">
                  Ahorras {descuento}% en este artículo
                </p>
              )}
            </motion.div>

            {/* Descripción */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6"
            >
              <h2 className="mb-2 text-sm font-medium tracking-wider text-gray-700 uppercase">
                Descripción
              </h2>
              <p className="text-sm font-light text-gray-700">
                {producto.descripcion}
              </p>
            </motion.div>

            {/* Categorías y etiquetas */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6"
            >
              <div className="flex flex-wrap gap-2">
                {producto.categorias.map((cat, index) => (
                  <a
                    key={index}
                    href={`/catalogo/${cat.toLowerCase()}`}
                    className="px-2 py-1 text-xs text-black bg-gray-100 rounded hover:bg-gray-200"
                  >
                    {cat.toUpperCase()}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Botón de compra */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8"
            >
              <button className="flex items-center justify-center w-full gap-2 px-6 py-3 text-sm font-light tracking-wider text-white transition bg-black rounded-sm hover:bg-gray-800">
                <ShoppingBag className="w-4 h-4" />
                AÑADIR AL CARRITO
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductoPage;