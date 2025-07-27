import { Facebook, Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 pt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-300">
        {/* Logo + Descripción */}
        <div>
          <h2 className="text-xl font-bold mb-2">Óptica y Joyería Del Val</h2>
          <p className="text-sm">
            Especialistas en óptica, joyería, relojería y complementos desde hace cuatro
            generaciones. Calidad, elegancia y atención personalizada.
          </p>
          <p className="text-sm mt-2">Contacta con nosotros ahora:</p>
          <p className="font-bold">957 60 21 23</p>
        </div>

        {/* Enlaces útiles */}
        <div>
          <h3 className="text-md font-semibold mb-3">Enlaces</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Términos y Condiciones
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Política de Privacidad
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Política de Envíos y Devoluciones
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contacto
              </a>
            </li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div>
          <h3 className="text-md font-semibold mb-3">Síguenos</h3>
          <div className="flex gap-4 items-center">
            <a
              href="https://www.instagram.com/opticadelvaljoyeros?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-600 duration-300"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/p/Óptica-Del-Val-Joyeros-100063458862976"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600 duration-300"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="mailto:opticadelvaljoyeros@gmail.com"
              className="hover:text-cyan-300 duration-300"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="tel:957602123"
              className="hover:text-green-600 duration-300"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-500 py-4">
        &copy; {new Date().getFullYear()} Óptica y Joyería Del Val. Todos los
        derechos reservados.
      </div>
    </footer>
  );
}
