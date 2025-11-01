import React, { useState, useMemo, useEffect, useRef } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useProductos } from "../hooks/useProductos";
import FiltroSidebar from "../components/FiltroSidebar";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import ProductoCard from "../components/ProductoCard";
import SEO from "../components/SEO";
import { SkeletonGrid } from "../components/Skeleton";
import { PageSpinner } from "../components/Spinner";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PRODUCTOS_POR_PAGINA_DESKTOP = 24;
const PRODUCTOS_POR_PAGINA_MOBILE = 12;

const Catalogo = () => {
  const { categoria } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchQuery = searchParams.get("q");
  const marcaParam = searchParams.get("marca");
  const generoParam = searchParams.get("genero");
  const pageParam = parseInt(searchParams.get("page") || "1", 10);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filtros, setFiltros] = useState({});
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const catalogoRef = useRef(null);
  const productosAntesDeCargarRef = useRef(0);

  // Detectar cambios de tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Loader inicial de la página
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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

  // Paginación
  const productosPorPagina = isMobile
    ? PRODUCTOS_POR_PAGINA_MOBILE
    : PRODUCTOS_POR_PAGINA_DESKTOP;

  const totalPaginas = Math.ceil(productos.length / productosPorPagina);
  const paginaActual = Math.min(Math.max(1, pageParam), totalPaginas || 1);

  // Productos de la página actual (Desktop) o acumulados (Mobile)
  const productosVisibles = useMemo(() => {
    if (isMobile) {
      // Mobile: Mostrar productos acumulados hasta la página actual
      return productos.slice(0, paginaActual * productosPorPagina);
    } else {
      // Desktop: Mostrar solo productos de la página actual
      const inicio = (paginaActual - 1) * productosPorPagina;
      const fin = inicio + productosPorPagina;
      return productos.slice(inicio, fin);
    }
  }, [productos, paginaActual, productosPorPagina, isMobile]);

  // Scroll al inicio al cambiar de página (solo desktop)
  useEffect(() => {
    if (!isMobile && catalogoRef.current && paginaActual > 1) {
      catalogoRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [paginaActual, isMobile]);

  // Reset página al cambiar filtros o categoría
  useEffect(() => {
    if (paginaActual !== 1) {
      cambiarPagina(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoria, filtros, searchQuery]);

  // Función para cambiar de página
  const cambiarPagina = (nuevaPagina) => {
    const params = new URLSearchParams(searchParams);
    if (nuevaPagina === 1) {
      params.delete("page");
    } else {
      params.set("page", nuevaPagina.toString());
    }
    setSearchParams(params);
  };

  // Cargar más productos (Mobile)
  const cargarMas = () => {
    if (paginaActual < totalPaginas) {
      // Guardar el número de productos visibles ANTES de cargar más
      productosAntesDeCargarRef.current = productosVisibles.length;

      // Cambiar página (esto disparará el re-render y actualizará productosVisibles)
      cambiarPagina(paginaActual + 1);
    }
  };

  // Efecto para hacer scroll al primer producto nuevo después de cargar más (solo mobile)
  useEffect(() => {
    if (isMobile && productosAntesDeCargarRef.current > 0 && paginaActual > 1) {
      // Esperar a que React termine de renderizar
      const timer = setTimeout(() => {
        const productElements = document.querySelectorAll(
          "[data-product-card]"
        );
        const indicePrimerNuevo = productosAntesDeCargarRef.current;
        const primerProductoNuevo = productElements[indicePrimerNuevo];

        if (primerProductoNuevo) {
          // Hacer scroll con offset para mejor visualización
          const elementPosition =
            primerProductoNuevo.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - 80;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }

        // Resetear el ref después de usar
        productosAntesDeCargarRef.current = 0;
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [productosVisibles, isMobile, paginaActual]);

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
    const baseUrl = "https://opticadelvaljoyeros.es/catalogo";

    if (searchQuery) {
      return {
        title: `Resultados para "${searchQuery}" - Óptica Del Val Joyeros`,
        description: `Encuentra productos relacionados con ${searchQuery} en nuestra tienda online. ${productos.length} resultados encontrados.`,
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

  if (isInitialLoading) {
    return <PageSpinner />;
  }

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

          <div
            ref={catalogoRef}
            className="flex flex-col justify-between gap-3 mb-4 sm:flex-row sm:items-center sm:mb-6"
          >
            <h1 className="text-xl font-semibold tracking-wide text-gray-900 sm:text-2xl lg:text-3xl">
              {tituloCategoria}
            </h1>
            <div className="text-sm text-gray-500 sm:text-base">
              {isMobile && productosVisibles.length < productos.length
                ? `Mostrando ${productosVisibles.length} de ${productos.length} productos`
                : `${productos.length} producto${
                    productos.length !== 1 ? "s" : ""
                  }`}
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
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`productos-${paginaActual}-${productosVisibles.length}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                  {productosVisibles.map((producto) => (
                    <ProductoCard key={producto.slug} producto={producto} />
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Paginación Desktop o Load More Mobile */}
              {productos.length > productosPorPagina && (
                <div className="mt-8">
                  {isMobile ? (
                    /* Mobile: Load More Button */
                    productosVisibles.length < productos.length && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center"
                      >
                        <button
                          onClick={cargarMas}
                          className="group relative px-8 py-3 font-light tracking-wider text-sm uppercase bg-black text-white hover:bg-gray-900 transition-all duration-300 overflow-hidden"
                        >
                          <span className="relative z-10">
                            Cargar más productos
                          </span>
                          <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left opacity-10" />
                        </button>
                      </motion.div>
                    )
                  ) : (
                    /* Desktop: Paginación Clásica */
                    <Paginacion
                      paginaActual={paginaActual}
                      totalPaginas={totalPaginas}
                      onCambioPagina={cambiarPagina}
                      totalProductos={productos.length}
                      productosPorPagina={productosPorPagina}
                    />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

// Componente de Paginación (Desktop)
const Paginacion = ({
  paginaActual,
  totalPaginas,
  onCambioPagina,
  totalProductos,
  productosPorPagina,
}) => {
  const inicio = (paginaActual - 1) * productosPorPagina + 1;
  const fin = Math.min(paginaActual * productosPorPagina, totalProductos);

  // Generar array de números de página a mostrar
  const generarPaginas = () => {
    const paginas = [];
    const maxPaginasVisibles = 7;

    if (totalPaginas <= maxPaginasVisibles) {
      // Mostrar todas las páginas
      for (let i = 1; i <= totalPaginas; i++) {
        paginas.push(i);
      }
    } else {
      // Lógica para mostrar páginas con ellipsis
      if (paginaActual <= 4) {
        // Inicio: [1] [2] [3] [4] [5] ... [last]
        for (let i = 1; i <= 5; i++) {
          paginas.push(i);
        }
        paginas.push("ellipsis-1");
        paginas.push(totalPaginas);
      } else if (paginaActual >= totalPaginas - 3) {
        // Final: [1] ... [last-4] [last-3] [last-2] [last-1] [last]
        paginas.push(1);
        paginas.push("ellipsis-1");
        for (let i = totalPaginas - 4; i <= totalPaginas; i++) {
          paginas.push(i);
        }
      } else {
        // Medio: [1] ... [current-1] [current] [current+1] ... [last]
        paginas.push(1);
        paginas.push("ellipsis-1");
        for (let i = paginaActual - 1; i <= paginaActual + 1; i++) {
          paginas.push(i);
        }
        paginas.push("ellipsis-2");
        paginas.push(totalPaginas);
      }
    }

    return paginas;
  };

  const paginas = generarPaginas();

  return (
    <div className="space-y-4">
      {/* Información de productos mostrados */}
      <div className="text-center text-sm text-gray-600">
        Mostrando <span className="font-medium text-gray-900">{inicio}</span> -{" "}
        <span className="font-medium text-gray-900">{fin}</span> de{" "}
        <span className="font-medium text-gray-900">{totalProductos}</span>{" "}
        productos
      </div>

      {/* Navegación de páginas */}
      <nav className="flex items-center justify-center gap-1">
        {/* Botón Anterior */}
        <button
          onClick={() => onCambioPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
          className="group flex items-center gap-1 px-3 py-2 text-sm font-light tracking-wider uppercase transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:text-black disabled:hover:text-gray-500 cursor-pointer"
          aria-label="Página anterior"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Anterior</span>
        </button>

        {/* Números de página */}
        <div className="flex items-center gap-1 mx-2">
          {paginas.map((pagina, index) => {
            if (typeof pagina === "string") {
              // Ellipsis
              return (
                <span
                  key={pagina}
                  className="px-2 text-gray-400 select-none"
                  aria-hidden="true"
                >
                  ...
                </span>
              );
            }

            const esActual = pagina === paginaActual;

            return (
              <motion.button
                key={pagina}
                onClick={() => onCambioPagina(pagina)}
                whileHover={{ scale: esActual ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative min-w-[40px] h-10 px-3 text-sm font-light tracking-wider
                  transition-all duration-200 cursor-pointer
                  ${
                    esActual
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
                aria-label={`Página ${pagina}`}
                aria-current={esActual ? "page" : undefined}
              >
                {pagina}
              </motion.button>
            );
          })}
        </div>

        {/* Botón Siguiente */}
        <button
          onClick={() => onCambioPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
          className="group flex items-center gap-1 px-3 py-2 text-sm font-light tracking-wider uppercase transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:text-black disabled:hover:text-gray-500 cursor-pointer"
          aria-label="Página siguiente"
        >
          <span className="hidden sm:inline">Siguiente</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </nav>
    </div>
  );
};

export default Catalogo;
