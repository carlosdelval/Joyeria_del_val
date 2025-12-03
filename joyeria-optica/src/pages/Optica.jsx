import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Eye,
  Glasses,
  Settings,
  Sparkles,
  Phone,
  ChevronDown,
} from "lucide-react";
import SEO from "../components/common/SEO";
import { PageSpinner } from "../components/ui/Spinner";
import { useInView } from "react-intersection-observer";
import ConfirmModal from "../components/modals/ConfirmModal";
import VideoHeroBanner from "../components/banners/VideoHeroBanner";

// Componente de imagen del acordeón (reutilizado de ContactCard)
const AccordionImage = ({ image, isOpen, onToggle }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={{
        flex: isOpen ? "1 1 60%" : "1 1 0%",
      }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="relative overflow-hidden cursor-pointer group min-h-[200px] sm:min-h-[300px] lg:min-h-[400px] border-2 border-gray-200"
      onClick={onToggle}
      style={{ willChange: isOpen ? "flex" : "auto" }}
    >
      {/* Imagen de fondo con lazy loading */}
      {inView && (
        <div
          className="absolute inset-0 bg-center bg-cover transition-transform duration-[400ms]"
          style={{
            backgroundImage: `url(${image.src})`,
            transform: isOpen
              ? image.rotated
                ? "scale(1) rotate(180deg)"
                : "scale(1)"
              : image.rotated
              ? "scale(1.1) rotate(180deg)"
              : "scale(1.1)",
            willChange: "transform",
          }}
        />
      )}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Contenido */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
        <div
          className="transition-all duration-300"
          style={{
            opacity: isOpen ? 1 : 0.9,
            transform: isOpen ? "translateY(0)" : "translateY(10px)",
          }}
        >
          <h3 className="mb-2 text-lg font-light tracking-wide text-white uppercase sm:text-xl lg:text-2xl">
            {image.title}
          </h3>

          <div
            className="overflow-hidden transition-all duration-300"
            style={{
              maxHeight: isOpen ? "100px" : "0px",
              opacity: isOpen ? 1 : 0,
            }}
          >
            <p className="mb-3 text-sm font-light text-gray-200 sm:text-base">
              {image.description}
            </p>
          </div>

          <div
            className="inline-block transition-transform duration-300"
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <ChevronDown className="w-5 h-5 text-white sm:w-6 sm:h-6" />
          </div>
        </div>
      </div>

      {/* Indicador de hover cuando no está abierto */}
      {!isOpen && (
        <div className="absolute inset-0 transition-colors duration-300 bg-white/0 group-hover:bg-white/10" />
      )}
    </motion.div>
  );
};

