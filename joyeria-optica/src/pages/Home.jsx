// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SEO, { generateOrganizationSchema } from "../components/SEO";
import VerticalAccordion from "../components/Accordion";
import GridArticulos from "../components/GridArticulos";
import GridMarcas from "../components/GridMarcas";
import ColeccionTous from "../components/ColeccionTous";
import ColeccionesDestacadas from "../components/ColeccionesDestacadas";
import PromocionDiamantes from "../components/Promoción";
import ContactoOptica from "../components/ContactCard";
import BannerInstagram from "../components/BannerInstagram";

const AnimatedSection = ({ children, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05, // Se activa cuando el 5% del elemento es visible
  });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default function Home() {
  return (
    <>
      <SEO
        title="Óptica Del Val Joyeros - Joyería y Óptica en Puente Genil | TOUS, Ray-Ban"
        description="Descubre nuestra exclusiva colección de joyas TOUS, relojes de diseño y gafas Ray-Ban en Puente Genil, Córdoba. Envío gratis en pedidos superiores a 50€. Visítanos en Calle Cristobal Castillo 13."
        keywords="joyería Puente Genil, óptica Puente Genil, TOUS Córdoba, Ray-Ban, relojes mujer, gafas de sol, joyas, Dolce & Gabbana"
        url="https://opticadelvaljoyeros.com"
        structuredData={generateOrganizationSchema()}
      />
      <div className="container py-4 sm:py-6 md:py-8 mx-auto px-3 sm:px-4">
        <AnimatedSection className="mb-12 sm:mb-16 md:mb-24 lg:mb-32">
          <VerticalAccordion />
        </AnimatedSection>

        <AnimatedSection className="px-2 sm:px-4 my-12 sm:my-16 md:my-24 lg:my-32">
          <GridArticulos />
        </AnimatedSection>

        <AnimatedSection className="px-2 sm:px-4 md:px-8 my-12 sm:my-16 md:my-24 lg:my-32">
          <ColeccionTous />
        </AnimatedSection>

        <AnimatedSection className="my-12 sm:my-16 md:my-24 lg:my-32">
          <BannerInstagram />
        </AnimatedSection>

        <AnimatedSection className="px-2 sm:px-4 md:px-8 my-12 sm:my-16 md:my-24 lg:my-32">
          <PromocionDiamantes />
        </AnimatedSection>

        <AnimatedSection className="px-2 sm:px-4 md:px-8 my-12 sm:my-16 md:my-24 lg:my-32">
          <h2 className="mb-6 sm:mb-8 text-xl sm:text-2xl lg:text-3xl font-bold text-center">
            Tus marcas favoritas en óptica
          </h2>
          <GridMarcas />
        </AnimatedSection>

        <AnimatedSection className="my-12 sm:my-16 md:my-24 lg:my-32">
          <ColeccionesDestacadas />
        </AnimatedSection>

        <section className="my-12 sm:my-16 md:my-24 lg:my-32">
          <ContactoOptica />
        </section>
      </div>
    </>
  );
}
