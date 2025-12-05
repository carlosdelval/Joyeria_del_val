import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop - Gestiona el scroll al cambiar de ruta
 *
 * Comportamiento:
 * - Navegación entre rutas: scroll al top ANTES del render (sin flash)
 * - Recarga de página (F5): scroll al top
 * - Navegación con botones atrás/adelante: restaura posición
 *
 * Usa useLayoutEffect para ejecutarse síncronamente antes del paint,
 * evitando que el usuario vea el scroll en conexiones lentas.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Prevenir el scroll automático del navegador en recarga
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Scroll al top ANTES del render (síncrono)
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
