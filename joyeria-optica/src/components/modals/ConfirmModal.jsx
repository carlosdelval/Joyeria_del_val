import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Info, AlertCircle } from "lucide-react";
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

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const typeStyles = {
    warning: {
      icon: <AlertCircle className="w-10 h-10" />,
    },
    danger: {
      icon: <AlertCircle className="w-10 h-10" />,
    },
    info: {
      icon: <MessageCircle className="w-10 h-10" />,
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
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="relative w-full max-w-md bg-white border-2 border-black shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-modal-title"
            aria-describedby="confirm-modal-description"
          >
            {/* Línea decorativa superior */}
            <div className="h-1 bg-black" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="cursor-pointer absolute p-2 transition-all duration-300 top-4 right-4 hover:bg-gray-100 group"
              aria-label="Cerrar modal"
            >
              <X
                className="w-5 h-5 text-gray-600 transition-colors group-hover:text-black"
                aria-hidden="true"
              />
            </button>

            {/* Content */}
            <div className="px-8 py-10">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="flex items-center justify-center w-20 h-20 text-white bg-black">
                  {currentStyle.icon}
                </div>
              </div>

              {/* Title */}
              <div className="mb-6 text-center">
                <h3
                  id="confirm-modal-title"
                  className="mb-3 text-2xl font-light tracking-wide text-black uppercase"
                >
                  {title}
                </h3>

                {/* Decorative line */}
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-8 h-px bg-gray-300" />
                  <div className="w-1.5 h-1.5 bg-black" />
                  <div className="w-8 h-px bg-gray-300" />
                </div>

                {message && (
                  <p
                    id="confirm-modal-description"
                    className="text-sm font-light leading-relaxed text-gray-600"
                  >
                    {message}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={handleConfirm}
                  className="cursor-pointer relative flex-1 px-6 py-4 overflow-hidden text-sm font-light tracking-wide text-white uppercase transition-all duration-300 bg-black border-2 border-black group hover:bg-gray-900"
                  autoFocus
                >
                  {/* Efecto hover */}
                  <span className="absolute inset-0 transition-transform duration-500 transform bg-white scale-x-0 group-hover:scale-x-100 origin-left" />
                  <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
                    {confirmText}
                  </span>
                </button>

                <button
                  onClick={onClose}
                  className="cursor-pointer relative flex-1 px-6 py-4 overflow-hidden text-sm font-light tracking-wide text-black uppercase transition-all duration-300 bg-white border-2 border-black group hover:bg-gray-100"
                >
                  <span className="relative z-10">{cancelText}</span>
                </button>
              </div>
            </div>

            {/* Línea decorativa inferior */}
            <div className="h-0.5 bg-gray-200" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
