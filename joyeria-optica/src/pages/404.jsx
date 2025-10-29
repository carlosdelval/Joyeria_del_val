import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Home,
  ArrowLeft,
  Package,
  Glasses,
  Gem,
  Watch,
  ArrowRight,
} from "lucide-react";
import SEO from "../components/SEO";
import { PageSpinner } from "../components/Spinner";

export default function NotFound() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevenir scroll automático del navegador
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Scroll al inicio inmediatamente
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const timer = setTimeout(() => {
      setIsLoading(false);
      // Asegurar scroll después de cargar
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 500);

    return () => {
      clearTimeout(timer);
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  const handleGoHome = () => {
    window.scrollTo(0, 0);
    navigate("/");
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const quickLinks = [
    {
      icon: Gem,
      title: "Joyería",
      description: "Explora nuestra colección",
      path: "/joyeria",
    },
    {
      icon: Watch,
      title: "Relojes",
      description: "Descubre marcas premium",
      path: "/relojes",
    },
    {
      icon: Glasses,
      title: "Gafas",
      description: "Encuentra tu estilo",
      path: "/optica",
    },
    {
      icon: Package,
      title: "Catálogo",
      description: "Ver todos los productos",
      path: "/catalogo",
    },
  ];

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <>
      <SEO
        title="Página No Encontrada - Óptica del Val Joyeros"
        description="La página que buscas no existe. Explora nuestro catálogo de joyería, relojes y gafas."
        keywords="404, página no encontrada, error"
      />

      <div className="min-h-screen bg-white">
        <div className="container px-4 py-12 mx-auto sm:py-16 md:py-24">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Animated 404 Number */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mb-12"
            >
              <h1 className="text-[10rem] sm:text-[12rem] md:text-[16rem] font-light text-black leading-none tracking-tighter">
                404
              </h1>
            </motion.div>

            {/* Main Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-16"
            >
              <h2 className="mb-6 text-3xl font-light tracking-wide text-black sm:text-4xl md:text-5xl">
                Página No Encontrada
              </h2>
              <div className="flex justify-center mb-6">
                <div className="w-24 h-px bg-black"></div>
              </div>
              <p className="max-w-2xl mx-auto text-base font-light leading-relaxed text-gray-600 sm:text-lg">
                Lo sentimos, la página que buscas no existe o ha sido movida.
                <br />
                Te invitamos a explorar nuestras colecciones.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col justify-center gap-4 mb-24 sm:flex-row sm:gap-6"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoHome}
                className="flex items-center justify-center gap-3 px-10 py-4 text-base font-light tracking-wide text-white transition-all duration-300 bg-black border-2 border-black hover:bg-gray-900"
              >
                <Home className="w-5 h-5" />
                Ir al Inicio
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoBack}
                className="flex items-center justify-center gap-3 px-10 py-4 text-base font-light tracking-wide text-black transition-all duration-300 bg-white border-2 border-black hover:bg-gray-50"
              >
                <ArrowLeft className="w-5 h-5" />
                Volver Atrás
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Quick Links Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="mb-12 text-center">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="w-12 h-px bg-gray-300"></div>
                <h3 className="text-xl font-light tracking-widest text-black uppercase sm:text-2xl">
                  Explora
                </h3>
                <div className="w-12 h-px bg-gray-300"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  whileHover={{ y: -8 }}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(link.path);
                  }}
                  className="relative overflow-hidden transition-all duration-300 bg-white border-2 border-gray-200 cursor-pointer group hover:border-black"
                >
                  <div className="p-8">
                    {/* Icon */}
                    <div className="flex items-center justify-center w-12 h-12 mb-6 text-white transition-all duration-300 bg-black group-hover:scale-110">
                      <link.icon className="w-6 h-6" />
                    </div>

                    {/* Content */}
                    <h4 className="mb-3 text-lg font-light tracking-wide text-black uppercase">
                      {link.title}
                    </h4>
                    <p className="text-sm font-light text-gray-600">
                      {link.description}
                    </p>

                    {/* Arrow Icon */}
                    <div className="absolute transition-all duration-300 transform translate-x-0 opacity-0 bottom-8 right-8 group-hover:opacity-100 group-hover:translate-x-2">
                      <ArrowRight className="w-5 h-5 text-black" />
                    </div>
                  </div>

                  {/* Hover Line Effect */}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Help Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="max-w-2xl mx-auto mt-20 text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-px bg-gray-300"></div>
            </div>
            <p className="text-sm font-light tracking-wide text-gray-500">
              ¿Necesitas ayuda?{" "}
              <a
                href="/contacto"
                className="ml-1 text-black underline transition-colors hover:text-gray-700"
              >
                Contáctanos
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
