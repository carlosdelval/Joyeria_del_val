import React, { useState, useMemo, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useProductos } from "../hooks/useProductos";
import FiltroSidebar from "../components/FiltroSidebar";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import ProductoCard from "../components/ProductoCard";
import SEO from "../components/SEO";
import { SkeletonGrid } from "../components/Skeleton";

const Catalogo = () => {
  const { categoria } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const marcaParam = searchParams.get("marca");
  const generoParam = searchParams.get("genero");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filtros, setFiltros] = useState({});

  // Aplicar filtros desde URL cuando se monta el componente
  useEffect(() => {
    const newFiltros = {};

    if (marcaParam) {
      newFiltros.marca = [marcaParam];
    }

    if (generoParam) {
      newFiltros.genero = [generoParam];
    }

    if (Object.keys(newFiltros).length > 0) {
      setFiltros(newFiltros);
    }
  }, [marcaParam, generoParam]);

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

  // SEO dinámico para catálogo
  const getCatalogoSEO = () => {
    const baseUrl = "https://opticadelvaljoyeros.com/catalogo";

    if (searchQuery) {
      return {
        title: `Resultados para "${searchQuery}" - Óptica Del Val Joyeros`,
        description: `Encuentra productos relacionados con ${searchQuery} en nuestra tienda online. ${productosFiltrados.length} resultados encontrados.`,
        url: `${baseUrl}?q=${searchQuery}`,
      };
    }

    const seoData = {
      relojes: {
        title: "Relojes TOUS para Mujer - Colección 2025 | Óptica Del Val",
        description:
          "Descubre nuestra exclusiva colección de relojes TOUS para mujer. Diseños elegantes en acero, oro rosa y nácar. Envío gratis +50€.",
        keywords: "relojes TOUS, relojes mujer, relojes acero, TOUS Córdoba",
      },
      gafas: {
        title: "Gafas de Sol Ray-Ban, Dolce & Gabbana | Óptica Del Val",
        description:
          "Las mejores marcas de gafas de sol: Ray-Ban Aviator, Wayfarer, Dolce & Gabbana, Oakley. Protección UV certificada.",
        keywords: "gafas de sol, Ray-Ban, Dolce Gabbana, gafas Puente Genil",
      },
      bolsos: {
        title: "Bolsos TOUS - Colección Original | Óptica Del Val Joyeros",
        description:
          "Bolsos TOUS auténticos con diseños exclusivos. Calidad premium y estilo único. Compra segura online.",
        keywords: "bolsos TOUS, bolsos mujer, complementos TOUS",
      },
      todos: {
        title: "Catálogo Completo - Joyería y Óptica | Óptica Del Val",
        description:
          "Explora todo nuestro catálogo: joyas, relojes, gafas y complementos de las mejores marcas. Más de 200 productos disponibles.",
        keywords: "joyería, óptica, relojes, gafas, TOUS, Ray-Ban",
      },
    };

    const data = seoData[categoria] || seoData.todos;
    return {
      title: data.title,
      description: data.description,
      keywords: data.keywords,
      url: categoria ? `${baseUrl}/${categoria}` : baseUrl,
    };
  };

  const seoData = getCatalogoSEO();

  return (
    <>
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        url={seoData.url}
      />
      <div className="flex flex-col min-h-screen lg:flex-row">
        {/* Sidebar Fijo (solo visible en escritorio) */}
        <div className="hidden lg:block lg:w-72 xl:w-80">
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
        <div className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8">
          {/* Mobile Filter Button */}
          <div className="mb-4 lg:hidden sm:mb-6">
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

          <div className="flex flex-col justify-between gap-3 mb-4 sm:flex-row sm:items-center sm:mb-6">
            <h1 className="text-xl font-semibold tracking-wide text-gray-900 sm:text-2xl lg:text-3xl">
              {tituloCategoria}
            </h1>
            <div className="text-sm text-gray-500 sm:text-base">
              {productos.length} productos
            </div>
          </div>

          {loading ? (
            <SkeletonGrid count={8} />
          ) : productos.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <p className="mb-4 text-sm text-gray-500 sm:text-base">
                {searchQuery
                  ? `No se encontraron productos para "${searchQuery}"`
                  : "No se encontraron productos que coincidan con los filtros seleccionados."}
              </p>
              <button
                onClick={limpiarFiltros}
                className="px-4 py-2 text-sm font-medium transition-colors rounded-md sm:text-base text-amber-600 hover:text-amber-700 hover:bg-amber-50"
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
                className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
