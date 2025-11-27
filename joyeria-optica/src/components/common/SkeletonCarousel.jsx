/**
 * SkeletonCarousel - Esqueleto para carruseles de productos
 * Muestra placeholders para productos en un carrusel
 */
export default function SkeletonCarousel({ items = 4 }) {
  return (
    <div className="flex w-full gap-4">
      {/* Sección de texto */}
      <div className="w-full md:w-1/5">
        <div className="space-y-3 animate-pulse">
          {/* Título */}
          <div className="relative w-full h-8 overflow-hidden bg-gray-200 rounded">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>
          {/* Descripción */}
          <div className="relative w-4/5 h-4 overflow-hidden bg-gray-200 rounded">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>
          <div className="relative w-full h-4 overflow-hidden bg-gray-200 rounded">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>
          {/* Botón */}
          <div className="relative w-full h-12 overflow-hidden bg-gray-200 rounded">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>
        </div>
      </div>

      {/* Carrusel */}
      <div className="grid w-full grid-cols-1 gap-4 md:w-4/5 md:grid-cols-4">
        {[...Array(items)].map((_, i) => (
          <div
            key={i}
            className="overflow-hidden bg-white rounded-lg shadow-md animate-pulse"
          >
            {/* Imagen */}
            <div className="relative w-full bg-gray-200 aspect-square">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            {/* Contenido */}
            <div className="p-4 space-y-2">
              <div className="relative w-3/4 h-4 overflow-hidden bg-gray-200 rounded">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
              <div className="relative w-1/2 h-3 overflow-hidden bg-gray-200 rounded">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
