import { Phone, Mail, MapPin, Clock, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

const ContactItem = ({ icon, title, children }) => {
  return (
    <div className="flex items-start p-3 space-x-3 transition-all duration-300 border border-gray-100 rounded-lg sm:p-4 sm:space-x-4 hover:border-gray-200 hover:shadow-sm">
      <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-black rounded-full sm:w-10 sm:h-10">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-900 sm:text-base">
          {title}
        </p>
        <div className="text-xs text-gray-600 sm:text-sm">{children}</div>
      </div>
    </div>
  );
};

// Datos de las imágenes panorámicas
const galleryImages = [
  {
    id: 1,
    src: "/tienda1.jpg",
    title: "Nuestra Tienda",
    description: "Los mejores profesionales para atenderte",
  },
  {
    id: 2,
    src: "/tienda2.jpg",
    title: "Garantía de calidad",
    description: "Productos certificados y de las mejores marcas",
  },
  {
    id: 3,
    src: "/tienda3.jpg",
    title: "Confianza y experiencia",
    description: "Años de trayectoria ofreciendo lo mejor a nuestros clientes",
  },
  {
    id: 4,
    src: "/reconocimiento2.jpg",
    title: "Reconocimientos",
    description:
      "Premios y certificaciones que avalan nuestros años de servicio",
  },
];

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
      className="relative overflow-hidden rounded-lg cursor-pointer group min-h-[200px] sm:min-h-[300px] lg:min-h-[400px]"
      onClick={onToggle}
      style={{ willChange: isOpen ? "flex" : "auto" }}
    >
      {/* Imagen de fondo con lazy loading */}
      {inView && (
        <div
          className="absolute inset-0 bg-center bg-cover transition-transform duration-[400ms]"
          style={{
            backgroundImage: `url(${image.src})`,
            transform: isOpen ? "scale(1)" : "scale(1.1)",
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
          <h3 className="mb-2 text-lg font-bold text-white sm:text-xl lg:text-2xl">
            {image.title}
          </h3>

          <div
            className="overflow-hidden transition-all duration-300"
            style={{
              maxHeight: isOpen ? "100px" : "0px",
              opacity: isOpen ? 1 : 0,
            }}
          >
            <p className="mb-3 text-sm text-gray-200 sm:text-base">
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

const ContactoOptica = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  const [openImageId, setOpenImageId] = useState(galleryImages[0]?.id || null);

  const handleToggle = (imageId) => {
    setOpenImageId(openImageId === imageId ? null : imageId);
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="px-4 py-12 bg-white border-t sm:px-6 md:px-10 lg:px-20 sm:py-16"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-6 text-2xl font-bold text-center sm:mb-8 md:mb-12 sm:text-3xl md:text-4xl">
          ¡Visítanos en nuestra óptica!
        </h2>

        <div className="space-y-6 sm:space-y-8">
          {/* Sección superior: Contactos + Mapa */}
          <div className="flex flex-col gap-6 sm:gap-8 lg:grid lg:grid-cols-5">
            {/* Columna 1: Contactos */}
            <div className="order-1 space-y-4 sm:space-y-6 lg:order-1 lg:col-span-3">
              <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                <ContactItem
                  icon={<MapPin className="w-4 h-4 text-white sm:w-5 sm:h-5" />}
                  title="Dirección"
                >
                  Calle Cristobal Castillo 13,
                  <br />
                  14500 Puente Genil, Córdoba
                </ContactItem>

                <ContactItem
                  icon={<Phone className="w-4 h-4 text-white sm:w-5 sm:h-5" />}
                  title="Teléfono"
                >
                  957 60 21 23
                </ContactItem>

                <ContactItem
                  icon={<Mail className="w-4 h-4 text-white sm:w-5 sm:h-5" />}
                  title="Email"
                >
                  opticadelvaljoyeros@gmail.com
                </ContactItem>

                <ContactItem
                  icon={<Clock className="w-4 h-4 text-white sm:w-5 sm:h-5" />}
                  title="Horario"
                >
                  <p>Lunes a Viernes</p>
                  <p>10:00 – 14:00 / 17:00 – 21:00</p>
                  <p>Sábado: 10:00 – 14:00</p>
                </ContactItem>
              </div>
            </div>

            {/* Mapa */}
            <div className="order-2 h-64 overflow-hidden transition-shadow duration-300 rounded-lg shadow-sm hover:shadow-md aspect-video lg:order-2 lg:col-span-2 sm:h-80 lg:h-auto">
              <iframe
                title="Ubicación Óptica"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235.6113726772949!2d-4.768496991523713!3d37.3899235866001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6d4319432b634b%3A0x792105c6755a790f!2sOptica%20Del%20Val%20Joyeros!5e0!3m2!1ses!2ses!4v1753627847584!5m2!1ses!2ses"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>

          {/* Galería en Acordeón */}
          <div className="mt-8 sm:mt-12">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 h-auto sm:h-[400px]">
              {galleryImages.map((image) => (
                <AccordionImage
                  key={image.id}
                  image={image}
                  isOpen={openImageId === image.id}
                  onToggle={() => handleToggle(image.id)}
                />
              ))}
            </div>

            {/* Indicador de interacción */}
            <p className="mt-4 text-xs text-center text-gray-500 sm:text-sm">
              Haz clic en las imágenes para explorar nuestra galería
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactoOptica;
