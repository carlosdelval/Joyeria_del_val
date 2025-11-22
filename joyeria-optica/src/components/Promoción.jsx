import { useState, useEffect } from "react";
import { fetchProductos } from "../api/productos";
import { useNavigate } from "react-router-dom";
import { sanitizeProductTitle } from "../utils/helpers";

const Promocion = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProductos({
          categoria: ["relojes"],
        });

        // Filtrar solo relojes TOUS
        const tousWatches = data.filter(
          (product) => product.marca?.toLowerCase() === "tous"
        );

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
                {prod.precioAnterior && (
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
