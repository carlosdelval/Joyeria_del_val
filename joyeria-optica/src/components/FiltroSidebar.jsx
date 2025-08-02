import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const FiltroSidebar = ({
  onAplicarFiltros,
  onClose,
  filtrosIniciales = {},
  filtrosPorCategoria = {},
}) => {
  const [filtrosSeleccionados, setFiltrosSeleccionados] = useState({});
  const [rangoPrecio, setRangoPrecio] = useState([
    filtrosIniciales.precioMin || 0,
    filtrosIniciales.precioMax || 2000,
  ]);

  // ✅ Sincronizar filtros seleccionados al recibir nuevos filtrosIniciales
  useEffect(() => {
    setFiltrosSeleccionados((prev) => ({
      ...prev,
      ...filtrosIniciales,
    }));
    setRangoPrecio([
      filtrosIniciales.precioMin || 0,
      filtrosIniciales.precioMax || 2000,
    ]);
  }, [JSON.stringify(filtrosIniciales)]);

  const toggleOpcionFiltro = (filtroKey, opcion) => {
    setFiltrosSeleccionados((prev) => {
      const actuales = prev[filtroKey] || [];
      const nuevasOpciones = actuales.includes(opcion)
        ? actuales.filter((o) => o !== opcion)
        : [...actuales, opcion];
      return { ...prev, [filtroKey]: nuevasOpciones };
    });
  };

  const toggleBooleanoFiltro = (filtroKey) => {
    setFiltrosSeleccionados((prev) => ({
      ...prev,
      [filtroKey]: !prev[filtroKey],
    }));
  };

  const handlePrecioChange = (index, value) => {
    const newRango = [...rangoPrecio];
    newRango[index] = Number(value);
    setRangoPrecio(newRango);
  };

  const aplicarFiltros = () => {
    onAplicarFiltros({
      precioMin: rangoPrecio[0],
      precioMax: rangoPrecio[1],
      ...filtrosSeleccionados,
    });
    if (onClose) onClose();
  };

  const limpiarFiltros = () => {
    setRangoPrecio([0, 2000]);
    setFiltrosSeleccionados({});
    onAplicarFiltros({
      categorias: [],
      precioMin: 0,
      precioMax: 2000,
      ...Object.keys(filtrosPorCategoria).reduce((acc, key) => {
        acc[key] = [];
        return acc;
      }, {}),
    });
    if (onClose) onClose();
  };

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      transition={{ type: "spring", damping: 25 }}
      className="flex flex-col h-full bg-white border-r border-gray-100 w-72"
    >
      {/* Cabecera fija */}
      <div className="p-6 pb-4 border-b border-gray-100">
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
      </div>

      {/* Contenido principal con scroll solo si es necesario */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Sección Filtros */}
        {Object.entries(filtrosPorCategoria).map(([filtroKey, filtro]) => (
          <div key={filtroKey}>
            <h3 className="mb-3 text-xs font-medium tracking-wider text-gray-500 uppercase">
              {filtro.label}
            </h3>

            {filtro.type === "checkbox" && (
              <div className="grid gap-2">
                {filtro.options.map((opcion) => (
                  <label
                    key={opcion}
                    className="inline-flex items-center space-x-3 cursor-pointer"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={
                          filtrosSeleccionados[filtroKey]?.includes(opcion) ||
                          false
                        }
                        onChange={() => toggleOpcionFiltro(filtroKey, opcion)}
                        className="absolute w-0 h-0 opacity-0"
                      />
                      <div
                        className={`w-5 h-5 border ${
                          filtrosSeleccionados[filtroKey]?.includes(opcion)
                            ? "bg-black border-black"
                            : "border-gray-300"
                        } flex items-center justify-center`}
                      >
                        {filtrosSeleccionados[filtroKey]?.includes(opcion) && (
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
                      {opcion}
                    </span>
                  </label>
                ))}
              </div>
            )}

            {filtro.type === "boolean" && (
              <label className="inline-flex items-center mt-2 space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!filtrosSeleccionados[filtroKey]}
                  onChange={() => toggleBooleanoFiltro(filtroKey)}
                  className="w-4 h-4 text-black border-gray-300 rounded"
                />
                <span className="text-sm font-light text-gray-700">
                  {filtro.label}
                </span>
              </label>
            )}
          </div>
        ))}

        {/* Sección Slider de precio */}
        <div>
          <h3 className="mb-3 text-xs font-medium tracking-wider text-gray-500 uppercase">
            Rango de Precio
          </h3>
          <div className="px-2">
            <div className="relative h-2 mb-6 bg-gray-200 rounded-full">
              <div
                className="absolute h-full bg-black rounded-full"
                style={{
                  left: `${(rangoPrecio[0] / 2000) * 100}%`,
                  width: `${((rangoPrecio[1] - rangoPrecio[0]) / 2000) * 100}%`,
                }}
              />
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
            <div className="flex justify-between mt-1 text-sm text-gray-600">
              <span>€{rangoPrecio[0]}</span>
              <span>€{rangoPrecio[1]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Botones fijos en la parte inferior */}
      <div className="p-6 pt-4 border-t border-gray-100">
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={aplicarFiltros}
            className="flex-1 py-2.5 text-sm font-light tracking-wider text-white bg-black rounded-sm hover:bg-gray-800"
          >
            APLICAR
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={limpiarFiltros}
            className="flex-1 py-2.5 text-sm font-light tracking-wider text-black border border-black rounded-sm hover:bg-gray-100"
          >
            LIMPIAR
          </motion.button>
        </div>
      </div>
    </motion.aside>
  );
};
export default FiltroSidebar;
