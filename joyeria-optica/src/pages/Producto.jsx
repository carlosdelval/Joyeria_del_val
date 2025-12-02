// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { fetchProducto, fetchProductVariants } from "../api/productos";
import VariantSelector from "../components/products/VariantSelector";
import { ShoppingBag, Check, Info } from "lucide-react";
import { useCart } from "../hooks/useCart";
import {
  analytics,
  sanitizeProductTitle,
  calculateDiscount,
} from "../utils/helpers";
import { trackViewItem, trackAddToCart } from "../utils/analytics";
import SEO, {
  generateProductSchema,
  generateBreadcrumbSchema,
} from "../components/common/SEO";
import WishlistButton from "../components/products/WishlistButton";
import { PageSpinner, ButtonSpinner } from "../components/ui/Spinner";
import { useFlyAnimation } from "../context/FlyAnimationContext";
import ConfirmModal from "../components/modals/ConfirmModal";
import ImageZoomModal from "../components/modals/ImageZoomModal";

const ProductoPage = () => {
  const { slug } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imagenPrincipal, setImagenPrincipal] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart, items: cartItems } = useCart();
  const { flyToCart } = useFlyAnimation();
  const addToCartButtonRef = useRef(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 50, y: 50 });
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [descripcionAbierta, setDescripcionAbierta] = useState(false);
  const [tallaSeleccionada, setTallaSeleccionada] = useState("");
  const [showGuiaTallas, setShowGuiaTallas] = useState(false);
  const [showImageZoom, setShowImageZoom] = useState(false);
  const [variants, setVariants] = useState([]);
  const [loadingVariants, setLoadingVariants] = useState(false);

  // Tallas estándar para gafas (predefinidas)
  const tallasGafas = [
    { valor: "50-20-140", label: "50-20-140", tipo: "Pequeña" },
    { valor: "52-20-145", label: "52-20-145", tipo: "Pequeña" },
    { valor: "54-20-145", label: "54-20-145", tipo: "Mediana" },
    { valor: "55-20-145", label: "55-20-145", tipo: "Mediana" },
    { valor: "56-22-150", label: "56-22-150", tipo: "Grande" },
    { valor: "58-22-150", label: "58-22-150", tipo: "Grande" },
  ];

  // Detectar si es un anillo
  const isAnillo =
    producto &&
    (producto.categorias?.some((cat) => cat.toLowerCase().includes("anillo")) ||
      producto.etiquetas?.some((tag) => tag.toLowerCase().includes("anillo")) ||
      producto.tipo?.toLowerCase() === "anillo");

  // Función para sanitizar categorías
  const sanitizarCategoria = (categoria) => {
    if (!categoria) return "";

    return categoria
      .replace(/[-_]/g, " ") // Reemplazar guiones y guiones bajos por espacios
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalizar cada palabra
      .join(" ")
      .trim();
  };

  // Distancia mínima para considerar un swipe (en px)
  const minSwipeDistance = 50;

  // Detectar si es producto de Black Friday
  const isBlackFriday = producto?.categorias?.some(
    (cat) =>
      cat?.toLowerCase() === "black_friday" ||
      cat?.toLowerCase() === "black-friday"
  );

  // Detectar si es gafa de sol (ratio panorámico)
  const isGafa =
    producto &&
    (producto.categorias?.some((cat) => cat.toLowerCase().includes("gafas")) ||
      producto.marca?.toLowerCase().includes("ray-ban") ||
      producto.titulo?.toLowerCase().includes("gafas"));

  // Detectar si la imagen es panorámica (Ray-Ban CDN)
  const isPanoramicImage =
    imagenPrincipal?.includes("ray-ban.com") ||
    imagenPrincipal?.includes("width=720");

  // Elegir aspect ratio según tipo de producto
  const aspectRatioClass =
    isGafa || isPanoramicImage
      ? "aspect-[4/3]" // Ratio 4:3 para gafas
      : "aspect-square"; // Ratio 1:1 para relojes y joyería

  // Elegir object-fit según tipo de imagen
  const objectFitClass =
    isGafa || isPanoramicImage
      ? "object-contain" // Contener imagen completa
      : "object-cover"; // Cubrir área

  // Zoom sutil para gafas (elimina franjas sin recortar demasiado)
  const imageScale = isGafa || isPanoramicImage ? "scale-110" : "";

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
        trackViewItem(data);

        // Cargar variantes del producto
        setLoadingVariants(true);
        try {
          const productVariants = await fetchProductVariants(data);
          setVariants(productVariants);
        } catch (variantError) {
          console.error("Error cargando variantes:", variantError);
          setVariants([data]); // Al menos mostrar el producto actual
        } finally {
          setLoadingVariants(false);
        }
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
  const handleTouchStart = (e) => {
    setTouchEnd(0); // Reset
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (producto?.imagenes && producto.imagenes.length > 1) {
      if (isLeftSwipe) {
        // Swipe izquierda → siguiente imagen
        const nextIndex = (imageIndex + 1) % producto.imagenes.length;
        setImageIndex(nextIndex);
        setImagenPrincipal(producto.imagenes[nextIndex]);
      }

      if (isRightSwipe) {
        // Swipe derecha → imagen anterior
        const prevIndex =
          (imageIndex - 1 + producto.imagenes.length) %
          producto.imagenes.length;
        setImageIndex(prevIndex);
        setImagenPrincipal(producto.imagenes[prevIndex]);
      }
    }

    // Reset zoom si estaba activo
    setIsZoomed(false);
    setImagePosition({ x: 50, y: 50 });
  };

  const handleAddToCart = (e) => {
    setIsAddingToCart(true);

    // Disparar animación fly-to-cart
    if (addToCartButtonRef.current) {
      flyToCart(
        producto.imagenes?.[0] || producto.imagen,
        producto.titulo || producto.nombre,
        addToCartButtonRef.current
      );
    }

    // Simular pequeño delay para mejor UX
    setTimeout(() => {
      // Crear objeto de producto con talla como atributo personalizado
      const productoConTalla = {
        ...producto,
        tallaSeleccionada: isGafa || isAnillo ? tallaSeleccionada : null,
        customAttributes:
          isGafa || isAnillo
            ? [{ key: "Talla", value: tallaSeleccionada }]
            : [],
      };

      addToCart(productoConTalla, quantity);
      trackAddToCart(producto, quantity);
      setIsAddingToCart(false);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }, 300);
  };

  if (loading) {
    return <PageSpinner label="Cargando producto..." />;
  }

  if (!producto) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Producto no encontrado</p>
      </div>
    );
  }

  // Obtener stock del producto (tiempo real desde Shopify)
  const stock = producto.stock ?? 0; // Usar 0 si no está definido
  const disponible = producto.disponible ?? stock > 0;

  // Calcular cantidad en el carrito para este producto
  const itemInCart = cartItems?.find((item) => item.productId === producto.id);
  const quantityInCart = itemInCart ? itemInCart.quantity : 0;

  // Stock disponible
  const availableStock = stock - quantityInCart;
  const hasStock = disponible && availableStock > 0;
  const isLowStock = hasStock && availableStock <= 5;
  const stockPercentage = Math.min((availableStock / 10) * 100, 100); // Para barra visual (máx 10 = 100%)

  // Calcular descuento si existe precio anterior válido
  const descuento =
    (producto.precioAnterior ?? 0) > 0
      ? calculateDiscount(producto.precioAnterior, producto.precio)
      : null;

  // SEO dinámico para el producto
  const productUrl = `https://opticadelvaljoyeros.es/producto/${producto.slug}`;
  const productImage =
    producto.imagenes[0] || "https://opticadelvaljoyeros.es/og-image.jpg";

  const breadcrumbItems = [
    { name: "Inicio", url: "https://opticadelvaljoyeros.es" },
    { name: "Catálogo", url: "https://opticadelvaljoyeros.es/catalogo" },
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
        keywords={`${producto.marca}, ${producto.categorias
          .map((cat) => sanitizarCategoria(cat))
          .join(", ")}, comprar online`}
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
              {sanitizeProductTitle(producto.titulo)}
            </span>
          </nav>

          {/* Grid de producto */}
          <div className="grid gap-6 sm:gap-8 lg:gap-12 md:grid-cols-2">
            {/* Galería de imágenes */}
            <div>
              {/* MÓVIL: Carrusel horizontal con scroll */}
              <div className="md:hidden">
                <div className="relative">
                  {/* Carrusel de imágenes */}
                  <div className="relative overflow-hidden">
                    <div
                      className="flex transition-transform duration-300 ease-out"
                      style={{ transform: `translateX(-${imageIndex * 100}%)` }}
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                    >
                      {producto.imagenes.map((img, index) => (
                        <div
                          key={index}
                          className={`w-full flex-shrink-0 ${aspectRatioClass} bg-gray-50 cursor-pointer active:opacity-90`}
                          onClick={() => setShowImageZoom(true)}
                        >
                          <img
                            src={img}
                            alt={`${producto.titulo} - Vista ${index + 1}`}
                            className={`w-full h-full ${objectFitClass}`}
                            loading={index === 0 ? "eager" : "lazy"}
                          />
                          {/* Indicador de zoom */}
                          <div className="absolute flex items-center gap-1 px-2 py-1 text-xs text-white rounded-lg shadow-lg bottom-3 right-3 bg-black/50 backdrop-blur-sm">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                              />
                            </svg>
                            <span>Toca para ampliar</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Badge de descuento */}
                    {descuento && (
                      <div className="absolute px-2 py-1 text-xs font-medium text-white bg-red-600 rounded top-3 right-3">
                        -{descuento}%
                      </div>
                    )}

                    {/* Flechas de navegación */}
                    {producto.imagenes.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setImageIndex(Math.max(0, imageIndex - 1))
                          }
                          disabled={imageIndex === 0}
                          className={`absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg ${
                            imageIndex === 0
                              ? "opacity-30"
                              : "opacity-90 active:scale-95"
                          }`}
                          aria-label="Imagen anterior"
                        >
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
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() =>
                            setImageIndex(
                              Math.min(
                                producto.imagenes.length - 1,
                                imageIndex + 1
                              )
                            )
                          }
                          disabled={imageIndex === producto.imagenes.length - 1}
                          className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg ${
                            imageIndex === producto.imagenes.length - 1
                              ? "opacity-30"
                              : "opacity-90 active:scale-95"
                          }`}
                          aria-label="Imagen siguiente"
                        >
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
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>

                  {/* Indicadores de página */}
                  {producto.imagenes.length > 1 && (
                    <div className="flex justify-center gap-1.5 mt-3">
                      {producto.imagenes.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setImageIndex(index)}
                          className={`h-1.5 rounded-full transition-all ${
                            imageIndex === index
                              ? "w-6 bg-black"
                              : "w-1.5 bg-gray-300"
                          }`}
                          aria-label={`Ir a imagen ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* DESKTOP: Galería con zoom */}
              <div className="hidden md:block">
                <div
                  className={`relative overflow-hidden bg-gray-50 ${aspectRatioClass} cursor-zoom-in`}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <motion.img
                    src={imagenPrincipal}
                    alt={producto.titulo}
                    className={`w-full h-full ${objectFitClass} select-none`}
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
                    <div className="absolute px-3 py-1 text-xs font-light tracking-wider text-white bg-red-600 rounded top-4 right-4">
                      -{descuento}%
                    </div>
                  )}

                  {!isZoomed && (
                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 text-white text-xs rounded-full">
                      Pasa el ratón para ampliar
                    </div>
                  )}
                </div>

                {/* Miniaturas desktop */}
                {producto.imagenes.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 mt-4">
                    {producto.imagenes.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setImagenPrincipal(img);
                          setImageIndex(index);
                        }}
                        className={`${aspectRatioClass} bg-gray-50 ${
                          imagenPrincipal === img
                            ? "ring-2 ring-black"
                            : "hover:ring-1 hover:ring-gray-300"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Vista ${index + 1}`}
                          loading="lazy"
                          className={`w-full h-full ${objectFitClass}`}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Información del producto */}
            <div className="flex flex-col space-y-4 sm:space-y-6">
              <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-wide text-black leading-tight">
                {sanitizeProductTitle(producto.titulo)}
              </h1>

              {/* Badges y Precio */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                {/* Badges de Black Friday y Descuento */}
                {(isBlackFriday || descuento) && (
                  <div className="flex flex-wrap gap-2">
                    {/* Badge de Black Friday */}
                    {isBlackFriday && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <motion.div
                          animate={{
                            boxShadow: [
                              "0 0 0px rgba(239, 68, 68, 0.4)",
                              "0 0 20px rgba(239, 68, 68, 0.8)",
                              "0 0 0px rgba(239, 68, 68, 0.4)",
                            ],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="inline-flex px-4 py-2 text-xs sm:text-sm font-bold tracking-wider text-white uppercase bg-red-600 rounded shadow-lg"
                        >
                          BLACK FRIDAY
                        </motion.div>
                      </motion.div>
                    )}
                    {/* Badge de Descuento */}
                    {descuento && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          delay: isBlackFriday ? 0.2 : 0,
                          type: "spring",
                          stiffness: 200,
                        }}
                        className="inline-flex px-4 py-2 text-xs sm:text-sm font-bold tracking-wider text-white bg-black rounded shadow-lg"
                      >
                        -{descuento}%
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Precio */}
                <div className="flex items-center flex-wrap gap-2">
                  <span className="text-xl sm:text-3xl md:text-4xl font-medium text-black">
                    {producto.precio.toLocaleString("es-ES", {
                      style: "currency",
                      currency: "EUR",
                      minimumFractionDigits: 0,
                    })}
                  </span>
                  {(producto.precioAnterior ?? 0) > 0 && (
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
                  <p className="text-sm sm:text-base text-red-600 font-medium">
                    Ahorras {descuento}% en este artículo
                  </p>
                )}
              </motion.div>

              {/* Selector de Variantes */}
              {!loadingVariants && variants.length > 1 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="border-t border-b border-gray-200 py-4"
                >
                  <VariantSelector
                    variants={variants}
                    currentProduct={producto}
                    onVariantChange={(variant) => {
                      console.log("Variante seleccionada:", variant);
                    }}
                  />
                </motion.div>
              )}

              {/* Descripción - Desplegable en móvil, siempre visible en desktop */}
              {producto.descripcion && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {/* Desktop: descripción siempre visible */}
                  <div className="hidden sm:block">
                    <h2 className="mb-2 text-sm font-medium tracking-wider text-gray-700 uppercase">
                      Descripción
                    </h2>
                    <p className="text-base font-light text-gray-700 leading-relaxed">
                      {producto.descripcion}
                    </p>
                  </div>

                  {/* Móvil: descripción desplegable */}
                  <div className="sm:hidden">
                    <button
                      onClick={() => setDescripcionAbierta(!descripcionAbierta)}
                      className="w-full flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
                    >
                      <h2 className="text-sm font-medium tracking-wider text-gray-700 uppercase">
                        Descripción
                      </h2>
                      <motion.svg
                        animate={{ rotate: descripcionAbierta ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </motion.svg>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: descripcionAbierta ? "auto" : 0,
                        opacity: descripcionAbierta ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="p-3 text-sm font-light text-gray-700 leading-relaxed">
                        {producto.descripcion}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Categorías - Más compactas en móvil */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex flex-wrap gap-2">
                  {producto.categorias
                    .filter((cat) => {
                      // Filtrar tags de variantes (variante:)
                      const catLower = cat.toLowerCase();
                      return !catLower.startsWith('variante:');
                    })
                    .map((cat, index) => (
                      <a
                        key={index}
                        href={`/catalogo/${cat
                          .toLowerCase()
                          .replace(/[_\s]/g, "-")}`}
                        className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-black bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                      >
                        {sanitizarCategoria(cat)}
                      </a>
                    ))}
                </div>
              </motion.div>

              {/* Selector de cantidad y botón de compra */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-4 sm:space-y-5"
              >
                {/* Selector de talla para gafas */}
                {isGafa && (
                  <div className="p-3 sm:p-4 space-y-3 bg-white border-2 border-gray-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-900 tracking-wider uppercase">
                        Talla{" "}
                        {!tallaSeleccionada && (
                          <span className="text-red-600">*</span>
                        )}
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowGuiaTallas(true)}
                        className="cursor-pointer group flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900 transition-colors"
                        aria-label="Guía de tallas"
                      >
                        <Info className="w-4 h-4" />
                        <span className="hidden sm:inline">Guía de tallas</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {tallasGafas.map((talla) => {
                        const isSelected = tallaSeleccionada === talla.valor;

                        return (
                          <button
                            type="button"
                            key={talla.valor}
                            onClick={() => setTallaSeleccionada(talla.valor)}
                            className={`
                              px-2 py-3 text-sm cursor-pointer rounded transition-all font-light tracking-wide
                              ${
                                isSelected
                                  ? "bg-black text-white border-2 border-black"
                                  : "bg-white text-gray-900 border-2 border-gray-300 hover:border-gray-900"
                              }
                            `}
                          >
                            <div className="flex flex-col items-center">
                              <span className="font-medium">{talla.label}</span>
                              <span className="text-xs text-gray-500">
                                {talla.tipo}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Selector de talla para anillos */}
                {isAnillo && producto.tallas && producto.tallas.length > 0 && (
                  <div className="p-3 sm:p-4 space-y-3 bg-white border-2 border-gray-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-900 tracking-wider uppercase">
                        Talla{" "}
                        {!tallaSeleccionada && (
                          <span className="text-red-600">*</span>
                        )}
                      </label>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {producto.tallas.map((talla) => {
                        const isSelected = tallaSeleccionada === talla.valor;
                        const isAvailable = talla.disponible && talla.stock > 0;

                        return (
                          <button
                            type="button"
                            key={talla.valor}
                            onClick={() =>
                              isAvailable && setTallaSeleccionada(talla.valor)
                            }
                            disabled={!isAvailable}
                            className={`
                              px-2 py-3 text-sm rounded transition-all font-medium
                              ${
                                !isAvailable
                                  ? "bg-gray-100 text-gray-300 cursor-not-allowed line-through"
                                  : isSelected
                                  ? "bg-black text-white border-2 border-black"
                                  : "bg-white text-gray-900 border-2 border-gray-300 hover:border-gray-900 cursor-pointer"
                              }
                            `}
                          >
                            {talla.label}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-xs text-gray-500">
                      💡 Selecciona tu talla de anillo
                    </p>
                  </div>
                )}

                {/* Indicador de stock - Más compacto en móvil */}
                <div className="p-2.5 sm:p-4 space-y-2 bg-gray-50 border border-gray-200 rounded-lg">
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
                        ? `¡Solo ${availableStock} ${
                            availableStock === 1 ? "unidad" : "unidades"
                          }!`
                        : availableStock < 99
                        ? `${availableStock} disponibles`
                        : "En stock"}
                    </span>
                  </div>

                  {/* Barra de stock visual (solo si stock < 99) */}
                  {availableStock < 99 && (
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
                        {isLowStock ? "Stock limitado" : "Buena disponibilidad"}
                      </p>
                    </div>
                  )}
                </div>
                {/* Selector de cantidad */}
                <div className="flex items-center gap-2 sm:gap-4">
                  <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
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
                      onClick={() =>
                        setQuantity(Math.min(availableStock, quantity + 1))
                      }
                      disabled={quantity >= availableStock || !hasStock}
                      className={`px-2 sm:px-3 py-1 sm:py-2 text-base sm:text-lg transition ${
                        quantity >= availableStock || !hasStock
                          ? "text-gray-300 cursor-not-allowed bg-gray-50"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>

                  {/* Aviso si alcanza el máximo */}
                  {quantity >= availableStock &&
                    availableStock < 99 &&
                    hasStock && (
                      <span className="text-xs sm:text-sm text-orange-600 font-medium">
                        Máximo disponible
                      </span>
                    )}
                </div>

                {/* Botones de acción - Inline en móvil */}
                <div className="flex gap-2 sm:gap-3">
                  {/* Botón de añadir al carrito */}
                  <motion.button
                    ref={(el) => (addToCartButtonRef.current = el)}
                    onClick={
                      !hasStock ||
                      isAddingToCart ||
                      (isGafa && !tallaSeleccionada)
                        ? undefined
                        : handleAddToCart
                    }
                    disabled={
                      !hasStock ||
                      isAddingToCart ||
                      ((isGafa || isAnillo) && !tallaSeleccionada)
                    }
                    whileTap={
                      !hasStock ||
                      isAddingToCart ||
                      ((isGafa || isAnillo) && !tallaSeleccionada)
                        ? {}
                        : { scale: 0.95 }
                    }
                    className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-light tracking-wider transition rounded-sm ${
                      !hasStock
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed opacity-60"
                        : (isGafa || isAnillo) && !tallaSeleccionada
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed opacity-60"
                        : addedToCart
                        ? "bg-green-600 text-white"
                        : isAddingToCart
                        ? "bg-gray-700 text-white cursor-wait"
                        : "bg-black text-white hover:bg-gray-800"
                    }`}
                    style={
                      !hasStock || ((isGafa || isAnillo) && !tallaSeleccionada)
                        ? { pointerEvents: "none" }
                        : {}
                    }
                  >
                    {!hasStock ? (
                      <span className="text-xs sm:text-base">SIN STOCK</span>
                    ) : (isGafa || isAnillo) && !tallaSeleccionada ? (
                      <>
                        <span className="hidden sm:inline text-xs sm:text-base">
                          SELECCIONA UNA TALLA
                        </span>
                        <span className="sm:hidden text-xs">
                          SELECCIONA TALLA
                        </span>
                      </>
                    ) : isAddingToCart ? (
                      <ButtonSpinner
                        color="white"
                        label={
                          <>
                            <span className="hidden sm:inline">
                              AÑADIENDO...
                            </span>
                            <span className="sm:hidden">...</span>
                          </>
                        }
                      />
                    ) : addedToCart ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-1.5"
                      >
                        <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-xs sm:text-base">¡AÑADIDO!</span>
                      </motion.div>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="hidden sm:inline">
                          AÑADIR AL CARRITO
                        </span>
                        <span className="sm:hidden text-xs">AÑADIR</span>
                      </>
                    )}
                  </motion.button>

                  {/* Botón de favoritos - Mismo tamaño en móvil */}
                  <div className="flex-shrink-0">
                    <WishlistButton
                      product={producto}
                      size="lg"
                      className="h-full min-h-[48px] w-12 sm:w-14"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Detalles adicionales del producto */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 sm:mt-16 border-t pt-8 sm:pt-12"
          >
            <h2 className="text-xl sm:text-2xl font-light tracking-wider mb-4 sm:mb-6">
              Detalles del producto
            </h2>
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              {producto.marca && (
                <div className="flex items-start gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-gray-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Marca
                    </h3>
                    <p className="text-sm sm:text-base text-gray-900 mt-0.5">
                      {producto.marca}
                    </p>
                  </div>
                </div>
              )}
              {producto.categorias && producto.categorias.length > 0 && (
                <div className="flex items-start gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-gray-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Categoría
                    </h3>
                    <p className="text-sm sm:text-base text-gray-900 mt-0.5">
                      {sanitizarCategoria(producto.categorias[0])}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Información adicional */}
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-gray-700 leading-relaxed space-y-2">
                  <p className="font-medium">Información importante:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Producto original de distribuidor oficial</li>
                    <li>Envío asegurado y con seguimiento</li>
                    <li>Atención personalizada en tienda física</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Modal de Guía de Tallas */}
      <ConfirmModal
        isOpen={showGuiaTallas}
        onClose={() => setShowGuiaTallas(false)}
        onConfirm={() => setShowGuiaTallas(false)}
        title="Guía de Tallas"
        message={
          <div className="text-left space-y-3 max-h-[60vh] overflow-y-auto">
            <div>
              <p className="text-sm text-gray-700 mb-2">
                Formato:{" "}
                <strong className="text-gray-900">
                  Calibre-Puente-Varilla
                </strong>
              </p>
              <div className="bg-gray-50 p-2.5 rounded text-xs sm:text-sm space-y-1.5">
                <div className="flex gap-2">
                  <span className="font-semibold text-gray-900 min-w-[70px]">
                    Calibre:
                  </span>
                  <span className="text-gray-700">Ancho lente (mm)</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold text-gray-900 min-w-[70px]">
                    Puente:
                  </span>
                  <span className="text-gray-700">Entre lentes (mm)</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold text-gray-900 min-w-[70px]">
                    Varilla:
                  </span>
                  <span className="text-gray-700">Largo patilla (mm)</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-3">
              <p className="text-sm font-semibold text-gray-900 mb-2">
                Por tamaño de rostro:
              </p>
              <div className="text-xs sm:text-sm space-y-1.5">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-700">Pequeño</span>
                  <span className="font-medium text-gray-900">50-52mm</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-700">Mediano</span>
                  <span className="font-medium text-gray-900">54-56mm</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-700">Grande</span>
                  <span className="font-medium text-gray-900">58-60mm</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 pt-2 border-t">
              💡 Revisa la talla en el interior de tus gafas actuales
            </p>
          </div>
        }
        confirmText="Entendido"
        type="info"
      />

      {/* Modal de zoom de imagen para móvil */}
      <ImageZoomModal
        isOpen={showImageZoom}
        onClose={() => setShowImageZoom(false)}
        images={producto?.imagenes || []}
        initialIndex={imageIndex}
        productTitle={producto?.titulo || ""}
      />
    </>
  );
};

export default ProductoPage;
