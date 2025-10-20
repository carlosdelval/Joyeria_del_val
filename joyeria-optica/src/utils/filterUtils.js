// Utilidades para el manejo de filtros de productos

export const applyFilters = (productos, filtros, categoria) => {
  if (!productos || productos.length === 0) return [];

  return productos.filter((producto) => {
    // Filtro por categoría
    if (categoria && producto.categoria !== categoria) {
      return false;
    }

    // Filtro por material
    if (filtros.material && filtros.material.length > 0) {
      if (
        !filtros.material.some((material) =>
          producto.material?.toLowerCase().includes(material.toLowerCase())
        )
      ) {
        return false;
      }
    }

    // Filtro por género
    if (filtros.genero && filtros.genero.length > 0) {
      if (!filtros.genero.includes(producto.genero?.toLowerCase())) {
        return false;
      }
    }

    // Filtro por estilo
    if (filtros.estilo && filtros.estilo.length > 0) {
      if (!filtros.estilo.includes(producto.estilo?.toLowerCase())) {
        return false;
      }
    }

    // Filtro por tipo
    if (filtros.tipo && filtros.tipo.length > 0) {
      if (!filtros.tipo.includes(producto.tipo?.toLowerCase())) {
        return false;
      }
    }

    // Filtro por piedra
    if (filtros.piedra && filtros.piedra.length > 0) {
      if (
        !filtros.piedra.some((piedra) =>
          producto.piedras?.some((p) =>
            p.toLowerCase().includes(piedra.toLowerCase())
          )
        )
      ) {
        return false;
      }
    }

    // Filtro por cierre
    if (filtros.cierre && filtros.cierre.length > 0) {
      if (!filtros.cierre.includes(producto.cierre?.toLowerCase())) {
        return false;
      }
    }

    // Filtro por forma (para gafas)
    if (filtros.forma && filtros.forma.length > 0) {
      if (!filtros.forma.includes(producto.forma?.toLowerCase())) {
        return false;
      }
    }

    // Filtro por marca
    if (filtros.marca && filtros.marca.length > 0) {
      if (!filtros.marca.includes(producto.marca?.toLowerCase())) {
        return false;
      }
    }

    // Filtro por color
    if (filtros.color && filtros.color.length > 0) {
      if (!filtros.color.includes(producto.color?.toLowerCase())) {
        return false;
      }
    }

    // Filtro por protección (para gafas)
    if (filtros.proteccion && filtros.proteccion.length > 0) {
      if (
        !filtros.proteccion.some((prot) =>
          producto.proteccion?.includes(prot.toLowerCase())
        )
      ) {
        return false;
      }
    }

    // Filtros específicos para RELOJES
    if (filtros.materialCorrea && filtros.materialCorrea.length > 0) {
      if (
        !filtros.materialCorrea.includes(producto.materialCorrea?.toLowerCase())
      ) {
        return false;
      }
    }

    if (filtros.colorCorrea && filtros.colorCorrea.length > 0) {
      if (!filtros.colorCorrea.includes(producto.colorCorrea?.toLowerCase())) {
        return false;
      }
    }

    if (filtros.resistenciaAgua && filtros.resistenciaAgua.length > 0) {
      if (
        !filtros.resistenciaAgua.includes(
          producto.resistenciaAgua?.toLowerCase()
        )
      ) {
        return false;
      }
    }

    if (filtros.funciones && filtros.funciones.length > 0) {
      if (
        !filtros.funciones.some((func) =>
          producto.funciones?.includes(func.toLowerCase())
        )
      ) {
        return false;
      }
    }

    // Filtros específicos para GAFAS
    if (filtros.materialMarco && filtros.materialMarco.length > 0) {
      if (
        !filtros.materialMarco.includes(producto.materialMarco?.toLowerCase())
      ) {
        return false;
      }
    }

    if (filtros.colorMarco && filtros.colorMarco.length > 0) {
      if (!filtros.colorMarco.includes(producto.colorMarco?.toLowerCase())) {
        return false;
      }
    }

    if (filtros.colorLente && filtros.colorLente.length > 0) {
      if (!filtros.colorLente.includes(producto.colorLente?.toLowerCase())) {
        return false;
      }
    }

    // Filtros específicos para BOLSOS
    if (filtros.tamano && filtros.tamano.length > 0) {
      if (!filtros.tamano.includes(producto.tamano?.toLowerCase())) {
        return false;
      }
    }

    if (filtros.compartimentos && filtros.compartimentos.length > 0) {
      if (
        !filtros.compartimentos.some((comp) =>
          producto.compartimentos?.includes(comp.toLowerCase())
        )
      ) {
        return false;
      }
    }

    if (filtros.cierre && filtros.cierre.length > 0) {
      if (!filtros.cierre.includes(producto.cierre?.toLowerCase())) {
        return false;
      }
    }

    if (filtros.asa && filtros.asa.length > 0) {
      if (!filtros.asa.includes(producto.asa?.toLowerCase())) {
        return false;
      }
    }

    if (filtros.coleccion && filtros.coleccion.length > 0) {
      if (!filtros.coleccion.includes(producto.coleccion?.toLowerCase())) {
        return false;
      }
    }

    // Filtro por tamaño (rango)
    if (filtros.tamano && (filtros.tamano.min || filtros.tamano.max)) {
      const tamano = producto.tamano || 0;
      if (filtros.tamano.min && tamano < filtros.tamano.min) return false;
      if (filtros.tamano.max && tamano > filtros.tamano.max) return false;
    }

    // Filtro por precio (rango)
    if (filtros.precio && (filtros.precio.min || filtros.precio.max)) {
      const precio = producto.precio || 0;
      if (filtros.precio.min && precio < filtros.precio.min) return false;
      if (filtros.precio.max && precio > filtros.precio.max) return false;
    }

    // Filtro por disponibilidad
    if (filtros.disponibilidad && filtros.disponibilidad.length > 0) {
      const stock = producto.stock || 0;
      const hasRequired = filtros.disponibilidad.some((disp) => {
        switch (disp) {
          case "en-stock":
            return stock > 5;
          case "pocos-disponibles":
            return stock > 0 && stock <= 5;
          case "preventa":
            return producto.preventa === true;
          default:
            return false;
        }
      });
      if (!hasRequired) return false;
    }

    // Filtro por novedad (booleano)
    if (filtros.novedad === true) {
      if (!producto.novedad) return false;
    }

    // Filtro por oferta (booleano)
    if (filtros.oferta === true) {
      if (!producto.oferta) return false;
    }

    // Filtro por cadena incluida (booleano para colgantes)
    if (filtros.cadena === true) {
      if (!producto.incluyeCadena) return false;
    }

    // Filtro por longitud de cadena
    if (
      filtros.longitud &&
      filtros.longitud.length > 0 &&
      producto.incluyeCadena
    ) {
      if (!filtros.longitud.includes(producto.longitudCadena)) {
        return false;
      }
    }

    return true;
  });
};

