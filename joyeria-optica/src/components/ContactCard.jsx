const ContactoOptica = () => {
  return (
    <section className="px-6 py-12 bg-white border-t lg:px-20">
      <h2 className="mb-6 text-4xl font-bold">
        ¡Visítanos en nuestra óptica!
      </h2>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col justify-between">
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
          </div>
          <iframe
            title="Ubicación Óptica"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235.6113726772949!2d-4.768496991523713!3d37.3899235866001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6d4319432b634b%3A0x792105c6755a790f!2sOptica%20Del%20Val%20Joyeros!5e0!3m2!1ses!2ses!4v1753627847584!5m2!1ses!2ses"
            className="w-full h-64 border rounded"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        <div>
          <img
            src="/reconocimiento2.jpg"
            alt="Reconocimiento Óptica 2"
            className="w-full h-full rounded shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactoOptica;
import { Instagram, Phone, Facebook, Mail } from "lucide-react";
