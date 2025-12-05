import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, MapPin, Mail, Phone } from "lucide-react";

const AvisoLegal = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      <div className="container max-w-4xl py-12 mx-auto px-4">
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-2xl font-semibold tracking-wider text-black md:text-4xl">
            AVISO LEGAL
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

        <div className="space-y-8">
          {/* 1. Datos identificativos */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              1. Datos Identificativos
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <div className="grid gap-3">
                <div>
                  <strong>Razón Social:</strong> Óptica Del Val Joyeros S.L.
                </div>
                <div>
                  <strong>CIF:</strong> B14629406
                </div>
                <div>
                  <strong>Domicilio:</strong> C/ Cristobal Castillo, 13 - 14500
                  Puente Genil, Córdoba
                </div>
                <div>
                  <strong>Teléfono:</strong> 957 60 21 23
                </div>
                <div>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:opticadelvaljoyeros@gmail.com"
                    className="text-black underline hover:text-gray-600"
                  >
                    opticadelvaljoyeros@gmail.com
                  </a>
                </div>
                <div>
                  <strong>Sitio web:</strong> https://opticadelvaljoyeros.es
                </div>
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <strong>Objeto Social:</strong> Comercio al por menor de
                  artículos de joyería, relojería, platería, bisutería y de
                  aparatos e instrumentos ópticos, médicos, ortopédicos y
                  fotográficos. Ejercicio de la profesión óptica.
                </div>
              </div>
            </div>
          </motion.section>

          {/* 2. Objeto */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              2. Objeto
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <p>
                El presente aviso legal regula el uso y utilización del sitio
                web <strong>https://opticadelvaljoyeros.es</strong>, del que es
                titular <strong>Óptica Del Val Joyeros S.L.</strong> (CIF:
                B14629406).
              </p>
              <p>
                La navegación por el sitio web atribuye la condición de usuario
                del mismo e implica la aceptación plena de todas las
                disposiciones incluidas en este Aviso Legal.
              </p>
            </div>
          </motion.section>

          {/* 3. Condiciones de uso */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              3. Condiciones de Uso
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <p>El usuario se compromete a:</p>
              <ul className="pl-5 space-y-2 list-disc">
                <li>
                  Hacer un uso adecuado y lícito del sitio web y de los
                  contenidos
                </li>
                <li>
                  No realizar actividades ilícitas o contrarias a la buena fe y
                  al orden público
                </li>
                <li>
                  No difundir contenidos que sean discriminatorios, xenófobos,
                  de pornografía infantil o que atenten contra los derechos
                  humanos
                </li>
                <li>No causar daños en el sitio web</li>
                <li>
                  No introducir virus, programas maliciosos o cualquier otro
                  sistema que pueda dañar el sitio web o terceros
                </li>
              </ul>
            </div>
          </motion.section>

          {/* 4. Propiedad intelectual */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              4. Propiedad Intelectual e Industrial
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <p>
                Todos los contenidos del sitio web (textos, imágenes, logos,
                marcas, diseños, estructura, selección y presentación) son
                propiedad de <strong>Óptica Del Val Joyeros S.L.</strong> o de
                terceros que han autorizado su uso.
              </p>
              <p>
                Quedan reservados todos los derechos. Queda prohibida la
                reproducción, distribución, comunicación pública, transformación
                o cualquier otra actividad que se pueda realizar con los
                contenidos sin autorización expresa por escrito.
              </p>
              <div className="p-4 mt-4 border-l-4 border-red-600 bg-red-50">
                <h3 className="font-medium text-red-600 mb-2">
                  Marcas registradas
                </h3>
                <p className="text-red-700 text-sm">
                  Las marcas comerciales que aparecen en el sitio web (Ray-Ban,
                  Tous, Festina, Viceroy, Lotus, Marina García, Nomination,
                  Salvatore, La Petra, Dolce & Gabbana, etc.) son propiedad de
                  sus respectivos titulares. Su uso en este sitio tiene
                  únicamente fines informativos como distribuidor autorizado y
                  no implica ningún tipo de vinculación, patrocinio o
                  recomendación por parte de dichas marcas.
                </p>
              </div>
            </div>
          </motion.section>

          {/* 5. Responsabilidad */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              5. Limitación de Responsabilidad
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <p>
                <strong>Óptica Del Val Joyeros S.L.</strong> no se hace
                responsable de:
              </p>
              <ul className="pl-5 space-y-2 list-disc">
                <li>
                  La continuidad y disponibilidad de los contenidos. Pueden
                  producirse interrupciones por mantenimiento, actualizaciones o
                  causas ajenas a nuestro control.
                </li>
                <li>
                  Errores u omisiones en los contenidos. Hacemos todos los
                  esfuerzos razonables para mantener la información actualizada,
                  pero no garantizamos la exactitud absoluta.
                </li>
                <li>
                  Daños o perjuicios derivados del acceso o uso del sitio web,
                  salvo dolo o negligencia grave.
                </li>
                <li>
                  Enlaces a sitios web de terceros. No controlamos su contenido
                  ni nos hacemos responsables del mismo.
                </li>
                <li>
                  Virus o elementos dañinos introducidos por terceros en el
                  sitio web.
                </li>
              </ul>
            </div>
          </motion.section>

          {/* 6. Precios e imágenes */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              6. Precios, Disponibilidad e Imágenes
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <ul className="pl-5 space-y-2 list-disc">
                <li>
                  Los precios publicados incluyen el IVA vigente (21% general) y
                  están expresados en euros (€).
                </li>
                <li>
                  Los precios están sujetos a cambios sin previo aviso, aunque
                  se respetarán los confirmados en pedidos ya aceptados.
                </li>
                <li>
                  La disponibilidad de productos puede variar. Se confirmará la
                  disponibilidad real en el momento de procesar el pedido.
                </li>
                <li>
                  Las imágenes de productos son orientativas y pueden diferir
                  ligeramente del producto real debido a la configuración de
                  pantalla o características de fabricación.
                </li>
                <li>
                  En caso de error tipográfico en precios, se informará al
                  cliente antes de procesar el pedido y se ofrecerá la opción de
                  cancelación sin coste.
                </li>
              </ul>
            </div>
          </motion.section>

          {/* 7. Enlaces externos */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              7. Enlaces Externos
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <p>
                El sitio web puede contener enlaces a sitios web de terceros. No
                controlamos ni asumimos responsabilidad sobre el contenido,
                políticas de privacidad o prácticas de dichos sitios.
              </p>
              <p>
                Si algún usuario o tercero considera que existe contenido que
                pueda ser susceptible de infracción de derechos, deberá
                comunicarlo inmediatamente a través del email{" "}
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

          {/* 8. Protección de datos */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              8. Protección de Datos Personales
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <p>
                El tratamiento de datos personales se rige por nuestra{" "}
                <a
                  href="/privacidad"
                  className="text-black underline hover:text-gray-600 font-medium"
                >
                  Política de Privacidad
                </a>
                , elaborada conforme al Reglamento General de Protección de
                Datos (RGPD) y la Ley Orgánica de Protección de Datos (LOPDGDD).
              </p>
              <p>
                Para más información sobre cómo tratamos tus datos, consulta
                nuestra política de privacidad.
              </p>
            </div>
          </motion.section>

          {/* 9. Legislación aplicable */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              9. Legislación Aplicable y Jurisdicción
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <p>
                Las presentes condiciones se rigen e interpretan de acuerdo con
                la legislación española vigente.
              </p>
              <p>
                Para la resolución de cualquier controversia o conflicto
                derivado de la interpretación, cumplimiento o incumplimiento de
                las presentes condiciones, las partes se someterán, con renuncia
                expresa a cualquier otro fuero, a los Juzgados y Tribunales del
                domicilio del usuario consumidor, de conformidad con la
                legislación aplicable en materia de consumidores y usuarios.
              </p>
            </div>
          </motion.section>

          {/* 10. Modificaciones */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="p-6 border border-gray-100 rounded-sm"
          >
            <h2 className="flex items-center pb-2 mb-6 text-xl font-light tracking-wider text-black border-b">
              <ChevronRight className="w-5 h-5 mr-2 text-red-600" />
              10. Modificaciones
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <p>
                Nos reservamos el derecho de realizar cambios en el sitio web y
                en el presente aviso legal en cualquier momento y sin previo
                aviso.
              </p>
              <p>
                Te recomendamos revisar periódicamente estas condiciones para
                estar informado de cualquier modificación.
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
              <h2 className="mb-4 text-xl font-light tracking-wider">
                ¿Necesitas más información?
              </h2>
              <p className="mb-6 text-gray-300">Contacta con nosotros</p>
              <div className="grid max-w-md gap-4 mx-auto sm:grid-cols-3">
                <a
                  href="mailto:opticadelvaljoyeros@gmail.com"
                  className="flex flex-col items-center p-4 transition-colors rounded-sm hover:bg-gray-800"
                >
                  <Mail className="w-5 h-5 mb-2" />
                  <span className="text-sm">Email</span>
                  <span className="text-xs text-gray-300 mt-1">
                    opticadelvaljoyeros@gmail.com
                  </span>
                </a>
                <a
                  href="tel:957602123"
                  className="flex flex-col items-center p-4 transition-colors rounded-sm hover:bg-gray-800"
                >
                  <Phone className="w-5 h-5 mb-2" />
                  <span className="text-sm">Teléfono</span>
                  <span className="text-xs text-gray-300 mt-1">
                    957 60 21 23
                  </span>
                </a>
                <div className="flex flex-col items-center p-4">
                  <MapPin className="w-5 h-5 mb-2" />
                  <span className="text-sm">Tienda física</span>
                  <span className="text-xs text-gray-300 mt-1">
                    Puente Genil
                  </span>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </motion.div>
  );
};

export default AvisoLegal;
