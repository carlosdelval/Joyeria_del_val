const ContactoOptica = () => {
  return (
    <section className="bg-white py-12 px-6 lg:px-20 border-t">
      <h2 className="text-4xl font-semibold mb-6">
        Visítanos en nuestra óptica
      </h2>
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <p className="mb-2">
            <strong>Dirección:</strong> Calle Cristobal Castillo 13, 14500
            Puente Genil, Córdoba
          </p>
          <p className="mb-2">
            <strong>Teléfono:</strong> 957 60 21 23
          </p>
          <p className="mb-2">
            <strong>Email:</strong> opticadelvaljoyeros@gmail.com
          </p>
          <p className="mb-6">
            <strong>Horario:</strong> Lunes a Viernes, 10:00 – 14:00 / 17:00 –
            21:00. Sábado, 10:00 – 14:00
          </p>
          <div>
            <h3 className="text-md font-bold mb-3">Síguenos</h3>
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
        <div>
          <iframe
            title="Ubicación Óptica"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235.6113726772949!2d-4.768496991523713!3d37.3899235866001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6d4319432b634b%3A0x792105c6755a790f!2sOptica%20Del%20Val%20Joyeros!5e0!3m2!1ses!2ses!4v1753627847584!5m2!1ses!2ses"
            className="w-full h-64 border rounded"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactoOptica;
import { Instagram, Phone, Facebook, Mail } from "lucide-react";
