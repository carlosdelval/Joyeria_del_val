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
  // Asegurar al menos 2 imágenes (Shopify requiere imágenes en array, y queremos soportar galería)
  const imagenes = Array.isArray(producto.imagenes)
    ? [...producto.imagenes]
    : [];
  if (imagenes.length === 0 && producto.image) imagenes.push(producto.image);
  if (imagenes.length === 1) imagenes.push(imagenes[0]);

  // Construir estructura compatible con Shopify/tiendas: id, title, handle, images, variants, options, vendor, tags, available, inventory_quantity
  const shopifyLike = {
    id: producto.id || producto.sku || `local-${producto.slug}`,
    title: producto.titulo || producto.nombre,
    handle:
      producto.slug ||
      (producto.titulo || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    images: imagenes.map((src, idx) => ({
      id: `${producto.id || producto.slug}-img-${idx}`,
      src,
    })),
    variants: [
      {
        id: producto.id ? `${producto.id}-v1` : `${producto.slug}-v1`,
        sku: producto.sku || null,
        price: producto.precio,
        available: (producto.stock || Math.floor(Math.random() * 15) + 1) > 0,
        inventory_quantity:
          producto.stock || Math.floor(Math.random() * 15) + 1,
      },
    ],
    options: ["Default Title"],
    vendor: producto.marca || null,
    tags: producto.etiquetas || [],
  };

  const normalized = {
    ...producto,
    nombre: producto.titulo || producto.nombre,
    categoria: extractCategoryFromCategories(producto.categorias),
    material: extractMaterialFromTags(producto.etiquetas, producto.categorias),
    // IMPORTANTE: Usar el campo genero directamente si existe, sino intentar extraerlo de etiquetas
    genero: producto.genero || extractGeneroFromTags(producto.etiquetas),
    estilo: extractEstiloFromTags(producto.etiquetas),
    tipo: extractTipoFromCategories(producto.categorias),
    // IMPORTANTE: Usar el campo marca directamente si existe, sino intentar extraerlo de etiquetas
    marca: producto.marca || extractMarcaFromTags(producto.etiquetas),
    stock: producto.stock || shopifyLike.variants[0].inventory_quantity, // Simular stock si no existe
    novedad: isNovedad(producto),
    oferta: hasOferta(producto),
    // Campos compatibles con Shopify exportados para futuras integraciones
    shopify: shopifyLike,
    imagenes,
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
    if (categoria && categoria.length > 0) {
      const categoriaValida = categoria.some((cat) => {
        // Normalizar nombres de categoría
        const catNormalizada = cat.toLowerCase().trim();
        const prodCat = producto.categoria?.toLowerCase().trim();
        const prodCats =
          producto.categorias?.map((c) => c.toLowerCase().trim()) || [];

        // Buscar coincidencias exactas y parciales
        return (
          prodCat === catNormalizada ||
          prodCats.includes(catNormalizada) ||
          prodCat?.includes(catNormalizada) ||
          prodCats.some((c) => c.includes(catNormalizada))
        );
      });
      if (!categoriaValida) return false;
    }

    // 2. Búsqueda por texto mejorada (búsqueda inteligente)
    if (busqueda && busqueda.trim()) {
      const textoBusqueda = busqueda.toLowerCase().trim();
      const palabrasBusqueda = textoBusqueda.split(/\s+/); // Dividir en palabras

      // Propiedades donde buscar
      const camposBusqueda = [
        producto.nombre,
        producto.titulo,
        producto.descripcion,
        producto.slug,
        producto.marca,
        producto.material,
        producto.tipo,
        producto.genero,
        producto.estilo,
        producto.color,
        producto.coleccion,
        ...(producto.categorias || []),
        ...(producto.etiquetas || []),
      ]
        .filter(Boolean)
        .map((campo) => String(campo).toLowerCase());

      const textoCompleto = camposBusqueda.join(" ");

      // Verificar si todas las palabras de búsqueda están presentes
      const coincide = palabrasBusqueda.every((palabra) =>
        textoCompleto.includes(palabra)
      );

      if (!coincide) return false;
    }

    // 3. Filtro por precio (con valores por defecto seguros)
    const precio = Number(producto.precio) || 0;

    // Soportar tanto { precioMin, precioMax } como { precio: { min, max } }
    let precioMin = 0;
    let precioMax = Infinity;

    if (filtros.precio && typeof filtros.precio === "object") {
      // Si min es undefined o null, usar 0
      precioMin =
        filtros.precio.min !== undefined && filtros.precio.min !== null
          ? Number(filtros.precio.min)
          : 0;

      // Si max es undefined o null, usar Infinity
      precioMax =
        filtros.precio.max !== undefined && filtros.precio.max !== null
          ? Number(filtros.precio.max)
          : Infinity;
    } else {
      precioMin = Number(filtros.precioMin) || 0;
      precioMax = Number(filtros.precioMax) || Infinity;
    }

    if (precio < precioMin || precio > precioMax) return false;

    // 4. Filtros específicos de categoría
    for (const [clave, valor] of Object.entries(filtros)) {
      if (["precioMin", "precioMax", "precio"].includes(clave)) continue;

      // Filtro booleano (true/false)
      if (valor === true) {
        if (!producto[clave]) return false;
      }

      // Filtro de array (selección múltiple)
      if (Array.isArray(valor) && valor.length > 0) {
        const valorProducto = producto[clave];

        // Si el producto tiene array de valores
        if (Array.isArray(valorProducto)) {
          const tieneCoincidencia = valor.some((v) =>
            valorProducto.some(
              (vp) => String(vp).toLowerCase() === String(v).toLowerCase()
            )
          );
          if (!tieneCoincidencia) return false;
        } else {
          // Si el producto tiene un solo valor
          const coincide = valor.some(
            (v) =>
              String(valorProducto).toLowerCase() === String(v).toLowerCase()
          );
          if (!coincide) return false;
        }
      }

      // Filtro de rango numérico
      if (
        typeof valor === "object" &&
        (valor.min !== undefined || valor.max !== undefined)
      ) {
        const productValue = Number(producto[clave]) || 0;
        if (valor.min && productValue < valor.min) return false;
        if (valor.max && productValue > valor.max) return false;
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
    const producto = productos.find(
      (p) => p.slug === slug || p.handle === slug || p.shopify?.handle === slug
    );

    if (!producto) throw new Error("Producto no encontrado");
    return producto;
  } catch (error) {
    console.error("Error en fetchProducto:", error);
    throw error;
  }
};
