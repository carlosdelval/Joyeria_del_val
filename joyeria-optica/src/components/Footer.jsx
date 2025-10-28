import { Facebook, Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="pt-8 sm:pt-10 text-white bg-black">
      <div className="grid grid-cols-1 gap-6 sm:gap-8 px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 mx-auto border-b border-gray-300 max-w-7xl md:grid-cols-3">
        {/* Logo + Descripción */}
        <div>
          <h2 className="mb-2 text-lg sm:text-xl font-bold">
            Óptica Del Val Joyeros
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Especialistas en óptica, joyería, relojería y complementos desde
            hace cuatro generaciones. Calidad, elegancia y atención
            personalizada.
          </p>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base">
            Contacta con nosotros ahora:
          </p>
          <p className="font-bold text-base sm:text-lg">957 60 21 23</p>
        </div>

        {/* Enlaces útiles */}
        <div>
          <h3 className="mb-3 font-semibold text-base sm:text-lg">Enlaces</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>
              <a href="terminos-legales" className="hover:underline">
                Términos y Condiciones
              </a>
            </li>
            <li>
              <a href="/privacidad" className="hover:underline">
                Política de Privacidad
              </a>
            </li>
            <li>
              <a href="/envios-devoluciones" className="hover:underline">
                Política de Envíos y Devoluciones
              </a>
            </li>
            <li>
              <a href="/contacto" className="hover:underline">
                Contacto
              </a>
            </li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div>
          <h3 className="mb-3 font-semibold text-base sm:text-lg">Síguenos</h3>
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="https://www.instagram.com/opticadelvaljoyeros?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noreferrer"
              className="duration-300 hover:text-pink-600 p-2 hover:bg-pink-50 rounded-full transition-all"
              aria-label="Síguenos en Instagram"
            >
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a
              href="https://www.facebook.com/p/Óptica-Del-Val-Joyeros-100063458862976"
              target="_blank"
              rel="noreferrer"
              className="duration-300 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-full transition-all"
              aria-label="Síguenos en Facebook"
            >
              <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a
              href="mailto:opticadelvaljoyeros@gmail.com"
              className="duration-300 hover:text-cyan-600 p-2 hover:bg-cyan-50 rounded-full transition-all"
              aria-label="Envíanos un email"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a
              href="tel:957602123"
              className="duration-300 hover:text-green-600 p-2 hover:bg-green-50 rounded-full transition-all"
              aria-label="Llámanos"
            >
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="py-4 sm:py-5 text-xs sm:text-sm text-center text-gray-400">
        &copy; {new Date().getFullYear()} Óptica y Joyería Del Val. Todos los
        derechos reservados.
      </div>
    </footer>
  );
}