// Servicios principales
const ServiciosOptica = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const servicios = [
    {
      icon: Eye,
      titulo: "Graduación de Vista",
      descripcion:
        "Realizamos exámenes visuales completos con la última tecnología para determinar tu graduación exacta. Nuestros optometristas titulados te ofrecen un servicio profesional y personalizado.",
      detalles: [
        "Examen visual completo",
        "Medición de agudeza visual",
        "Detección de problemas visuales",
        "Asesoramiento profesional",
      ],
    },
    {
      icon: Glasses,
      titulo: "Monturas Personalizadas",
      descripcion:
        "Amplia selección de monturas de las mejores marcas adaptadas a tu rostro y estilo. Te ayudamos a encontrar la montura perfecta que combine estética y comodidad.",
      detalles: [
        "Asesoramiento de imagen",
        "Ajuste anatómico perfecto",
        "Marcas de calidad premium",
        "Diseños exclusivos",
      ],
    },
    {
      icon: Sparkles,
      titulo: "Lentes de Contacto",
      descripcion:
        "Especialistas en adaptación de lentillas. Ofrecemos todo tipo de lentes de contacto: diarias, mensuales, tóricas y multifocales. Primera consulta gratuita.",
      detalles: [
        "Adaptación personalizada",
        "Lentes blandas y rígidas",
        "Seguimiento continuado",
        "Prueba sin compromiso",
      ],
    },
    {
      icon: Settings,
      titulo: "Reparaciones y Ajustes",
      descripcion:
        "Servicio técnico especializado. Realizamos ajustes, cambio de patillas, reparación de bisagras y pulido de lentes. Servicio inmediato en la mayoría de casos.",
      detalles: [
        "Ajustes gratuitos",
        "Reparaciones urgentes",
        "Cambio de componentes",
        "Limpieza profesional",
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
              Nuestros Servicios
            </h2>
            <div className="w-12 h-px bg-gray-300"></div>
          </div>
          <p className="max-w-2xl mx-auto mt-4 text-base font-light text-gray-600">
            Profesionales cualificados para cuidar de tu salud visual
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

// Marcas de confianza con imágenes
const MarcasOptica = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const marcas = [
    {
      nombre: "Varilux",
      descripcion: "Lentes progresivas de máxima calidad",
      especialidad: "Progresivos",
      imagen: "/varilux-banner.jpg",
    },
    {
      nombre: "Transitions",
      descripcion: "Lentes fotocromáticas inteligentes",
      especialidad: "Fotocromáticos",
      imagen: "/transitions-banner.jpg",
      objectPosition: "",
    },
    {
      nombre: "Essilor",
      descripcion: "Líder mundial en lentes oftálmicas",
      especialidad: "Monofocales",
      imagen: "/essilor-banner.jpg",
    },
    {
      nombre: "Ray-Ban",
      descripcion: "Monturas icónicas desde 1937",
      especialidad: "Monturas",
      imagen: "/rayban.jpg",
    },
    {
      nombre: "De Rigo",
      descripcion: "Estilo y tradición italiana en gafas de todo el mundo",
      especialidad: "Estilo",
      imagen: "/derigo-banner.jpg",
    },
    {
      nombre: "Marcolin",
      descripcion: "Artesanía y tecnologías italianas.",
      especialidad: "Moda",
      imagen: "/marcolin-banner.jpg",
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
              Marcas de Confianza
            </h2>
            <div className="w-12 h-px bg-gray-300"></div>
          </div>
          <p className="max-w-2xl mx-auto mt-4 text-base font-light text-gray-600">
            Trabajamos con las mejores marcas del sector óptico
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

// Galería de la óptica
const GaleriaOptica = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [openImageId, setOpenImageId] = useState(1);

  const galleryImages = [
    {
      id: 1,
      src: "/tienda1.jpg",
      title: "Nuestra Óptica",
      description: "Instalaciones modernas con los mejores profesionales",
    },
    {
      id: 2,
      src: "/tienda2.jpg",
      title: "Atención Personalizada",
      description: "Asesoramiento profesional adaptado a tus necesidades",
    },
    {
      id: 3,
      src: "/tienda3.jpg",
      title: "Experiencia y Calidad",
      description: "Años de trayectoria cuidando de tu salud visual",
      rotated: true,
    },
    {
      id: 4,
      src: "/reconocimiento2.jpg",
      title: "Reconocimientos",
      description: "Certificaciones que avalan nuestro compromiso",
    },
  ];

  const handleToggle = (imageId) => {
    setOpenImageId(openImageId === imageId ? null : imageId);
  };

  return (
    <section ref={ref} className="py-16 bg-white sm:py-24">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-gray-300"></div>
            <h2 className="text-2xl font-light tracking-widest text-black uppercase sm:text-3xl">
              Nuestra Óptica
            </h2>
            <div className="w-12 h-px bg-gray-300"></div>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 h-auto sm:h-[400px] mb-6">
          {galleryImages.map((image) => (
            <AccordionImage
              key={image.id}
              image={image}
              isOpen={openImageId === image.id}
              onToggle={() => handleToggle(image.id)}
            />
          ))}
        </div>

        <p className="text-xs text-center text-gray-500 sm:text-sm">
          Haz clic en las imágenes para explorar nuestras instalaciones
        </p>
      </div>
    </section>
  );
};

export default function Optica() {
  const [isLoading, setIsLoading] = useState(true);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

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
        title="Óptica - Graduación y Servicios Visuales | Óptica del Val"
        description="Servicios profesionales de optometría en Valladolid: graduación de vista, monturas personalizadas, lentes de contacto y reparaciones. Marcas de confianza."
        keywords="óptica, optometría, graduación vista, lentes de contacto, monturas, gafas graduadas, examen visual, Varilux, Essilor, Transitions, Valladolid"
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <VideoHeroBanner
          videoSrc="/optica-video.mp4"
          posterSrc="/optica-video-miniatura.jpg"
          title="ÓPTICA DEL VAL"
          subtitle="Cuidamos de tu salud visual con profesionalidad y dedicación. Servicios de optometría, graduación y personalización de monturas."
          ctaText="Ver catálogo"
          ctaLink="/catalogo/gafas"
          secondaryCta={{
            text: "Reservar cita",
            onClick: () => setShowWhatsAppModal(true),
          }}
          overlayOpacity="45"
          height="h-screen"
        />

        {/* Servicios principales */}
        <ServiciosOptica />

        {/* Marcas */}
        <MarcasOptica />

        {/* Galería */}
        <GaleriaOptica />

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
                Cuida Tu Salud Visual
              </h2>

              <div className="flex justify-center mb-8">
                <div className="w-24 h-px bg-black"></div>
              </div>

              <p className="max-w-2xl mx-auto mb-10 text-base font-light leading-relaxed text-gray-600">
                Reserva tu cita y déjanos cuidar de tus ojos.
                <br />
                Primera consulta sin compromiso.
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
            "Hola, me gustaría reservar cita para graduarme la vista."
          );
          window.open(
            `https://wa.me/34${phoneNumber}?text=${message}`,
            "_blank"
          );
        }}
        title="Reservar Cita"
        message="Vamos a redirigirte a WhatsApp para reservar tu cita de graduación de vista."
        confirmText="Abrir WhatsApp"
        cancelText="Cancelar"
        type="info"
      />
    </>
  );
}
