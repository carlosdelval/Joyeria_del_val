import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  ChevronRight,
  Facebook,
  Instagram,
} from "lucide-react";

const Contacto = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      <div className="container max-w-4xl py-12 mx-auto">
        {/* Encabezado */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-2xl font-semibold tracking-wider text-black md:text-4xl">
            CONTACTO
          </h1>
          <div className="w-24 h-px mx-auto bg-gray-300"></div>
          <p className="mt-4 text-gray-600">Estamos aquí para ayudarte</p>
        </motion.header>

        {/* Contenido principal */}
        <div className="space-y-8">
          {/* Sección 1: Información de contacto */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              Información de contacto
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex items-start">
                  <MapPin className="flex-shrink-0 w-5 h-5 mt-0.5 mr-3 text-red-600" />
                  <div>
                    <h3 className="font-medium">Dirección</h3>
                    <p className="mt-1 text-gray-600">
                      Calle Cristobal Castillo 13
                      <br />
                      14500 Puente Genil, Córdoba
                      <br />
                      España
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="flex-shrink-0 w-5 h-5 mt-0.5 mr-3 text-red-600" />
                  <div>
                    <h3 className="font-medium">Teléfono</h3>
                    <p className="mt-1 text-gray-600">
                      <a
                        href="tel:957602123"
                        className="underline hover:text-black"
                      >
                        957 60 21 23
                      </a>
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                      Lunes a Viernes: 10:00-14:00 y 17:00-21:00
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="flex-shrink-0 w-5 h-5 mt-0.5 mr-3 text-red-600" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="mt-1 text-gray-600">
                      <a
                        href="mailto:opticadelvaljoyeros@gmail.com"
                        className="underline hover:text-black"
                      >
                        opticadelvaljoyeros@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="flex-shrink-0 w-5 h-5 mt-0.5 mr-3 text-red-600" />
                  <div>
                    <h3 className="font-medium">Horario comercial</h3>
                    <p className="mt-1 text-gray-600">
                      Lunes a Viernes: 10:00-14:00 y 17:00-21:00
                      <br />
                      Sábados: 10:00-14:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Sección 2: Formulario de contacto */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              Envíanos un mensaje
            </h2>

            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-red-600"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-red-600"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="asunto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Asunto *
                </label>
                <input
                  type="text"
                  id="asunto"
                  name="asunto"
                  required
                  className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>

              <div>
                <label
                  htmlFor="mensaje"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mensaje *
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows="4"
                  required
                  className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-red-600"
                ></textarea>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="privacidad"
                  name="privacidad"
                  required
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-600"
                />
                <label
                  htmlFor="privacidad"
                  className="block ml-2 text-sm text-gray-700"
                >
                  He leído y acepto la{" "}
                  <a
                    href="/politica-privacidad"
                    className="text-black underline hover:text-gray-600"
                  >
                    Política de Privacidad
                  </a>{" "}
                  *
                </label>
              </div>

              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium text-white bg-black border border-black rounded-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
              >
                Enviar mensaje
              </button>
            </form>
          </motion.section>

          {/* Sección 3: Mapa */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="overflow-hidden border border-gray-100 rounded-sm"
          >
            <iframe
              title="Ubicación Óptica"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235.6113726772949!2d-4.768496991523713!3d37.3899235866001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6d4319432b634b%3A0x792105c6755a790f!2sOptica%20Del%20Val%20Joyeros!5e0!3m2!1ses!2ses!4v1753627847584!5m2!1ses!2ses"
              className="w-full h-64 border rounded"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </motion.section>

          {/* Sección 4: Redes sociales */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="p-6 text-center border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center justify-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              Síguenos en redes sociales
            </h2>

            <div className="flex justify-center gap-4">
              <a
                href="https://www.instagram.com/opticadelvaljoyeros?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noreferrer"
                className="duration-300 hover:text-pink-600"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/p/Óptica-Del-Val-Joyeros-100063458862976"
                target="_blank"
                rel="noreferrer"
                className="duration-300 hover:text-blue-600"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="mailto:opticadelvaljoyeros@gmail.com"
                className="duration-300 hover:text-cyan-300"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="tel:957602123"
                className="duration-300 hover:text-green-600"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </motion.section>
        </div>
      </div>
    </motion.div>
  );
};

export default Contacto;
