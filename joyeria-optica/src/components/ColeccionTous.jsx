import { useState, useEffect } from "react";
import { fetchProductos } from "../api/productos";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

export default function ColeccionTous() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);

  // Cargar bolsos TOUS
  useEffect(() => {
    const loadTousProducts = async () => {
      try {
        const allProducts = await fetchProductos({ categoria: ["bolsos"] });
        // Filtrar solo bolsos de la marca TOUS
        const tousBags = allProducts.filter(
          (product) => product.marca?.toLowerCase() === "tous"
        );
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
                  {(product.precioAnterior ?? 0) > 0 && (
                    <div className="absolute px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-md top-2 right-2">
                      {`-${Math.round(
                        ((product.precioAnterior - product.precio) /
                          product.precioAnterior) *
                          100
                      )}%`}
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
        <div className="flex justify-center mt-4 space-x-2 md:hidden">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${
                currentIndex === index ? "bg-gray-800" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
