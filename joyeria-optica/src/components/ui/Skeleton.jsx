import { motion } from "framer-motion";

/**
 * SkeletonCard - Skeleton loader para ProductoCard
 * Muestra un placeholder animado mientras cargan los productos
 */
export const SkeletonCard = ({ delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="bg-white rounded-lg shadow-sm overflow-hidden"
    >
      {/* Skeleton imagen */}
      <div className="relative bg-gray-200 rounded-t-lg aspect-square">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skeleton-shimmer" />
      </div>

      {/* Skeleton contenido */}
      <div className="p-3 space-y-3 sm:p-4">
        {/* Marca */}
        <div className="relative w-1/3 h-3 bg-gray-200 rounded overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skeleton-shimmer" />
        </div>

        {/* Título */}
        <div className="space-y-2">
          <div className="relative w-full h-4 bg-gray-200 rounded overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skeleton-shimmer" />
          </div>
          <div className="relative w-3/4 h-4 bg-gray-200 rounded overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skeleton-shimmer" />
          </div>
        </div>

        {/* Precio */}
        <div className="flex items-center gap-2 pt-2">
          <div className="relative w-20 h-6 bg-gray-200 rounded overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skeleton-shimmer" />
          </div>
          <div className="relative w-16 h-4 bg-gray-100 rounded overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skeleton-shimmer" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * SkeletonGrid - Grid de skeleton cards para catálogo
 */
export const SkeletonGrid = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(count)].map((_, index) => (
        <SkeletonCard key={index} delay={index * 0.05} />
      ))}
    </div>
  );
};

/**
 * SkeletonText - Skeleton para líneas de texto
 */
export const SkeletonText = ({
  width = "100%",
  height = "1rem",
  className = "",
}) => {
  return (
    <div
      className={`relative bg-gray-200 rounded overflow-hidden ${className}`}
      style={{ width, height }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skeleton-shimmer" />
    </div>
  );
};

/**
 * SkeletonImage - Skeleton para imágenes
 */
export const SkeletonImage = ({
  aspectRatio = "square",
  rounded = "rounded",
  className = "",
}) => {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    wide: "aspect-[16/9]",
  };

  return (
    <div
      className={`relative bg-gray-200 ${rounded} ${aspectClasses[aspectRatio]} overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skeleton-shimmer" />
    </div>
  );
};

/**
 * SkeletonTable - Skeleton para filas de tabla
 */
export const SkeletonTable = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="space-y-3">
      {[...Array(rows)].map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {[...Array(columns)].map((_, colIndex) => (
            <div
              key={colIndex}
              className="relative flex-1 h-10 bg-gray-200 rounded overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skeleton-shimmer" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

/**
 * SkeletonProfile - Skeleton para perfil de usuario
 */
export const SkeletonProfile = () => {
  return (
    <div className="flex items-center gap-4 p-4">
      {/* Avatar */}
      <div className="relative w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skeleton-shimmer" />
      </div>

      {/* Info */}
      <div className="flex-1 space-y-2">
        <div className="relative w-2/3 h-5 bg-gray-200 rounded overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skeleton-shimmer" />
        </div>
        <div className="relative w-1/2 h-4 bg-gray-100 rounded overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
