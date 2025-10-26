import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ContactItem = ({ icon, title, children }) => {
  return (
    <div className="flex items-start p-3 sm:p-4 space-x-3 sm:space-x-4 transition-all duration-300 border border-gray-100 rounded-lg hover:border-gray-200 hover:shadow-sm">
      <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-full">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="font-medium text-sm sm:text-base text-gray-900">
          {title}
        </p>
        <div className="text-xs sm:text-sm text-gray-600">{children}</div>
      </div>
    </div>
  );
};

const ContactoOptica = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="px-4 sm:px-6 md:px-10 lg:px-20 py-12 sm:py-16 bg-white border-t"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-6 sm:mb-8 md:mb-12 text-2xl sm:text-3xl md:text-4xl font-bold text-center">
          ¡Visítanos en nuestra óptica!
        </h2>

        <div className="flex flex-col gap-6 sm:gap-8 lg:grid lg:grid-cols-5">
          {/* Columna 1: Contactos */}
          <div className="order-1 space-y-4 sm:space-y-6 lg:order-1 lg:col-span-3">
            <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
              <ContactItem
                icon={<MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                title="Dirección"
              >
                Calle Cristobal Castillo 13,
                <br />
                14500 Puente Genil, Córdoba
              </ContactItem>

              <ContactItem
                icon={<Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                title="Teléfono"
              >
                957 60 21 23
              </ContactItem>

              <ContactItem
                icon={<Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                title="Email"
              >
                opticadelvaljoyeros@gmail.com
              </ContactItem>

              <ContactItem
                icon={<Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                title="Horario"
              >
                <p>Lunes a Viernes</p>
                <p>10:00 – 14:00 / 17:00 – 21:00</p>
                <p>Sábado: 10:00 – 14:00</p>
              </ContactItem>
            </div>
          </div>

          {/* Mapa */}
          <div className="order-2 overflow-hidden transition-shadow duration-300 rounded-lg shadow-sm hover:shadow-md aspect-video lg:order-2 lg:col-span-2 h-64 sm:h-80 lg:h-auto">
            <iframe
              title="Ubicación Óptica"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235.6113726772949!2d-4.768496991523713!3d37.3899235866001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6d4319432b634b%3A0x792105c6755a790f!2sOptica%20Del%20Val%20Joyeros!5e0!3m2!1ses!2ses!4v1753627847584!5m2!1ses!2ses"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
            />
          </div>

          {/* Imagen horizontal */}
          <div className="order-3 overflow-hidden transition-shadow duration-300 rounded-lg shadow-sm hover:shadow-md aspect-[3/2] lg:order-3 lg:col-span-3">
            <img
              src="/reconocimiento2.jpg"
              alt="Reconocimiento óptica 2"
              className="object-contain w-full h-full"
              loading="lazy"
            />
          </div>

          {/* Imagen vertical */}
          <div className="order-4 overflow-hidden transition-shadow duration-300 rounded-lg shadow-lg aspect-[2/3] lg:order-4 lg:col-span-2">
            <img
              src="/reconocimiento1.jpg"
              alt="Reconocimiento óptica 1"
              className="object-contain w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactoOptica;
