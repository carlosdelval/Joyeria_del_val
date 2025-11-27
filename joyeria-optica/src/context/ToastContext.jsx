import { createContext, useContext, useState, useCallback } from "react";
import { ToastContainer } from "../components/ui/Toast";

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(
    ({ message, type = "success", duration = 3000 }) => {
      const id = Date.now() + Math.random();
      const newToast = { id, message, type, duration };

      setToasts((prev) => [...prev, newToast]);

      return id;
    },
    []
  );

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showSuccess = useCallback(
    (message, duration) => addToast({ message, type: "success", duration }),
    [addToast]
  );

  const showError = useCallback(
    (message, duration) => addToast({ message, type: "error", duration }),
    [addToast]
  );

  const showWarning = useCallback(
    (message, duration) => addToast({ message, type: "warning", duration }),
    [addToast]
  );

  const showInfo = useCallback(
    (message, duration) => addToast({ message, type: "info", duration }),
    [addToast]
  );

  // M\u00e9todo gen\u00e9rico para mostrar toast
  const showToast = useCallback(
    (message, type = "success", duration) => {
      return addToast({ message, type, duration });
    },
    [addToast]
  );

  return (
    <ToastContext.Provider
      value={{
        addToast,
        removeToast,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        showToast,
      }}
    >
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
};
