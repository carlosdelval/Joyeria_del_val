import { useState, useEffect } from "react";
import { fetchProductos } from "../../api/productos";
import { useNavigate } from "react-router-dom";
import { sanitizeProductTitle } from "../../utils/helpers";

const Promocion = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Función para calcular descuento
  const calcularDescuento = (product) => {
    if (!product.precioAnterior || product.precioAnterior <= product.precio)
      return 0;
    return Math.round(
      ((product.precioAnterior - product.precio) / product.precioAnterior) * 100
    );
  };

  // Función para detectar si es Black Friday
  const esBlackFriday = (product) => {
    return product.categorias?.some(
      (cat) =>
        cat?.toLowerCase() === "black_friday" ||
        cat?.toLowerCase() === "black-friday"
    );
  };

  // Función para priorizar productos
  const priorizarProductos = (products) => {
    return products.sort((a, b) => {
      const aDescuento = calcularDescuento(a);
      const bDescuento = calcularDescuento(b);
      const aEsBlackFriday = esBlackFriday(a);
      const bEsBlackFriday = esBlackFriday(b);

      // 1. Black Friday con mayor descuento primero
      if (aEsBlackFriday && !bEsBlackFriday) return -1;
      if (!aEsBlackFriday && bEsBlackFriday) return 1;
      if (aEsBlackFriday && bEsBlackFriday) {
        return bDescuento - aDescuento; // Mayor descuento primero
      }

      // 2. Productos con mayor descuento (sin BF)
      if (aDescuento > 0 && bDescuento > 0) {
        return bDescuento - aDescuento;
      }
      if (aDescuento > 0 && bDescuento === 0) return -1;
      if (aDescuento === 0 && bDescuento > 0) return 1;

      // 3. Productos sin descuento - orden aleatorio para variedad
      return Math.random() - 0.5;
    });
  };

  // Función para añadir variedad visual (evitar colores/estilos repetidos)
  const aplicarVariedadVisual = (products) => {
    if (products.length <= 2) return products;

    const result = [products[0]];
    const remaining = products.slice(1);

    // Seleccionar productos intentando maximizar variedad
    while (result.length < 4 && remaining.length > 0) {
      const lastProduct = result[result.length - 1];
      let bestIndex = 0;
      let maxDifference = -1;

      // Buscar el producto más diferente al último
      for (let i = 0; i < remaining.length; i++) {
        const product = remaining[i];
        let difference = 0;

        // Diferencia por título (palabras diferentes)
        const lastWords = lastProduct.titulo?.toLowerCase().split(" ") || [];
        const currentWords = product.titulo?.toLowerCase().split(" ") || [];
        const commonWords = lastWords.filter((w) =>
          currentWords.includes(w)
        ).length;
        difference += lastWords.length + currentWords.length - 2 * commonWords;

        // Diferencia por precio (rango diferente)
        const priceDiff = Math.abs(lastProduct.precio - product.precio);
        difference += priceDiff / 100;

        if (difference > maxDifference) {
          maxDifference = difference;
          bestIndex = i;
        }
      }

      result.push(remaining[bestIndex]);
      remaining.splice(bestIndex, 1);
    }

    return result;
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProductos({
          categoria: ["relojes"],
        });

        // Filtrar solo relojes TOUS
        let tousWatches = data.filter(
          (product) => product.marca?.toLowerCase() === "tous"
        );

        // Aplicar priorización inteligente
        tousWatches = priorizarProductos(tousWatches);

        // Aplicar variedad visual y seleccionar 4
        tousWatches = aplicarVariedadVisual(tousWatches);

        setProductos(tousWatches.slice(0, 4)); // Mostrar solo 4 productos
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const goToProduct = (slug) => {
    window.scrollTo(0, 0);
    navigate(`/producto/${slug}`);
  };

  const goToCatalog = () => {
    window.scrollTo(0, 0);
    navigate("/catalogo/relojes?marca=tous");
  };

  if (loading)
    return <div className="py-12 text-center">Cargando promoción...</div>;

  if (productos.length === 0) return null;

  return (
    <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-8">
      {/* Banner principal */}
      <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px] overflow-hidden rounded-lg shadow-lg group">
        <img
          src="/promoRelojTous.jpg"
          alt="Promoción Relojes TOUS"
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white bg-black/40">
          <p className="mb-2 text-lg font-light tracking-widest uppercase sm:text-xl">
            Relojes TOUS
          </p>
          <h2 className="mb-2 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            10% DTO
          </h2>
          <p className="mb-6 text-xs tracking-widest uppercase sm:text-sm">
            Calidad Certificada
          </p>
          <button
            onClick={goToCatalog}
            className="px-6 py-3 text-sm font-medium tracking-wide uppercase transition-all duration-300 bg-white border-2 border-white cursor-pointer sm:px-8 sm:py-3 text-black hover:bg-transparent hover:text-white"
          >
            Ver Colección
          </button>
        </div>
      </div>

      {/* Grid de productos en oferta */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {productos.map((prod) => (
          <div
            key={prod.id}
            className="relative overflow-hidden transition-all duration-300 bg-white border border-gray-100 rounded-lg cursor-pointer group hover:shadow-lg hover:-translate-y-1"
            onClick={() => goToProduct(prod.slug)}
          >
            <div className="relative overflow-hidden aspect-square bg-gray-50">
              <img
                src={prod.imagenes[0]}
                alt={prod.titulo}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* Badge de Black Friday (prioridad) */}
              {prod.categorias?.some(
                (cat) =>
                  cat?.toLowerCase() === "black_friday" ||
                  cat?.toLowerCase() === "black-friday"
              ) && (
                <div className="absolute top-2 right-2 z-10 flex flex-col gap-1.5 items-end">
                  <div className="px-2 py-1 text-[10px] font-bold tracking-wider text-white uppercase bg-red-600 rounded shadow-md">
                    BLACK FRIDAY
                  </div>
                  {prod.precioAnterior && (
                    <div className="inline-block px-1.5 py-0.5 text-[10px] font-bold text-white bg-black rounded shadow-md">
                      -
                      {Math.round(
                        ((prod.precioAnterior - prod.precio) /
                          prod.precioAnterior) *
                          100
                      )}
                      %
                    </div>
                  )}
                </div>
              )}
              {/* Badge de descuento (solo si no es Black Friday) */}
              {prod.precioAnterior &&
                !prod.categorias?.some(
                  (cat) =>
                    cat?.toLowerCase() === "black_friday" ||
                    cat?.toLowerCase() === "black-friday"
                ) && (
                  <span className="absolute px-2 py-1 text-xs font-bold text-white bg-red-600 rounded top-2 right-2">
                    -
                    {Math.round(
                      ((prod.precioAnterior - prod.precio) /
                        prod.precioAnterior) *
                        100
                    )}
                    %
                  </span>
                )}
            </div>
            <div className="p-3 sm:p-4">
              <h3 className="mb-2 text-xs font-light tracking-wide text-gray-700 sm:text-sm line-clamp-2">
                {sanitizeProductTitle(prod.titulo)}
              </h3>
              <div className="flex items-baseline gap-2">
                <p className="text-sm font-medium text-black sm:text-base">
                  {prod.precio.toLocaleString("es-ES", {
                    style: "currency",
                    currency: "EUR",
                    minimumFractionDigits: 0,
                  })}
                </p>
                {(prod.precioAnterior ?? 0) > 0 && (
                  <p className="text-xs text-gray-400 line-through sm:text-sm">
                    {prod.precioAnterior.toLocaleString("es-ES", {
                      style: "currency",
                      currency: "EUR",
                      minimumFractionDigits: 0,
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promocion;
