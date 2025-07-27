import VerticalAccordion from "../components/Accordion";
import GridArticulos from "../components/GridArticulos";
import GridMarcas from "../components/GridMarcas";
import ColeccionTous from "../components/ColeccionTous";
import ColeccionesDestacadas from "../components/ColeccionesDestacadas";
import PromocionDiamantes from "../components/Promoción";
import ContactoOptica from "../components/ContactCard";
export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <VerticalAccordion />
      <section className="my-10 md:my-32">
        <GridArticulos />
      </section>
      <section className="my-10 md:my-32">
        <ColeccionTous />
      </section>
      <section className="my-10 md:my-32">
        <h2 className="text-2xl font-bold text-center mb-8">
          Tus marcas favoritas en óptica
        </h2>
        <GridMarcas />
      </section>
      <section className="my-10 md:my-32">
        <ColeccionesDestacadas />
      </section>
      <section className="my-10 md:my-32">
        <div className="bg-black text-white flex flex-col md:flex-row items-center justify-between py-8 md:py-0 px-6 md:px-8 md:h-40">
          <div className="md:w-10/12 w-full text-center md:text-left space-y-4 md:space-y-3 md:pr-4">
            <h2 className="text-xl md:text-3xl font-bold leading-tight">
              ¡SIGUENOS EN INSTAGRAM PARA NO PERDERTE LAS NOVEDADES!
            </h2>
            <p className="font-bold text-base md:text-xl">
              PARTICIPA EN SORTEOS Y MANTENTE AL DÍA
            </p>
          </div>
          <div className="mt-6 md:mt-0 md:pl-4 flex-shrink-0">
            <button onClick={() => window.open("https://www.instagram.com/opticadelvaljoyeros?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", "_blank")} className="bg-white text-black font-medium px-6 py-3 md:py-2 text-sm md:text-base hover:bg-gray-200 transition-colors duration-300">
              Nuestro perfil
            </button>
          </div>
        </div>
      </section>
      <section className="my-10 md:my-32">
        <PromocionDiamantes />
      </section>
      <section className="my-10 md:my-32">
        <ContactoOptica />
      </section>
    </div>
  );
}
