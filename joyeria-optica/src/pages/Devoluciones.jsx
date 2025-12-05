import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Mail, Phone, Clock, ChevronRight } from "lucide-react";

const PoliticaEnviosDevoluciones = () => {
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
            POLÍTICA DE ENVÍOS Y DEVOLUCIONES
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
          {/* Sección 1: Envíos */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              1. Política de envíos
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <h3 className="font-medium">Zonas de envío:</h3>
              <p>
                Realizamos envíos a toda España (Península, Baleares, Canarias,
                Ceuta y Melilla) y a la mayoría de países de Europa. Para envíos
                internacionales fuera de Europa, contáctanos antes de realizar
                el pedido.
              </p>

              <h3 className="mt-4 font-medium">Transportistas:</h3>
              <p>
                Trabajamos con las principales empresas de transporte (Correos,
                SEUR, DHL) para garantizar la entrega segura de tus pedidos.
              </p>

              <h3 className="mt-4 font-medium">Plazos de entrega:</h3>
              <ul className="pl-5 space-y-2 list-disc">
                <li>
                  <strong>Península:</strong> 24-48 horas laborables para
                  productos en stock
                </li>
                <li>
                  <strong>Baleares, Ceuta y Melilla:</strong> 2-3 días
                  laborables
                </li>
                <li>
                  <strong>Canarias:</strong> 3-5 días laborables
                </li>
                <li>
                  <strong>Europa:</strong> 3-7 días laborables según destino
                </li>
              </ul>
              <p className="mt-2 text-xs italic text-gray-500">
                *Los plazos empiezan a contar una vez confirmado el pago y no
                incluyen días festivos.
              </p>
            </div>
          </motion.section>

          {/* Sección 2: Gastos de envío */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              2. Gastos de envío
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Zona
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Pedido mínimo
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Coste
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                        Península
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                        50 €
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                        Gratis
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                        Baleares, Ceuta, Melilla
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                        100 €
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                        Gratis (10 € si no alcanza mínimo)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                        Canarias
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                        139 €
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                        39 € (57 € si no alcanza mínimo)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                        Europa (UE)
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                        -
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                        15-20 € según destino
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                        América
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                        -
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                        55 €
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs italic text-gray-500">
                *Los pedidos fuera de la UE pueden estar sujetos a aranceles e
                impuestos de aduanas que corren por cuenta del cliente.
              </p>
            </div>
          </motion.section>

          {/* Sección 3: Seguimiento de envíos */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              3. Seguimiento de envíos
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <p>
                Una vez enviado tu pedido, recibirás un email con el número de
                seguimiento y enlace para rastrear tu paquete en la web del
                transportista.
              </p>
              <p>
                Si no recibes esta información en 48 horas o tienes cualquier
                incidencia con el envío, contáctanos en{" "}
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

          {/* Sección 4: Incidencias con envíos */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              4. Incidencias con los envíos
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <p>
                En caso de incidencia con la entrega (paquete dañado, contenido
                incorrecto, etc.), sigue estos pasos:
              </p>
              <ol className="pl-5 space-y-2 list-decimal">
                <li>
                  Comprueba el estado del paquete en el momento de la entrega
                </li>
                <li>Toma fotos de cualquier daño evidente en el embalaje</li>
                <li>
                  Si el paquete está visiblemente dañado, rechaza la entrega
                </li>
                <li>
                  Si aceptas el paquete pero hay problemas, contáctanos en 24
                  horas
                </li>
              </ol>
              <div className="p-4 mt-4 border-l-4 border-red-600 bg-red-50">
                <h3 className="font-medium text-red-600">Importante</h3>
                <p className="mt-1 text-red-700">
                  No podemos gestionar reclamaciones por paquetes aceptados sin
                  reservas o cuando han transcurrido más de 7 días desde la
                  entrega.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Sección 5: Política de devoluciones */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              5. Política de devoluciones
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <p>
                Aceptamos devoluciones dentro de los{" "}
                <strong>30 días naturales</strong> desde la recepción del
                pedido, siempre que:
              </p>
              <ul className="pl-5 space-y-2 list-disc">
                <li>
                  El producto esté en su estado original, sin usar y con el
                  embalaje original
                </li>
                <li>Se incluya la factura o ticket de compra</li>
                <li>No sea un producto personalizado o hecho a medida</li>
              </ul>

              <h3 className="mt-4 font-medium">Proceso de devolución:</h3>
              <ol className="pl-5 space-y-2 list-decimal">
                <li>
                  Contacta con nosotros en{" "}
                  <a
                    href="mailto:opticadelvaljoyeros@gmail.com"
                    className="text-black underline hover:text-gray-600"
                  >
                    opticadelvaljoyeros@gmail.com
                  </a>{" "}
                  indicando el motivo
                </li>
                <li>Te enviaremos una etiqueta de devolución si aplica</li>
                <li>
                  Empaqueta el producto cuidadosamente con todos sus accesorios
                </li>
                <li>Envía el paquete a la dirección que te indiquemos</li>
              </ol>

              <h3 className="mt-4 font-medium">Reembolsos:</h3>
              <p>
                Una vez recibido y verificado el producto, procesaremos el
                reembolso en un plazo máximo de 14 días. El importe se devolverá
                mediante el mismo método de pago utilizado en la compra.
              </p>
            </div>
          </motion.section>

          {/* Sección 6: Gastos de devolución */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              6. Gastos de devolución
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <p>Los gastos de devolución corren por cuenta:</p>
              <ul className="pl-5 space-y-2 list-disc">
                <li>
                  <strong>Del cliente:</strong> Si la devolución es por cambio
                  de opinión o error en el pedido por parte del cliente
                </li>
                <li>
                  <strong>De Óptica Del Val Joyeros:</strong> Si la devolución
                  es por error nuestro o producto defectuoso
                </li>
              </ul>
              <p className="mt-2">
                En caso de devolución internacional, cualquier arancel o
                impuesto de aduana no será reembolsable.
              </p>
            </div>
          </motion.section>

          {/* Sección 7: Productos defectuosos */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              7. Productos defectuosos
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <p>
                Si recibes un producto defectuoso o no conforme con tu pedido,
                contáctanos inmediatamente en{" "}
                <a
                  href="mailto:opticadelvaljoyeros@gmail.com"
                  className="text-black underline hover:text-gray-600"
                >
                  opticadelvaljoyeros@gmail.com
                </a>{" "}
                o en el{" "}
                <a
                  href="tel:957602123"
                  className="text-black underline hover:text-gray-600"
                >
                  957 60 21 23
                </a>
                .
              </p>
              <p>
                Te indicaremos cómo proceder para la devolución o sustitución
                del producto, que se realizará sin coste adicional para ti.
              </p>
              <p>
                Todos nuestros productos tienen una garantía legal de 2 años
                conforme a la legislación española.
              </p>
            </div>
          </motion.section>

          {/* Sección 8: Cambios */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              8. Cambios de productos
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <p>
                Si deseas cambiar un producto por otro de igual o mayor valor,
                contáctanos antes de enviar la devolución. Los cambios están
                sujetos a disponibilidad de stock.
              </p>
              <p>
                Si el nuevo producto tiene un valor superior, deberás abonar la
                diferencia. Si es de menor valor, te reembolsaremos la
                diferencia.
              </p>
              <p>
                Los gastos de envío del nuevo producto correrán por tu cuenta,
                excepto en casos de error por nuestra parte.
              </p>
            </div>
          </motion.section>

          {/* Contacto */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="p-8 text-white bg-black rounded-sm"
          >
            <div className="text-center">
              <h2 className="mb-4 text-xl font-light tracking-wider">
                ¿Necesitas ayuda con tu envío o devolución?
              </h2>
              <p className="mb-6 text-gray-300">
                Nuestro equipo de atención al cliente está aquí para ayudarte
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
                <Clock className="w-4 h-4 mr-1" />
                <span>
                  Horario de atención: Lunes a Viernes 10:00-14:00 y 17:00-21:00
                </span>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </motion.div>
  );
};

export default PoliticaEnviosDevoluciones;
