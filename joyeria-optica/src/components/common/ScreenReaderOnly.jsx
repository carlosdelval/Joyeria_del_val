/**
 * Componente para texto solo visible para lectores de pantalla
 * Útil para proporcionar contexto adicional a usuarios con discapacidad visual
 */
const ScreenReaderOnly = ({ children, as: Component = "span" }) => {
  return <Component className="sr-only">{children}</Component>;
};

export default ScreenReaderOnly;
