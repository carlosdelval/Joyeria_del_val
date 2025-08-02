// src/api/productos.js

// Función para cargar los datos (compatible con producción y desarrollo)
async function loadProductosData() {
  try {
    // Ruta relativa desde la raíz del hosting
    const response = await fetch('/data/productos.json');
    
    if (!response.ok) {
      throw new Error(`Error HTTP! estado: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Validación crítica de estructura
    if (!Array.isArray(data)) {
      console.error('Los datos no son un array válido:', data);
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Error cargando productos:', error);
    return []; // Retorna array vacío como fallback
  }
}

// Versión optimizada de fetchProductos
export async function fetchProductos({ categoria = [], busqueda = "", ...filtros }) {
  const productosData = await loadProductosData();
  
  return productosData.filter((producto) => {
    // Validación de propiedades para evitar errores
    if (!producto?.categorias || !producto?.etiquetas) return false;

    // 1. Filtro por categoría
    if (categoria.length > 0) {
      const categoriaValida = categoria.some(
        cat => producto.categorias?.includes(cat) ?? false
      );
      if (!categoriaValida) return false;
    }

    // 2. Filtro por precio (con valores por defecto seguros)
    const precio = Number(producto.precio) || 0;
    const precioMin = Number(filtros.precioMin) || 0;
    const precioMax = Number(filtros.precioMax) || Infinity;
    
    if (precio < precioMin || precio > precioMax) return false;

    // 3. Filtros dinámicos
    for (const [clave, valor] of Object.entries(filtros)) {
      if (['precioMin', 'precioMax'].includes(clave)) continue;

      if (valor === true) {
        const etiquetaValida = producto.etiquetas?.includes(clave) ?? false;
        const categoriaValida = producto.categorias?.includes(clave) ?? false;
        if (!etiquetaValida && !categoriaValida) return false;
      }

      if (Array.isArray(valor)) {
        const coincide = valor.some(
          val => (producto.etiquetas?.includes(val) || producto.categorias?.includes(val)) ?? false
        );
        if (!coincide) return false;
      }
    }

    // 4. Búsqueda por texto (con validación)
    if (busqueda.trim()) {
      const textoBusqueda = busqueda.toLowerCase();
      const propiedadesTexto = [
        producto.titulo?.toLowerCase(),
        producto.descripcion?.toLowerCase(),
        producto.slug?.toLowerCase(),
        ...(producto.categorias?.map(c => c.toLowerCase()) || []),
        ...(producto.etiquetas?.map(e => e.toLowerCase()) || [])
      ].filter(Boolean);

      if (!propiedadesTexto.some(texto => texto.includes(textoBusqueda))) {
        return false;
      }
    }

    return true;
  });
}

// Versión segura de fetchProducto
export const fetchProducto = async (slug) => {
  try {
    if (!slug) throw new Error('Slug no proporcionado');
    
    await new Promise(resolve => setTimeout(resolve, 300)); // Simular latencia
    
    const productos = await fetchProductos({});
    const producto = productos.find(p => p.slug === slug);
    
    if (!producto) throw new Error('Producto no encontrado');
    return producto;
  } catch (error) {
    console.error('Error en fetchProducto:', error);
    throw error;
  }
};