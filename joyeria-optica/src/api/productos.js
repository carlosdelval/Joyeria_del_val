// src/api/productos.js
import { shopifyService } from "../services/shopify.js";

const USE_SHOPIFY = import.meta.env.VITE_USE_SHOPIFY === "true";

// Sistema de caché en memoria para productos
const productCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

// Función para cargar los datos (Shopify o JSON local)
async function loadProductosData() {
  try {
    if (USE_SHOPIFY) {
      console.log("🛍️ Cargando productos desde Shopify...");

      // Cargar todos los productos con paginación
      let allProducts = [];
      let hasNextPage = true;
      let cursor = null;
      let pageCount = 0;

      while (hasNextPage) {
        const response = await shopifyService.getProducts({
          first: 250,
          after: cursor,
        });

        if (response.errors) {
          console.error("Error de Shopify GraphQL:", response.errors);
          throw new Error("Error al obtener productos de Shopify");
        }

        const edges = response.data?.products?.edges || [];
        const pageInfo = response.data?.products?.pageInfo || {};

        allProducts = allProducts.concat(edges);
        hasNextPage = pageInfo.hasNextPage;
        cursor = pageInfo.endCursor;
        pageCount++;

        console.log(
          `📄 Página ${pageCount}: ${edges.length} productos cargados`
        );
      }

      console.log(
        `✅ Total: ${allProducts.length} productos cargados desde Shopify`
      );

      // Transformar productos de Shopify al formato de la app
      return allProducts.map((edge) =>
        shopifyService.transformProductData(edge)
      );
    }

    // Fallback a JSON local
    console.log("📁 Cargando productos desde JSON local...");
    const response = await fetch("/data/productos.json");

    if (!response.ok) {
      throw new Error(`Error HTTP! estado: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error("Los datos no son un array válido:", data);
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error cargando productos:", error);

    // Si Shopify falla, intentar JSON local como fallback
    if (USE_SHOPIFY) {
      console.warn("⚠️ Intentando fallback a JSON local...");
      try {
        const response = await fetch("/data/productos.json");
        const data = await response.json();
        return Array.isArray(data) ? data : [];
      } catch (fallbackError) {
        console.error("Error en fallback:", fallbackError);
        return [];
      }
    }

    return [];
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
        available: (producto.stock ?? 0) > 0,
        inventory_quantity: producto.stock ?? 0,
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
    tipo:
      producto.tipo ||
      extractTipoFromCategories(producto.categorias) ||
      extractTipoJoyaFromTags(producto.etiquetas),
    // IMPORTANTE: Usar el campo marca directamente si existe, sino intentar extraerlo de etiquetas
    marca: producto.marca || extractMarcaFromTags(producto.etiquetas),
    stock: producto.stock ?? shopifyLike.variants[0].inventory_quantity ?? 0, // Stock real de Shopify
    novedad: isNovedad(producto),
    oferta: hasOferta(producto),
    // Campos compatibles con Shopify exportados para futuras integraciones
    shopify: shopifyLike,
    imagenes,
  };

  return normalized;
}

// Función helper para normalizar texto (eliminar acentos y convertir a minúsculas)
function normalizeText(text) {
  if (!text) return "";
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
    .toLowerCase()
    .trim();
}

// Diccionario de sinónimos y variaciones para búsqueda inteligente
const searchSynonyms = {
  // Joyería y variaciones
  joya: ["joya", "joyas", "joyeria", "joyería", "alhaja", "alhajas"],
  joyas: ["joya", "joyas", "joyeria", "joyería", "alhaja", "alhajas"],
  joyeria: ["joya", "joyas", "joyeria", "joyería", "alhaja", "alhajas"],

  // Anillos y sortijas
  anillo: ["anillo", "anillos", "sortija", "sortijas", "aro", "aros"],
  anillos: ["anillo", "anillos", "sortija", "sortijas", "aro", "aros"],
  sortija: ["anillo", "anillos", "sortija", "sortijas", "aro", "aros"],
  sortijas: ["anillo", "anillos", "sortija", "sortijas", "aro", "aros"],

  // Pulseras y brazaletes
  pulsera: [
    "pulsera",
    "pulseras",
    "brazalete",
    "brazaletes",
    "manilla",
    "manillas",
  ],
  pulseras: [
    "pulsera",
    "pulseras",
    "brazalete",
    "brazaletes",
    "manilla",
    "manillas",
  ],
  brazalete: [
    "pulsera",
    "pulseras",
    "brazalete",
    "brazaletes",
    "manilla",
    "manillas",
  ],

  // Collares y cadenas
  collar: [
    "collar",
    "collares",
    "cadena",
    "cadenas",
    "gargantilla",
    "gargantillas",
  ],
  collares: [
    "collar",
    "collares",
    "cadena",
    "cadenas",
    "gargantilla",
    "gargantillas",
  ],
  cadena: [
    "collar",
    "collares",
    "cadena",
    "cadenas",
    "gargantilla",
    "gargantillas",
  ],

  // Pendientes y aretes
  pendiente: [
    "pendiente",
    "pendientes",
    "arete",
    "aretes",
    "zarcillo",
    "zarcillos",
    "aros",
  ],
  pendientes: [
    "pendiente",
    "pendientes",
    "arete",
    "aretes",
    "zarcillo",
    "zarcillos",
    "aros",
  ],
  arete: [
    "pendiente",
    "pendientes",
    "arete",
    "aretes",
    "zarcillo",
    "zarcillos",
  ],
  aretes: [
    "pendiente",
    "pendientes",
    "arete",
    "aretes",
    "zarcillo",
    "zarcillos",
  ],

  // Relojes
  reloj: ["reloj", "relojes", "cronometro", "cronografo"],
  relojes: ["reloj", "relojes", "cronometro", "cronografo"],

  // Gafas
  gafa: ["gafa", "gafas", "lente", "lentes", "anteojos", "sol"],
  gafas: ["gafa", "gafas", "lente", "lentes", "anteojos", "sol"],
  lente: ["gafa", "gafas", "lente", "lentes", "anteojos"],
  lentes: ["gafa", "gafas", "lente", "lentes", "anteojos"],

  // Bolsos
  bolso: ["bolso", "bolsos", "cartera", "carteras", "bolsa", "bolsas"],
  bolsos: ["bolso", "bolsos", "cartera", "carteras", "bolsa", "bolsas"],
  cartera: ["bolso", "bolsos", "cartera", "carteras", "bolsa", "bolsas"],

  // Materiales comunes
  oro: ["oro", "dorado", "gold"],
  plata: ["plata", "plateado", "silver"],
  acero: ["acero", "steel", "inoxidable"],

  // Géneros
  mujer: ["mujer", "mujeres", "dama", "damas", "señora", "femenino", "ella"],
  hombre: ["hombre", "hombres", "caballero", "caballeros", "masculino", "el"],
};

// Función para expandir búsqueda con sinónimos y variaciones
function expandSearchTerms(searchText) {
  const normalized = normalizeText(searchText);
  const words = normalized.split(/\s+/);
  const expandedTerms = new Set();

  words.forEach((word) => {
    // Añadir la palabra original
    expandedTerms.add(word);

    // Añadir sinónimos si existen
    if (searchSynonyms[word]) {
      searchSynonyms[word].forEach((synonym) => {
        expandedTerms.add(normalizeText(synonym));
      });
    }

    // Manejar plurales simples (quitar/añadir 's')
    if (word.endsWith("s") && word.length > 3) {
      expandedTerms.add(word.slice(0, -1)); // singular
    } else if (word.length > 2) {
      expandedTerms.add(word + "s"); // plural
    }

    // Variaciones comunes de errores ortográficos
    if (word.length > 3) {
      // Variación con/sin 'h' inicial
      if (word.startsWith("h")) {
        expandedTerms.add(word.substring(1));
      } else {
        expandedTerms.add("h" + word);
      }

      // Variaciones ll/y (sortija/sortiya, joya/jolla)
      if (word.includes("ll")) {
        expandedTerms.add(word.replace(/ll/g, "y"));
      }
      if (word.includes("y")) {
        expandedTerms.add(word.replace(/y/g, "ll"));
      }
    }
  });

  return Array.from(expandedTerms);
}

// Funciones auxiliares para extraer información de las etiquetas y categorías existentes
function extractCategoryFromCategories(categorias) {
  if (!categorias || !Array.isArray(categorias)) return null;

  const mainCategories = [
    "anillos",
    "anillo",
    "gemelos",
    "pendientes",
    "pulseras",
    "pulsera",
    "collares",
    "collar",
    "colgantes",
    "gafas",
    "relojes",
    "joyeria",
    "bolsos",
  ];

  // Normalizar categorías para comparación
  const normalizedCats = categorias.map(normalizeText);

  // Buscar coincidencia exacta
  const found = mainCategories.find((cat) =>
    normalizedCats.includes(normalizeText(cat))
  );

  // Si es una subcategoría de joyería (anillo, pendientes, etc), también marcar como joyería
  if (
    found &&
    [
      "anillos",
      "anillo",
      "pendientes",
      "pulseras",
      "pulsera",
      "collares",
      "collar",
      "colgantes",
      "gemelos",
    ].includes(found)
  ) {
    return found;
  }

  return found || categorias[0];
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

// Extraer tipo de joya desde etiquetas (anillo, pendientes, collar, pulsera, gemelos)
function extractTipoJoyaFromTags(etiquetas) {
  if (!etiquetas || !Array.isArray(etiquetas)) return null;

  const tiposJoya = ["anillo", "pendientes", "collar", "pulsera", "gemelos"];

  for (const tag of etiquetas) {
    const tagNormalizado = normalizeText(tag);
    // Buscar coincidencias exactas o plurales
    const tipoEncontrado = tiposJoya.find(
      (tipo) =>
        tagNormalizado === tipo ||
        tagNormalizado === tipo + "s" ||
        tagNormalizado.includes(tipo)
    );
    if (tipoEncontrado) return tipoEncontrado;
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
    const tagLower = tag.toLowerCase().trim();
    const marca = marcas.find((m) => tagLower.includes(m) || tagLower === m);
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
  // Verificar caché primero
  const cacheKey = JSON.stringify({ categoria, busqueda, filtros });
  const cached = productCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log("📦 Productos cargados desde caché");
    return cached.data;
  }

  const productosData = await loadProductosData();

  // Normalizar todos los productos al formato esperado
  const normalizedProducts = productosData.map(normalizeProduct);

  return normalizedProducts
    .filter((producto) => {
      // Validación de propiedades para evitar errores
      if (!producto) return false;

      // 1. Filtro por categoría
      if (categoria && categoria.length > 0) {
        const categoriaValida = categoria.some((cat) => {
          // Normalizar nombres de categoría (sin acentos)
          const catNormalizada = normalizeText(cat);
          const prodCat = normalizeText(producto.categoria);
          const prodCats = producto.categorias?.map(normalizeText) || [];
          const prodTags = producto.etiquetas?.map(normalizeText) || [];

          // Buscar coincidencias exactas y parciales en categorías y etiquetas
          return (
            prodCat === catNormalizada ||
            prodCats.includes(catNormalizada) ||
            prodTags.includes(catNormalizada) ||
            prodCat?.includes(catNormalizada) ||
            prodCats.some((c) => c.includes(catNormalizada)) ||
            prodTags.some((t) => t.includes(catNormalizada))
          );
        });
        if (!categoriaValida) return false;
      }

      // 2. Búsqueda por texto mejorada (búsqueda inteligente con sinónimos y variaciones)
      if (busqueda && busqueda.trim()) {
        // Expandir términos de búsqueda con sinónimos, plurales y variaciones
        const terminosExpandidos = expandSearchTerms(busqueda);

        // Detectar si la búsqueda es de una categoría principal
        const categoriasPrincipales = {
          joyeria: ["joya", "joyas", "joyeria", "alhaja", "alhajas"],
          anillo: ["anillo", "anillos", "sortija", "sortijas", "aro"],
          pulsera: [
            "pulsera",
            "pulseras",
            "brazalete",
            "brazaletes",
            "manilla",
          ],
          collar: ["collar", "collares", "cadena", "gargantilla"],
          pendiente: ["pendiente", "pendientes", "arete", "aretes", "zarcillo"],
          reloj: ["reloj", "relojes", "cronometro", "cronografo"],
          gafa: ["gafa", "gafas", "lente", "lentes", "anteojos"],
          bolso: ["bolso", "bolsos", "cartera", "bolsa"],
        };

        // Materiales típicos de joyería que deben priorizar productos de joyería
        const materialesJoyeria = [
          "oro",
          "plata",
          "diamante",
          "brillante",
          "esmeralda",
          "rubi",
          "zafiro",
          "perla",
          "platino",
          "titanio",
          "circonita",
          "topacio",
          "amatista",
          "aguamarina",
          "granate",
          "turquesa",
          "coral",
          "jade",
          "onix",
          "dorado",
          "plateado",
          "gold",
          "silver",
          "diamond",
        ];

        // Verificar si la búsqueda corresponde a una categoría principal
        let categoriaBuscada = null;
        let esMaterialJoyeria = false;
        const textoBusquedaNormalizado = normalizeText(busqueda);

        for (const [categoria, terminos] of Object.entries(
          categoriasPrincipales
        )) {
          if (
            terminos.some((termino) =>
              textoBusquedaNormalizado.includes(normalizeText(termino))
            )
          ) {
            categoriaBuscada = categoria;
            break;
          }
        }

        // Verificar si busca un material típico de joyería
        if (!categoriaBuscada) {
          esMaterialJoyeria = materialesJoyeria.some((material) =>
            textoBusquedaNormalizado.includes(normalizeText(material))
          );
          if (esMaterialJoyeria) {
            categoriaBuscada = "joyeria"; // Tratar como búsqueda de joyería
          }
        }

        // Si se busca una categoría específica, filtrar SOLO por categoría/tipo (no descripción)
        if (categoriaBuscada && !esMaterialJoyeria) {
          // Búsqueda de categoría pura (joyería, anillo, reloj, etc.)
          const camposCategoria = [
            producto.categoria,
            producto.tipo,
            ...(producto.categorias || []),
            ...(producto.etiquetas || []),
          ]
            .filter(Boolean)
            .map((campo) => normalizeText(campo));

          const textoCategorias = camposCategoria.join(" ");

          const coincideCategoria = terminosExpandidos.some((termino) =>
            textoCategorias.includes(termino)
          );

          if (!coincideCategoria) return false;
        } else if (esMaterialJoyeria) {
          // Búsqueda de material de joyería: filtrar por categoría joyería Y material
          const esJoyeria =
            [
              producto.categoria,
              producto.tipo,
              ...(producto.categorias || []),
              ...(producto.etiquetas || []),
            ]
              .filter(Boolean)
              .map((campo) => normalizeText(campo))
              .join(" ")
              .includes("joyeria") ||
            [
              "anillo",
              "pulsera",
              "collar",
              "pendiente",
              "gemelos",
              "colgante",
            ].some((cat) =>
              [
                producto.categoria,
                producto.tipo,
                ...(producto.categorias || []),
              ]
                .filter(Boolean)
                .map((campo) => normalizeText(campo))
                .join(" ")
                .includes(cat)
            );

          if (!esJoyeria) return false;

          // Verificar que el material coincida
          const camposMaterial = [
            producto.material,
            producto.titulo,
            producto.nombre,
            producto.descripcion,
            ...(producto.etiquetas || []),
          ]
            .filter(Boolean)
            .map((campo) => normalizeText(campo));

          const textoMaterial = camposMaterial.join(" ");

          const coincideMaterial = terminosExpandidos.some((termino) =>
            textoMaterial.includes(termino)
          );

          if (!coincideMaterial) return false;
        } else {
          // Búsqueda general: buscar en todos los campos
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
            .map((campo) => normalizeText(campo));

          const textoCompleto = camposBusqueda.join(" ");

          const coincide = terminosExpandidos.some((termino) =>
            textoCompleto.includes(termino)
          );

          if (!coincide) return false;
        }
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
          // Caso especial para Black Friday
          if (clave === "blackFriday") {
            const esBlackFriday = producto.categorias?.some(
              (cat) =>
                cat &&
                (cat.toLowerCase() === "black_friday" ||
                  cat.toLowerCase() === "black-friday")
            );
            if (!esBlackFriday) return false;
            continue;
          }

          if (!producto[clave]) return false;
        }

        // Filtro de array (selección múltiple)
        if (Array.isArray(valor) && valor.length > 0) {
          // CASO ESPECIAL: género se busca en categorias, no en campo genero
          if (clave === "genero") {
            const categorias = producto.categorias || [];
            const tieneGenero = valor.some((generoFiltro) =>
              categorias.some(
                (cat) =>
                  cat &&
                  String(cat).toLowerCase() ===
                    String(generoFiltro).toLowerCase()
              )
            );
            if (!tieneGenero) return false;
            continue; // Pasar al siguiente filtro
          }

          // CASO ESPECIAL: filtro de categoría (busca en categoria y categorias[])
          if (clave === "categoria") {
            const categoriaPrincipal = (producto.categoria || "").toLowerCase();
            const categoriasArray = (producto.categorias || []).map((c) =>
              c.toLowerCase()
            );

            const tieneCategoria = valor.some((catFiltro) => {
              const catBusqueda = String(catFiltro).toLowerCase();
              return (
                categoriaPrincipal.includes(catBusqueda) ||
                categoriasArray.some((c) => c.includes(catBusqueda))
              );
            });

            if (!tieneCategoria) return false;
            continue; // Pasar al siguiente filtro
          }

          // CASO ESPECIAL: filtro de descuento (calcula porcentaje desde precio y precioAnterior)
          if (clave === "descuento") {
            if (!producto.precioAnterior || !producto.precio) return false;

            const precioActual = Number(producto.precio);
            const precioAnterior = Number(producto.precioAnterior);

            if (precioAnterior <= precioActual) return false;

            // Calcular porcentaje de descuento
            const porcentajeDescuento = Math.round(
              ((precioAnterior - precioActual) / precioAnterior) * 100
            );

            // Comprobar si el producto cumple con alguno de los rangos seleccionados
            const cumpleDescuento = valor.some((descuentoFiltro) => {
              const rangoDescuento = Number(descuentoFiltro);

              // Lógica de rangos:
              // "40" = 35% o más
              // "30" = 25-34%
              // "20" = 15-24%
              if (rangoDescuento === 40) {
                return porcentajeDescuento >= 35;
              } else if (rangoDescuento === 30) {
                return porcentajeDescuento >= 25 && porcentajeDescuento < 35;
              } else if (rangoDescuento === 20) {
                return porcentajeDescuento >= 15 && porcentajeDescuento < 25;
              }
              return false;
            });

            if (!cumpleDescuento) return false;
            continue; // Pasar al siguiente filtro
          }

          const valorProducto = producto[clave];

          // Si el valor del producto es null o undefined, no coincide
          if (valorProducto === null || valorProducto === undefined) {
            return false;
          }

          // Si el producto tiene array de valores
          if (Array.isArray(valorProducto)) {
            const tieneCoincidencia = valor.some((v) =>
              valorProducto.some(
                (vp) =>
                  vp && String(vp).toLowerCase() === String(v).toLowerCase()
              )
            );
            if (!tieneCoincidencia) return false;
          } else {
            // Si el producto tiene un solo valor
            const coincide = valor.some(
              (v) =>
                valorProducto &&
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
    })
    .sort((a, b) => {
      // Ordenar productos por categoría para agruparlos visualmente
      const ordenCategorias = {
        relojes: 1,
        reloj: 1,
        gafas: 2,
        "gafas-sol": 2,
        "gafas de sol": 2,
        bolsos: 3,
        bolso: 3,
        // Subcategorías de joyería
        anillo: 4,
        anillos: 4,
        pendientes: 5,
        collar: 6,
        collares: 6,
        pulsera: 7,
        pulseras: 7,
        gemelos: 8,
        joyeria: 9,
      };

      // Obtener categoría o tipo de joya para ordenamiento
      const catA = (
        a.tipo ||
        a.categoria ||
        a.categorias?.[0] ||
        ""
      ).toLowerCase();
      const catB = (
        b.tipo ||
        b.categoria ||
        b.categorias?.[0] ||
        ""
      ).toLowerCase();

      const ordenA = ordenCategorias[catA] || 999;
      const ordenB = ordenCategorias[catB] || 999;

      // Si son de la misma categoría/tipo, mantener orden original (por ID o nombre)
      if (ordenA === ordenB) {
        return (a.nombre || "").localeCompare(b.nombre || "");
      }

      return ordenA - ordenB;
    });

  // Guardar resultado en caché
  productCache.set(cacheKey, {
    data: normalizedProducts,
    timestamp: Date.now(),
  });

  return normalizedProducts;
}

// Versión segura de fetchProducto con soporte Shopify
export const fetchProducto = async (slug) => {
  try {
    if (!slug) throw new Error("Slug no proporcionado");

    if (USE_SHOPIFY) {
      console.log(`🛍️ Buscando producto "${slug}" en Shopify...`);
      const response = await shopifyService.getProduct(slug);

      if (response.errors) {
        console.error("Error de Shopify GraphQL:", response.errors);
        throw new Error("Producto no encontrado en Shopify");
      }

      const product = response.data?.productByHandle;
      if (!product) {
        throw new Error("Producto no encontrado en Shopify");
      }

      return shopifyService.transformProductData(product);
    }

    // Fallback a JSON local
    await new Promise((resolve) => setTimeout(resolve, 300));
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
