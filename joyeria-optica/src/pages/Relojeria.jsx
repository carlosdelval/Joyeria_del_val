import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProductos } from "../api/productos";
import SEO from "../components/SEO";
import { PageSpinner } from "../components/Spinner";
import { useInView } from "react-intersection-observer";
import { Watch, Settings, Zap, Wrench, Phone } from "lucide-react";

// Sección Hero
const HeroRelojes = () => {
  return (
    <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/maserati-acordeon3.jpg"
          alt="Relojes de lujo"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 px-4 text-center text-white"
      >
        <h1 className="mb-4 text-5xl font-bold md:text-7xl">Relojería</h1>
        <p className="max-w-2xl mx-auto mb-8 text-lg md:text-xl">
          Precisión y diseño elegante en cada detalle.
          <br />
          Tenemos las mejores marcas de relojes con servicio técnico
          especializado.
        </p>
      </motion.div>
    </section>
  );
};

// Servicios de relojería
const ServiciosRelojes = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const servicios = [
    {
      icon: Wrench,
      titulo: "Reparación Especializada",
      descripcion:
        "Servicio técnico profesional para todas las marcas. Nuestros relojeros expertos diagnostican y reparan cualquier problema con la máxima precisión y cuidado.",
      detalles: [
        "Reparación de mecanismos",
        "Cambio de cristales",
        "Restauración de esferas",
        "Servicio urgente disponible",
      ],
    },
    {
      icon: Zap,
      titulo: "Cambio de Pila",
      descripcion:
        "Cambio inmediato de pila con revisión completa de estanqueidad. Utilizamos pilas de máxima calidad y verificamos el correcto funcionamiento del reloj.",
      detalles: [
        "Servicio en el momento",
        "Pilas de calidad premium",
        "Prueba de estanqueidad",
        "Garantía del servicio",
      ],
    },
    {
      icon: Settings,
      titulo: "Ajuste de Correa",
      descripcion:
        "Ajuste profesional de eslabones y cambio de correas. Adaptamos tu reloj a tu muñeca con precisión milimétrica para máximo confort.",
      detalles: [
        "Ajuste de eslabones",
        "Cambio de correas",
        "Variedad de materiales",
        "Ajuste sin cargo",
      ],
    },
    {
      icon: Watch,
      titulo: "Mantenimiento",
      descripcion:
        "Limpieza ultrasónica y mantenimiento preventivo completo. Mantenemos tu reloj en perfectas condiciones con revisiones periódicas profesionales.",
      detalles: [
        "Limpieza ultrasónica",
        "Revisión de mecanismo",
        "Pulido de caja",
        "Lubricación profesional",
      ],
    },
  ];

  return (
    <section ref={ref} className="py-16 bg-white sm:py-24">
      <div className="container px-4 mx-auto">
        {/* Título de sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-gray-300"></div>
            <h2 className="text-2xl font-light tracking-widest text-black uppercase sm:text-3xl">
              Servicio Técnico
            </h2>
            <div className="w-12 h-px bg-gray-300"></div>
          </div>
          <p className="max-w-2xl mx-auto mt-4 text-base font-light text-gray-600">
            Expertos relojeros para el cuidado de tu reloj
          </p>
        </motion.div>

        {/* Grid de servicios */}
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {servicios.map((servicio, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative p-8 transition-all duration-300 bg-white border-2 border-gray-200 group hover:border-black"
            >
              {/* Icono */}
              <div className="flex items-center justify-center w-16 h-16 mb-6 text-white transition-all duration-300 bg-black group-hover:scale-110">
                <servicio.icon className="w-8 h-8" />
              </div>

              {/* Contenido */}
              <h3 className="mb-4 text-xl font-light tracking-wide text-black uppercase">
                {servicio.titulo}
              </h3>

              <p className="mb-6 text-sm font-light leading-relaxed text-gray-600">
                {servicio.descripcion}
              </p>

              {/* Lista de detalles */}
              <ul className="space-y-2">
                {servicio.detalles.map((detalle, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-sm font-light text-gray-700"
                  >
                    <span className="w-1.5 h-1.5 mr-3 bg-black"></span>
                    {detalle}
                  </li>
                ))}
              </ul>

              {/* Línea decorativa inferior */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Marcas de relojes con imágenes
const MarcasRelojes = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const marcas = [
    {
      nombre: "Tommy Hilfiger",
      descripcion: "Estilo americano icónico y casual",
      imagen: "/tommy-banner.jpg",
      objectPosition: "object-right",
    },
    {
      nombre: "Lacoste",
      descripcion: "Elegancia deportiva con el icónico cocodrilo",
      imagen: "/lacoste-banner.jpg",
      objectPosition: "object-right",
    },
    {
      nombre: "Viceroy",
      descripcion: "Elegancia española con carácter distintivo",
      imagen: "/viceroy-banner.jpg",
      objectPosition: "object-center",
    },
    {
      nombre: "Tous",
      descripcion: "Joyería y diseño en perfecta armonía",
      imagen: "/tous-banner.jpg",
      objectPosition: "object-center",
    },
    {
      nombre: "Citizen",
      descripcion: "Tecnología Eco-Drive japonesa desde 1918",
      imagen: "/citizen-banner.jpg",
      objectPosition: "object-left",
    },
    {
      nombre: "Seiko",
      descripcion: "Precisión japonesa e innovación constante",
      imagen: "/seiko-banner.jpg",
      objectPosition: "object-center",
    },
    {
      nombre: "Maserati",
      descripcion: "Potencia italiana y diseño deportivo",
      imagen: "/maserati-banner.jpg",
      objectPosition: "object-center",
    },
    {
      nombre: "Orient",
      descripcion: "Manufactura japonesa de relojes mecánicos",
      imagen: "/orient-banner.jpg",
      objectPosition: "object-left",
    },
  ];

  return (
    <section ref={ref} className="py-16 bg-gray-50 sm:py-24">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-gray-300"></div>
            <h2 className="text-2xl font-light tracking-widest text-black uppercase sm:text-3xl">
              Nuestras Marcas
            </h2>
            <div className="w-12 h-px bg-gray-300"></div>
          </div>
          <p className="max-w-2xl mx-auto mt-4 text-base font-light text-gray-600">
            Trabajamos con las mejores firmas de relojería
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {marcas.map((marca, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="relative overflow-hidden transition-all duration-300 bg-white border-2 border-gray-200 group hover:border-black"
            >
              {/* Imagen promocional */}
              <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                <img
                  src={marca.imagen}
                  alt={marca.nombre}
                  className={`object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 ${
                    marca.objectPosition || "object-center"
                  }`}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.classList.add("bg-gray-200");
                  }}
                />
                {/* Overlay gradient sutil */}
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/20 to-transparent group-hover:opacity-100"></div>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className="mb-3 text-xl font-light tracking-wide text-black uppercase">
                  {marca.nombre}
                </h3>
                <p className="text-sm font-light text-gray-600">
                  {marca.descripcion}
                </p>
              </div>

              {/* Línea decorativa inferior */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Carrusel de relojes Tous
const CarruselRelojesTous = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);

  // Cargar relojes TOUS
  useEffect(() => {
    const loadTousProducts = async () => {
      try {
        const allProducts = await fetchProductos({ categoria: ["relojes"] });
        const tousWatches = allProducts.filter(
          (product) => product.marca?.toLowerCase() === "tous"
        );
        setProducts(tousWatches);
      } catch (error) {
        console.error("Error cargando relojes TOUS:", error);
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
    navigate(`/producto/${slug}`);
  };

  // Navegar al catálogo
  const goToCatalog = () => {
    window.scrollTo(0, 0);
    navigate("/catalogo/relojes?marca=tous");
  };

  // Auto-rotación
  useEffect(() => {
    if (products.length === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, slidesToShow, products]);

  if (loading || products.length === 0) return null;

  return (
    <section className="py-16 bg-white sm:py-24">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-gray-300"></div>
            <h2 className="text-2xl font-light tracking-widest text-black uppercase sm:text-3xl">
              Relojes Tous
            </h2>
            <div className="w-12 h-px bg-gray-300"></div>
          </div>
          <p className="max-w-2xl mx-auto mt-4 mb-8 text-base font-light text-gray-600">
            Descubre nuestra exclusiva colección de relojes Tous
          </p>
        </motion.div>

        <div className="flex flex-col gap-6 md:flex-row">
          {/* Sección de texto */}
          <div className="w-full md:w-1/5">
            <h3 className="mb-3 text-2xl font-light tracking-wide text-black uppercase hidden sm:block">
              Hasta 50% Descuento
            </h3>
            <p className="mb-6 text-sm font-light text-gray-600 hidden sm:block">
              Diseño exclusivo que combina elegancia y funcionalidad
            </p>
            <button
              onClick={goToCatalog}
              className="w-full px-6 py-4 text-base font-light tracking-wide text-white transition-all duration-300 bg-black border-2 border-black hover:bg-gray-900"
            >
              Ver Colección
            </button>
          </div>

          {/* Carrusel */}
          <div className="relative w-full overflow-hidden md:w-4/5">
            <div
              className={`flex transition-transform duration-300 ease-in-out ${
                isNavigating ? "opacity-90" : ""
              }`}
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / slidesToShow)
                }%)`,
                pointerEvents: isNavigating ? "none" : "auto",
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
                    className="relative h-full p-3 transition-all duration-300 bg-white border-2 border-gray-200 cursor-pointer group hover:border-black"
                    onClick={() => goToProduct(product.slug)}
                  >
                    <div className="relative mb-3 overflow-hidden">
                      <img
                        src={
                          product.imagenes?.[0] || "/placeholder-product.jpg"
                        }
                        alt={product.titulo}
                        className="object-contain w-full transition-transform duration-300 aspect-square group-hover:scale-105"
                      />
                      {product.precioAnterior && (
                        <span className="absolute px-2 py-1 text-xs font-light tracking-wider text-white uppercase bg-black top-2 right-2">
                          {`-${Math.round(
                            ((product.precioAnterior - product.precio) /
                              product.precioAnterior) *
                              100
                          )}%`}
                        </span>
                      )}
                    </div>

                    <p className="mb-2 text-sm font-light text-black line-clamp-2">
                      {product.titulo}
                    </p>

                    <div className="flex items-center gap-2">
                      <p className="text-base font-light text-black">
                        {product.precio.toLocaleString("es-ES", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </p>
                      {product.precioAnterior && (
                        <p className="text-xs font-light text-gray-400 line-through">
                          {product.precioAnterior.toLocaleString("es-ES", {
                            style: "currency",
                            currency: "EUR",
                          })}
                        </p>
                      )}
                    </div>

                    {/* Línea decorativa inferior */}
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Flechas de navegación */}
            {products.length > slidesToShow && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 z-10 hidden p-2 ml-2 text-white -translate-y-1/2 bg-black top-1/2 md:block hover:bg-gray-800"
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
                  className="absolute right-0 z-10 hidden p-2 mr-2 text-white -translate-y-1/2 bg-black top-1/2 md:block hover:bg-gray-800"
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
                  className={`w-2 h-2 ${
                    currentIndex === index ? "bg-black" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Relojes() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevenir el scroll automático del navegador
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Forzar scroll al inicio inmediatamente
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const timer = setTimeout(() => {
      setIsLoading(false);
      // Asegurar scroll al inicio después de cargar
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 500);

    return () => {
      clearTimeout(timer);
      // Restaurar comportamiento por defecto al desmontar
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <>
      <SEO
        title="Relojes de Lujo y Servicio Técnico - Óptica del Val Joyeros"
        description="Descubre nuestra colección de relojes premium: Festina, Lotus, Viceroy y Tous. Servicio técnico especializado y reparación de relojes en Valladolid."
        keywords="relojes, relojería, Festina, Lotus, Viceroy, Tous, relojes suizos, reparación relojes, cambio pila, servicio técnico, Valladolid"
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <HeroRelojes />

        {/* Carrusel relojes Tous */}
        <CarruselRelojesTous />

        {/* Marcas */}
        <MarcasRelojes />

        {/* Servicios técnicos */}
        <ServiciosRelojes />

        {/* CTA Final */}
        <section className="py-16 text-center bg-gray-50 sm:py-24">
          <div className="container px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6 text-3xl font-light tracking-wide text-black uppercase sm:text-4xl">
                Servicio Técnico Especializado
              </h2>

              <div className="flex justify-center mb-8">
                <div className="w-24 h-px bg-black"></div>
              </div>

              <p className="max-w-2xl mx-auto mb-10 text-base font-light leading-relaxed text-gray-600">
                Trae tu reloj para reparación, cambio de pila o ajuste.
                <br />
                Atención personalizada por expertos relojeros.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const phoneNumber = "664146433";
                    const message = encodeURIComponent(
                      "Hola, me gustaría información sobre servicio técnico de relojes."
                    );
                    window.open(
                      `https://wa.me/34${phoneNumber}?text=${message}`,
                      "_blank"
                    );
                  }}
                  className="flex items-center justify-center gap-3 px-10 py-4 text-base font-light tracking-wide text-white transition-all duration-300 bg-black border-2 border-black hover:bg-gray-900"
                >
                  <Phone className="w-5 h-5" />
                  Contactar por WhatsApp
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    window.location.href = "/contacto";
                  }}
                  className="flex items-center justify-center gap-3 px-10 py-4 text-base font-light tracking-wide text-black transition-all duration-300 bg-white border-2 border-black hover:bg-gray-50"
                >
                  Más Información
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
