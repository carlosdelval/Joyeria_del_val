// src/api/productos.js
import productosData from "../data/productos.json";

export function fetchProductos({ categoria, busqueda } = {}) {
  return new Promise((resolve) => {
    let productos = productosData;

    if (categoria) {
      productos = productos.filter((prod) =>
        prod.categorias.includes(categoria)
      );
    }

    if (busqueda) {
      const term = busqueda.toLowerCase();
      productos = productos.filter(
        (prod) =>
          prod.titulo.toLowerCase().includes(term) ||
          prod.descripcion.toLowerCase().includes(term) ||
          prod.etiquetas.some((et) => et.toLowerCase().includes(term))
      );
    }

    setTimeout(() => resolve(productos), 300); // Simula delay
  });
}
