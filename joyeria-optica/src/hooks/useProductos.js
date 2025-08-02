// useProductos.js
import { useEffect, useState } from "react";
import { fetchProductos } from "../api/productos";

export function useProductos(
  { categoria = [], busqueda = "", ...filtros },
  dependencia = ""
) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProductos = async () => {
      try {
        setLoading(true);
        const data = await fetchProductos({ categoria, busqueda, ...filtros });
        setProductos(data);
      } catch (error) {
        console.error("Error loading productos:", error);
        setProductos([]);
      } finally {
        setLoading(false);
      }
    };

    loadProductos();
  }, [JSON.stringify({ categoria, busqueda, ...filtros }), dependencia]);

  return { productos, loading };
}
