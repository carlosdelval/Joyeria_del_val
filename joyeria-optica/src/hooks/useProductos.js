// useProductos.js
import { useEffect, useState } from "react";
import { fetchProductos } from "../api/productos";

export function useProductos(filtrosYParams = {}, dependencia = "") {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProductos = async () => {
      try {
        setLoading(true);
        const data = await fetchProductos(filtrosYParams);
        setProductos(data);
      } catch (error) {
        console.error("Error loading productos:", error);
        setProductos([]);
      } finally {
        setLoading(false);
      }
    };

    loadProductos();
    // Deshabilitamos la regla de dependencias porque causaba loops infinitos
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependencia]);

  return {
    productos,
    loading,
  };
}
