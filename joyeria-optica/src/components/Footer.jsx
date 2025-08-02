import { Facebook, Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="pt-10 text-gray-800 bg-gray-100">
      <div className="grid grid-cols-1 gap-8 px-4 pb-8 mx-auto border-b border-gray-300 max-w-7xl md:px-8 md:grid-cols-3">
        {/* Logo + Descripción */}
        <div>
          <h2 className="mb-2 text-xl font-bold">Óptica Del Val Joyeros</h2>
          <p className="text-sm">
            Especialistas en óptica, joyería, relojería y complementos desde hace cuatro
            generaciones. Calidad, elegancia y atención personalizada.
          </p>
          <p className="mt-2 text-sm">Contacta con nosotros ahora:</p>
          <p className="font-bold">957 60 21 23</p>
        </div>

        {/* Enlaces útiles */}
        <div>
          <h3 className="mb-3 font-semibold text-md">Enlaces</h3>
          <ul className="space-y-2 text-sm">
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
          <h3 className="mb-3 font-semibold text-md">Síguenos</h3>
          <div className="flex items-center gap-4">
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
        </div>
      </div>

      {/* Copyright */}
      <div className="py-4 text-xs text-center text-gray-500">
        &copy; {new Date().getFullYear()} Óptica y Joyería Del Val. Todos los
        derechos reservados.
      </div>
    </footer>
  );
}
