import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { useEffect } from "react";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "¿Estás seguro?",
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  type = "warning", // warning, danger, info
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const typeStyles = {
    warning: {
      icon: <AlertTriangle className="w-6 h-6" />,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      buttonBg: "bg-yellow-600 hover:bg-yellow-700",
    },
    danger: {
      icon: <AlertTriangle className="w-6 h-6" />,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      buttonBg: "bg-red-600 hover:bg-red-700",
    },
    info: {
      icon: <AlertTriangle className="w-6 h-6" />,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      buttonBg: "bg-blue-600 hover:bg-blue-700",
    },
  };

  const currentStyle = typeStyles[type] || typeStyles.warning;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-modal-title"
            aria-describedby="confirm-modal-description"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute p-1 transition-colors rounded-full top-4 right-4 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5 text-gray-500" aria-hidden="true" />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div
                className={`p-3 rounded-full ${currentStyle.iconBg} ${currentStyle.iconColor}`}
                aria-hidden="true"
              >
                {currentStyle.icon}
              </div>
            </div>

            {/* Content */}
            <div className="text-center">
              <h3
                id="confirm-modal-title"
                className="mb-2 text-lg font-semibold text-gray-900"
              >
                {title}
              </h3>
              {message && (
                <p
                  id="confirm-modal-description"
                  className="mb-6 text-sm text-gray-600"
                >
                  {message}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row-reverse">
              <button
                onClick={handleConfirm}
                className={`flex-1 px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg ${currentStyle.buttonBg} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
                autoFocus
              >
                {confirmText}
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                {cancelText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
