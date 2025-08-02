import React, { useState, useMemo, useEffect, useRef } from "react";
import { useProductos } from "../hooks/useProductos";
import FiltroSidebar from "../components/FiltroSidebar";
import ProductoCard from "../components/ProductoCard";
import { useLocation, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { filtrosPorCategoria } from "../data/filtrosPorCategoria";

const categoriasDisponibles = [
  "anillos",
  "pendientes",
  "colgantes",
  "infantil",
  "diamantes",
  "bodas",
  "reloj",
  "bebe",
  "comunion",
  "tous",
  "pulseras",
  "relojes",
  "rebajas",
  "joyas",
  "oro",
  "plata",
  "plata-925",
  "alianzas",
  "gafas",
  "gafas de sol",
];

const Catalogo = () => {
  const location = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const searchTerm = searchParams.get("search") || "";
  const categoriaActiva = searchParams.get("categoria") || "";

  const categoriasSeleccionadas = useMemo(() => {
    const catsParam = searchParams.get("categorias");
    const singleCat = searchParams.get("categoria");

    const categoriasRaw = catsParam
      ? catsParam.split(",")
      : singleCat
      ? [singleCat]
      : [];

    return categoriasRaw
      .map((c) => c.trim().toLowerCase())
      .filter((c) => categoriasDisponibles.includes(c));
  }, [searchParams]);

  const obtenerFiltrosDesdeParams = (params, filtrosConfig) => {
    const filtrosAplicados = {};
    for (const [key, config] of Object.entries(filtrosConfig)) {
      if (config.type === "boolean") {
        filtrosAplicados[key] = params.get(key) === "true";
      } else if (config.type === "checkbox") {
        const valor = params.get(key);
        if (valor) {
          filtrosAplicados[key] = valor.split(",");
        }
      }
    }
    return filtrosAplicados;
  };

  const categoriaPrincipal = categoriasSeleccionadas[0] || null;
  const filtrosDinamicos =
    categoriaPrincipal && filtrosPorCategoria[categoriaPrincipal]
      ? filtrosPorCategoria[categoriaPrincipal]
      : {};

  const [precioMin, setPrecioMin] = useState(0);
  const [precioMax, setPrecioMax] = useState(2000);

  const filtrosSeleccionados = useMemo(() => {
    return obtenerFiltrosDesdeParams(searchParams, filtrosDinamicos);
  }, [searchParams, filtrosDinamicos]);

  const { productos, loading } = useProductos(
    {
      categoria: categoriasSeleccionadas,
      busqueda: searchTerm,
      ...filtrosSeleccionados,
    },
    location.search
  ); // <- esto fuerza el refetch al cambiar la URL

  const prevProductos = useRef([]);
  useEffect(() => {
    if (!loading && productos.length) {
      prevProductos.current = productos;
    }
  }, [loading, productos]);

  const productosFiltrados = (
    loading ? prevProductos.current : productos
  ).filter((p) => p.precio >= precioMin && p.precio <= precioMax);

  const aplicarFiltros = ({
    categorias,
    precioMin,
    precioMax,
    ...otrosFiltros
  }) => {
    const nuevaURL = new URLSearchParams(location.search);

    if (categorias && categorias.length > 0) {
      nuevaURL.set("categorias", categorias.join(","));
    } else {
      nuevaURL.delete("categorias");
    }

    if (searchTerm) {
      nuevaURL.set("search", searchTerm);
    }

    // Guardar los filtros dinámicos en la URL
    Object.entries(otrosFiltros).forEach(([key, value]) => {
      if (typeof value === "boolean") {
        nuevaURL.set(key, value.toString());
      } else if (Array.isArray(value) && value.length > 0) {
        nuevaURL.set(key, value.join(","));
      } else {
        nuevaURL.delete(key);
      }
    });

    navigate(`/catalogo?${nuevaURL.toString()}`);
    setPrecioMin(precioMin);
    setPrecioMax(precioMax);
  };

  return (
    <div className="container px-4 mx-auto max-w-7xl">
      <div className="flex flex-col min-h-screen bg-white lg:flex-row">
        {/* Sidebar — desktop */}
        <aside className="hidden lg:block lg:w-80 lg:min-w-[320px] lg:pr-8 lg:py-8 lg:sticky lg:top-20 lg:self-start lg:h-[calc(100vh-80px)]">
          <FiltroSidebar
            categoriasDisponibles={categoriasDisponibles}
            categoriaActiva={categoriaActiva}
            filtrosIniciales={{
              categorias: categoriasSeleccionadas,
              precioMin,
              precioMax,
              ...filtrosSeleccionados,
            }}
            filtrosPorCategoria={filtrosDinamicos}
            onAplicarFiltros={aplicarFiltros}
          />
        </aside>

        {/* Grid de productos */}
        <section className="flex-1 px-4 py-6 lg:pl-0 lg:pr-8 lg:py-8">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-900 capitalize lg:text-3xl">
              {categoriaPrincipal}
            </h1>
            {loading ? (
              <p className="mt-1 text-sm text-gray-500">
                Cargando productos...
              </p>
            ) : (
              <p className="mt-1 text-sm text-gray-500 lg:text-base">
                {productosFiltrados.length} productos
              </p>
            )}
          </header>

          {/* Botón filtros — móvil */}
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

          <AnimatePresence mode="popLayout">
            {loading && !prevProductos.current.length ? (
              <motion.div
                key="spinner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-20 col-span-full"
              >
                <div className="w-8 h-8 border-2 border-black rounded-full animate-spin border-t-transparent" />
              </motion.div>
            ) : productosFiltrados.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center col-span-full"
              >
                <p className="text-gray-600">No se encontraron productos</p>
                {searchTerm && (
                  <p className="mt-2 text-gray-500">Búsqueda: “{searchTerm}”</p>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                layout
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
              >
                <AnimatePresence mode="popLayout">
                  {productosFiltrados.map((producto) => (
                    <motion.div
                      key={producto.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        duration: 0.25,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                    >
                      <ProductoCard producto={producto} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
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
                categoriasDisponibles={categoriasDisponibles}
                categoriaActiva={categoriaActiva}
                filtrosIniciales={{
                  categorias: categoriasSeleccionadas,
                  precioMin,
                  precioMax,
                  ...filtrosSeleccionados,
                }}
                filtrosPorCategoria={filtrosDinamicos}
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
  );
};

export default Catalogo;
