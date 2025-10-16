// src/api/productos.js

// Función para cargar los datos (compatible con producción y desarrollo)
async function loadProductosData() {
  try {
    // Ruta relativa desde la raíz del hosting
    const response = await fetch("/data/productos.json");

    if (!response.ok) {
      throw new Error(`Error HTTP! estado: ${response.status}`);
    }

    const data = await response.json();

    // Validación crítica de estructura
    if (!Array.isArray(data)) {
      console.error("Los datos no son un array válido:", data);
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error cargando productos:", error);
    return []; // Retorna array vacío como fallback
  }
}

// Función para normalizar datos del producto al formato esperado por los filtros
function normalizeProduct(producto) {
  // Mapear la estructura existente a la esperada por el sistema de filtros
  const normalized = {
    ...producto,
    nombre: producto.titulo || producto.nombre,
    categoria: extractCategoryFromCategories(producto.categorias),
    material: extractMaterialFromTags(producto.etiquetas, producto.categorias),
    genero: extractGeneroFromTags(producto.etiquetas),
    estilo: extractEstiloFromTags(producto.etiquetas),
    tipo: extractTipoFromCategories(producto.categorias),
    marca: extractMarcaFromTags(producto.etiquetas),
    stock: producto.stock || Math.floor(Math.random() * 15) + 1, // Simular stock
    novedad: isNovedad(producto),
    oferta: hasOferta(producto),
  };

  return normalized;
}

// Funciones auxiliares para extraer información de las etiquetas y categorías existentes
function extractCategoryFromCategories(categorias) {
  if (!categorias || !Array.isArray(categorias)) return null;

  const mainCategories = [
    "anillos",
    "pendientes",
    "pulseras",
    "colgantes",
    "gafas",
    "relojes",
  ];
  return (
    mainCategories.find((cat) => categorias.includes(cat)) || categorias[0]
  );
}

function extractMaterialFromTags(etiquetas, categorias) {
  if (!etiquetas || !Array.isArray(etiquetas)) return null;

  const materialMap = {
    oro: "oro-18k",
    "18k": "oro-18k",
    "oro 18k": "oro-18k",
    plata: "plata-925",
    "plata 925": "plata-925",
    acero: "acero-inox",
    cuero: "cuero",
    metal: "metal",
  };

  for (const tag of etiquetas) {
    const material = materialMap[tag.toLowerCase()];
    if (material) return material;
  }

  // Fallback basado en categorías
  if (categorias?.includes("oro")) return "oro-18k";
  if (categorias?.includes("plata 925")) return "plata-925";

  return null;
}

function extractGeneroFromTags(etiquetas) {
  if (!etiquetas || !Array.isArray(etiquetas)) return "unisex";

  const generoMap = {
    mujer: "mujer",
    hombre: "hombre",
    niño: "infantil",
    niña: "infantil",
    niños: "infantil",
  };

  for (const tag of etiquetas) {
    const genero = generoMap[tag.toLowerCase()];
    if (genero) return genero;
  }

  return "unisex";
}

function extractEstiloFromTags(etiquetas) {
  if (!etiquetas || !Array.isArray(etiquetas)) return null;

  const estiloMap = {
    clásicas: "clasico",
    elegante: "elegante",
    elegantes: "elegante",
    minimalista: "minimalista",
    retro: "vintage",
    deportivo: "deportivo",
    deportivas: "deportivo",
  };

  for (const tag of etiquetas) {
    const estilo = estiloMap[tag.toLowerCase()];
    if (estilo) return estilo;
  }

  return "clasico";
}

function extractTipoFromCategories(categorias) {
  if (!categorias || !Array.isArray(categorias)) return null;

  const tipoMap = {
    compromiso: "compromiso",
    bodas: "bodas",
    sol: "sol",
    vista: "graduadas",
    digital: "digital",
    analógico: "analogico",
    inteligente: "smartwatch",
  };

  for (const cat of categorias) {
    const tipo = tipoMap[cat.toLowerCase()];
    if (tipo) return tipo;
  }

  return null;
}

function extractMarcaFromTags(etiquetas) {
  if (!etiquetas || !Array.isArray(etiquetas)) return null;

  const marcas = [
    "ray-ban",
    "oakley",
    "tous",
    "casio",
    "fossil",
    "seiko",
    "garmin",
  ];

  for (const tag of etiquetas) {
    const marca = marcas.find((m) => tag.toLowerCase().includes(m));
    if (marca) return marca;
  }

  return null;
}

function isNovedad() {
  // Considerar novedad si es reciente o tiene precio anterior (oferta)
  return Math.random() > 0.7; // Simular algunos productos como novedad
}

function hasOferta(producto) {
  return producto.precioAnterior && producto.precioAnterior > producto.precio;
}

// Versión optimizada de fetchProductos
export async function fetchProductos({
  categoria = [],
  busqueda = "",
  ...filtros
}) {
  const productosData = await loadProductosData();

  // Normalizar todos los productos al formato esperado
  const normalizedProducts = productosData.map(normalizeProduct);

  return normalizedProducts.filter((producto) => {
    // Validación de propiedades para evitar errores
    if (!producto) return false;

    // 1. Filtro por categoría
    if (categoria.length > 0) {
      const categoriaValida = categoria.some(
        (cat) =>
          producto.categoria === cat || producto.categorias?.includes(cat)
      );
      if (!categoriaValida) return false;
    }

    // 2. Filtro por precio (con valores por defecto seguros)
    const precio = Number(producto.precio) || 0;
    const precioMin = Number(filtros.precioMin) || 0;
    const precioMax = Number(filtros.precioMax) || Infinity;

    if (precio < precioMin || precio > precioMax) return false;

    // 3. Filtros específicos (usando la nueva estructura normalizada)
    for (const [clave, valor] of Object.entries(filtros)) {
      if (["precioMin", "precioMax"].includes(clave)) continue;

      if (valor === true) {
        if (!producto[clave]) return false;
      }

      if (Array.isArray(valor) && valor.length > 0) {
        if (!valor.includes(producto[clave])) return false;
      }

      if (
        (typeof valor === "object" && valor.min !== undefined) ||
        valor.max !== undefined
      ) {
        const productValue = Number(producto[clave]) || 0;
        if (valor.min && productValue < valor.min) return false;
        if (valor.max && productValue > valor.max) return false;
      }
    }

    // 4. Búsqueda por texto (con validación)
    if (busqueda.trim()) {
      const textoBusqueda = busqueda.toLowerCase();
      const propiedadesTexto = [
        producto.nombre?.toLowerCase(),
        producto.titulo?.toLowerCase(),
        producto.descripcion?.toLowerCase(),
        producto.slug?.toLowerCase(),
        producto.marca?.toLowerCase(),
        producto.material?.toLowerCase(),
        ...(producto.categorias?.map((c) => c.toLowerCase()) || []),
        ...(producto.etiquetas?.map((e) => e.toLowerCase()) || []),
      ].filter(Boolean);

      if (!propiedadesTexto.some((texto) => texto.includes(textoBusqueda))) {
        return false;
      }
    }

    return true;
  });
}

// Versión segura de fetchProducto
export const fetchProducto = async (slug) => {
  try {
    if (!slug) throw new Error("Slug no proporcionado");

    await new Promise((resolve) => setTimeout(resolve, 300)); // Simular latencia

    const productos = await fetchProductos({});
    const producto = productos.find((p) => p.slug === slug);

    if (!producto) throw new Error("Producto no encontrado");
    return producto;
  } catch (error) {
    console.error("Error en fetchProducto:", error);
    throw error;
  }
};
