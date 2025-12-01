import { useState, useEffect, useCallback } from "react";
import { fetchProductos } from "../../api/productos";
import { useNavigate } from "react-router-dom";
import { calculateDiscount } from "../../utils/helpers";

export default function ColeccionTous() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);

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

  // Función para priorizar productos (memoizada)
  const priorizarProductos = useCallback((products) => {
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
  }, []);

  // Función para añadir variedad visual (memoizada)
  const aplicarVariedadVisual = useCallback((products) => {
    const result = [];
    const used = new Set();
    const remaining = [...products];

    // Primer producto
    if (remaining.length > 0) {
      result.push(remaining[0]);
      used.add(0);
    }

    // Resto: evitar productos muy similares consecutivamente
    while (
      result.length < products.length &&
      remaining.length > result.length
    ) {
      const lastProduct = result[result.length - 1];
      let bestIndex = -1;
      let maxDifference = -1;

      // Buscar el producto más diferente al último
      for (let i = 0; i < remaining.length; i++) {
        if (used.has(i)) continue;

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

      if (bestIndex !== -1) {
        result.push(remaining[bestIndex]);
        used.add(bestIndex);
      } else {
        // Fallback: tomar el siguiente no usado
        for (let i = 0; i < remaining.length; i++) {
          if (!used.has(i)) {
            result.push(remaining[i]);
            used.add(i);
            break;
          }
        }
      }
    }

    return result;
  }, []);

  // Cargar bolsos TOUS
  useEffect(() => {
    const loadTousProducts = async () => {
      try {
        const allProducts = await fetchProductos({ categoria: ["bolsos"] });
        // Filtrar solo bolsos de la marca TOUS
        let tousBags = allProducts.filter(
          (product) => product.marca?.toLowerCase() === "tous"
        );

        // Aplicar priorización inteligente
        tousBags = priorizarProductos(tousBags);

        // Aplicar variedad visual
        tousBags = aplicarVariedadVisual(tousBags);

        setProducts(tousBags);
      } catch (error) {
        console.error("Error cargando bolsos TOUS:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTousProducts();
  }, []);

  // Ajustar slides según tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(4);
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navegación entre slides
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= products.length - slidesToShow ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - slidesToShow : prevIndex - 1
    );
  };

  // Handlers para touch (móvil)
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) nextSlide();
    if (touchStart - touchEnd < -50) prevSlide();
  };

  // Navegar a página de producto
  const goToProduct = (slug) => {
    setIsNavigating(true);
    window.scrollTo(0, 0);
    navigate(`/producto/${slug}`, {
      state: { fromCarousel: true },
    });
  };

  // Navegar al catálogo
  const goToCatalog = () => {
    window.scrollTo(0, 0);
    navigate("/catalogo/bolsos?marca=Tous");
  };

  // Preload images on mount and when currentIndex changes
  useEffect(() => {
    if (products.length === 0) return;

    // Preload next and previous images
    const nextIndex = (currentIndex + slidesToShow) % products.length;
    const prevIndex =
      currentIndex === 0 ? products.length - 1 : currentIndex - 1;

    [nextIndex, prevIndex].forEach((idx) => {
      const product = products[idx];
      if (product?.imagenes?.[0]) {
        const img = new Image();
        img.src = product.imagenes[0];
      }
    });
  }, [currentIndex, products, slidesToShow]);

  // Auto-rotación
  useEffect(() => {
    if (products.length === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, slidesToShow, products]);

  if (loading)
    return <div className="py-12 text-center">Cargando colección...</div>;
  if (products.length === 0)
    return (
      <div className="py-12 text-center">
        No hay productos en esta colección
      </div>
    );

  return (
    <div className="flex flex-col w-full gap-6 md:flex-row">
      {/* Sección de texto */}
      <div className="w-full md:w-1/5">
        <h2 className="mb-3 text-3xl font-bold text-black">Bolsos TOUS</h2>
        <p className="text-gray-600">
          Descubre nuestra exclusiva selección de bolsos TOUS.
        </p>
        <div className="mt-4">
          <button
            onClick={goToCatalog}
            className="w-full px-3 py-4 text-lg transition duration-300 border border-black hover:bg-black hover:text-white cursor-pointer"
          >
            Ver colección
          </button>
        </div>
      </div>

      {/* Carrusel */}
      <div className="relative w-full overflow-hidden md:w-4/5">
        <div
          className={`flex transition-transform duration-300 ease-in-out ${
            isNavigating ? "opacity-90" : ""
          }`}
          style={{
            transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
            pointerEvents: isNavigating ? "none" : "auto", // Deshabilita interacciones
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 md:px-2"
              style={{ width: `${100 / slidesToShow}%` }}
            >
              <div
                className={`h-full overflow-hidden bg-white rounded-lg shadow-md cursor-pointer md:shadow-none hover:shadow-lg transition-opacity ${
                  isNavigating ? "opacity-90" : ""
                }`}
                onClick={() => goToProduct(product.slug)}
              >
                <div className="relative">
                  <img
                    src={product.imagenes?.[0] || "/placeholder-product.jpg"}
                    alt={product.titulo}
                    loading="lazy"
                    className="object-cover w-full aspect-square"
                  />
                  {/* Badge de Black Friday (prioridad) */}
                  {product.categorias?.some(
                    (cat) =>
                      cat?.toLowerCase() === "black_friday" ||
                      cat?.toLowerCase() === "black-friday"
                  ) && (
                    <div className="absolute top-2 right-2 z-10 flex flex-col gap-1.5 items-end">
                      <div className="px-2 py-1 text-[10px] font-bold tracking-wider text-white uppercase bg-red-600 rounded shadow-md">
                        BLACK FRIDAY
                      </div>
                      {(product.precioAnterior ?? 0) > 0 && (
                        <div className="inline-block px-1.5 py-0.5 text-[10px] font-bold text-white bg-black rounded shadow-md">
                          -{calcularDescuento(product)}%
                        </div>
                      )}
                    </div>
                  )}
                  {/* Badge de descuento (solo si no es Black Friday) */}
                  {(product.precioAnterior ?? 0) > 0 &&
                    !product.categorias?.some(
                      (cat) =>
                        cat?.toLowerCase() === "black_friday" ||
                        cat?.toLowerCase() === "black-friday"
                    ) && (
                      <div className="absolute px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-md top-2 right-2">
                        -{calcularDescuento(product)}%
                      </div>
                    )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.titulo}</h3>
                  <div className="mt-2">
                    <span className="font-bold text-gray-900">
                      {product.precio.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </span>
                    {(product.precioAnterior ?? 0) > 0 && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        {product.precioAnterior.toLocaleString("es-ES", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Flechas de navegación */}
        {products.length > slidesToShow && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 z-10 hidden p-2 ml-2 text-gray-800 -translate-y-1/2 rounded-full shadow-md md:block top-1/2 bg-white/80 hover:bg-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 z-10 hidden p-2 mr-2 text-gray-800 -translate-y-1/2 rounded-full shadow-md md:block top-1/2 bg-white/80 hover:bg-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Indicadores para móvil */}
        {slidesToShow === 1 && products.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2 md:hidden">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === index ? "bg-gray-800 w-6" : "bg-gray-300"
                }`}
                aria-label={`Ver producto ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
