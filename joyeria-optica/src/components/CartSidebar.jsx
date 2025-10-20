import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Truck } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";

const CartSidebar = ({ isOpen, onClose }) => {
  const {
    items,
    itemCount,
    subtotal,
    shippingCost,
    total,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    window.scrollTo(0, 0);
    onClose();
    navigate("/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative flex flex-col w-full h-full max-w-md bg-white shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Carrito ({itemCount})</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 transition-colors rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 p-6 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 mb-4 text-gray-300" />
                  <h3 className="mb-2 text-lg font-medium text-gray-900">
                    Tu carrito está vacío
                  </h3>
                  <p className="mb-6 text-gray-500">
                    Añade algunos productos para empezar
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 text-white transition-colors bg-black rounded-lg hover:bg-gray-800 cursor-pointer"
                  >
                    Seguir comprando
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex gap-4 p-4 border border-gray-100 rounded-lg"
                    >
                      {/* Imagen */}
                      <div className="flex-shrink-0 w-16 h-16 overflow-hidden bg-gray-100 rounded-lg">
                        <img
                          src={item.imagen}
                          alt={item.titulo}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {item.titulo}
                        </h4>
                        {item.variant && (
                          <p className="mt-1 text-xs text-gray-500">
                            {item.variant.titulo}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-1 rounded hover:bg-gray-100 cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-1 rounded hover:bg-gray-100 cursor-pointer"
                              disabled={item.quantity >= item.maxStock}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>

                      {/* Precio */}
                      <div className="text-right">
                        <p className="text-sm font-semibold">
                          {(item.precio * item.quantity).toLocaleString(
                            "es-ES",
                            {
                              style: "currency",
                              currency: "EUR",
                            }
                          )}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {/* Botón limpiar carrito */}
                  {items.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="w-full py-2 text-sm text-center text-gray-500 transition-colors hover:text-red-500 cursor-pointer"
                    >
                      Vaciar carrito
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Footer con totales y checkout */}
            {items.length > 0 && (
              <div className="p-6 space-y-4 border-t border-gray-100">
                {/* Envío gratis */}
                {subtotal < 50 && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <p className="text-sm text-blue-600">
                      Añade{" "}
                      {(50 - subtotal).toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}{" "}
                      más para envío gratis
                    </p>
                  </div>
                )}

                {subtotal >= 50 && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50">
                    <Truck className="w-4 h-4 text-green-600" />
                    <p className="text-sm text-green-600">
                      ¡Envío gratis incluido!
                    </p>
                  </div>
                )}

                {/* Totales */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>
                      {subtotal.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </span>
                  </div>
                  {shippingCost > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Envío</span>
                      <span>
                        {shippingCost.toLocaleString("es-ES", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 text-lg font-semibold border-t">
                    <span>Total</span>
                    <span>
                      {total.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </span>
                  </div>
                </div>

                {/* Botón de checkout */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 font-medium text-white transition-colors bg-black rounded-lg hover:bg-gray-800 cursor-pointer"
                >
                  Finalizar compra
                </button>

                {/* Políticas */}
                <p className="text-xs text-center text-gray-500">
                  Al continuar, acepto los{" "}
                  <a
                    href="/terminos-legales"
                    className="underline hover:text-black cursor-pointer"
                  >
                    términos y condiciones
                  </a>
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
