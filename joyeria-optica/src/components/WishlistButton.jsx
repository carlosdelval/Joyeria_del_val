import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useWishlist } from "../hooks/useWishlist";

const WishlistButton = ({
  product,
  size = "md",
  showLabel = false,
  className = "",
}) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleClick = (e) => {
    e.preventDefault(); // Evitar navegación si está en un link
    e.stopPropagation();
    toggleWishlist(product);
  };

  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`
        flex items-center justify-center gap-2
        ${sizes[size]}
        rounded-full
        border-2
        transition-all duration-300
        ${
          inWishlist
            ? "bg-red-50 border-red-500 text-red-500 hover:bg-red-100"
            : "bg-white border-gray-300 text-gray-600 hover:border-red-400 hover:text-red-400"
        }
        ${className}
      `}
      title={inWishlist ? "Eliminar de favoritos" : "Añadir a favoritos"}
      aria-label={inWishlist ? "Eliminar de favoritos" : "Añadir a favoritos"}
    >
      <motion.div
        animate={inWishlist ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Heart
          className={iconSizes[size]}
          fill={inWishlist ? "currentColor" : "none"}
        />
      </motion.div>

      {showLabel && (
        <span className="text-sm font-medium">
          {inWishlist ? "Guardado" : "Guardar"}
        </span>
      )}
    </motion.button>
  );
};

export default WishlistButton;
