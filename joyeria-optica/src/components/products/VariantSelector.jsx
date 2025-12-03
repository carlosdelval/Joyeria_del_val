import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

const VariantSelector = ({
  variants = [],
  currentProduct,
  onVariantChange,
}) => {
  const navigate = useNavigate();

  if (!variants || variants.length <= 1) return null;

  // Extraer atributos únicos de las variantes
  const extractVariantAttribute = (product) => {
    const title = product.titulo || product.nombre || "";
    const material = product.material || extractMaterialFromTitle(title);

    return {
      id: product.id,
      slug: product.slug,
      material,
      image: product.imagenes?.[0] || "",
      precio: product.precio,
      precioAnterior: product.precioAnterior,
      stock: product.stock,
      disponible: (product.stock ?? 0) > 0,
    };
  };

  // Extraer material del título
  const extractMaterialFromTitle = (title) => {
    const materiales = {
      oro: "Oro",
      gold: "Oro",
      plata: "Plata",
      silver: "Plata",
      acero: "Acero",
      steel: "Acero",
      cuero: "Cuero",
      leather: "Cuero",
      titanio: "Titanio",
      titanium: "Titanio",
    };

    const lowerTitle = title.toLowerCase();
    for (const [key, value] of Object.entries(materiales)) {
      if (lowerTitle.includes(key)) {
        return value;
      }
    }
    return null;
  };

  // Mapear variantes con sus atributos
  const variantOptions = variants.map(extractVariantAttribute);

  const handleVariantClick = (variant) => {
    if (variant.slug === currentProduct.slug) return;

    // Navegar al producto variante
    window.scrollTo(0, 0);
    navigate(`/producto/${variant.slug}`);

    if (onVariantChange) {
      onVariantChange(variant);
    }
  };

  return (
    <div className="space-y-4">
      {/* Selector de Imagen */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Variantes disponibles
        </label>
        <div className="flex flex-wrap gap-3">
          {variantOptions.map((variant, index) => {
            const isSelected = variant.slug === currentProduct.slug;
            const isAvailable = variant.disponible;

            return (
              <motion.button
                key={`variant-${variant.id}-${index}`}
                onClick={() => handleVariantClick(variant)}
                disabled={!isAvailable}
                whileHover={isAvailable ? { scale: 1.05 } : {}}
                whileTap={isAvailable ? { scale: 0.95 } : {}}
                className={`
                  relative w-20 h-20 rounded-lg border-2 overflow-hidden transition-all
                  ${
                    isSelected
                      ? "border-black ring-2 ring-black ring-offset-2"
                      : "border-gray-300"
                  }
                  ${
                    !isAvailable
                      ? "opacity-40 cursor-not-allowed"
                      : "cursor-pointer hover:border-gray-400"
                  }
                `}
                aria-label={`Variante ${index + 1}${
                  !isAvailable ? " - Agotado" : ""
                }`}
              >
                {variant.image && (
                  <img
                    src={variant.image}
                    alt={`Variante ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-400/30">
                    <Check size={24} className="text-white" strokeWidth={3} />
                  </div>
                )}
                {!isAvailable && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="w-full h-0.5 bg-red-500 transform rotate-45" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Información de precio de la variante seleccionada */}
      {variantOptions.length > 1 && (
        <div className="text-xs text-gray-500 mt-2">
          {variantOptions.length} variantes disponibles
        </div>
      )}
    </div>
  );
};

export default VariantSelector;
