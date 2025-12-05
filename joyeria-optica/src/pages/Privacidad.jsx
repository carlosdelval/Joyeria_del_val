import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Mail, Phone, ChevronRight } from "lucide-react";
import CookieSettings from "../components/modals/CookieSettings";

const PoliticaPrivacidad = () => {
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
            POLÍTICA DE PRIVACIDAD
          </h1>
          <div className="w-24 h-px mx-auto bg-gray-300"></div>
          <p className="mt-4 text-gray-600">
            Última actualización:{" "}
            {new Date().toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </motion.header>

        {/* Contenido principal */}
        <div className="space-y-8">
          {/* Sección 1: Introducción */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              1. Introducción
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <p>
                En Óptica Del Val Joyeros respetamos tu privacidad y nos
                comprometemos a proteger tus datos personales. Esta política
                explica cómo recopilamos, usamos y protegemos tu información
                cuando visitas nuestro sitio web o utilizas nuestros servicios.
              </p>
              <p>
                Al utilizar nuestro sitio web, aceptas las prácticas descritas
                en esta política.
              </p>
            </div>
          </motion.section>

          {/* Sección 2: Datos que recopilamos */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              2. Datos que recopilamos
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <p>Podemos recopilar y procesar los siguientes datos:</p>
              <ul className="pl-5 space-y-2 list-disc">
                <li>
                  <strong>Datos de identificación:</strong> Nombre, apellidos,
                  DNI/NIE (para garantías)
                </li>
                <li>
                  <strong>Datos de contacto:</strong> Dirección de correo
                  electrónico, teléfono, dirección postal
                </li>
                <li>
                  <strong>Datos de transacciones:</strong> Información sobre
                  compras, pagos y devoluciones
                </li>
                <li>
                  <strong>Datos técnicos:</strong> Dirección IP, tipo de
                  navegador, datos de navegación
                </li>
                <li>
                  <strong>Datos de marketing:</strong> Preferencias para recibir
                  comunicaciones
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Sección 3: Cómo usamos tus datos */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              3. Cómo usamos tus datos
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <p>Utilizamos tus datos personales para:</p>
              <ul className="pl-5 space-y-2 list-disc">
                <li>Procesar y gestionar tus pedidos</li>
                <li>Proporcionar servicio al cliente y soporte</li>
                <li>Mejorar nuestros productos y servicios</li>
                <li>
                  Enviar comunicaciones de marketing (si has dado tu
                  consentimiento)
                </li>
                <li>Cumplir con obligaciones legales y regulatorias</li>
              </ul>
              <div className="p-4 mt-4 border-l-4 border-red-600 bg-red-50">
                <h3 className="font-medium text-red-600">
                  Base legal para el tratamiento
                </h3>
                <p className="mt-1 text-red-700">
                  El tratamiento de tus datos se basa en: (1) ejecución de
                  contrato (para pedidos), (2) consentimiento (para marketing),
                  y (3) cumplimiento de obligaciones legales.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Sección 4: Compartir datos */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              4. Compartir tus datos personales
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <p>Podemos compartir tus datos con:</p>
              <ul className="pl-5 space-y-2 list-disc">
                <li>
                  <strong>Proveedores de servicios:</strong> Empresas de
                  transporte, pasarelas de pago, servicios técnicos
                </li>
                <li>
                  <strong>EmailJS (Formularios de contacto):</strong> Utilizado
                  para gestionar las consultas enviadas a través de nuestros
                  formularios. Los datos compartidos (nombre, email, mensaje) se
                  envían a través de EmailJS para su entrega a nuestra cuenta de
                  correo. Ubicación: Estados Unidos (EE.UU.) con garantías RGPD
                  mediante cláusulas contractuales tipo. Más información:{" "}
                  <a
                    href="https://www.emailjs.com/legal/privacy-policy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black underline hover:text-gray-600"
                  >
                    Política de privacidad de EmailJS
                  </a>
                </li>
                <li>
                  <strong>Autoridades reguladoras:</strong> Cuando sea requerido
                  por ley
                </li>
                <li>
                  <strong>Empresas del grupo:</strong> Para gestión centralizada
                </li>
              </ul>
              <p className="mt-2">
                No vendemos ni alquilamos tus datos personales a terceros con
                fines de marketing.
              </p>
            </div>
          </motion.section>

          {/* Sección 5: Transferencias internacionales */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              5. Transferencias internacionales
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <p>
                Algunos de nuestros proveedores pueden estar ubicados fuera del
                Espacio Económico Europeo (EEE). En estos casos, garantizamos
                que se aplican las salvaguardas adecuadas según el RGPD.
              </p>
            </div>
          </motion.section>

          {/* Sección 6: Seguridad de datos */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              6. Seguridad de tus datos
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <p>
                Implementamos medidas técnicas y organizativas apropiadas para
                proteger tus datos personales contra accesos no autorizados,
                alteración, divulgación o destrucción.
              </p>
              <p>
                Utilizamos cifrado SSL para las transacciones y almacenamos los
                datos en entornos seguros con acceso restringido.
              </p>
            </div>
          </motion.section>

          {/* Sección 7: Retención de datos */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              7. Retención de datos
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <p>
                Conservamos tus datos personales solo durante el tiempo
                necesario para los fines para los que fueron recopilados,
                incluyendo el cumplimiento de obligaciones legales, contables o
                de reporting.
              </p>
              <p>Los plazos generales de conservación son:</p>
              <ul className="pl-5 space-y-2 list-disc">
                <li>
                  <strong>Datos de clientes:</strong> 5 años desde la última
                  transacción (obligaciones fiscales)
                </li>
                <li>
                  <strong>Datos para marketing:</strong> Hasta que revoques tu
                  consentimiento
                </li>
                <li>
                  <strong>Registros de acceso:</strong> 1 año
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Sección 8: Tus derechos */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              8. Tus derechos de protección de datos
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <p>De acuerdo con el RGPD, tienes los siguientes derechos:</p>
              <ul className="pl-5 space-y-2 list-disc">
                <li>
                  <strong>Acceso:</strong> Solicitar copia de tus datos
                  personales
                </li>
                <li>
                  <strong>Rectificación:</strong> Corregir datos inexactos o
                  incompletos
                </li>
                <li>
                  <strong>Supresión ("derecho al olvido"):</strong> Pedir que
                  borremos tus datos
                </li>
                <li>
                  <strong>Limitación del tratamiento:</strong> Restringir el uso
                  de tus datos
                </li>
                <li>
                  <strong>Portabilidad:</strong> Recibir tus datos en formato
                  estructurado
                </li>
                <li>
                  <strong>Oposición:</strong> Oponerte al tratamiento en ciertas
                  circunstancias
                </li>
                <li>
                  <strong>Retirar el consentimiento:</strong> En cualquier
                  momento para marketing
                </li>
              </ul>
              <p className="mt-2">
                Para ejercer estos derechos, contáctanos en{" "}
                <a
                  href="mailto:opticadelvaljoyeros@gmail.com"
                  className="text-black underline hover:text-gray-600"
                >
                  opticadelvaljoyeros@gmail.com
                </a>
                .
              </p>
            </div>
          </motion.section>

          {/* Sección 9: Cookies */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              9. Cookies y tecnologías similares
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <p>
                Nuestro sitio web utiliza cookies y tecnologías similares para
                mejorar tu experiencia de usuario, analizar el tráfico y
                personalizar el contenido.
              </p>

              <div className="mt-8">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Tipos de cookies que utilizamos:
                </h3>
                <ul className="pl-5 space-y-2 list-disc">
                  <li>
                    <strong>Cookies necesarias:</strong> Esenciales para el
                    funcionamiento del sitio (carrito, sesión).
                  </li>
                  <li>
                    <strong>Cookies funcionales:</strong> Guardan tus
                    preferencias (favoritos, idioma, tema) durante 365 días.
                  </li>
                  <li>
                    <strong>Cookies analíticas:</strong> Google Analytics y Meta
                    Pixel para entender el uso del sitio.
                  </li>
                  <li>
                    <strong>Cookies de marketing:</strong> Para mostrar anuncios
                    relevantes y medir campañas.
                  </li>
                </ul>
              </div>

              <div className="p-4 mt-6 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm">
                  <strong>Gestiona tus preferencias:</strong> Puedes aceptar o
                  rechazar cookies no esenciales en cualquier momento usando el
                  panel de configuración a continuación.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Panel de gestión de cookies */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.95 }}
          >
            <CookieSettings />
          </motion.section>

          {/* Sección 10: Cambios a esta política */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              10. Cambios a esta política
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <p>
                Podemos actualizar esta política ocasionalmente. Te
                notificaremos de cambios significativos mediante un aviso en
                nuestro sitio web o por correo electrónico.
              </p>
              <p>
                Te recomendamos que revises esta política periódicamente para
                estar informado sobre cómo protegemos tu información.
              </p>
            </div>
          </motion.section>

          {/* Contacto */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="p-8 text-white bg-black rounded-sm"
          >
            <div className="text-center">
              <h2 className="mb-2 text-xl font-light tracking-wider">
                Responsable del Tratamiento
              </h2>
              <div className="mb-6 text-sm text-gray-300 space-y-1">
                <p>
                  <strong className="text-white">Razón Social:</strong> Óptica
                  Del Val Joyeros S.L.
                </p>
                <p>
                  <strong className="text-white">CIF:</strong> B14629406
                </p>
                <p>
                  <strong className="text-white">Dirección:</strong> C/
                  Cristobal Castillo, 13, 14500 Puente Genil, Córdoba
                </p>
              </div>

              <h3 className="mb-4 text-lg font-light tracking-wider">
                ¿Tienes preguntas sobre privacidad?
              </h3>
              <p className="mb-6 text-gray-300">
                Contacta con nosotros para ejercer tus derechos
              </p>
              <div className="grid max-w-md gap-4 mx-auto sm:grid-cols-2">
                <a
                  href="mailto:opticadelvaljoyeros@gmail.com"
                  className="flex flex-col items-center p-4 transition-colors rounded-sm hover:bg-gray-800"
                >
                  <Mail className="w-5 h-5 mb-2" />
                  <span className="text-sm">Email</span>
                  <span className="text-xs text-gray-300">
                    opticadelvaljoyeros@gmail.com
                  </span>
                </a>
                <a
                  href="tel:957602123"
                  className="flex flex-col items-center p-4 transition-colors rounded-sm hover:bg-gray-800"
                >
                  <Phone className="w-5 h-5 mb-2" />
                  <span className="text-sm">Teléfono</span>
                  <span className="text-xs text-gray-300">957 60 21 23</span>
                </a>
              </div>
              <div className="flex items-center justify-center mt-4 text-xs text-gray-400">
                <span>
                  También puedes presentar una reclamación ante la Agencia
                  Española de Protección de Datos (AEPD)
                </span>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </motion.div>
  );
};

export default PoliticaPrivacidad;
