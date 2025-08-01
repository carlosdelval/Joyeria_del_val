import React, { useState, useEffect } from "react";
import { useProductos } from "../hooks/useProductos";
import FiltroSidebar from "../components/FiltroSidebar";
import ProductoCard from "../components/ProductoCard";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const categoriasDisponibles = [
  "anillos",
  "pendientes",
  "colgantes",
  "infantil",
  "diamantes",
  "bodas",
  "relojes",
  "bebé",
  "comunión",
];

const Catalogo = () => {
  const location = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [filtros, setFiltros] = useState({
    categorias: [],
    precioMin: 0,
    precioMax: 2000,
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Obtener término de búsqueda de la URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const term = searchParams.get("search") || "";
    setSearchTerm(term);
  }, [location.search]);

  const { productos, loading } = useProductos({
    categoria: filtros.categorias,
    busqueda: searchTerm,
  });

  // Filtro local por precio
  const productosFiltrados = productos.filter((p) => {
    return p.precio >= filtros.precioMin && p.precio <= filtros.precioMax;
  });

  const aplicarFiltros = (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
  };

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="min-h-screen bg-white">
        {/* Contenedor principal flex en desktop */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-4">
          {/* Sidebar de filtros - SOLO DESKTOP */}
          <div className="hidden lg:block lg:w-72 lg:min-w-[288px] lg:pr-6 lg:pl-4 lg:py-6 lg:sticky lg:top-20 lg:self-start lg:h-[calc(100vh-80px)]">
            <FiltroSidebar
              categoriasDisponibles={categoriasDisponibles}
              filtrosIniciales={filtros}
              onAplicarFiltros={aplicarFiltros}
            />
          </div>

          {/* Contenido principal - Grid de productos */}
          <div className="flex-1 px-4 py-6 lg:pl-0 lg:pr-6">
            {/* Botón FILTRAR en móvil */}
            <button
              onClick={() => setMenuAbierto(true)}
              className="flex items-center gap-2 px-4 py-2 mb-4 text-sm tracking-wider text-black transition border border-black rounded lg:hidden hover:bg-black hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
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

            {/* Grid de productos responsivo */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {loading ? (
                <p className="col-span-full text-center">
                  Cargando productos...
                </p>
              ) : productosFiltrados.length === 0 ? (
                <div className="col-span-full text-center">
                  <p className="text-gray-600">
                    No se encontraron productos con esos filtros.
                  </p>
                  {searchTerm && (
                    <p className="mt-2 text-gray-500">
                      Búsqueda: "{searchTerm}"
                    </p>
                  )}
                </div>
              ) : (
                productosFiltrados.map((producto) => (
                  <ProductoCard key={producto.id} producto={producto} />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar móvil - Aparece solo cuando menuAbierto es true */}
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
                initial={{ x: -320 }}
                animate={{ x: 0 }}
                exit={{ x: -320 }}
                transition={{ type: "tween", ease: "easeInOut" }}
                className="relative z-50 w-4/5 h-full bg-white shadow-xl"
              >
                <FiltroSidebar
                  categoriasDisponibles={categoriasDisponibles}
                  filtrosIniciales={filtros}
                  onAplicarFiltros={(newFilters) => {
                    aplicarFiltros(newFilters);
                    setMenuAbierto(false);
                  }}
                  onClose={() => setMenuAbierto(false)}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Catalogo;
