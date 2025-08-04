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
  const filtrosConfig = filtrosPorCategoria[categoria] || {};

  const [menuAbierto, setMenuAbierto] = useState(false);
  const [filtrosAplicados, setFiltrosAplicados] = useState({
    categorias: [categoria],
    precioMin: 0,
    precioMax: 2000,
  });

  const { productos, loading } = useProductos({
    ...filtrosAplicados,
    categoria: [categoria],
  });

  const limpiarFiltrosVacios = (filtros) => {
    const limpio = {};
    for (const key in filtros) {
      const value = filtros[key];

      // Ignorar arrays vacíos
      if (Array.isArray(value) && value.length === 0) continue;

      // Ignorar falsos booleanos
      if (typeof value === "boolean" && value === false) continue;

      // Mantener valores válidos
      if (value !== undefined && value !== null) {
        limpio[key] = value;
      }
    }
    return limpio;
  };

  const handleAplicarFiltros = (filtros) => {
    const filtrosLimpios = limpiarFiltrosVacios({
      ...filtros,
      categoria: [categoria],
    });
    setFiltrosAplicados(filtrosLimpios);
  };

  const tituloCategoria = useMemo(() => {
    return categoria?.charAt(0).toUpperCase() + categoria?.slice(1);
  }, [categoria]);

  return (
    <>
      {/* Botón para abrir filtros en móvil */}
      <div className="p-4 lg:hidden">
        <button
          onClick={() => setMenuAbierto(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 mb-4 text-sm tracking-wider text-black transition border border-black rounded lg:hidden hover:bg-black hover:text-white sm:w-auto sm:px-6"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          FILTRAR
        </button>
      </div>

      <div className="flex flex-col min-h-screen lg:flex-row">
        {/* Sidebar Fijo (solo visible en escritorio) */}
        <div className="hidden lg:block">
          <FiltroSidebar
            filtrosIniciales={{
              ...filtrosAplicados,
              categoria: [categoria],
            }}
            filtrosPorCategoria={filtrosConfig}
            onAplicarFiltros={handleAplicarFiltros}
          />
        </div>

        {/* Contenido principal */}
        <div className="flex-1 p-6">
          <h1 className="mb-4 text-2xl font-semibold tracking-wide text-gray-900">
            {tituloCategoria}
          </h1>

          {loading ? (
            <p className="text-gray-500">Cargando productos...</p>
          ) : productos.length === 0 ? (
            <p className="text-gray-500">No se encontraron productos.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {productos.map((producto) => (
                <ProductoCard key={producto.slug} producto={producto} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sidebar móvil */}
      <AnimatePresence>
        {menuAbierto && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setMenuAbierto(false)}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", ease: [0.25, 0.1, 0.25, 1] }}
              className="relative z-50 w-full h-full max-w-xs bg-white shadow-xl"
            >
              <FiltroSidebar
                filtrosIniciales={{
                  ...filtrosAplicados,
                  categoria: [categoria],
                }}
                filtrosPorCategoria={filtrosConfig}
                onAplicarFiltros={handleAplicarFiltros}
                onClose={() => setMenuAbierto(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Catalogo;
