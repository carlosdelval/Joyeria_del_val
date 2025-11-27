import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Trash2, ArrowLeft } from "lucide-react";
import { useWishlist } from "../hooks/useWishlist";
import { useCart } from "../hooks/useCart";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SEO from "../components/common/SEO";
import WishlistButton from "../components/products/WishlistButton";
import ConfirmModal from "../components/modals/ConfirmModal";

const FavoritosPage = () => {
  const { items, clearWishlist, itemCount } = useWishlist();
  const { addToCart, items: cartItems } = useCart();
  const { showSuccess, showInfo, showWarning } = useToast();
  const navigate = useNavigate();
  const [addedToCart, setAddedToCart] = useState({});
  const [showClearModal, setShowClearModal] = useState(false);
  const [cartKey, setCartKey] = useState(0);
  const [loading, setLoading] = useState(true);

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Forzar re-render cuando cambie el carrito
  useEffect(() => {
    setCartKey((prev) => prev + 1);
  }, [cartItems.length, cartItems]);

  // Función helper para obtener la cantidad actual en el carrito de un producto
  const getCartQuantity = (productId) => {
    // Buscar por productId (puede haber variantes con diferentes IDs)
    const matchingItems = cartItems.filter(
      (item) => item.productId === productId || item.id === productId
    );

    // Sumar todas las cantidades de las variantes del mismo producto
    const totalQuantity = matchingItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    return totalQuantity;
  };

  // Función helper para verificar si se puede añadir más al carrito
  const canAddToCart = (item) => {
    const currentQuantity = getCartQuantity(item.id);
    const availableStock = item.stock || 99;
    const canAdd = currentQuantity < availableStock;

    // Debug: descomentar para ver los valores
    // console.log('canAddToCart:', {
    //   productId: item.id,
    //   titulo: item.titulo,
    //   currentQuantity,
    //   availableStock,
    //   canAdd
    // });

    return canAdd;
  };

  const handleAddToCart = (item) => {
    // Verificar si hay stock disponible ANTES de añadir
    const currentQuantity = getCartQuantity(item.id);
    const availableStock = item.stock || 99;

    if (currentQuantity >= availableStock) {
      showWarning(`Stock máximo alcanzado para ${item.titulo}`, 3000);
      return;
    }

    // Guardar cantidad antes de añadir
    const quantityBefore = currentQuantity;

    // Reconstruir el objeto producto con la estructura completa
    const producto = {
      id: item.id,
      slug: item.slug,
      titulo: item.titulo,
      precio: item.precio,
      precioAnterior: item.precioAnterior,
      imagenes: [item.imagen], // Convertir imagen única a array
      marca: item.marca,
      disponible: item.disponible,
      stock: item.stock || 99, // Usar stock real del producto
    };

    addToCart(producto, 1);

    // Verificar si realmente se añadió después de un pequeño delay
    setTimeout(() => {
      const quantityAfter = getCartQuantity(item.id);

      if (quantityAfter > quantityBefore) {
        // Se añadió correctamente
        setAddedToCart({ ...addedToCart, [item.id]: true });
        showSuccess(`${item.titulo} añadido al carrito`);

        // Resetear el estado de "añadido"
        setTimeout(() => {
          setAddedToCart((prev) => ({ ...prev, [item.id]: false }));
        }, 2000);
      } else {
        // No se pudo añadir (límite alcanzado)
        showWarning(`Stock máximo alcanzado para ${item.titulo}`, 3000);
      }
    }, 100);
  };

  const handleAddAllToCart = () => {
    let addedCount = 0;
    let skippedCount = 0;

    items.forEach((item) => {
      // Verificar si hay stock disponible
      if (!canAddToCart(item)) {
        skippedCount++;
        return;
      }

      const producto = {
        id: item.id,
        slug: item.slug,
        titulo: item.titulo,
        precio: item.precio,
        precioAnterior: item.precioAnterior,
        imagenes: [item.imagen],
        marca: item.marca,
        disponible: item.disponible,
        stock: item.stock || 99,
      };
      addToCart(producto, 1);
      addedCount++;
    });

    // Mostrar notificación según el resultado
    if (addedCount > 0) {
      showSuccess(
        `${addedCount} ${
          addedCount === 1 ? "producto añadido" : "productos añadidos"
        } al carrito`,
        4000
      );
    }

    if (skippedCount > 0) {
      showWarning(
        `${skippedCount} ${
          skippedCount === 1 ? "producto omitido" : "productos omitidos"
        } por falta de stock`,
        4000
      );
    }
  };

  const handleClearWishlist = () => {
    setShowClearModal(true);
  };

  const confirmClearWishlist = () => {
    clearWishlist();
    showInfo("Lista de favoritos limpiada", 3000);
  };

  // Mostrar loading skeleton
  if (loading) {
    return (
      <>
        <SEO
          title="Mis Favoritos - Óptica Del Val Joyeros"
          description="Guarda tus productos favoritos y compra más tarde. Lista de deseos de joyas, relojes y gafas."
          url="https://opticadelvaljoyeros.es/favoritos"
        />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-16">
          <div className="bg-black text-white py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="h-12 bg-white/10 rounded w-48 mx-auto mb-4 animate-pulse"></div>
                <div className="h-6 bg-white/10 rounded w-64 mx-auto animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="aspect-square bg-gray-200 animate-pulse"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
                    <div className="flex gap-2 mt-4">
                      <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <SEO
          title="Mis Favoritos - Óptica Del Val Joyeros"
          description="Guarda tus productos favoritos y compra más tarde. Lista de deseos de joyas, relojes y gafas."
          url="https://opticadelvaljoyeros.es/favoritos"
        />
        <div className="min-h-screen bg-gray-50">
          <div className="container px-4 py-16 mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center text-center"
            >
              <div className="p-6 mb-6 bg-white rounded-full shadow-sm">
                <Heart className="w-16 h-16 text-gray-300" />
              </div>
              <h1 className="mb-4 text-3xl font-light tracking-wider text-black">
                Tu lista de favoritos está vacía
              </h1>
              <p className="mb-8 text-gray-600">
                Guarda los productos que te gusten para comprarlos más tarde
              </p>
              <button
                onClick={() => navigate("/catalogo")}
                className="flex items-center gap-2 px-6 py-3 text-white transition-colors bg-black rounded-lg hover:bg-gray-800"
              >
                <ArrowLeft className="w-5 h-5" />
                Explorar productos
              </button>
            </motion.div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`Mis Favoritos (${itemCount}) - Óptica Del Val Joyeros`}
        description="Tu lista de productos favoritos. Guarda y compra tus joyas, relojes y gafas preferidas."
        url="https://opticadelvaljoyeros.es/favoritos"
      />

      {/* Modal de confirmación */}
      <ConfirmModal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        onConfirm={confirmClearWishlist}
        title="¿Limpiar lista de favoritos?"
        message="Se eliminarán todos los productos de tu lista de favoritos. Esta acción no se puede deshacer."
        confirmText="Sí, limpiar lista"
        cancelText="Cancelar"
        type="danger"
      />

      <div className="min-h-screen bg-gray-50">
        <div className="container px-4 py-8 mx-auto max-w-7xl md:py-12">
          {/* Header */}
          <div className="flex flex-col gap-4 pb-6 mb-8 border-b md:flex-row md:items-center md:justify-between">
            <div>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 mb-4 text-sm text-gray-600 transition-colors hover:text-black"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver
              </button>
              <h1 className="flex items-center gap-3 text-3xl font-light tracking-wider text-black">
                <Heart className="w-8 h-8" />
                Mis Favoritos
              </h1>
              <p className="mt-2 text-gray-600">
                {itemCount}{" "}
                {itemCount === 1 ? "producto guardado" : "productos guardados"}
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                onClick={handleAddAllToCart}
                className="flex items-center justify-center gap-2 px-6 py-3 text-white transition-colors bg-black rounded-lg hover:bg-gray-800"
              >
                <ShoppingBag className="w-5 h-5" />
                Añadir todo al carrito
              </button>
              <button
                onClick={handleClearWishlist}
                className="flex items-center justify-center gap-2 px-6 py-3 text-red-600 transition-colors bg-white border border-red-300 rounded-lg hover:bg-red-50"
              >
                <Trash2 className="w-5 h-5" />
                Limpiar lista
              </button>
            </div>
          </div>

          {/* Grid de productos */}
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="relative overflow-hidden bg-white border border-gray-100 rounded-lg group"
                >
                  {/* Imagen */}
                  <div className="relative overflow-hidden aspect-square bg-gray-50">
                    <img
                      src={item.imagen}
                      alt={item.titulo}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Botón de eliminar de favoritos */}
                    <div className="absolute z-10 top-2 right-2">
                      <WishlistButton product={item} size="sm" />
                    </div>

                    {/* Badges de Black Friday y Descuento */}
                    {(item.categorias?.some(
                      (cat) =>
                        cat?.toLowerCase() === "black_friday" ||
                        cat?.toLowerCase() === "black-friday"
                    ) ||
                      (item.precioAnterior ?? 0) > 0) && (
                      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1.5">
                        {/* Badge de Black Friday */}
                        {item.categorias?.some(
                          (cat) =>
                            cat?.toLowerCase() === "black_friday" ||
                            cat?.toLowerCase() === "black-friday"
                        ) && (
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
                              className="px-2 py-1 text-[10px] font-bold tracking-wider text-white uppercase bg-red-600 rounded shadow-lg"
                            >
                              BLACK FRIDAY
                            </motion.div>
                          </motion.div>
                        )}
                        {/* Badge de Descuento */}
                        {(item.precioAnterior ?? 0) > 0 && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              delay: item.categorias?.some(
                                (cat) =>
                                  cat?.toLowerCase() === "black_friday" ||
                                  cat?.toLowerCase() === "black-friday"
                              )
                                ? 0.2
                                : 0,
                              type: "spring",
                              stiffness: 200,
                            }}
                            className="px-2 py-1 text-[10px] font-bold tracking-wider text-white bg-black rounded shadow-lg"
                          >
                            -
                            {Math.round(
                              ((item.precioAnterior - item.precio) /
                                item.precioAnterior) *
                                100
                            )}
                            %
                          </motion.div>
                        )}
                      </div>
                    )}

                    {/* Overlay con botones en hover */}
                    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-black/40 group-hover:opacity-100">
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => navigate(`/producto/${item.slug}`)}
                          className="px-4 py-2 text-sm font-medium text-black transition-colors bg-white rounded-lg hover:bg-gray-100"
                        >
                          Ver detalles
                        </button>
                        <button
                          onClick={() => handleAddToCart(item)}
                          disabled={addedToCart[item.id] || !canAddToCart(item)}
                          className={`px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg ${
                            addedToCart[item.id]
                              ? "bg-green-600"
                              : !canAddToCart(item)
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-black hover:bg-gray-800"
                          }`}
                          title={
                            !canAddToCart(item)
                              ? "Stock máximo en el carrito"
                              : ""
                          }
                        >
                          {addedToCart[item.id]
                            ? "¡Añadido!"
                            : !canAddToCart(item)
                            ? "Stock máximo"
                            : "Añadir al carrito"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Info del producto */}
                  <div className="p-3 md:p-4">
                    {item.marca && (
                      <p className="mb-1 text-xs font-medium tracking-wider text-gray-500 uppercase">
                        {item.marca}
                      </p>
                    )}
                    <h3 className="mb-2 text-sm font-light line-clamp-2 text-gray-900">
                      {item.titulo}
                    </h3>

                    <div className="flex items-center gap-2">
                      <span className="text-lg font-medium text-black">
                        {item.precio.toLocaleString("es-ES", {
                          style: "currency",
                          currency: "EUR",
                          minimumFractionDigits: 0,
                        })}
                      </span>
                      {(item.precioAnterior ?? 0) > 0 && (
                        <span className="text-sm text-gray-400 line-through">
                          {item.precioAnterior.toLocaleString("es-ES", {
                            style: "currency",
                            currency: "EUR",
                            minimumFractionDigits: 0,
                          })}
                        </span>
                      )}
                    </div>

                    {/* Indicadores de disponibilidad y stock */}
                    {!item.disponible ? (
                      <p className="mt-2 text-xs text-red-600">Sin stock</p>
                    ) : (
                      <>
                        {!canAddToCart(item) && (
                          <p className="mt-2 text-xs text-orange-600">
                            Stock máximo en carrito
                          </p>
                        )}
                        {item.stock && item.stock < 5 && canAddToCart(item) && (
                          <p className="mt-2 text-xs text-orange-600">
                            Solo quedan {item.stock} unidades
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {/* Call to action inferior */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="mb-4 text-gray-600">¿Buscas algo más?</p>
            <button
              onClick={() => navigate("/catalogo")}
              className="px-8 py-3 text-white transition-colors bg-black rounded-lg hover:bg-gray-800"
            >
              Seguir comprando
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default FavoritosPage;
