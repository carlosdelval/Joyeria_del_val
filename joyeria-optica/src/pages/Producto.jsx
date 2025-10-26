// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProducto } from "../api/productos";
import { ShoppingBag, Check, Info } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { analytics } from "../utils/helpers";
import SEO, {
  generateProductSchema,
  generateBreadcrumbSchema,
} from "../components/SEO";
import WishlistButton from "../components/WishlistButton";

const ProductoPage = () => {
  const { slug } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imagenPrincipal, setImagenPrincipal] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCart();
  const [imageIndex, setImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        setLoading(true);
        const data = await fetchProducto(slug);
        setProducto(data);
        // Asegurarse de que existe el array imagenes (normalizeProduct en API garantiza al menos 2)
        const imgs =
          Array.isArray(data.imagenes) && data.imagenes.length
            ? data.imagenes
            : data.shopify?.images?.map((i) => i.src) || [];
        const first = imgs[0] || "";
        setImagenPrincipal(first);
        setImageIndex(0);

        // Track visualización de producto
        analytics.trackViewProduct(data);
      } catch (error) {
        console.error("Error cargando producto:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarProducto();
  }, [slug]);

  // Funciones para el efecto zoom con movimiento
  const handleMouseMove = (e) => {
    if (!isZoomed) return;

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setImagePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    setImagePosition({ x: 50, y: 50 });
  };

  // Soporte para touch events (móvil)
  const handleTouchStart = () => {
    setIsZoomed(true);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const { left, top, width, height } =
        e.currentTarget.getBoundingClientRect();
      const x = ((touch.clientX - left) / width) * 100;
      const y = ((touch.clientY - top) / height) * 100;

      setImagePosition({ x, y });
    }
  };

  const handleTouchEnd = () => {
    setIsZoomed(false);
    setImagePosition({ x: 50, y: 50 });
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);

    // Simular pequeño delay para mejor UX
    setTimeout(() => {
      addToCart(producto, quantity);
      setIsAddingToCart(false);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }, 300);
  };

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

  // Obtener stock del producto (con fallback a 99 si no está definido)
  const stock = producto.stock || 99;
  const hasStock = stock > 0;
  const isLowStock = stock > 0 && stock <= 5;
  const stockPercentage = Math.min((stock / 10) * 100, 100); // Para barra visual (máx 10 = 100%)

  // Calcular descuento si existe precio anterior
  const descuento = producto.precioAnterior
    ? Math.round(
        ((producto.precioAnterior - producto.precio) /
          producto.precioAnterior) *
          100
      )
    : null;

  // SEO dinámico para el producto
  const productUrl = `https://opticadelvaljoyeros.com/producto/${producto.slug}`;
  const productImage =
    producto.imagenes[0] || "https://opticadelvaljoyeros.com/og-image.jpg";

  const breadcrumbItems = [
    { name: "Inicio", url: "https://opticadelvaljoyeros.com" },
    { name: "Catálogo", url: "https://opticadelvaljoyeros.com/catalogo" },
    { name: producto.titulo, url: productUrl },
  ];

  const seoTitle = `${producto.titulo} - ${
    producto.marca || "Óptica Del Val"
  } | ${producto.precio}€`;
  const seoDescription =
    producto.descripcion.length > 155
      ? producto.descripcion.substring(0, 152) + "..."
      : producto.descripcion;

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={`${producto.marca}, ${producto.categorias.join(
          ", "
        )}, comprar online`}
        image={productImage}
        url={productUrl}
        type="product"
        structuredData={[
          generateProductSchema(producto),
          generateBreadcrumbSchema(breadcrumbItems),
        ]}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-white"
      >
        {/* Contenedor principal */}
        <div className="container px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 mx-auto max-w-7xl">
          {/* Ruta de navegación */}
          <nav className="flex mb-4 sm:mb-6 text-xs sm:text-sm text-gray-500">
            <a href="/" className="hover:underline">
              Inicio
            </a>
            <span className="mx-2">/</span>
            <a href="/catalogo" className="hover:underline">
              Catálogo
            </a>
            <span className="mx-2">/</span>
            <span className="text-black truncate max-w-[150px] sm:max-w-none">
              {producto.titulo}
            </span>
          </nav>

          {/* Grid de producto */}
          <div className="grid gap-6 sm:gap-8 lg:gap-12 md:grid-cols-2">
            {/* Galería de imágenes */}
            <div>
              {/* Imagen principal con efecto zoom completo */}
              <div
                className="relative overflow-hidden bg-gray-50 aspect-square cursor-zoom-in"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <motion.img
                  src={imagenPrincipal}
                  alt={producto.titulo}
                  className="w-full h-full object-cover select-none"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    scale: isZoomed ? 1.5 : 1,
                  }}
                  style={{
                    transformOrigin: `${imagePosition.x}% ${imagePosition.y}%`,
                  }}
                  transition={{
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3, ease: "easeOut" },
                  }}
                  draggable={false}
                />

                {descuento && (
                  <motion.div
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1.5 }}
                    className="absolute px-3 py-1 text-xs font-light tracking-wider text-white bg-red-600 rounded top-4 right-4 pointer-events-none z-10"
                  >
                    -{descuento}%
                  </motion.div>
                )}

                {/* Indicador de zoom */}
                {!isZoomed && (
                  <div className="hidden md:block absolute bottom-4 right-4 px-3 py-1 bg-black/70 text-white text-xs rounded-full pointer-events-none">
                    Pasa el ratón para ampliar
                  </div>
                )}
              </div>

              {/* Miniaturas */}
              {producto.imagenes.length > 1 && (
                <div className="mt-4">
                  {/* Thumbnails: en desktop grid, en móvil carrusel horizontal */}
                  <div className="hidden md:grid grid-cols-4 gap-2">
                    {producto.imagenes.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setImagenPrincipal(img);
                          setImageIndex(index);
                        }}
                        className={`aspect-square bg-gray-50 ${
                          imagenPrincipal === img
                            ? "ring-2 ring-black"
                            : "hover:ring-1 hover:ring-gray-300"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Vista ${index + 1} de ${producto.titulo}`}
                          className="object-cover w-full h-full"
                        />
                      </button>
                    ))}
                  </div>

                  {/* Mobile thumbnails scrollable */}
                  <div className="md:hidden mt-2 -mx-2 overflow-x-auto">
                    <div className="flex gap-2 px-2">
                      {producto.imagenes.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setImagenPrincipal(img);
                            setImageIndex(index);
                          }}
                          className={`w-20 h-20 flex-shrink-0 bg-gray-50 rounded ${
                            imagenPrincipal === img
                              ? "ring-2 ring-black"
                              : "hover:ring-1 hover:ring-gray-300"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Vista ${index + 1} de ${producto.titulo}`}
                            className="object-cover w-full h-full"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Información del producto */}
            <div className="flex flex-col">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-wider text-black"
              >
                {producto.titulo}
              </motion.h1>

              {/* Precio */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-3 sm:mt-4"
              >
                <div className="flex items-center flex-wrap gap-2">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-black">
                    {producto.precio.toLocaleString("es-ES", {
                      style: "currency",
                      currency: "EUR",
                      minimumFractionDigits: 0,
                    })}
                  </span>
                  {producto.precioAnterior && (
                    <span className="ml-2 text-base sm:text-lg text-gray-400 line-through">
                      {producto.precioAnterior.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                        minimumFractionDigits: 0,
                      })}
                    </span>
                  )}
                </div>
                {descuento && (
                  <p className="mt-1 sm:mt-2 text-sm sm:text-base text-red-600 font-medium">
                    Ahorras {descuento}% en este artículo
                  </p>
                )}
              </motion.div>

              {/* Descripción */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 sm:mt-6"
              >
                <h2 className="mb-2 text-xs sm:text-sm font-medium tracking-wider text-gray-700 uppercase">
                  Descripción
                </h2>
                <p className="text-sm sm:text-base font-light text-gray-700 leading-relaxed">
                  {producto.descripcion}
                </p>
              </motion.div>

              {/* Categorías y etiquetas */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 sm:mt-6"
              >
                <div className="flex flex-wrap gap-2">
                  {producto.categorias.map((cat, index) => (
                    <a
                      key={index}
                      href={`/catalogo/${cat.toLowerCase()}`}
                      className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-black bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                    >
                      {cat.toUpperCase()}
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Selector de cantidad y botón de compra */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 sm:mt-8 space-y-4"
              >
                {/* Indicador de stock */}
                {hasStock ? (
                  <div className="p-3 sm:p-4 space-y-2 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-700">
                          Disponibilidad:
                        </span>
                        <div className="group relative">
                          <Info className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 cursor-help" />
                          <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-40 sm:w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
                            Stock actualizado en tiempo real. La cantidad máxima
                            que puedes añadir al carrito está limitada por la
                            disponibilidad.
                          </div>
                        </div>
                      </div>
                      <span
                        className={`font-semibold flex items-center gap-2 ${
                          isLowStock ? "text-orange-600" : "text-green-600"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isLowStock ? "bg-orange-600" : "bg-green-600"
                          } animate-pulse`}
                        ></span>
                        {isLowStock
                          ? `¡Solo ${stock} unidades!`
                          : stock < 99
                          ? `${stock} disponibles`
                          : "En stock"}
                      </span>
                    </div>

                    {/* Barra de stock visual (solo si stock < 99) */}
                    {stock < 99 && (
                      <div className="space-y-1">
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${stockPercentage}%` }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            className={`h-full ${
                              isLowStock
                                ? "bg-gradient-to-r from-orange-500 to-red-500"
                                : "bg-gradient-to-r from-green-500 to-emerald-500"
                            }`}
                          />
                        </div>
                        <p className="text-xs text-gray-500 text-right">
                          {isLowStock
                            ? "Stock limitado"
                            : "Buena disponibilidad"}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm font-medium text-red-800">
                      Lo sentimos, este producto está agotado actualmente.
                    </p>
                  </div>
                )}

                {/* Selector de cantidad */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-xs sm:text-sm font-medium">
                    Cantidad:
                  </span>
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1 || !hasStock}
                      className={`px-2 sm:px-3 py-1 sm:py-2 text-base sm:text-lg transition ${
                        quantity <= 1 || !hasStock
                          ? "text-gray-300 cursor-not-allowed bg-gray-50"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                      aria-label="Disminuir cantidad"
                    >
                      -
                    </button>
                    <span className="px-3 sm:px-4 py-1 sm:py-2 border-x border-gray-300 min-w-[2.5rem] sm:min-w-[3rem] text-center text-sm sm:text-base">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                      disabled={quantity >= stock || !hasStock}
                      className={`px-2 sm:px-3 py-1 sm:py-2 text-base sm:text-lg transition ${
                        quantity >= stock || !hasStock
                          ? "text-gray-300 cursor-not-allowed bg-gray-50"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>

                  {/* Aviso si alcanza el máximo */}
                  {quantity >= stock && stock < 99 && hasStock && (
                    <span className="text-xs sm:text-sm text-orange-600 font-medium">
                      Máximo disponible
                    </span>
                  )}
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Botón de añadir al carrito */}
                  <motion.button
                    onClick={handleAddToCart}
                    disabled={!hasStock || isAddingToCart}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-light tracking-wider transition rounded-sm ${
                      !hasStock
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : addedToCart
                        ? "bg-green-600 text-white"
                        : isAddingToCart
                        ? "bg-gray-700 text-white cursor-wait"
                        : "bg-black text-white hover:bg-gray-800"
                    }`}
                  >
                    {!hasStock ? (
                      <>AGOTADO</>
                    ) : isAddingToCart ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white rounded-full animate-spin border-t-transparent"></div>
                        <span className="hidden sm:inline">AÑADIENDO...</span>
                        <span className="sm:hidden">...</span>
                      </>
                    ) : addedToCart ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                        ¡AÑADIDO!
                      </motion.div>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="hidden sm:inline">
                          AÑADIR AL CARRITO
                        </span>
                        <span className="sm:hidden">AÑADIR</span>
                      </>
                    )}
                  </motion.button>

                  {/* Botón de favoritos */}
                  <div className="flex-shrink-0">
                    <WishlistButton product={producto} size="lg" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProductoPage;
