// src/api/productos.js
import productosData from "../data/productos.json";

export function fetchProductos({ categoria = [], busqueda = "", ...filtros }) {
  return productosData.filter((producto) => {
    // 1. Filtro por categoría (al menos una coincidencia)
    if (
      categoria.length > 0 &&
      !categoria.some((cat) => producto.categorias.includes(cat))
    ) {
      return false;
    }

    // 2. Filtro por rango de precio
    const { precioMin = 0, precioMax = Infinity } = filtros;
    if (producto.precio < precioMin || producto.precio > precioMax) {
      return false;
    }

    // 3. Filtros dinámicos (booleanos o arrays)
    for (const [clave, valor] of Object.entries(filtros)) {
      if (clave === "precioMin" || clave === "precioMax") continue;

      if (typeof valor === "boolean" && valor === true) {
        if (
          !producto.etiquetas.includes(clave) &&
          !producto.categorias.includes(clave)
        ) {
          return false;
        }
      }

      if (Array.isArray(valor)) {
        const coincide = valor.some(
          (val) =>
            producto.etiquetas.includes(val) ||
            producto.categorias.includes(val)
        );
        if (!coincide) return false;
      }
    }

    // 4. Filtro por texto de búsqueda (en varias propiedades)
    if (busqueda.trim() !== "") {
      const busq = busqueda.toLowerCase();
      const enTexto =
        producto.titulo.toLowerCase().includes(busq) ||
        producto.descripcion.toLowerCase().includes(busq) ||
        producto.slug.toLowerCase().includes(busq) ||
        producto.categorias.some((c) => c.toLowerCase().includes(busq)) ||
        producto.etiquetas.some((e) => e.toLowerCase().includes(busq));

      if (!enTexto) return false;
    }

    // ✅ Si pasó todos los filtros
    return true;
  });
}

export const fetchProducto = async (slug) => {
  try {
    // Simulamos retardo de red
    await new Promise((resolve) => setTimeout(resolve, 300));

    // En desarrollo, busca en el JSON local
    const response = await fetchProductos({});
    const producto = response.find((p) => p.slug === slug);

    if (!producto) {
      throw new Error("Producto no encontrado");
    }

    return producto;
  } catch (error) {
    console.error("Error fetching producto:", error);
    throw error;
  }
};
