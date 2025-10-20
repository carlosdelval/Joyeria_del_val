import React, { useState, useMemo, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useProductos } from "../hooks/useProductos";
import FiltroSidebar from "../components/FiltroSidebar";
import { filtrosPorCategoria } from "../data/filtrosPorCategoria";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import ProductoCard from "../components/ProductoCard";

const Catalogo = () => {
  const { categoria } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const marcaParam = searchParams.get("marca");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filtros, setFiltros] = useState({});

  // Aplicar marca desde URL cuando se monta el componente
  useEffect(() => {
    if (marcaParam) {
      setFiltros((prev) => ({ ...prev, marca: [marcaParam] }));
    }
  }, [marcaParam]);

  // Determinar qué categoría buscar
  const categoriasBusqueda = useMemo(() => {
    if (searchQuery) {
      // Si hay búsqueda, buscar en todas las categorías principales
      return ["relojes", "gafas", "bolsos", "gafas-sol"];
    }
    if (categoria && categoria !== "todos") {
      return [categoria];
    }
    return [];
  }, [categoria, searchQuery]);

  const { productos, loading } = useProductos(
    {
      categoria: categoriasBusqueda.length > 0 ? categoriasBusqueda : undefined,
      busqueda: searchQuery || "",
      ...filtros,
    },
    `${categoria}-${searchQuery}-${JSON.stringify(filtros)}`
  );

  // Detectar categoría predominante en los resultados de búsqueda
  const categoriaPredominante = useMemo(() => {
    if (!searchQuery || productos.length === 0) {
      return categoria || "todos";
    }

    // Contar productos por categoría
    const contadores = {};
    productos.forEach((producto) => {
      const cats = producto.categorias || [];
      cats.forEach((cat) => {
        const catNormalizada = cat.toLowerCase().trim();
        contadores[catNormalizada] = (contadores[catNormalizada] || 0) + 1;
      });

      // También contar la categoría principal
      if (producto.categoria) {
        const catPrincipal = producto.categoria.toLowerCase().trim();
        contadores[catPrincipal] = (contadores[catPrincipal] || 0) + 1;
      }
    });

    // Mapear categorías a las principales
    const mapeoCategoriaPrincipal = {
      relojes: "relojes",
      reloj: "relojes",
      gafas: "gafas",
      "gafas-sol": "gafas",
      "gafas de sol": "gafas",
      sol: "gafas",
      bolsos: "bolsos",
      bolso: "bolsos",
    };

    // Agrupar por categoría principal
    const categoriasPrincipales = {
      relojes: 0,
      gafas: 0,
      bolsos: 0,
    };

    Object.entries(contadores).forEach(([cat, count]) => {
      const catPrincipal = mapeoCategoriaPrincipal[cat];
      if (catPrincipal) {
        categoriasPrincipales[catPrincipal] += count;
      }
    });

    // Encontrar la categoría con más productos
    const [categoriaDominante] = Object.entries(categoriasPrincipales)
      .sort((a, b) => b[1] - a[1])
      .map(([cat]) => cat);

    // Si hay una categoría clara (>60% de productos), usarla
    const totalProductos = productos.length;
    const porcentajeDominante =
      categoriasPrincipales[categoriaDominante] / totalProductos;

    if (porcentajeDominante > 0.6) {
      return categoriaDominante;
    }

    // Si hay mezcla, mantener 'todos'
    return "todos";
  }, [productos, searchQuery, categoria]);

  const handleFiltroChange = (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const limpiarFiltros = () => {
    setFiltros({});
  };

  const tituloCategoria = useMemo(() => {
    if (searchQuery) {
      return `Resultados para "${searchQuery}"`;
    }
    if (!categoria || categoria === "todos") {
      return "Todos los productos";
    }

    const titulos = {
      relojes: "Relojes",
      gafas: "Gafas de Sol",
      "gafas-sol": "Gafas de Sol",
      bolsos: "Bolsos TOUS",
      todos: "Todos los productos",
    };

    return (
      titulos[categoria] ||
      categoria?.charAt(0).toUpperCase() + categoria?.slice(1)
    );
  }, [categoria, searchQuery]);

  return (
    <>
      <div className="flex flex-col min-h-screen lg:flex-row">
        {/* Sidebar Fijo (solo visible en escritorio) */}
        <div className="hidden lg:block lg:w-80">
          <FiltroSidebar
            categoria={categoriaPredominante}
            filtros={filtros}
            onFiltroChange={handleFiltroChange}
            isOpen={true}
            onToggle={() => {}}
            totalProducts={productos.length}
            esResultadoBusqueda={!!searchQuery}
          />
        </div>

        {/* Contenido principal */}
        <div className="flex-1 p-6">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-6">
            <FiltroSidebar
              categoria={categoriaPredominante}
              filtros={filtros}
              onFiltroChange={handleFiltroChange}
              isOpen={isSidebarOpen}
              onToggle={toggleSidebar}
              totalProducts={productos.length}
              esResultadoBusqueda={!!searchQuery}
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold tracking-wide text-gray-900">
              {tituloCategoria}
            </h1>
            <div className="text-sm text-gray-500">
              {productos.length} productos
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
              <span className="ml-2 text-gray-500">Cargando productos...</span>
            </div>
          ) : productos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">
                {searchQuery
                  ? `No se encontraron productos para "${searchQuery}"`
                  : "No se encontraron productos que coincidan con los filtros seleccionados."}
              </p>
              <button
                onClick={limpiarFiltros}
                className="px-4 py-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50 font-medium rounded-md transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`productos-${productos.length}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {productos.map((producto) => (
                  <ProductoCard key={producto.slug} producto={producto} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </>
  );
};

export default Catalogo;
