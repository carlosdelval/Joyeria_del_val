import React, { useState } from "react";
import { useProductos } from "../hooks/useProductos";
import FiltroSidebar from "../components/FiltroSidebar";
import ProductoCard from "../components/ProductoCard";
// eslint-disable-next-line no-unused-vars
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
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [filtros, setFiltros] = useState({
    categorias: [],
    precioMin: 0,
    precioMax: 2000,
  });

  const { productos, loading } = useProductos({
    categoria: filtros.categorias,
    busqueda: "", // puedes conectar con un buscador si quieres
  });

  // Filtro local por precio
  const productosFiltrados = productos.filter((p) => {
    return (
      p.precio >= filtros.precioMin &&
      p.precio <= filtros.precioMax &&
      (filtros.categorias.length === 0 ||
        filtros.categorias.some((cat) => p.categorias.includes(cat)))
    );
  });

  return (
    <div className="relative flex flex-col px-4 py-8 text-black bg-white lg:flex-row">
      {/* Botón FILTRAR en móvil - Rediseñado */}
      <button
        onClick={() => setMenuAbierto(true)}
        className="flex items-center self-start gap-2 px-4 py-2 mb-4 text-sm tracking-wider text-black transition border border-black rounded lg:hidden hover:bg-black hover:text-white"
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

      {/* SIDEBAR FIJO EN DESKTOP */}
      <div className="hidden lg:block lg:w-64 lg:pr-6">
        <FiltroSidebar
          categoriasDisponibles={categoriasDisponibles}
          filtrosIniciales={filtros}
          onAplicarFiltros={setFiltros}
        />
      </div>

      {/* SIDEBAR ANIMADO EN MÓVIL */}
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
              className="relative z-50 h-full bg-white shadow-xl w-72"
            >
              <FiltroSidebar
                categoriasDisponibles={categoriasDisponibles}
                filtrosIniciales={filtros}
                onAplicarFiltros={(newFilters) => {
                  setFiltros(newFilters);
                  setMenuAbierto(false);
                }}
                onClose={() => setMenuAbierto(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GRID DE PRODUCTOS */}
      <div className="grid flex-1 grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          <p className="text-center col-span-full">Cargando productos...</p>
        ) : productosFiltrados.length === 0 ? (
          <p className="text-center col-span-full">
            No se encontraron productos con esos filtros.
          </p>
        ) : (
          productosFiltrados.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} />
          ))
        )}
      </div>
    </div>
  );
};

export default Catalogo;
