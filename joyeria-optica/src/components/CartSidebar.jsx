import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Truck } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import CouponInput from "./CouponInput";

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
    discountAmount,
    appliedCoupon,
    freeShipping,
    applyDiscount,
    removeDiscount,
  } = useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    window.scrollTo(0, 0);
    onClose();
    navigate("/checkout");
  };

  const handleApplyCoupon = async (code) => {
    return await applyDiscount(code);
  };

  const handleRemoveCoupon = () => {
    removeDiscount();
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
            aria-hidden="true"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative flex flex-col w-full h-full max-w-md bg-white shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" aria-hidden="true" />
                <h2 id="cart-title" className="text-lg font-semibold">
                  Carrito ({itemCount})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 transition-colors rounded-full hover:bg-gray-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-black"
                aria-label="Cerrar carrito de compras"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 p-6 overflow-y-auto">
              {items.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center h-full text-center"
                  role="status"
                >
                  <ShoppingBag
                    className="w-16 h-16 mb-4 text-gray-300"
                    aria-hidden="true"
                  />
                  <h3 className="mb-2 text-lg font-medium text-gray-900">
                    Tu carrito está vacío
                  </h3>
                  <p className="mb-6 text-gray-500">
                    Añade algunos productos para empezar
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 text-white transition-colors bg-black rounded-lg hover:bg-gray-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                  >
                    Seguir comprando
                  </button>
                </div>
              ) : (
                <div
                  className="space-y-4"
                  role="list"
                  aria-label="Productos en el carrito"
                >
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex gap-4 p-4 border border-gray-100 rounded-lg"
                      role="listitem"
                    >
                      {/* Imagen */}
                      <div
                        className="flex-shrink-0 w-16 h-16 overflow-hidden bg-gray-100 rounded-lg"
                        role="img"
                        aria-label={`Imagen de ${item.titulo}`}
                      >
                        <img
                          src={item.imagen}
                          alt=""
                          className="object-cover w-full h-full"
                          aria-hidden="true"
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
                              disabled={item.quantity <= 1}
                              className={`p-1 rounded transition focus:outline-none focus:ring-2 focus:ring-black ${
                                item.quantity <= 1
                                  ? "text-gray-300 cursor-not-allowed"
                                  : "hover:bg-gray-100 cursor-pointer text-gray-700"
                              }`}
                              aria-label={`Disminuir cantidad de ${item.titulo}`}
                            >
                              <Minus className="w-3 h-3" aria-hidden="true" />
                            </button>
                            <span
                              className="px-2 text-sm font-medium min-w-[2rem] text-center"
                              aria-label={`Cantidad: ${item.quantity}`}
                            >
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              disabled={item.quantity >= item.maxStock}
                              className={`p-1 rounded transition focus:outline-none focus:ring-2 focus:ring-black ${
                                item.quantity >= item.maxStock
                                  ? "text-gray-300 cursor-not-allowed"
                                  : "hover:bg-gray-100 cursor-pointer text-gray-700"
                              }`}
                              aria-label={`Aumentar cantidad de ${item.titulo}`}
                            >
                              <Plus className="w-3 h-3" aria-hidden="true" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-red-500 hover:text-red-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                            aria-label={`Eliminar ${item.titulo} del carrito`}
                          >
                            Eliminar
                          </button>
                        </div>

                        {/* Aviso de stock limitado */}
                        {item.quantity >= item.maxStock &&
                          item.maxStock < 99 && (
                            <p
                              className="mt-1 text-xs text-orange-600 font-medium"
                              role="status"
                              aria-live="polite"
                            >
                              Máximo disponible alcanzado
                            </p>
                          )}
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
                      className="w-full py-2 text-sm text-center text-gray-500 transition-colors hover:text-red-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                      aria-label="Vaciar todo el carrito de compras"
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
                {!freeShipping && subtotal < 50 && (
                  <div
                    className="flex items-center gap-2 p-3 rounded-lg bg-blue-50"
                    role="status"
                    aria-live="polite"
                  >
                    <Truck
                      className="w-4 h-4 text-blue-600"
                      aria-hidden="true"
                    />
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

                {(freeShipping || subtotal >= 50) && (
                  <div
                    className="flex items-center gap-2 p-3 rounded-lg bg-green-50"
                    role="status"
                    aria-live="polite"
                  >
                    <Truck
                      className="w-4 h-4 text-green-600"
                      aria-hidden="true"
                    />
                    <p className="text-sm text-green-600">
                      ¡Envío gratis {freeShipping ? "con cupón" : "incluido"}!
                    </p>
                  </div>
                )}

                {/* Input de cupón */}
                <CouponInput
                  onApply={handleApplyCoupon}
                  appliedCoupon={appliedCoupon}
                  onRemove={handleRemoveCoupon}
                />

                {/* Totales */}
                <div
                  className="space-y-2"
                  role="region"
                  aria-label="Resumen del carrito"
                >
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>
                      {subtotal.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Descuento</span>
                      <span>
                        -
                        {discountAmount.toLocaleString("es-ES", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </span>
                    </div>
                  )}

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
                  className="w-full py-3 font-medium text-white transition-colors bg-black rounded-lg hover:bg-gray-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                  aria-label={`Finalizar compra de ${itemCount} productos por ${total.toLocaleString(
                    "es-ES",
                    { style: "currency", currency: "EUR" }
                  )}`}
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
