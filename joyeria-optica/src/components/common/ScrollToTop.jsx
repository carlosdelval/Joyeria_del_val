import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop - Gestiona el scroll al cambiar de ruta
 *
 * Comportamiento:
 * - Navegación entre rutas: scroll al top
 * - Recarga de página (F5): scroll al top
 * - Navegación con botones atrás/adelante: restaura posición
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Prevenir el scroll automático del navegador en recarga
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Scroll al top en cada cambio de ruta
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}
