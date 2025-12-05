import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProductos } from "../api/productos";
import SEO from "../components/common/SEO";
import { PageSpinner } from "../components/ui/Spinner";
import { useInView } from "react-intersection-observer";
import ColeccionesDestacadas from "../components/products/ColeccionesDestacadas";
import ColeccionSalvatorePlata from "../components/products/ColeccionSalvatorePlata";
import { Gem, Sparkles, Heart, Crown, Phone } from "lucide-react";
import VideoHeroBanner from "../components/banners/VideoHeroBanner";
import ConfirmModal from "../components/modals/ConfirmModal";

// Sección Hero CON VIDEO (comentada la versión anterior)
// const HeroJoyeria = () => {
//   return (
//     <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
//       {/* ... código anterior comentado ... */}
//     </section>
//   );
// };

// Servicios/Categorías de joyería
const CategoriasJoyeria = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const navigate = useNavigate();

  const categorias = [
    {
      icon: Gem,
      titulo: "Anillos",
      descripcion:
        "Desde alianzas de compromiso hasta anillos de diseño exclusivo. Encuentra la pieza perfecta que simbolice tu amor eterno o complemente tu estilo único.",
      detalles: [
        "Anillos de compromiso",
        "Alianzas de boda",
        "Anillos de diseño",
        "Sortijas de oro y diamantes",
      ],
      categoria: "anillos",
    },
    {
      icon: Sparkles,
      titulo: "Pulseras",
      descripcion:
        "Desde delicadas cadenas hasta pulseras componibles personalizables. Crea tu colección única con diseños que representen tus momentos más especiales.",
      detalles: [
        "Pulseras de plata 925",
        "Pulseras componibles",
        "Brazaletes de oro",
        "Diseños personalizados",
      ],
      categoria: "pulseras",
    },
    {
      icon: Heart,
      titulo: "Collares",
      descripcion:
        "Collares y colgantes que adornan con elegancia. Desde piezas minimalistas para el día a día hasta joyas espectaculares para ocasiones especiales.",
      detalles: [
        "Colgantes de oro",
        "Gargantillas modernas",
        "Collares de plata",
        "Cadenas con diamantes",
      ],
      categoria: "collares",
    },
    {
      icon: Crown,
      titulo: "Pendientes",
      descripcion:
        "Pendientes que iluminan tu rostro. Desde pequeñas joyas cotidianas hasta diseños llamativos que capturan todas las miradas.",
      detalles: [
        "Pendientes de presión",
        "Aros de oro y plata",
        "Pendientes con piedras",
        "Diseños de autor",
      ],
      categoria: "pendientes",
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
              Nuestras Colecciones
            </h2>
            <div className="w-12 h-px bg-gray-300"></div>
          </div>
          <p className="max-w-2xl mx-auto mt-4 text-base font-light text-gray-600">
            Joyas únicas para cada ocasión y estilo
          </p>
        </motion.div>

        {/* Grid de categorías */}
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {categorias.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative p-8 transition-all duration-300 bg-white border-2 border-gray-200 group hover:border-black"
            >
              {/* Icono */}
              <div className="flex items-center justify-center w-16 h-16 mb-6 text-white transition-all duration-300 bg-black group-hover:scale-110">
                <cat.icon className="w-8 h-8" />
              </div>

              {/* Contenido */}
              <h3 className="mb-4 text-xl font-light tracking-wide text-black uppercase">
                {cat.titulo}
              </h3>

              <p className="mb-6 text-sm font-light leading-relaxed text-gray-600">
                {cat.descripcion}
              </p>

              {/* Lista de detalles */}
              <ul className="space-y-2">
                {cat.detalles.map((detalle, idx) => (
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

// Marcas de joyería con imágenes
const MarcasJoyeria = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const marcas = [
    {
      nombre: "Marina García",
      descripcion: "Alta joyería de autor con diseños únicos",
      especialidad: "Alta Joyería",
      imagen: "/marinagarcia-banner.jpg",
    },
    {
      nombre: "Salvatore",
      descripcion: "Plata de ley 925 con diseños contemporáneos",
      especialidad: "Plata 925",
      imagen: "/salvatore-banner.jpg",
    },
    {
      nombre: "Nomination",
      descripcion: "Pulseras componibles personalizables",
      especialidad: "Componibles",
      imagen: "/nomination-banner.jpg",
    },
    {
      nombre: "La Petra",
      descripcion: "Pequeños tesoros en oro de 18k",
      especialidad: "Oro 18k",
      imagen: "/lapetra-banner.jpg",
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
            Trabajamos con las mejores firmas de joyería de autor
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
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.classList.add("bg-gray-200");
                  }}
                />
                {/* Overlay gradient sutil */}
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/20 to-transparent group-hover:opacity-100"></div>

                {/* Etiqueta de especialidad sobre la imagen */}
                <div className="absolute top-4 right-4">
                  <span className="inline-block px-3 py-1 text-xs font-light tracking-widest text-white uppercase bg-black">
                    {marca.especialidad}
                  </span>
                </div>
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

// Componente de productos destacados
const ProductosDestacados = ({ categoria, titulo, marca }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const filtros = { categoria: [categoria] };
        if (marca) filtros.marca = [marca];

        const data = await fetchProductos(filtros);
        const productosConDescuento = data.filter(
          (p) => p.precioAnterior && p.precioAnterior > p.precio
        );
        const productosAMostrar =
          productosConDescuento.length >= 4 ? productosConDescuento : data;

        setProductos(productosAMostrar.slice(0, 4));
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [categoria, marca]);

  const goToProduct = (slug) => {
    window.scrollTo(0, 0);
    navigate(`/producto/${slug}`);
  };

  if (loading || productos.length === 0) return null;

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
              {titulo}
            </h2>
            <div className="w-12 h-px bg-gray-300"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {productos.map((prod, index) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-3 transition-all duration-300 bg-white border-2 border-gray-200 cursor-pointer group hover:border-black"
              onClick={() => goToProduct(prod.slug)}
            >
              <div className="relative mb-3 overflow-hidden">
                <img
                  src={prod.imagenes[0]}
                  alt={prod.titulo}
                  className="object-contain w-full transition-transform duration-300 aspect-square group-hover:scale-105"
                />
                {(prod.precioAnterior ?? 0) > 0 && (
                  <span className="absolute px-2 py-1 text-xs font-light tracking-wider text-white uppercase bg-black top-2 right-2">
                    {`-${Math.round(
                      ((prod.precioAnterior - prod.precio) /
                        prod.precioAnterior) *
                        100
                    )}%`}
                  </span>
                )}
              </div>

              <p className="mb-2 text-sm font-light text-black line-clamp-2">
                {prod.titulo}
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

              {/* Línea decorativa inferior */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Carrusel de Salvatore Plata
const CarruselSalvatore = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);

  // Cargar relojes Salvatore
  useEffect(() => {
    const loadSalvatoreProducts = async () => {
      try {
        const allProducts = await fetchProductos({ categoria: ["joyeria"] });
        const salvatore = allProducts.filter(
          (product) => product.marca?.toLowerCase() === "salvatore plata"
        );
        setProducts(salvatore);
      } catch (error) {
        console.error("Error cargando productos Salvatore:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSalvatoreProducts();
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
    navigate("/catalogo/joyeria?marca=salvatore+plata");
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
              Salvatore Plata
            </h2>
            <div className="w-12 h-px bg-gray-300"></div>
          </div>
          <p className="max-w-2xl mx-auto mt-4 mb-8 text-base font-light text-gray-600">
            Descubre nuestra exclusiva colección de Salvatore Plata
          </p>
        </motion.div>

        <div className="flex flex-col gap-6 md:flex-row">
          {/* Sección de texto */}
          <div className="w-full md:w-1/5">
            <h3 className="mb-3 text-2xl font-light tracking-wide text-black uppercase hidden sm:block">
              Hasta 10% Descuento
            </h3>
            <p className="mb-6 text-sm font-light text-gray-600 hidden sm:block">
              Diseño exclusivo que combina elegancia y calidad en cada pieza.
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
                      {(product.precioAnterior ?? 0) > 0 && (
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

export default function Joyeria() {
  const [isLoading, setIsLoading] = useState(true);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <>
      <SEO
        title="Joyería de Autor - Óptica del Val Joyeros"
        description="Descubre nuestra exclusiva colección de joyería: Marina García, Salvatore, Nomination y La Petra. Alta joyería y diseños únicos en Valladolid."
        keywords="joyería, joyas de autor, Marina García, Salvatore, Nomination, La Petra, oro, plata, anillos, pulseras, pendientes, collares, Valladolid"
      />

      <div className="min-h-screen bg-white">
        {/* Hero con Video */}
        <VideoHeroBanner
          videoSrc="/marinagarcia-video.mp4"
          posterSrc="/marinagarcia-video-miniatura.webp"
          title="JOYERÍA DEL VAL"
          subtitle="Piezas únicas que cuentan tu historia. Alta joyería de autor y diseños exclusivos para momentos especiales."
          ctaText="Ver catálogo"
          ctaLink="/catalogo/joyeria"
          secondaryCta={{ text: "Visítanos en tienda", link: "/contacto" }}
          overlayOpacity="45"
          height="h-screen"
        />

        {/* Colecciones Destacadas */}
        <ColeccionesDestacadas />

        {/* Promoción Salvatore Plata */}
        <CarruselSalvatore />

        {/* Categorías/Colecciones */}
        <CategoriasJoyeria />

        {/* Productos destacados */}
        <ProductosDestacados categoria="anillos" titulo="Anillos en Oferta" />

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
                Encuentra Tu Joya Perfecta
              </h2>

              <div className="flex justify-center mb-8">
                <div className="w-24 h-px bg-black"></div>
              </div>

              <p className="max-w-2xl mx-auto mb-10 text-base font-light leading-relaxed text-gray-600">
                Visita nuestra tienda y descubre nuestra colección completa.
                <br />
                Asesoramiento personalizado para encontrar la joya ideal.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowWhatsAppModal(true)}
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

      <ConfirmModal
        isOpen={showWhatsAppModal}
        onClose={() => setShowWhatsAppModal(false)}
        onConfirm={() => {
          const phoneNumber = "957602123"; // Número de teléfono de la joyería
          const message = encodeURIComponent(
            "Hola, me gustaría información sobre joyería."
          );
          window.open(
            `https://wa.me/34${phoneNumber}?text=${message}`,
            "_blank"
          );
        }}
        title="Contactar por WhatsApp"
        message="Se abrirá WhatsApp para contactar con nosotros y obtener más información sobre joyería."
        confirmText="Abrir WhatsApp"
        cancelText="Cancelar"
        type="info"
      />
    </>
  );
}
