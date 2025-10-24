import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, X, Check, AlertCircle } from "lucide-react";

const CouponInput = ({
  onApply,
  appliedCoupon,
  onRemove,
  disabled = false,
}) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code.trim()) {
      setError("Introduce un código de cupón");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await onApply(code.toUpperCase());

      if (result.valid) {
        setSuccess("¡Cupón aplicado correctamente!");
        setCode("");
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError(err.message || "Cupón no válido");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setCode("");
    setError("");
    setSuccess("");
    onRemove();
  };

  if (appliedCoupon) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-3 bg-green-50 border border-green-200 rounded-lg"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-green-100 rounded-full">
              <Tag className="w-4 h-4 text-green-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-900">
                Cupón aplicado: {appliedCoupon.code}
              </p>
              {appliedCoupon.description && (
                <p className="text-xs text-green-700">
                  {appliedCoupon.description}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="p-1 text-green-700 hover:bg-green-100 rounded-full transition-colors"
            title="Eliminar cupón"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setError("");
            }}
            placeholder="Código de cupón"
            disabled={disabled || loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed uppercase"
          />
          <Tag className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        <button
          type="submit"
          disabled={disabled || loading || !code.trim()}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "Aplicar"
          )}
        </button>
      </form>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700"
          >
            <Check className="w-4 h-4 flex-shrink-0" />
            <span>{success}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sugerencias de cupones disponibles (solo en desarrollo) */}
      {import.meta.env.DEV && (
        <div className="text-xs text-gray-500 space-y-1">
          <p className="font-medium">Cupones de prueba:</p>
          <ul className="space-y-0.5 pl-3">
            <li>
              • <code className="bg-gray-100 px-1 rounded">BIENVENIDA10</code> -
              10% descuento
            </li>
            <li>
              • <code className="bg-gray-100 px-1 rounded">VERANO20</code> - 20%
              en +50€
            </li>
            <li>
              • <code className="bg-gray-100 px-1 rounded">ENVIOGRATIS</code> -
              Envío gratis +30€
            </li>
            <li>
              • <code className="bg-gray-100 px-1 rounded">5EUROS</code> - 5€ en
              +25€
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CouponInput;
