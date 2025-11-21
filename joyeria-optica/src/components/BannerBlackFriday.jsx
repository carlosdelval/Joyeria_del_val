import { motion } from "framer-motion";
import {
  Zap,
  Tag,
  Clock,
  Sparkles,
  TrendingDown,
  ShoppingBag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

// Componente separado para partículas (no se re-renderiza con el countdown)
const FloatingParticles = () => {
  const particles = useMemo(
    () =>
      [...Array(20)].map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-red-500 rounded-full opacity-20"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
};

const BannerBlackFriday = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown hasta el 30 de noviembre 2025
  useEffect(() => {
    const targetDate = new Date("2025-11-30T23:59:59");

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  // Navegar al catálogo (solo en móvil cuando se hace clic en el banner)
  const handleBannerClick = (e) => {
    // Solo activar en móvil (< 768px) y si no se hizo clic en el botón CTA
    if (window.innerWidth < 768 && !e.target.closest("button")) {
      window.scrollTo(0, 0);
      navigate("/catalogo/black-friday");
    }
  };

  return (
    <section
      onClick={handleBannerClick}
      className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black md:cursor-default cursor-pointer"
    >
      {/* Fondo animado con rayas diagonales */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255, 255, 255, 0.1) 10px,
              rgba(255, 255, 255, 0.1) 20px
            )`,
          }}
          animate={{
            backgroundPosition: ["0px 0px", "40px 40px"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Partículas flotantes */}
      <FloatingParticles />

      <div className="container relative z-10 px-5 py-12 mx-auto sm:px-4 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge animado */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium tracking-wider text-white uppercase bg-red-600 rounded-full"
          >
            <Sparkles className="w-4 h-4" />
            Ofertas Limitadas
          </motion.div>

          {/* Título principal */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <motion.span
              animate={{
                textShadow: [
                  "0 0 20px rgba(239, 68, 68, 0.3)",
                  "0 0 40px rgba(239, 68, 68, 0.6)",
                  "0 0 20px rgba(239, 68, 68, 0.3)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              BLACK FRIDAY
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8 text-lg text-gray-300 sm:text-xl md:text-2xl"
          >
            Descuentos exclusivos en joyería, bolsos, relojes y gafas de sol
          </motion.p>

          {/* Countdown */}
          {timeLeft.days > 0 && (
            <div className="flex justify-center gap-3 mb-10 sm:gap-4 md:gap-6">
              {[
                { label: "Días", value: timeLeft.days },
                { label: "Horas", value: timeLeft.hours },
                { label: "Min", value: timeLeft.minutes },
                { label: "Seg", value: timeLeft.seconds },
              ].map((item, index) => (
                <div key={item.label} className="relative">
                  <div className="flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                    <span className="text-2xl font-bold text-red-500 sm:text-3xl md:text-4xl">
                      {String(item.value).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 gap-4 mb-10 sm:grid-cols-2 sm:gap-6"
          >
            {[
              { icon: TrendingDown, text: "Hasta 40% descuento" },
              { icon: ShoppingBag, text: "Stock limitado" },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center gap-3 px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg"
              >
                <item.icon className="w-8 h-8 text-red-500" />
                <span className="text-sm font-medium text-white sm:text-base">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.button
            onClick={() => {
              window.scrollTo(0, 0);
              navigate("/catalogo/black-friday");
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="group cursor-pointer relative px-10 py-4 text-base font-bold tracking-wider text-white uppercase transition-all duration-300 bg-red-600 rounded-full sm:px-12 sm:py-5 sm:text-lg hover:bg-red-700 overflow-hidden"
          >
            <motion.span
              className="absolute inset-0 bg-white"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 2, opacity: 0.2 }}
              transition={{ duration: 0.4 }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2">
              Ver ofertas Black Friday
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>

          {/* Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-6 text-xs text-gray-500 sm:text-sm"
          >
            *Ofertas válidas hasta el 30 de noviembre o hasta agotar existencias
          </motion.p>
        </div>
      </div>

      {/* Destellos decorativos */}
      <motion.div
        className="absolute top-1/4 left-10 w-32 h-32 bg-red-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-40 h-40 bg-red-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
    </section>
  );
};

export default BannerBlackFriday;
