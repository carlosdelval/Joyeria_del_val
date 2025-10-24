import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Shield, Eye } from "lucide-react";
import Cookies from "js-cookie";
import { useWishlist } from "../hooks/useWishlist";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { migrateToCookies } = useWishlist();

  useEffect(() => {
    // Verificar si ya hay consentimiento
    const consent = Cookies.get("cookie-consent");
    if (!consent) {
      // Mostrar banner después de 1 segundo
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAllCookies = () => {
    Cookies.set("cookie-consent", "accepted", {
      expires: 365,
      sameSite: "Lax",
      secure: window.location.protocol === "https:",
    });
    Cookies.set(
      "cookie-preferences",
      JSON.stringify({
        necessary: true,
        functional: true,
        analytics: true,
        marketing: true,
      }),
      {
        expires: 365,
        sameSite: "Lax",
        secure: window.location.protocol === "https:",
      }
    );

    // Migrar wishlist a cookies
    migrateToCookies();

    setIsVisible(false);
  };

  const acceptNecessaryOnly = () => {
    Cookies.set("cookie-consent", "necessary-only", {
      expires: 365,
      sameSite: "Lax",
      secure: window.location.protocol === "https:",
    });
    Cookies.set(
      "cookie-preferences",
      JSON.stringify({
        necessary: true,
        functional: false,
        analytics: false,
        marketing: false,
      }),
      {
        expires: 365,
        sameSite: "Lax",
        secure: window.location.protocol === "https:",
      }
    );

    setIsVisible(false);
  };

  const rejectAll = () => {
    Cookies.set("cookie-consent", "rejected", {
      expires: 365,
      sameSite: "Lax",
      secure: window.location.protocol === "https:",
    });
    Cookies.set(
      "cookie-preferences",
      JSON.stringify({
        necessary: true,
        functional: false,
        analytics: false,
        marketing: false,
      }),
      {
        expires: 365,
        sameSite: "Lax",
        secure: window.location.protocol === "https:",
      }
    );

    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-white border border-gray-200 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-black flex items-center justify-center">
                    <Cookie className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-light tracking-wider text-black mb-2 uppercase">
                      Política de Cookies
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed font-light">
                      Utilizamos cookies propias y de terceros para mejorar tu
                      experiencia de navegación, analizar el tráfico del sitio y
                      personalizar el contenido. Tus favoritos se guardarán de
                      forma segura durante todo el año.
                    </p>

                    {/* Botón para ver detalles */}
                    <button
                      onClick={() => setShowDetails(!showDetails)}
                      className="mt-3 text-sm font-light text-black hover:text-gray-600 transition-colors flex items-center gap-2 border-b border-black hover:border-gray-600"
                    >
                      <Eye className="w-4 h-4" />
                      {showDetails ? "Ocultar detalles" : "Ver detalles"}
                    </button>

                    {/* Detalles de cookies */}
                    <AnimatePresence>
                      {showDetails && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 space-y-3 overflow-hidden"
                        >
                          <div className="p-4 bg-gray-50 border border-gray-100">
                            <div className="flex items-start gap-3 mb-3 pb-3 border-b border-gray-200">
                              <Shield className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-medium text-black text-sm mb-1 tracking-wide">
                                  Cookies necesarias
                                </h4>
                                <p className="text-xs text-gray-600 font-light">
                                  Esenciales para el funcionamiento básico del
                                  sitio, como el carrito de compras y la sesión.
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3 mb-3 pb-3 border-b border-gray-200">
                              <Cookie className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-medium text-black text-sm mb-1 tracking-wide">
                                  Cookies funcionales
                                </h4>
                                <p className="text-xs text-gray-600 font-light">
                                  Permiten guardar tus preferencias (favoritos,
                                  idioma) durante 365 días.
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3 mb-3 pb-3 border-b border-gray-200">
                              <Eye className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-medium text-black text-sm mb-1 tracking-wide">
                                  Cookies analíticas
                                </h4>
                                <p className="text-xs text-gray-600 font-light">
                                  Google Analytics y Meta Pixel para entender
                                  cómo usas nuestro sitio y mejorar tu
                                  experiencia.
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <Cookie className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-medium text-black text-sm mb-1 tracking-wide">
                                  Cookies de marketing
                                </h4>
                                <p className="text-xs text-gray-600 font-light">
                                  Permiten mostrarte anuncios personalizados y
                                  medir la efectividad de nuestras campañas.
                                </p>
                              </div>
                            </div>
                          </div>

                          <p className="text-xs text-gray-500 font-light">
                            Puedes cambiar tus preferencias en cualquier momento
                            desde la{" "}
                            <a
                              href="/privacidad"
                              className="text-black underline hover:text-gray-600"
                            >
                              Política de Privacidad
                            </a>
                            .
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    onClick={rejectAll}
                    className="flex-shrink-0 p-2 hover:bg-gray-100 transition-colors"
                    aria-label="Cerrar"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Botones de acción */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={acceptAllCookies}
                    className="flex-1 bg-black hover:bg-gray-800 text-white font-light tracking-wider px-6 py-3 transition-all duration-300 uppercase text-sm"
                  >
                    Aceptar todas
                  </button>

                  <button
                    onClick={acceptNecessaryOnly}
                    className="flex-1 bg-white hover:bg-gray-50 text-black font-light tracking-wider px-6 py-3 transition-all duration-300 border border-gray-300 uppercase text-sm"
                  >
                    Solo necesarias
                  </button>

                  <button
                    onClick={rejectAll}
                    className="sm:flex-initial bg-transparent hover:bg-gray-50 text-gray-600 font-light px-6 py-3 transition-all duration-300 border border-gray-200 text-sm"
                  >
                    Rechazar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
