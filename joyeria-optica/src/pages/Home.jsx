import VerticalAccordion from "../components/Accordion";
import GridArticulos from "../components/GridArticulos";
import GridMarcas from "../components/GridMarcas";
import ColeccionTous from "../components/ColeccionTous";
import ColeccionesDestacadas from "../components/ColeccionesDestacadas";
import PromocionDiamantes from "../components/Promoción";
import ContactoOptica from "../components/ContactCard";
export default function Home() {
  return (
    <div className="container px-4 py-12 mx-auto">
      <VerticalAccordion />
      <section className="my-10 md:my-32">
        <GridArticulos />
      </section>
      <section className="my-10 md:my-32">
        <ColeccionTous />
      </section>
      <section className="my-10 md:my-32">
        <div className="flex flex-col items-center justify-between px-6 py-8 text-white bg-black md:flex-row md:py-0 md:px-8 md:h-40">
          <div className="w-full space-y-4 text-center md:w-10/12 md:text-left md:space-y-3 md:pr-4">
            <h2 className="text-xl font-bold leading-tight md:text-3xl">
              ¡SIGUENOS EN INSTAGRAM PARA NO PERDERTE LAS NOVEDADES!
            </h2>
            <p className="text-base font-bold md:text-xl">
              PARTICIPA EN SORTEOS Y MANTENTE AL DÍA
            </p>
          </div>
          <div className="flex-shrink-0 mt-6 md:mt-0 md:pl-4">
            <button
              onClick={() =>
                window.open(
                  "https://www.instagram.com/opticadelvaljoyeros?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
                  "_blank"
                )
              }
              className="px-6 py-3 text-sm font-medium text-black transition-colors duration-300 bg-white md:py-2 md:text-base hover:bg-gray-200"
            >
              Nuestro perfil
            </button>
          </div>
        </div>
      </section>
      <section className="my-10 md:my-32">
        <PromocionDiamantes />
      </section>
      <section className="my-10 md:my-32">
        <h2 className="mb-8 text-2xl font-bold text-center">
          Tus marcas favoritas en óptica
        </h2>
        <GridMarcas />
      </section>
      <section className="my-10 md:my-32">
        <ColeccionesDestacadas />
      </section>
      <section className="mt-10 md:mt-32">
        <ContactoOptica />
      </section>
    </div>
  );
}
