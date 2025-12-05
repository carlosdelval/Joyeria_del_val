import { useState, useEffect } from "react";
import { fetchProductos } from "../../api/productos";
import { useNavigate } from "react-router-dom";
import { sanitizeProductTitle, calculateDiscount } from "../../utils/helpers";

const Promocion = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Función para calcular descuento
  const calcularDescuento = (product) => {
    if (!product.precioAnterior || product.precioAnterior <= product.precio)
      return 0;
    return calculateDiscount(product.precioAnterior, product.precio);
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
    <div className="w-full">
      <div className="grid items-stretch lg:grid-cols-2">
        {/* Banner principal - Lado izquierdo */}
        <div
          onClick={goToCatalog}
          className="relative w-full h-full min-h-[500px] lg:min-h-[600px] overflow-hidden group cursor-pointer"
        >
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
              className="px-8 py-4 text-base font-light tracking-wide uppercase transition-all duration-300 bg-white border-2 border-white cursor-pointer text-black hover:bg-transparent hover:text-white"
            >
              Ver Colección
            </button>
          </div>
        </div>

        {/* Contenido - Lado derecho */}
        <div className="flex flex-col justify-center px-8 py-12 lg:px-12 xl:px-16">
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px bg-gray-300"></div>
              <h2 className="text-2xl font-light tracking-widest text-black uppercase sm:text-3xl">
                TOUS Relojería
              </h2>
              <div className="w-12 h-px bg-gray-300"></div>
            </div>
            <p className="max-w-2xl mx-auto text-base font-light text-gray-600">
              Conoce la elegancia y el estilo atemporal de los relojes TOUS, con
              descuentos desde un 10%.
            </p>
          </div>

          {/* Grid de productos */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {productos.map((prod) => (
              <div
                key={prod.id}
                className="relative p-3 transition-all duration-300 bg-white border-2 border-gray-200 cursor-pointer group hover:border-black"
                onClick={() => goToProduct(prod.slug)}
              >
                <div className="relative mb-3 overflow-hidden">
                  <img
                    src={prod.imagenes[0]}
                    alt={prod.titulo}
                    className="object-contain w-full transition-transform duration-300 aspect-square group-hover:scale-105"
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
                          -{calcularDescuento(prod)}%
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
                        -{calcularDescuento(prod)}%
                      </span>
                    )}
                </div>
                <p className="mb-2 text-sm font-light text-black line-clamp-2">
                  {sanitizeProductTitle(prod.titulo)}
                </p>

                <div className="flex items-center gap-2">
                  <p className="text-base font-light text-black">
                    {prod.precio.toLocaleString("es-ES", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </p>
                  {(prod.precioAnterior ?? 0) > 0 && (
                    <p className="text-xs font-light text-gray-400 line-through">
                      {prod.precioAnterior.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promocion;
