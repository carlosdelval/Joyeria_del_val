import { useState, useEffect } from "react";
import { fetchProductos } from "../api/productos";
import { useNavigate } from "react-router-dom";

const PromocionDiamantes = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProductos({
          categoria: ["diamantes"],
          precioMax: 2000, // Solo productos con descuento
        });
        setProductos(data.slice(0, 4)); // Mostrar solo 4 productos
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
    navigate("/catalogo/diamantes");
  };

  if (loading)
    return <div className="py-12 text-center">Cargando promoción...</div>;

  return (
    <section className="py-8">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        {/* Banner principal */}
        <div className="relative w-full h-full min-h-[400px]">
          <img
            src="https://www.oksilver.es/blog/wp-content/uploads/2023/02/tipos-anillos-compromiso-1.png"
            alt="Promo Diamantes"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white bg-black/30">
            <p className="text-xl tracking-widest">DIAMANTES HASTA</p>
            <h2 className="text-6xl font-bold">50% DTO</h2>
            <p className="mt-2 text-sm tracking-widest">CALIDAD CERTIFICADA</p>
            <button
              onClick={goToCatalog}
              className="px-6 py-2 mt-4 font-medium text-black transition duration-300 ease-in-out bg-white hover:bg-gray-200 cursor-pointer"
            >
              VER MÁS
            </button>
          </div>
        </div>

        {/* Productos en oferta */}
        <div className="grid grid-cols-2 gap-4">
          {productos.map((prod) => (
            <div
              key={prod.id}
              className="relative p-2 transition-transform bg-white border rounded cursor-pointer hover:shadow-lg hover:scale-[1.02]"
              onClick={() => goToProduct(prod.slug)}
            >
              <img
                src={prod.imagenes[0]}
                alt={prod.titulo}
                className="object-contain w-full mb-2 aspect-square"
              />
              <span className="absolute px-2 py-1 text-xs font-bold text-white bg-red-600 rounded top-2 right-2">
                {prod.precioAnterior
                  ? `-${Math.round(
                      ((prod.precioAnterior - prod.precio) /
                        prod.precioAnterior) *
                        100
                    )}%`
                  : "OFERTA"}
              </span>
              <p className="text-sm font-medium line-clamp-2">{prod.titulo}</p>
              <p className="font-semibold text-red-600">
                {prod.precio.toLocaleString("es-ES", {
                  style: "currency",
                  currency: "EUR",
                })}
              </p>
              {prod.precioAnterior && (
                <p className="text-sm text-gray-400 line-through">
                  {prod.precioAnterior.toLocaleString("es-ES", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromocionDiamantes;
