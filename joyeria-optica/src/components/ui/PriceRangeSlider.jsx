import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * PriceRangeSlider - Slider de doble selector para rango de precios
 *
 * @param {number} min - Precio mínimo del rango total
 * @param {number} max - Precio máximo del rango total
 * @param {number} valueMin - Valor mínimo seleccionado actual
 * @param {number} valueMax - Valor máximo seleccionado actual
 * @param {function} onChange - Callback cuando cambia el rango: (min, max) => void
 * @param {string} currency - Símbolo de moneda (default: "€")
 * @param {number} step - Incremento del slider (default: 1)
 */
const PriceRangeSlider = ({
  min = 0,
  max = 1000,
  valueMin: initialMin,
  valueMax: initialMax,
  onChange,
  currency = "€",
  step = 1,
}) => {
  const [minValue, setMinValue] = useState(initialMin || min);
  const [maxValue, setMaxValue] = useState(initialMax || max);

  // Actualizar valores cuando cambien desde fuera
  useEffect(() => {
    if (initialMin !== undefined && initialMin !== minValue) {
      setMinValue(initialMin);
    }
  }, [initialMin]);

  useEffect(() => {
    if (initialMax !== undefined && initialMax !== maxValue) {
      setMaxValue(initialMax);
    }
  }, [initialMax]);

  // Calcular porcentajes para la barra de progreso
  const getPercent = (value) => {
    return ((value - min) / (max - min)) * 100;
  };

  const minPercent = getPercent(minValue);
  const maxPercent = getPercent(maxValue);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - step);
    setMinValue(value);
    onChange(
      value === min ? undefined : value,
      maxValue === max ? undefined : maxValue
    );
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + step);
    setMaxValue(value);
    onChange(
      minValue === min ? undefined : minValue,
      value === max ? undefined : value
    );
  };

  const handleMinInputChange = (e) => {
    const value =
      e.target.value === ""
        ? min
        : Math.min(Number(e.target.value), maxValue - step);
    setMinValue(value);
  };

  const handleMaxInputChange = (e) => {
    const value =
      e.target.value === ""
        ? max
        : Math.max(Number(e.target.value), minValue + step);
    setMaxValue(value);
  };

  const handleInputBlur = () => {
    // Validar y aplicar cambios cuando se pierde el foco
    const validMin = Math.max(min, Math.min(minValue, maxValue - step));
    const validMax = Math.min(max, Math.max(maxValue, minValue + step));

    setMinValue(validMin);
    setMaxValue(validMax);
    onChange(
      validMin === min ? undefined : validMin,
      validMax === max ? undefined : validMax
    );
  };

  const resetRange = () => {
    setMinValue(min);
    setMaxValue(max);
    onChange(undefined, undefined);
  };

  const isRangeActive = minValue !== min || maxValue !== max;

  return (
    <div className="space-y-4">
      {/* Estilos CSS para los thumbs del slider */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* Slider mínimo - thumb a la izquierda */
        .price-slider-min {
          pointer-events: none;
        }

        .price-slider-min::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: white;
          border: 3px solid black;
          border-radius: 50%;
          cursor: grab;
          pointer-events: auto;
          transition: all 0.15s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          position: relative;
          z-index: 5;
        }

        .price-slider-min::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
        }

        .price-slider-min::-webkit-slider-thumb:active {
          cursor: grabbing;
          background: #f3f4f6;
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .price-slider-min::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: white;
          border: 3px solid black;
          border-radius: 50%;
          cursor: grab;
          pointer-events: auto;
          transition: all 0.15s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }

        .price-slider-min::-moz-range-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
        }

        .price-slider-min::-moz-range-thumb:active {
          cursor: grabbing;
          background: #f3f4f6;
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        /* Slider máximo - thumb a la derecha */
        .price-slider-max {
          pointer-events: none;
        }

        .price-slider-max::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: white;
          border: 3px solid black;
          border-radius: 50%;
          cursor: grab;
          pointer-events: auto;
          transition: all 0.15s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          position: relative;
          z-index: 4;
        }

        .price-slider-max::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
        }

        .price-slider-max::-webkit-slider-thumb:active {
          cursor: grabbing;
          background: #f3f4f6;
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          z-index: 6;
        }

        .price-slider-max::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: white;
          border: 3px solid black;
          border-radius: 50%;
          cursor: grab;
          pointer-events: auto;
          transition: all 0.15s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }

        .price-slider-max::-moz-range-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
        }

        .price-slider-max::-moz-range-thumb:active {
          cursor: grabbing;
          background: #f3f4f6;
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        /* Ocultar el track nativo */
        .price-slider-min::-webkit-slider-runnable-track,
        .price-slider-max::-webkit-slider-runnable-track {
          background: transparent;
          border: none;
        }

        .price-slider-min::-moz-range-track,
        .price-slider-max::-moz-range-track {
          background: transparent;
          border: none;
        }

        /* Focus states */
        .price-slider-min:focus::-webkit-slider-thumb,
        .price-slider-max:focus::-webkit-slider-thumb {
          outline: 3px solid black;
          outline-offset: 3px;
        }

        .price-slider-min:focus::-moz-range-thumb,
        .price-slider-max:focus::-moz-range-thumb {
          outline: 3px solid black;
          outline-offset: 3px;
        }
      `,
        }}
      />

      {/* Inputs de precio */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="block mb-1 text-xs text-gray-600">Mínimo</label>
          <div className="relative">
            <input
              type="number"
              value={minValue}
              onChange={handleMinInputChange}
              onBlur={handleInputBlur}
              min={min}
              max={maxValue - step}
              step={step}
              className="w-full px-3 py-2 pr-8 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              aria-label={`Precio mínimo, valor actual ${minValue} ${currency}`}
            />
            <span className="absolute text-xs text-gray-500 transform -translate-y-1/2 right-3 top-1/2">
              {currency}
            </span>
          </div>
        </div>

        <div className="pt-5 text-gray-400" aria-hidden="true">
          —
        </div>

        <div className="flex-1">
          <label className="block mb-1 text-xs text-gray-600">Máximo</label>
          <div className="relative">
            <input
              type="number"
              value={maxValue}
              onChange={handleMaxInputChange}
              onBlur={handleInputBlur}
              min={minValue + step}
              max={max}
              step={step}
              className="w-full px-3 py-2 pr-8 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              aria-label={`Precio máximo, valor actual ${maxValue} ${currency}`}
            />
            <span className="absolute text-xs text-gray-500 transform -translate-y-1/2 right-3 top-1/2">
              {currency}
            </span>
          </div>
        </div>
      </div>

      {/* Slider doble */}
      <div className="px-2 pt-2 pb-1">
        <div className="relative h-2">
          {/* Track de fondo */}
          <div className="absolute w-full h-2 bg-gray-200 rounded-full" />

          {/* Track activo */}
          <motion.div
            className="absolute h-2 rounded-full bg-gradient-to-r from-black to-gray-800"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
            initial={false}
            animate={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
            transition={{ duration: 0.1 }}
          />

          {/* Contenedor para ambos sliders - SIN superposición */}
          <div className="relative">
            {/* Slider mínimo - Invertido para que el thumb esté a la izquierda */}
            <input
              type="range"
              min={min}
              max={max}
              value={minValue}
              step={step}
              onChange={handleMinChange}
              className="absolute w-full h-2 bg-transparent appearance-none price-slider-min"
              aria-label="Control deslizante de precio mínimo"
            />

            {/* Slider máximo */}
            <input
              type="range"
              min={min}
              max={max}
              value={maxValue}
              step={step}
              onChange={handleMaxChange}
              className="absolute w-full h-2 bg-transparent appearance-none price-slider-max"
              aria-label="Control deslizante de precio máximo"
            />
          </div>
        </div>

        {/* Etiquetas de rango */}
        <div className="flex justify-between mt-3 text-xs text-gray-500">
          <span>
            {min}
            {currency}
          </span>
          <span>
            {max}
            {currency}
          </span>
        </div>
      </div>

      {/* Botón reset */}
      {isRangeActive && (
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          onClick={resetRange}
          className="w-full px-3 py-2 text-sm font-medium text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
        >
          Restablecer rango
        </motion.button>
      )}

      {/* Valor seleccionado (visual) */}
      {isRangeActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-3 text-center rounded-lg bg-gray-50"
        >
          <p className="text-sm text-gray-600">
            Mostrando productos entre{" "}
            <span className="font-semibold text-gray-900">
              {minValue}
              {currency}
            </span>{" "}
            y{" "}
            <span className="font-semibold text-gray-900">
              {maxValue}
              {currency}
            </span>
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default PriceRangeSlider;
