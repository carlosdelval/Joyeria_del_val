// src/components/FiltroSidebar.jsx
import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const FiltroSidebar = ({
  categoriasDisponibles = [],
  onAplicarFiltros,
  onClose,
  filtrosIniciales = {},
}) => {
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState(
    filtrosIniciales.categorias || []
  );
  const [rangoPrecio, setRangoPrecio] = useState([
    filtrosIniciales.precioMin || 0,
    filtrosIniciales.precioMax || 2000,
  ]);

  const toggleCategoria = (cat) => {
    setCategoriasSeleccionadas((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handlePrecioChange = (index, value) => {
    const newRango = [...rangoPrecio];
    newRango[index] = Number(value);
    setRangoPrecio(newRango);
  };

  const aplicarFiltros = () => {
    onAplicarFiltros({
      categorias: categoriasSeleccionadas,
      precioMin: rangoPrecio[0],
      precioMax: rangoPrecio[1],
    });
    if (onClose) onClose();
  };

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      transition={{ type: "spring", damping: 25 }}
      className="h-full p-6 space-y-8 bg-white border-r border-gray-100 w-72"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-light tracking-wider text-black">
          FILTROS
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-black"
            aria-label="Cerrar filtros"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Sección Categorías */}
      <div>
        <h3 className="mb-4 text-xs font-medium tracking-wider text-gray-500 uppercase">
          Categorías
        </h3>
        <div className="flex flex-col gap-3">
          {categoriasDisponibles.map((cat) => (
            <motion.label
              key={cat}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center space-x-3 cursor-pointer"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={categoriasSeleccionadas.includes(cat)}
                  onChange={() => toggleCategoria(cat)}
                  className="absolute w-0 h-0 opacity-0"
                />
                <div
                  className={`w-5 h-5 border ${
                    categoriasSeleccionadas.includes(cat)
                      ? "bg-black border-black"
                      : "border-gray-300"
                  } flex items-center justify-center`}
                >
                  {categoriasSeleccionadas.includes(cat) && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm font-light tracking-wide text-gray-700 capitalize">
                {cat}
              </span>
            </motion.label>
          ))}
        </div>
      </div>

      {/* Sección Slider de precio */}
      <div>
        <h3 className="mb-4 text-xs font-medium tracking-wider text-gray-500 uppercase">
          Rango de Precio
        </h3>
        <div className="px-2">
          <div className="relative h-2 mb-8 bg-gray-200 rounded-full">
            {/* Barra de rango activo */}
            <div
              className="absolute h-full bg-black rounded-full"
              style={{
                left: `${(rangoPrecio[0] / 2000) * 100}%`,
                width: `${((rangoPrecio[1] - rangoPrecio[0]) / 2000) * 100}%`,
              }}
            />
            {/* Handle mínimo */}
            <motion.div
              drag="x"
              dragElastic={0}
              dragMomentum={false}
              dragConstraints={{
                left: 0,
                right: 0,
              }}
              onDrag={(e) => {
                const container = e.target.parentElement;
                const rect = container.getBoundingClientRect();
                const percentage = Math.max(
                  0,
                  Math.min(1, (e.clientX - rect.left) / rect.width)
                );
                const newValue = Math.round(percentage * 2000);
                if (newValue < rangoPrecio[1]) {
                  handlePrecioChange(0, newValue);
                }
              }}
              className="absolute w-5 h-5 bg-white border-2 border-black rounded-full cursor-grab active:cursor-grabbing shadow-sm -mt-1.5"
              style={{
                left: `${(rangoPrecio[0] / 2000) * 100}%`,
                transform: "translateX(-50%)",
              }}
            />
            {/* Handle máximo */}
            <motion.div
              drag="x"
              dragElastic={0}
              dragMomentum={false}
              dragConstraints={{
                left: 0,
                right: 0,
              }}
              onDrag={(e) => {
                const container = e.target.parentElement;
                const rect = container.getBoundingClientRect();
                const percentage = Math.max(
                  0,
                  Math.min(1, (e.clientX - rect.left) / rect.width)
                );
                const newValue = Math.round(percentage * 2000);
                if (newValue > rangoPrecio[0]) {
                  handlePrecioChange(1, newValue);
                }
              }}
              className="absolute w-5 h-5 bg-white border-2 border-black rounded-full cursor-grab active:cursor-grabbing shadow-sm -mt-1.5"
              style={{
                left: `${(rangoPrecio[1] / 2000) * 100}%`,
                transform: "translateX(-50%)",
              }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>€{rangoPrecio[0]}</span>
            <span>€{rangoPrecio[1]}</span>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={aplicarFiltros}
        className="w-full py-3 mt-6 text-sm font-light tracking-wider text-white bg-black rounded-sm hover:bg-gray-800"
      >
        APLICAR FILTROS
      </motion.button>
    </motion.aside>
  );
};

export default FiltroSidebar;
