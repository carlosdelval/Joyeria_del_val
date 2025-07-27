import DrawOutlineButton from "./DrawOutlineButton";
import { useState, useEffect } from "react";

export default function ColeccionTous() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1); // Por defecto 1 para móvil

  const products = [
    {
      id: 1,
      name: "Collar Oso TOUS",
      price: "139,00 €",
      image:
        "https://masqnuevo.net/44064-large_default/collar-tous-hilo-y-colgante-oso-de-plata-vermeil-coleccion-vitoria.jpg",
      discount: "-15%",
    },
    {
      id: 2,
      name: "Pulsera de Oro TOUS",
      price: "89,00 €",
      image: "https://olaluxe.mx/cdn/shop/files/ELL5737_2048x.jpg?v=1729224745",
    },
    {
      id: 3,
      name: "Anillo TOUS",
      price: "119,00 €",
      image:
        "https://ianor.es/cdn/shop/files/14219GM_anillo_tous_milosos_oro_18kt_1_copia.jpg?v=1743069887",
      discount: "-20%",
    },
    {
      id: 4,
      name: "Pendientes Oro TOUS",
      price: "159,00 €",
      image:
        "https://www.tasadoresjoyeros.com/10598-large_default/pendientes-tous-en-oro-18kt-h15641-3.jpg",
    },
    {
      id: 5,
      name: "Pendientes Piedras TOUS",
      price: "159,00 €",
      image:
        "https://masqnuevo.net/42981-large_default/pendientes-tous-grace-en-plata-de-primera-ley-y-marcasita-de-segunda-mano.jpg",
    },
    {
      id: 6,
      name: "Pulsera osos TOUS",
      price: "159,00 €",
      image: "https://www.modacris.es/pulsera-tous_pic470005ni1t0.jpg",
    },
    {
      id: 7,
      name: "Pulsera TOUS",
      price: "159,00 €",
      image:
        "https://olaluxe.mx/cdn/shop/files/ELL5786.jpg?crop=center&height=1764&v=1729225675&width=2646",
    },
  ];

  // Ajustar slides según el tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(4); // Desktop: 4 slides
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(2); // Tablet: 2 slides
      } else {
        setSlidesToShow(1); // Móvil: 1 slide
      }
    };

    handleResize(); // Ejecutar al montar
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) nextSlide(); // Deslizar izquierda
    if (touchStart - touchEnd < -50) prevSlide(); // Deslizar derecha
  };

  // Auto-rotación
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, slidesToShow]);

  return (
    <div className="flex flex-col md:flex-row w-full gap-6">
      {/* Sección de texto */}
      <div className="w-full md:w-1/5">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Colección TOUS
        </h2>
        <p className="text-gray-600">
          Descubre nuestra exclusiva selección de joyas TOUS, donde la elegancia
          y la tradición se combinan en piezas únicas.
        </p>
        <div className="mt-4">
          <button className="w-full border border-black px-3 py-4 text-lg hover:bg-black hover:text-white transition duration-300">
            Ver colección
          </button>
        </div>
      </div>

      {/* Carrusel adaptativo */}
      <div className="w-full md:w-4/5 relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
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
              <div className="bg-white rounded-lg md:shadow-none shadow-md overflow-hidden h-full">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-square object-cover"
                  />
                  {product.discount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                      {product.discount}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-900 font-bold mt-2">
                    {product.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Flechas de navegación */}
        <button
          onClick={prevSlide}
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md z-10 ml-2"
        >
          <svg
            className="h-6 w-6"
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
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md z-10 mr-2"
        >
          <svg
            className="h-6 w-6"
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

        {/* Indicadores (puntos) - Mobile only */}
        <div className="md:hidden flex justify-center mt-4 space-x-2">
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
