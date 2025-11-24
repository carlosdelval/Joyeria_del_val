import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cookie, Check, X } from "lucide-react";
import Cookies from "js-cookie";

export default function CookieSettings() {
  const [preferences, setPreferences] = useState({
    necessary: true, // Siempre activadas
    functional: false,
    analytics: false,
    marketing: false,
  });
  const [saved, setSaved] = useState(false);

  // Cargar preferencias actuales
  useEffect(() => {
    const savedPreferences = Cookies.get("cookie-preferences");
    if (savedPreferences) {
      try {
        const prefs = JSON.parse(savedPreferences);
        setPreferences(prefs);
      } catch (error) {
        console.error("Error loading cookie preferences:", error);
      }
    }
  }, []);

  const handleToggle = (key) => {
    if (key === "necessary") return; // No se puede desactivar
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const savePreferences = () => {
    // Guardar preferencias
    Cookies.set("cookie-preferences", JSON.stringify(preferences), {
      expires: 365,
      sameSite: "Lax",
      secure: window.location.protocol === "https:",
    });

    // Actualizar consentimiento
    const hasAcceptedAll =
      preferences.functional && preferences.analytics && preferences.marketing;
    const hasAcceptedSome =
      preferences.functional || preferences.analytics || preferences.marketing;

    Cookies.set(
      "cookie-consent",
      hasAcceptedAll
        ? "accepted"
        : hasAcceptedSome
        ? "partial"
        : "necessary-only",
      {
        expires: 365,
        sameSite: "Lax",
        secure: window.location.protocol === "https:",
      }
    );

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    Cookies.set("cookie-preferences", JSON.stringify(allAccepted), {
      expires: 365,
      sameSite: "Lax",
      secure: window.location.protocol === "https:",
    });
    Cookies.set("cookie-consent", "accepted", {
      expires: 365,
      sameSite: "Lax",
      secure: window.location.protocol === "https:",
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const rejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setPreferences(onlyNecessary);
    Cookies.set("cookie-preferences", JSON.stringify(onlyNecessary), {
      expires: 365,
      sameSite: "Lax",
      secure: window.location.protocol === "https:",
    });
    Cookies.set("cookie-consent", "necessary-only", {
      expires: 365,
      sameSite: "Lax",
      secure: window.location.protocol === "https:",
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const cookieTypes = [
    {
      key: "necessary",
      title: "Cookies necesarias",
      description:
        "Esenciales para el funcionamiento del sitio web. No se pueden desactivar.",
      icon: Cookie,
      color: "text-black",
      locked: true,
    },
    {
      key: "functional",
      title: "Cookies funcionales",
      description:
        "Permiten guardar tus preferencias como favoritos, idioma y tema.",
      icon: Cookie,
      color: "text-black",
      locked: false,
    },
    {
      key: "analytics",
      title: "Cookies analíticas",
      description:
        "Nos ayudan a entender cómo usas nuestro sitio para mejorarlo.",
      icon: Cookie,
      color: "text-black",
      locked: false,
    },
    {
      key: "marketing",
      title: "Cookies de marketing",
      description:
        "Utilizadas para mostrar anuncios relevantes y medir campañas.",
      icon: Cookie,
      color: "text-black",
      locked: false,
    },
  ];

  return (
    <div className="bg-white border border-gray-200 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-black p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white flex items-center justify-center">
            <Cookie className="w-6 h-6 text-black" />
          </div>
          <div>
            <h3 className="text-xl font-light tracking-wider text-white uppercase">
              Gestión de Cookies
            </h3>
            <p className="text-gray-300 text-sm font-light">
              Personaliza tus preferencias de privacidad
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        {cookieTypes.map((cookie) => {
          const Icon = cookie.icon;
          const isEnabled = preferences[cookie.key];

          return (
            <div
              key={cookie.key}
              className="flex items-start gap-4 p-4 bg-gray-50 border border-gray-200"
            >
              <div
                className={`flex-shrink-0 w-10 h-10 bg-gray-100 flex items-center justify-center`}
              >
                <Icon className={`w-5 h-5 ${cookie.color}`} />
              </div>

              <div className="flex-1">
                <h4 className="font-medium text-black mb-1 tracking-wide">
                  {cookie.title}
                </h4>
                <p className="text-sm text-gray-600 font-light">
                  {cookie.description}
                </p>
              </div>

              <button
                onClick={() => handleToggle(cookie.key)}
                disabled={cookie.locked}
                className={`flex-shrink-0 relative w-14 h-8 transition-colors ${
                  isEnabled ? "bg-black" : "bg-gray-300"
                } ${
                  cookie.locked
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <motion.div
                  animate={{ x: isEnabled ? 24 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-6 h-6 bg-white shadow-md flex items-center justify-center"
                >
                  {isEnabled ? (
                    <Check className="w-4 h-4 text-black" />
                  ) : (
                    <X className="w-4 h-4 text-gray-400" />
                  )}
                </motion.div>
              </button>
            </div>
          );
        })}

        {/* Mensaje de guardado */}
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-50 border border-green-200"
          >
            <div className="flex items-center gap-2 text-green-800">
              <Check className="w-5 h-5" />
              <span className="font-medium">
                Preferencias guardadas correctamente
              </span>
            </div>
          </motion.div>
        )}

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={savePreferences}
            className="flex-1 bg-black hover:bg-gray-800 text-white font-light tracking-wider px-6 py-3 transition-all duration-300 uppercase text-sm"
          >
            Guardar preferencias
          </button>

          <button
            onClick={acceptAll}
            className="flex-1 bg-white hover:bg-gray-50 text-black font-light tracking-wider px-6 py-3 transition-all duration-300 border border-gray-300 uppercase text-sm"
          >
            Aceptar todas
          </button>

          <button
            onClick={rejectAll}
            className="sm:flex-initial bg-transparent hover:bg-gray-50 text-gray-600 font-light px-6 py-3 transition-all duration-300 border border-gray-200 text-sm"
          >
            Solo necesarias
          </button>
        </div>

        {/* Info adicional */}
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200">
          <p className="text-sm text-gray-600 font-light">
            <strong className="text-black font-medium">Nota:</strong> Las
            cookies funcionales permiten que tu carrito de compras y favoritos
            se mantengan durante más tiempo. Si las desactivas, solo se
            guardarán en tu sesión actual.
          </p>
        </div>
      </div>
    </div>
  );
}
