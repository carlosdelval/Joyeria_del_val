import { motion } from "framer-motion";

/**
 * Spinner Component - Elegante y consistente con el diseño del proyecto
 *
 * @param {string} size - Tamaño del spinner: 'xs', 'sm', 'md', 'lg', 'xl'
 * @param {string} color - Color del spinner: 'black' (default), 'white', 'gray'
 * @param {boolean} fullScreen - Si debe ocupar toda la pantalla
 * @param {string} label - Texto descriptivo debajo del spinner
 * @param {string} className - Clases adicionales
 */
const Spinner = ({
  size = "md",
  color = "black",
  fullScreen = false,
  label = "",
  className = "",
}) => {
  // Configuración de tamaños
  const sizeClasses = {
    xs: "w-3 h-3 border",
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-[3px]",
    xl: "w-16 h-16 border-[3px]",
  };

  // Configuración de colores
  const colorClasses = {
    black: "border-black border-t-transparent",
    white: "border-white border-t-transparent",
    gray: "border-gray-400 border-t-transparent",
  };

  // Configuración de tamaños de label
  const labelSizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const spinnerElement = (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
    >
      <motion.div
        className={`rounded-full ${sizeClasses[size]} ${colorClasses[color]} animate-spin`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      />
      {label && (
        <motion.p
          className={`${labelSizeClasses[size]} font-light tracking-wide ${
            color === "white" ? "text-white" : "text-gray-700"
          }`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {label}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {spinnerElement}
      </motion.div>
    );
  }

  return spinnerElement;
};

/**
 * PageSpinner - Spinner para carga de páginas completas
 */
export const PageSpinner = ({ label = "Cargando..." }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Spinner size="lg" label={label} />
    </div>
  );
};

/**
 * ButtonSpinner - Spinner pequeño para botones
 */
export const ButtonSpinner = ({ color = "white", label = "" }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Spinner size="sm" color={color} />
      {label && <span>{label}</span>}
    </div>
  );
};

/**
 * OverlaySpinner - Spinner con overlay sobre contenido
 */
export const OverlaySpinner = ({ label = "Cargando...", blur = true }) => {
  return (
    <motion.div
      className={`absolute inset-0 z-40 flex items-center justify-center ${
        blur ? "bg-white/80 backdrop-blur-sm" : "bg-white/90"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Spinner size="lg" label={label} />
    </motion.div>
  );
};

/**
 * InlineSpinner - Spinner en línea con texto
 */
export const InlineSpinner = ({ label = "Cargando...", size = "sm" }) => {
  return (
    <div className="flex items-center gap-2">
      <Spinner size={size} />
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  );
};

/**
 * CardSpinner - Spinner para tarjetas de contenido
 */
export const CardSpinner = ({ label = "" }) => {
  return (
    <div className="flex items-center justify-center p-12 bg-white border border-gray-200 rounded-lg">
      <Spinner size="md" label={label} />
    </div>
  );
};

export default Spinner;