export const sortProducts = (productos, sortBy = "nombre") => {
  if (!productos || productos.length === 0) return [];

  const sorted = [...productos];

  switch (sortBy) {
    case "precio-asc":
      return sorted.sort((a, b) => (a.precio || 0) - (b.precio || 0));
    case "precio-desc":
      return sorted.sort((a, b) => (b.precio || 0) - (a.precio || 0));
    case "nombre":
      return sorted.sort((a, b) =>
        (a.nombre || "").localeCompare(b.nombre || "")
      );
    case "novedad":
      return sorted.sort((a, b) => {
        if (a.novedad && !b.novedad) return -1;
        if (!a.novedad && b.novedad) return 1;
        return (a.nombre || "").localeCompare(b.nombre || "");
      });
    case "popular":
      return sorted.sort((a, b) => (b.popularidad || 0) - (a.popularidad || 0));
    default:
      return sorted;
  }
};

export const getFilterCounts = (productos, categoria, currentFilters) => {
  const counts = {};

  if (!productos || productos.length === 0) return counts;

  // Para cada filtro, contar cuántos productos quedarían si se aplica
  productos.forEach((producto) => {
    if (categoria && producto.categoria !== categoria) return;

    // Contar materiales
    if (producto.material) {
      const material = producto.material.toLowerCase();
      Object.keys(currentFilters.material || {}).forEach((filterMaterial) => {
        if (material.includes(filterMaterial.toLowerCase())) {
          counts[`material.${filterMaterial}`] =
            (counts[`material.${filterMaterial}`] || 0) + 1;
        }
      });
    }

    // Contar géneros
    if (producto.genero) {
      const genero = producto.genero.toLowerCase();
      counts[`genero.${genero}`] = (counts[`genero.${genero}`] || 0) + 1;
    }

    // Contar estilos
    if (producto.estilo) {
      const estilo = producto.estilo.toLowerCase();
      counts[`estilo.${estilo}`] = (counts[`estilo.${estilo}`] || 0) + 1;
    }

    // Contar tipos
    if (producto.tipo) {
      const tipo = producto.tipo.toLowerCase();
      counts[`tipo.${tipo}`] = (counts[`tipo.${tipo}`] || 0) + 1;
    }

    // Contar marcas
    if (producto.marca) {
      const marca = producto.marca.toLowerCase();
      counts[`marca.${marca}`] = (counts[`marca.${marca}`] || 0) + 1;
    }
  });

  return counts;
};

// Función para limpiar filtros vacíos
export const cleanFilters = (filtros) => {
  const clean = {};

  Object.entries(filtros).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      clean[key] = value;
    } else if (
      typeof value === "object" &&
      value !== null &&
      (value.min !== undefined || value.max !== undefined)
    ) {
      clean[key] = value;
    } else if (typeof value === "boolean" && value === true) {
      clean[key] = value;
    } else if (typeof value === "string" && value.trim() !== "") {
      clean[key] = value;
    }
  });

  return clean;
};

// Función para obtener el número de filtros activos
export const getActiveFiltersCount = (filtros) => {
  return Object.values(cleanFilters(filtros)).length;
};
