import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useProductos } from "../hooks/useProductos";
import FiltroSidebar from "../components/FiltroSidebar";
import { filtrosPorCategoria } from "../data/filtrosPorCategoria";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import ProductoCard from "../components/ProductoCard";

const Catalogo = () => {
  const { categoria } = useParams();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filtros, setFiltros] = useState({});

  const { productos, loading } = useProductos(
    {
      categoria: [categoria],
      ...filtros,
    },
    `${categoria}-${JSON.stringify(filtros)}`
  );

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
    return categoria?.charAt(0).toUpperCase() + categoria?.slice(1);
  }, [categoria]);

  return (
    <>
      <div className="flex flex-col min-h-screen lg:flex-row">
        {/* Sidebar Fijo (solo visible en escritorio) */}
        <div className="hidden lg:block lg:w-80">
          <FiltroSidebar
            categoria={categoria}
            filtros={filtros}
            onFiltroChange={handleFiltroChange}
            isOpen={true}
            onToggle={() => {}}
            totalProducts={productos.length}
          />
        </div>

        {/* Contenido principal */}
        <div className="flex-1 p-6">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-6">
            <FiltroSidebar
              categoria={categoria}
              filtros={filtros}
              onFiltroChange={handleFiltroChange}
              isOpen={isSidebarOpen}
              onToggle={toggleSidebar}
              totalProducts={productos.length}
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
                No se encontraron productos que coincidan con los filtros
                seleccionados.
              </p>
              <button
                onClick={limpiarFiltros}
                className="text-amber-600 hover:text-amber-700 font-medium"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {productos.map((producto) => (
                <ProductoCard
                  key={producto.slug}
                  producto={producto}
                  className="transition-transform hover:scale-105"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Catalogo;
