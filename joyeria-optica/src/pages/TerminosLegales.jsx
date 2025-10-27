import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Mail, Phone, Clock, ChevronRight } from "lucide-react";

const TerminosLegales = () => {
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
            TÉRMINOS Y CONDICIONES LEGALES
          </h1>
          <div className="w-24 h-px mx-auto bg-gray-300"></div>
          <p className="mt-4 text-gray-600">
            Última actualización: {new Date().toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.header>

        {/* Contenido principal */}
        <div className="space-y-8">
          {/* Sección 1: Titularidad */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              1. Titularidad del dominio
            </h2>
            
            <div className="space-y-4 text-sm text-gray-700">
              <p>
                En cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSICE), se informa que la titularidad del dominio de nuestra tienda virtual, <a href="http://www.opticadelvaljoyeros.es" className="text-black underline hover:text-gray-600">www.opticadelvaljoyeros.es</a>, corresponde a Óptica Del Val Joyeros, sociedad legalmente constituida en España.
              </p>
              <p>
                Para cualquier consulta, puede contactar con Óptica Del Val Joyeros en el correo electrónico <a href="mailto:opticadelvaljoyeros@gmail.com" className="text-black underline hover:text-gray-600">opticadelvaljoyeros@gmail.com</a> o en el teléfono <a href="tel:957602123" className="text-black underline hover:text-gray-600">957 60 21 23</a>.
              </p>
            </div>
          </motion.section>

          {/* Sección 2: Objeto y ámbito */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              2. Objeto y ámbito de aplicación
            </h2>
            
            <div className="space-y-4 text-sm text-gray-700">
              <p>
                Estas Condiciones Generales regulan el acceso y uso de la tienda online de Óptica Del Val Joyeros, así como las transacciones comerciales entre los usuarios y la tienda. La navegación y/o compra de productos implica la aceptación sin reservas de estas condiciones.
              </p>
              <p>
                Óptica Del Val Joyeros podrá modificarlas en cualquier momento publicando las actualizaciones en el sitio web.
              </p>
            </div>
          </motion.section>

          {/* Sección 3: Información del website */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              3. Información suministrada en el website
            </h2>
            
            <div className="space-y-4 text-sm text-gray-700">
              <p>
                Intentamos garantizar que toda la información sea precisa y libre de errores. En caso de error tipográfico o informático en precios, se comunicará al cliente.
              </p>
              <p>
                Todos los contratos y comunicaciones se realizan en castellano.
              </p>
            </div>
          </motion.section>

          {/* Sección 4: Propiedad intelectual */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              4. Propiedad intelectual e industrial
            </h2>
            
            <div className="space-y-4 text-sm text-gray-700">
              <p>
                Los contenidos, diseños, logos y materiales del sitio web son propiedad de Óptica Del Val Joyeros o de terceros con autorización.
              </p>
              <p>
                Está prohibido el uso no autorizado de cualquier contenido, así como el establecimiento de hiperenlaces con fines comerciales sin consentimiento.
              </p>
            </div>
          </motion.section>

          {/* Sección 5: Responsabilidad */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              5. Responsabilidad de Óptica Del Val Joyeros
            </h2>
            
            <div className="space-y-4 text-sm text-gray-700">
              <p>
                Los productos están conformes con la legislación española. Óptica Del Val Joyeros no se responsabiliza de productos que no cumplan la normativa de otros países.
              </p>
              <p>
                Tampoco es responsable de interferencias, virus, fallos técnicos o mal uso del sitio por parte de los usuarios o terceros.
              </p>
              <div className="p-4 mt-4 border-l-4 border-red-600 bg-red-50">
                <h3 className="font-medium text-red-600">Condiciones sobre errores de precio</h3>
                <p className="mt-1 text-red-700">
                  Si se muestra un precio claramente erróneo por fallo técnico, Óptica Del Val Joyeros se reserva el derecho a cancelar el pedido, notificando al cliente.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Sección 6: Obligaciones de clientes */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              6. Obligaciones de clientes y usuarios
            </h2>
            
            <div className="space-y-4 text-sm text-gray-700">
              <p>
                Los usuarios deben actuar conforme a la ley y buena fe. En particular, se comprometen a:
              </p>
              <ul className="pl-5 space-y-2 list-disc">
                <li>No introducir contenido ilegal, dañino o difamatorio</li>
                <li>No realizar usos indebidos del sitio</li>
                <li>Facilitar datos veraces y actualizados</li>
                <li>Custodiar adecuadamente sus credenciales de acceso</li>
              </ul>
            </div>
          </motion.section>

          {/* Sección 7: Privacidad */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              7. Privacidad y protección de datos personales
            </h2>
            
            <div className="space-y-4 text-sm text-gray-700">
              <p>
                Óptica Del Val Joyeros trata los datos personales conforme a la normativa vigente. Los usuarios pueden ejercer los derechos de acceso, rectificación, cancelación y oposición escribiendo a <a href="mailto:opticadelvaljoyeros@gmail.com" className="text-black underline hover:text-gray-600">opticadelvaljoyeros@gmail.com</a>.
              </p>
            </div>
          </motion.section>

          {/* Sección 8: Cookies */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              8. Cookies
            </h2>
            
            <div className="space-y-4 text-sm text-gray-700">
              <p>
                Este sitio web utiliza cookies para mejorar la experiencia de navegación. Las cookies no contienen virus ni pueden ejecutar código. Puedes gestionarlas desde tu navegador.
              </p>
            </div>
          </motion.section>

          {/* Sección 9: Gastos de envío */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              9. Gastos de envío
            </h2>
            
            <div className="space-y-4 text-sm text-gray-700">
              <ul className="pl-5 space-y-2 list-disc">
                <li><span className="font-medium">Gratis</span> en pedidos superiores a 50 € (sólo Península)</li>
                <li><span className="font-medium">Baleares, Ceuta y Melilla:</span> gratis desde 100 €; 10 € si es inferior</li>
                <li><span className="font-medium">Canarias:</span> 57 € si supera los 139 €; 39 € si es inferior</li>
                <li><span className="font-medium">Europa:</span> 15 € (Francia); 20 € (Alemania, Bélgica, etc.)</li>
                <li><span className="font-medium">América:</span> 55 €</li>
              </ul>
              <p className="text-xs italic text-gray-500">
                *Pedidos fuera de la UE pueden tener costes adicionales por aduanas.
              </p>
            </div>
          </motion.section>

          {/* Sección 10: Realización del pedido */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              10. Realización del pedido
            </h2>
            
            <div className="space-y-4 text-sm text-gray-700">
              <p>
                Es necesario registrarse en <a href="http://www.opticadelvaljoyeros.es" className="text-black underline hover:text-gray-600">www.opticadelvaljoyeros.es</a> y seguir el proceso de compra. Óptica Del Val Joyeros no se responsabiliza por errores en datos de envío.
              </p>
              <p>
                Los productos personalizados requieren información precisa; si no se proporciona, se usará la opción por defecto.
              </p>
            </div>
          </motion.section>

          {/* Sección 11: Derecho de desistimiento */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              11. Derecho de Desistimiento y Devoluciones
            </h2>
            
            <div className="space-y-4 text-sm text-gray-700">
              <p>
                Puedes devolver tu producto dentro de los 30 días naturales. Los productos personalizados no admiten devolución.
              </p>
              <p>
                En caso de devolución, los gastos corren por cuenta del cliente salvo error por parte de Óptica Del Val Joyeros.
              </p>
            </div>
          </motion.section>

          {/* Sección 12: Desistimiento */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              12. Desistimiento
            </h2>
            
            <div className="space-y-4 text-sm text-gray-700">
              <p>
                Tienes derecho a desistir del contrato en 14 días naturales. No aplica a productos personalizados.
              </p>
              <p>
                Para ello, escribe a <a href="mailto:opticadelvaljoyeros@gmail.com" className="text-black underline hover:text-gray-600">opticadelvaljoyeros@gmail.com</a>.
              </p>
            </div>
          </motion.section>

          {/* Sección 13: Atención al cliente */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              13. Atención al cliente
            </h2>
            
            <div className="space-y-4 text-sm text-gray-700">
              <p>
                Puedes contactar con nosotros en <a href="mailto:opticadelvaljoyeros@gmail.com" className="text-black underline hover:text-gray-600">opticadelvaljoyeros@gmail.com</a> o en el <a href="tel:957602123" className="text-black underline hover:text-gray-600">957 60 21 23</a> (lunes a viernes, de 9:00 a 14:00 y de 15:00 a 18:00).
              </p>
              <p>
                Disponemos de hojas de reclamaciones oficiales disponibles tanto físicamente como en formato digital bajo solicitud.
              </p>
            </div>
          </motion.section>

          {/* Sección 14: Disponibilidad */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              14. Disponibilidad de los productos
            </h2>
            
            <div className="space-y-4 text-sm text-gray-700">
              <p>
                La oferta es válida mientras los productos estén visibles en la web. Si no hay stock, el plazo de entrega dependerá del proveedor.
              </p>
              <p>
                En productos personalizados el tiempo puede extenderse 24-48h adicionales.
              </p>
            </div>
          </motion.section>

          {/* Sección 15: Modos y plazos de envío */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              15. Modos y plazos de envío
            </h2>
            
            <div className="space-y-4 text-sm text-gray-700">
              <ul className="pl-5 space-y-2 list-disc">
                <li><span className="font-medium">En stock:</span> 24-48h</li>
                <li><span className="font-medium">Personalizados:</span> +24-48h según volumen de trabajo del taller</li>
              </ul>
            </div>
          </motion.section>

          {/* Sección 16: Pago */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              16. Pago
            </h2>
            
            <div className="space-y-4 text-sm text-gray-700">
              <p>Opciones:</p>
              <ul className="grid grid-cols-1 gap-2 pl-5 sm:grid-cols-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Tarjeta de crédito (Visa, Mastercard)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Transferencia bancaria</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Contra-reembolso (incremento del 3%)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>PayPal</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Bizum</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Aplazame (desde 100 €)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>seQura (desde 30 €)</span>
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Sección 17: Bonos y descuentos */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.7 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              17. Bonos y descuentos
            </h2>
            
            <div className="space-y-4 text-sm text-gray-700">
              <p>
                Los bonos tienen una validez de 90 días y solo son válidos para compras online. Óptica Del Val Joyeros puede modificarlos o anularlos si detecta uso indebido.
              </p>
            </div>
          </motion.section>

          {/* Sección 18: Garantía */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              18. Garantía de bienes de consumo
            </h2>
            
            <div className="space-y-4 text-sm text-gray-700">
              <p>
                Todos los productos tienen garantía de 2 años según la Ley de Defensa de los Consumidores. Para reclamar, contáctanos por email o teléfono.
              </p>
              <p>
                La garantía no cubre desgaste por mal uso.
              </p>
            </div>
          </motion.section>

          {/* Sección 19: Legislación */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.9 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              19. Legislación aplicable y jurisdicción
            </h2>
            
            <div className="space-y-4 text-sm text-gray-700">
              <p>
                Las compraventas se rigen por la legislación española. En caso de conflicto, el fuero aplicable será el correspondiente al domicilio del consumidor, en Puente Genil (Córdoba), salvo disposición legal en contra.
              </p>
            </div>
          </motion.section>

          {/* Contacto */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.0 }}
            className="p-8 text-white bg-black rounded-sm"
          >
            <div className="text-center">
              <h2 className="mb-4 text-xl font-light tracking-wider">
                ¿Necesitas Ayuda?
              </h2>
              <p className="mb-6 text-gray-300">
                Contacta con nuestra tienda
              </p>
              <div className="grid max-w-md gap-4 mx-auto sm:grid-cols-2">
                <a 
                  href="mailto:opticadelvaljoyeros@gmail.com" 
                  className="flex flex-col items-center p-4 transition-colors rounded-sm hover:bg-gray-800"
                >
                  <Mail className="w-5 h-5 mb-2" />
                  <span className="text-sm">Email</span>
                  <span className="text-xs text-gray-300">opticadelvaljoyeros@gmail.com</span>
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
                <Clock className="w-4 h-4 mr-1" />
                <span>Horario: 10:00-14:00 y 17:00-21:00</span>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </motion.div>
  );
};

export default TerminosLegales;