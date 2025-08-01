// src/hooks/useProductos.js
import { useEffect, useState } from "react";
import { fetchProductos } from "../api/productos";

export function useProductos({ categoria = [], busqueda = "" }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProductos = async () => {
      try {
        setLoading(true);
        const data = await fetchProductos({ categoria, busqueda });
        setProductos(data);
      } catch (error) {
        console.error("Error loading productos:", error);
        setProductos([]);
      } finally {
        setLoading(false);
      }
    };

    loadProductos();
  }, [categoria, busqueda]);

  return { productos, loading };
}