import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

const VariantSelector = ({ variants = [], currentProduct, onVariantChange }) => {
  const navigate = useNavigate();

  if (!variants || variants.length <= 1) return null;

  // Extraer atributos únicos de las variantes (color, material, etc.)
  const extractVariantAttribute = (product) => {
    const title = product.titulo || product.nombre || "";
    const color = product.color || extractColorFromTitle(title);
    const material = product.material || extractMaterialFromTitle(title);
    
    return {
      id: product.id,
      slug: product.slug,
      color,
      material,
      image: product.imagenes?.[0] || "",
      precio: product.precio,
      precioAnterior: product.precioAnterior,
      stock: product.stock,
      disponible: (product.stock ?? 0) > 0,
    };
  };

  // Extraer color del título
  const extractColorFromTitle = (title) => {
    const colores = {
      negro: "Negro",
      negra: "Negro",
      black: "Negro",
      blanco: "Blanco",
      blanca: "Blanco",
      white: "Blanco",
      dorado: "Dorado",
      dorada: "Dorado",
      gold: "Dorado",
      plateado: "Plateado",
      plateada: "Plateado",
      silver: "Plateado",
      azul: "Azul",
      blue: "Azul",
      rojo: "Rojo",
      roja: "Rojo",
      red: "Rojo",
      verde: "Verde",
      green: "Verde",
      rosa: "Rosa",
      pink: "Rosa",
      amarillo: "Amarillo",
      yellow: "Amarillo",
      marrón: "Marrón",
      marron: "Marrón",
      brown: "Marrón",
      gris: "Gris",
      gray: "Gris",
      grey: "Gris",
      beige: "Beige",
    };

    const lowerTitle = title.toLowerCase();
    for (const [key, value] of Object.entries(colores)) {
      if (lowerTitle.includes(key)) {
        return value;
      }
    }
    return null;
  };

  // Extraer material del título
  const extractMaterialFromTitle = (title) => {
    const materiales = {
      "oro": "Oro",
      "gold": "Oro",
      "plata": "Plata",
      "silver": "Plata",
      "acero": "Acero",
      "steel": "Acero",
      "cuero": "Cuero",
      "leather": "Cuero",
      "titanio": "Titanio",
      "titanium": "Titanio",
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

  // Determinar qué tipo de selector mostrar (color, material, o ambos)
  const hasMultipleColors = new Set(variantOptions.map(v => v.color).filter(Boolean)).size > 1;
  const hasMultipleMaterials = new Set(variantOptions.map(v => v.material).filter(Boolean)).size > 1;

  const handleVariantClick = (variant) => {
    if (variant.slug === currentProduct.slug) return;
    
    // Navegar al producto variante
    window.scrollTo(0, 0);
    navigate(`/producto/${variant.slug}`);
    
    if (onVariantChange) {
      onVariantChange(variant);
    }
  };

  // Obtener color de fondo para cada variante
  const getColorStyle = (color) => {
    const colorMap = {
      Negro: "#000000",
      Blanco: "#FFFFFF",
      Dorado: "#FFD700",
      Plateado: "#C0C0C0",
      Azul: "#0066CC",
      Rojo: "#DC2626",
      Verde: "#059669",
      Rosa: "#EC4899",
      Amarillo: "#FBBF24",
      Marrón: "#92400E",
      Gris: "#6B7280",
      Beige: "#D4C4B0",
    };

    return colorMap[color] || "#E5E7EB";
  };

  return (
    <div className="space-y-4">
      {/* Selector de Color */}
      {hasMultipleColors && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Color
          </label>
          <div className="flex flex-wrap gap-3">
            {variantOptions
              .filter(v => v.color)
              .map((variant, index) => {
                const isSelected = variant.slug === currentProduct.slug;
                const isAvailable = variant.disponible;

                return (
                  <motion.button
                    key={`color-${variant.id}-${index}`}
                    onClick={() => handleVariantClick(variant)}
                    disabled={!isAvailable}
                    whileHover={isAvailable ? { scale: 1.05 } : {}}
                    whileTap={isAvailable ? { scale: 0.95 } : {}}
                    className={`
                      relative w-12 h-12 rounded-full border-2 transition-all
                      ${isSelected ? "border-black ring-2 ring-black ring-offset-2" : "border-gray-300"}
                      ${!isAvailable ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:border-gray-400"}
                    `}
                    style={{ backgroundColor: getColorStyle(variant.color) }}
                    aria-label={`${variant.color}${!isAvailable ? " - Agotado" : ""}`}
                    title={`${variant.color}${!isAvailable ? " - Agotado" : ""}`}
                  >
                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-400/30">
                        <Check 
                          size={20} 
                          className={variant.color === "Blanco" || variant.color === "Amarillo" || variant.color === "Beige" ? "text-gray-800" : "text-white"}
                          strokeWidth={3}
                        />
                      </div>
                    )}
                    {!isAvailable && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-0.5 bg-red-500 transform rotate-45" />
                      </div>
                    )}
                  </motion.button>
                );
              })}
          </div>
        </div>
      )}

      {/* Selector de Material */}
      {hasMultipleMaterials && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Material
          </label>
          <div className="flex flex-wrap gap-2">
            {variantOptions
              .filter(v => v.material)
              .map((variant, index) => {
                const isSelected = variant.slug === currentProduct.slug;
                const isAvailable = variant.disponible;

                return (
                  <motion.button
                    key={`material-${variant.id}-${index}`}
                    onClick={() => handleVariantClick(variant)}
                    disabled={!isAvailable}
                    whileHover={isAvailable ? { scale: 1.02 } : {}}
                    whileTap={isAvailable ? { scale: 0.98 } : {}}
                    className={`
                      px-4 py-2 rounded-md text-sm font-medium transition-all
                      ${isSelected 
                        ? "bg-black text-white border-2 border-black" 
                        : "bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400"
                      }
                      ${!isAvailable ? "opacity-40 cursor-not-allowed line-through" : "cursor-pointer"}
                    `}
                    aria-label={`${variant.material}${!isAvailable ? " - Agotado" : ""}`}
                  >
                    {variant.material}
                    {!isAvailable && " - Agotado"}
                  </motion.button>
                );
              })}
          </div>
        </div>
      )}

      {/* Selector de Imagen (si no hay color ni material identificable) */}
      {!hasMultipleColors && !hasMultipleMaterials && (
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
                    ${isSelected ? "border-black ring-2 ring-black ring-offset-2" : "border-gray-300"}
                    ${!isAvailable ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:border-gray-400"}
                  `}
                  aria-label={`Variante ${index + 1}${!isAvailable ? " - Agotado" : ""}`}
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
      )}

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
