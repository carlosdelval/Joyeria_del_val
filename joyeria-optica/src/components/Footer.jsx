import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Clock,
  Gem,
  Glasses,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative text-white bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:gap-12 lg:grid-cols-12">
          {/* Columna 1: Marca + Descripción */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.jpg"
                alt="Logo Óptica Del Val Joyeros"
                className="object-contain h-12 sm:h-14 rounded-lg shadow-lg"
              />
              <div className="flex flex-col">
                <div className="flex flex-row gap-2">
                  <Glasses className="w-4 h-4 text-gray-400" />
                  <p className="text-xs sm:text-sm text-gray-400">Desde 1955</p>
                </div>
                <div className="flex flex-row gap-2">
                  <Gem className="w-4 h-4 text-gray-400" />
                  <p className="text-xs sm:text-sm text-gray-400">Desde 1927</p>
                </div>
              </div>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-gray-300 mb-6">
              Cuatro generaciones de experiencia en óptica, joyería y relojería.
              Calidad, elegancia y atención personalizada en cada detalle.
            </p>

            {/* Redes sociales */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://www.instagram.com/opticadelvaljoyeros?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noreferrer"
                className="group relative p-3 rounded-xl bg-gradient-to-br hover:text-pink-400 hover:from-purple-500/20 hover:to-pink-500/20 border  hover:border-purple-500/40 transition-all duration-300"
                aria-label="Síguenos en Instagram"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.facebook.com/p/Óptica-Del-Val-Joyeros-100063458862976"
                target="_blank"
                rel="noreferrer"
                className="group relative p-3 rounded-xl bg-gradient-to-br hover:text-blue-400 hover:from-blue-500/20 hover:to-blue-600/20 border hover:border-blue-500/40 transition-all duration-300"
                aria-label="Síguenos en Facebook"
              >
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="mailto:opticadelvaljoyeros@gmail.com"
                className="group relative p-3 rounded-xl bg-gradient-to-br hover:text-cyan-400 hover:from-cyan-500/20 hover:to-teal-500/20 border  hover:border-cyan-500/40 transition-all duration-300"
                aria-label="Envíanos un email"
              >
                <Mail className="w-5 h-5  group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="tel:957602123"
                className="group relative p-3 rounded-xl bg-gradient-to-br hover:text-green-400 hover:from-green-500/20 hover:to-emerald-500/20 border  hover:border-green-500/40 transition-all duration-300"
                aria-label="Llámanos"
              >
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Columnas 2 y 3: Enlaces rápidos y Legal (2 columnas en móvil) */}
          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:col-span-5 lg:grid-cols-2">
            {/* Columna 2: Enlaces rápidos */}
            <div>
              <h3 className="mb-4 sm:mb-5 text-base sm:text-lg font-semibold tracking-wide">
                Explora
              </h3>
              <ul className="space-y-2.5 text-sm sm:text-base">
                {[
                  { href: "/joyeria", label: "Joyería" },
                  { href: "/optica", label: "Óptica" },
                  { href: "/relojeria", label: "Relojería" },
                  { href: "/catalogo/tous", label: "TOUS" },
                  { href: "/contacto", label: "Contacto" },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna 3: Información legal */}
            <div>
              <h3 className="mb-4 sm:mb-5 text-base sm:text-lg font-semibold tracking-wide">
                Legal
              </h3>
              <ul className="space-y-2.5 text-sm sm:text-base">
                {[
                  { href: "/aviso-legal", label: "Aviso Legal" },
                  { href: "/terminos-legales", label: "Términos" },
                  { href: "/privacidad", label: "Privacidad" },
                  {
                    href: "/envios-devoluciones",
                    label: "Devoluciones",
                  },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Columna 4: Contacto e info */}
          <div className="lg:col-span-3">
            <h3 className="mb-4 sm:mb-5 text-base sm:text-lg font-semibold tracking-wide">
              Contacto
            </h3>
            <ul className="space-y-4 text-sm sm:text-base">
              <li className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5 text-white flex-shrink-0" />
                <div>
                  <a
                    href="tel:957602123"
                    className="font-medium hover:text-white transition-colors"
                  >
                    957 60 21 23
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Mail className="w-5 h-5 text-white flex-shrink-0" />
                <div>
                  <a
                    href="mailto:opticadelvaljoyeros@gmail.com"
                    className="font-medium hover:text-white transition-colors break-all"
                  >
                    opticadelvaljoyeros@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-white flex-shrink-0" />
                <div>
                  <p className="font-medium">
                    C/ Cristóbal Castillo, 13
                    <br />
                    14500 Puente Genil, Córdoba
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Clock className="w-5 h-5 text-white flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm leading-relaxed">
                    Lun-Vie: 10:00 - 14:00 / 17:30 - 20:30
                    <br />
                    Sábado: 10:00 - 14:00
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="px-4 sm:px-6 lg:px-8 py-6 mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Óptica Del Val Joyeros S.L. -
              CIF: B14629406
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
