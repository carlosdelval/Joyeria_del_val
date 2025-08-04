// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
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
    <div className="container py-6 mx-auto">
      <AnimatedSection className="mb-16 md:mb-32">
        <VerticalAccordion />
      </AnimatedSection>

      <AnimatedSection className="px-4 my-16 md:my-32">
        <GridArticulos />
      </AnimatedSection>

      <AnimatedSection className="px-4 my-16 md:my-32">
        <ColeccionTous />
      </AnimatedSection>

      <AnimatedSection className="my-16 md:my-32">
        <BannerInstagram />
      </AnimatedSection>

      <AnimatedSection className="px-4 my-16 md:my-32">
        <PromocionDiamantes />
      </AnimatedSection>

      <AnimatedSection className="px-4 my-16 md:my-32">
        <h2 className="mb-8 text-2xl font-bold text-center">
          Tus marcas favoritas en óptica
        </h2>
        <GridMarcas />
      </AnimatedSection>

      <AnimatedSection className="my-16 md:my-32">
        <ColeccionesDestacadas />
      </AnimatedSection>

      <section className="my-16 md:my-32">
        <ContactoOptica />
      </section>
    </div>
  );
}
