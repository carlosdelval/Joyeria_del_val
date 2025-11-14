import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Componente de animación "fly to cart/wishlist"
 * Anima una imagen del producto desde su posición original hacia el icono objetivo
 */
const FlyToAnimation = ({ items, onComplete }) => {
  return (
    <AnimatePresence>
      {items.map((item) => (
        <FlyingItem key={item.id} item={item} onComplete={onComplete} />
      ))}
    </AnimatePresence>
  );
};

const FlyingItem = ({ item, onComplete }) => {
  const [startPos, setStartPos] = useState(null);
  const [endPos, setEndPos] = useState(null);

  useEffect(() => {
    // Obtener posición inicial (elemento clickeado)
    if (item.startElement) {
      const rect = item.startElement.getBoundingClientRect();
      setStartPos({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        width: rect.width,
        height: rect.height,
      });
    }

    // Obtener posición final (icono en navbar)
    const targetIcon = document.querySelector(
      item.type === "cart" ? "[data-cart-icon]" : "[data-wishlist-icon]"
    );

    if (targetIcon) {
      const rect = targetIcon.getBoundingClientRect();
      setEndPos({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
  }, [item]);

  if (!startPos || !endPos) return null;

  const deltaX = endPos.x - startPos.x;
  const deltaY = endPos.y - startPos.y;

  return (
    <motion.div
      initial={{
        position: "fixed",
        left: startPos.x - startPos.width / 2,
        top: startPos.y - startPos.height / 2,
        width: startPos.width,
        height: startPos.height,
        opacity: 1,
        scale: 1,
        zIndex: 9999,
      }}
      animate={{
        x: deltaX,
        y: deltaY,
        scale: 0.2,
        opacity: 0.8,
      }}
      exit={{
        opacity: 0,
        scale: 0,
      }}
      transition={{
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96], // Bezier curve suave
        opacity: { duration: 0.3, delay: 0.5 },
      }}
      onAnimationComplete={() => {
        onComplete(item.id);
      }}
      style={{
        pointerEvents: "none",
      }}
    >
      <div className="w-full h-full overflow-hidden rounded-lg shadow-2xl bg-white border-2 border-gray-200">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
  );
};

export default FlyToAnimation;
