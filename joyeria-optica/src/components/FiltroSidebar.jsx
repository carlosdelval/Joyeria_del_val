import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { filtrosPorCategoria } from "../data/filtrosPorCategoria";

// Iconos SVG simples
const ChevronDownIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const ChevronUpIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 15l7-7 7 7"
    />
  </svg>
);

const XMarkIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const FunnelIcon = ({ className }) => (
  <svg
    className={className}
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
);

const FiltroSidebar = ({
  categoria,
  filtros,
  onFiltroChange,
  isOpen,
  onToggle,
  totalProducts = 0,
  esResultadoBusqueda = false,
}) => {
  const [openSections, setOpenSections] = useState({});
  const [localFilters, setLocalFilters] = useState(filtros);

  // Crear filtros básicos si no existen para la categoría
  const getFiltersForCategory = (cat) => {
    if (filtrosPorCategoria[cat]) {
      return filtrosPorCategoria[cat];
    }

    // Filtros básicos por defecto para cualquier categoría
    console.warn(
      `No hay filtros específicos definidos para la categoría: ${cat}. Usando filtros básicos.`
    );
    return {};
  };

  // Initialize open sections based on priority (open high priority by default)
  useEffect(() => {
    if (categoria) {
      const categoryFilters = getFiltersForCategory(categoria);
      const initialOpenSections = {};

      Object.entries(categoryFilters).forEach(([key, filter]) => {
        // Open filters with priority 1-3 by default
        if (filter.priority <= 3) {
          initialOpenSections[key] = true;
        }
      });

      setOpenSections(initialOpenSections);
    }
  }, [categoria]);

  useEffect(() => {
    setLocalFilters(filtros);
  }, [filtros]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterChange = (filterKey, value, isChecked) => {
    const newFilters = { ...localFilters };

    if (!newFilters[filterKey]) {
      newFilters[filterKey] = [];
    }

    if (isChecked) {
      if (!newFilters[filterKey].includes(value)) {
        newFilters[filterKey] = [...newFilters[filterKey], value];
      }
    } else {
      newFilters[filterKey] = newFilters[filterKey].filter(
        (item) => item !== value
      );
      if (newFilters[filterKey].length === 0) {
        delete newFilters[filterKey];
      }
    }

    setLocalFilters(newFilters);
    onFiltroChange(newFilters);
  };

  const handleRangeChange = (filterKey, min, max) => {
    const newFilters = { ...localFilters };

    if (min !== undefined || max !== undefined) {
      newFilters[filterKey] = { min, max };
    } else {
      delete newFilters[filterKey];
    }

    setLocalFilters(newFilters);
    onFiltroChange(newFilters);
  };

  const handleBooleanChange = (filterKey, value) => {
    const newFilters = { ...localFilters };

    if (value) {
      newFilters[filterKey] = true;
    } else {
      delete newFilters[filterKey];
    }

    setLocalFilters(newFilters);
    onFiltroChange(newFilters);
  };

  const clearAllFilters = () => {
    setLocalFilters({});
    onFiltroChange({});
  };

  const clearFilter = (filterKey) => {
    const newFilters = { ...localFilters };
    delete newFilters[filterKey];
    setLocalFilters(newFilters);
    onFiltroChange(newFilters);
  };

  const renderFilterContent = (key, filter) => {
    const currentValues = localFilters[key] || [];

    switch (filter.type) {
      case "checkbox":
        return (
          <div className="space-y-2">
            {filter.options.map((option) => {
              const optionValue =
                typeof option === "string" ? option : option.value;
              const optionLabel =
                typeof option === "string" ? option : option.label;
              const optionCount =
                typeof option === "object" ? option.count : null;
              const isChecked = currentValues.includes(optionValue);

              return (
                <label
                  key={optionValue}
                  className="flex items-center justify-between p-1 transition-colors rounded cursor-pointer hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleFilterChange(key, optionValue, e.target.checked)
                      }
                      className="w-4 h-4 border-gray-300 rounded text-amber-600 focus:ring-amber-500"
                      aria-label={optionLabel}
                    />
                    <span
                      className={`text-sm ${
                        isChecked
                          ? "font-medium text-gray-900"
                          : "text-gray-700"
                      }`}
                      aria-hidden="true"
                    >
                      {optionLabel}
                    </span>
                  </div>
                  {optionCount && (
                    <span
                      className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded-full"
                      aria-label={`${optionCount} productos disponibles`}
                    >
                      {optionCount}
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        );

      case "range": {
        const currentRange = currentValues;
        return (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder={`Min ${filter.unit || ""}`}
                value={currentRange?.min || ""}
                onChange={(e) => {
                  const min = e.target.value
                    ? Number(e.target.value)
                    : undefined;
                  handleRangeChange(key, min, currentRange?.max);
                }}
                className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                min={filter.min}
                max={filter.max}
                aria-label={`Valor mínimo de ${filter.label} en ${
                  filter.unit || "unidades"
                }`}
              />
              <span className="text-gray-500" aria-hidden="true">
                -
              </span>
              <input
                type="number"
                placeholder={`Max ${filter.unit || ""}`}
                value={currentRange?.max || ""}
                onChange={(e) => {
                  const max = e.target.value
                    ? Number(e.target.value)
                    : undefined;
                  handleRangeChange(key, currentRange?.min, max);
                }}
                className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                min={filter.min}
                max={filter.max}
                aria-label={`Valor máximo de ${filter.label} en ${
                  filter.unit || "unidades"
                }`}
              />
            </div>
            <div className="text-xs text-gray-500" role="note">
              Rango: {filter.min} - {filter.max} {filter.unit}
            </div>
          </div>
        );
      }

      case "boolean": {
        const isActive = !!currentValues;
        return (
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => handleBooleanChange(key, e.target.checked)}
              className="w-4 h-4 border-gray-300 rounded text-amber-600 focus:ring-amber-500"
              aria-label={filter.label}
            />
            <span
              className={`ml-2 text-sm ${
                isActive ? "font-medium text-gray-900" : "text-gray-700"
              }`}
              aria-hidden="true"
            >
              Sí
            </span>
          </label>
        );
      }

      default:
        return null;
    }
  };

  const getAppliedFiltersDisplay = () => {
    const appliedFilters = [];

    Object.entries(localFilters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        appliedFilters.push({
          key,
          label: filtrosPorCategoria[categoria]?.[key]?.label || key,
          count: value.length,
        });
      } else if (typeof value === "object" && (value.min || value.max)) {
        appliedFilters.push({
          key,
          label: filtrosPorCategoria[categoria]?.[key]?.label || key,
          count: 1,
        });
      } else if (value === true) {
        appliedFilters.push({
          key,
          label: filtrosPorCategoria[categoria]?.[key]?.label || key,
          count: 1,
        });
      }
    });

    return appliedFilters;
  };

  if (!categoria) {
    return null;
  }

  const categoryFilters = getFiltersForCategory(categoria);
  const globalFilters = filtrosPorCategoria.global || {};

  // Sort filters by priority
  const sortedCategoryFilters = Object.entries(categoryFilters).sort(
    ([, a], [, b]) => (a.priority || 999) - (b.priority || 999)
  );
  const sortedGlobalFilters = Object.entries(globalFilters).sort(
    ([, a], [, b]) => (a.priority || 999) - (b.priority || 999)
  );

  const appliedFiltersDisplay = getAppliedFiltersDisplay();

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="mb-4 lg:hidden">
        <button
          onClick={onToggle}
          className="flex items-center justify-between w-full px-4 py-3 transition-shadow bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-black"
          aria-expanded={isOpen}
          aria-controls="filtro-sidebar"
          aria-label={`${isOpen ? "Cerrar" : "Abrir"} panel de filtros${
            appliedFiltersDisplay.length > 0
              ? `, ${appliedFiltersDisplay.length} filtros aplicados`
              : ""
          }`}
        >
          <div className="flex items-center space-x-2">
            <FunnelIcon className="w-5 h-5 text-gray-600" aria-hidden="true" />
            <span className="font-medium text-gray-900">Filtros</span>
            {appliedFiltersDisplay.length > 0 && (
              <span
                className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800"
                role="status"
                aria-label={`${appliedFiltersDisplay.length} filtros activos`}
              >
                {appliedFiltersDisplay.length}
              </span>
            )}
          </div>
          <span className="text-sm text-gray-500" aria-live="polite">
            {totalProducts} productos
          </span>
        </button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen ||
          (typeof window !== "undefined" && window.innerWidth >= 1024)) && (
          <motion.div
            id="filtro-sidebar"
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 shadow-xl w-80 lg:relative lg:inset-auto lg:z-auto lg:w-full lg:shadow-none"
            role="region"
            aria-label="Panel de filtros de productos"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <FunnelIcon
                  className="w-5 h-5 text-gray-600"
                  aria-hidden="true"
                />
                <h3 className="font-semibold text-gray-900">Filtros</h3>
                {appliedFiltersDisplay.length > 0 && (
                  <span
                    className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800"
                    role="status"
                  >
                    {appliedFiltersDisplay.length}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {appliedFiltersDisplay.length > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-medium text-amber-600 hover:text-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded px-2 py-1"
                    aria-label="Limpiar todos los filtros aplicados"
                  >
                    Limpiar todo
                  </button>
                )}
                <button
                  onClick={onToggle}
                  className="p-1 rounded-md lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                  aria-label="Cerrar panel de filtros"
                >
                  <XMarkIcon
                    className="w-5 h-5 text-gray-500"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            {/* Results Summary */}
            <div
              className="px-4 py-3 text-sm text-gray-600 border-b border-gray-200 bg-gray-50"
              role="status"
              aria-live="polite"
            >
              {totalProducts} productos encontrados
            </div>

            {/* Info sobre filtros detectados en búsqueda */}
            {esResultadoBusqueda && categoria !== "todos" && (
              <div
                className="px-4 py-3 text-sm border-b border-gray-200 bg-blue-50"
                role="status"
              >
                <div className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="flex-1">
                    <p className="font-medium text-blue-900">
                      Filtros de{" "}
                      {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                    </p>
                    <p className="mt-1 text-xs text-blue-700">
                      Mostrando filtros específicos detectados en tus resultados
                      de búsqueda
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Applied Filters */}
            {appliedFiltersDisplay.length > 0 && (
              <div
                className="p-4 border-b border-gray-200"
                role="region"
                aria-label="Filtros aplicados actualmente"
              >
                <h4 className="mb-2 text-sm font-medium text-gray-900">
                  Filtros aplicados:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {appliedFiltersDisplay.map(({ key, label, count }) => (
                    <span
                      key={key}
                      className="inline-flex items-center px-3 py-1 text-xs rounded-full bg-amber-100 text-amber-800"
                      role="status"
                    >
                      {label} {count > 1 && `(${count})`}
                      <button
                        onClick={() => clearFilter(key)}
                        className="ml-2 hover:bg-amber-200 rounded-full p-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        aria-label={`Eliminar filtro ${label}`}
                      >
                        <XMarkIcon className="w-3 h-3" aria-hidden="true" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-6">
                {/* Category Specific Filters */}
                {sortedCategoryFilters.map(([key, filter]) => {
                  // Skip filters that don't apply to current selection
                  if (filter.applicableFor && localFilters.tipo) {
                    const hasApplicableType = filter.applicableFor.some(
                      (type) => localFilters.tipo.includes(type)
                    );
                    if (!hasApplicableType) return null;
                  }

                  // Skip dependent filters if dependency not met
                  if (filter.dependsOn && !localFilters[filter.dependsOn]) {
                    return null;
                  }

                  const isOpen = openSections[key];
                  const hasActiveFilters =
                    localFilters[key] &&
                    ((Array.isArray(localFilters[key]) &&
                      localFilters[key].length > 0) ||
                      (typeof localFilters[key] === "object" &&
                        (localFilters[key].min || localFilters[key].max)) ||
                      localFilters[key] === true);

                  return (
                    <div key={key} className="pb-4 border-b border-gray-100">
                      <button
                        onClick={() => toggleSection(key)}
                        className="flex items-center justify-between w-full text-left group focus:outline-none focus:ring-2 focus:ring-amber-500 rounded p-1"
                        aria-expanded={isOpen}
                        aria-controls={`filter-section-${key}`}
                      >
                        <span
                          className={`font-medium ${
                            hasActiveFilters
                              ? "text-amber-700"
                              : "text-gray-900"
                          } group-hover:text-amber-600`}
                        >
                          {filter.label}
                        </span>
                        <div className="flex items-center space-x-2">
                          {hasActiveFilters && (
                            <span
                              className="w-2 h-2 rounded-full bg-amber-500"
                              aria-label="Filtro activo"
                            ></span>
                          )}
                          {isOpen ? (
                            <ChevronUpIcon
                              className="w-4 h-4 text-gray-500"
                              aria-hidden="true"
                            />
                          ) : (
                            <ChevronDownIcon
                              className="w-4 h-4 text-gray-500"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            id={`filter-section-${key}`}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-3 overflow-hidden"
                            role="group"
                            aria-label={`Opciones de filtro para ${filter.label}`}
                          >
                            {renderFilterContent(key, filter)}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {/* Global Filters */}
                {sortedGlobalFilters.length > 0 && (
                  <>
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="mb-4 font-medium text-gray-900">
                        Filtros generales
                      </h4>
                    </div>
                    {sortedGlobalFilters.map(([key, filter]) => {
                      const isOpenGlobal = openSections[key] !== false; // Default open for global filters
                      const hasActiveFilters =
                        localFilters[key] &&
                        ((Array.isArray(localFilters[key]) &&
                          localFilters[key].length > 0) ||
                          (typeof localFilters[key] === "object" &&
                            (localFilters[key].min || localFilters[key].max)) ||
                          localFilters[key] === true);

                      return (
                        <div
                          key={key}
                          className="pb-4 border-b border-gray-100"
                        >
                          <button
                            onClick={() => toggleSection(key)}
                            className="flex items-center justify-between w-full text-left group focus:outline-none focus:ring-2 focus:ring-amber-500 rounded p-1"
                            aria-expanded={isOpenGlobal}
                            aria-controls={`filter-section-global-${key}`}
                          >
                            <span
                              className={`font-medium ${
                                hasActiveFilters
                                  ? "text-amber-700"
                                  : "text-gray-900"
                              } group-hover:text-amber-600`}
                            >
                              {filter.label}
                            </span>
                            <div className="flex items-center space-x-2">
                              {hasActiveFilters && (
                                <span
                                  className="w-2 h-2 rounded-full bg-amber-500"
                                  aria-label="Filtro activo"
                                ></span>
                              )}
                              {isOpenGlobal ? (
                                <ChevronUpIcon
                                  className="w-4 h-4 text-gray-500"
                                  aria-hidden="true"
                                />
                              ) : (
                                <ChevronDownIcon
                                  className="w-4 h-4 text-gray-500"
                                  aria-hidden="true"
                                />
                              )}
                            </div>
                          </button>

                          <AnimatePresence>
                            {isOpenGlobal && (
                              <motion.div
                                id={`filter-section-global-${key}`}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="mt-3 overflow-hidden"
                                role="group"
                                aria-label={`Opciones de filtro para ${filter.label}`}
                              >
                                {renderFilterContent(key, filter)}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default FiltroSidebar;
