/**
 * SkeletonProduct - Esqueleto de producto con efecto shimmer
 * Mejora la percepción de carga al mostrar un placeholder realista
 */
export default function SkeletonProduct() {
  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-md animate-pulse">
      {/* Imagen */}
      <div className="relative w-full bg-gray-200 aspect-square">
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* Contenido */}
      <div className="p-4 space-y-3">
        {/* Título */}
        <div className="h-4 bg-gray-200 rounded w-3/4">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Marca */}
        <div className="w-1/2 h-3 bg-gray-200 rounded">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Precio */}
        <div className="flex items-center gap-2">
          <div className="w-20 h-5 bg-gray-200 rounded">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          <div className="w-16 h-4 bg-gray-100 rounded">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
