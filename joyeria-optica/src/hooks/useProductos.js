// src/hooks/useProductos.js
import { useEffect, useState } from "react";
import { fetchProductos } from "../api/productos";

export function useProductos({ categoria, busqueda }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchProductos({ categoria, busqueda }).then((res) => {
      setProductos(res);
      setLoading(false);
    });
  }, [categoria, busqueda]);

  return { productos, loading };
}
