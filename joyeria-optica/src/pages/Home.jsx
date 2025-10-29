// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import SEO, { generateOrganizationSchema } from "../components/SEO";
import VerticalAccordion from "../components/Accordion";
import GridArticulos from "../components/GridArticulos";
import BannerMarcas from "../components/BannerMarcas";
import ColeccionTous from "../components/ColeccionTous";
import ColeccionesDestacadas from "../components/ColeccionesDestacadas";
import Promocion from "../components/Promoción";
import ContactoOptica from "../components/ContactCard";
import BannerInstagram from "../components/BannerInstagram";
import BannerMarcasRelojes from "../components/BannerMarcasRelojes";
import BannerRaybanMeta from "../components/BannerRaybanMeta";

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
  // Scroll al inicio al cargar la página
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  // Datos de marcas de óptica
  const marcasOptica = [
    {
      nombre: "Ray-Ban",
      imagen: "/rayban.jpg",
      slug: "ray-ban",
      objectPosition: "object-right md:object-left",
    },
    {
      nombre: "Persol",
      imagen: "/persol.jpg",
      slug: "persol",
      objectPosition: "object-center",
    },
    {
      nombre: "Dolce & Gabbana",
      imagen: "/dolce-gabbana.jpg",
      slug: "dolce-gabbana",
      objectPosition: "object-right md:object-center",
    },
    {
      nombre: "TOUS",
      imagen: "/tous.jpg",
      slug: "tous",
      objectPosition: "object-center",
    },
  ];

  return (
    <>
      <SEO
        title="Óptica Del Val Joyeros - Joyería y Óptica en Puente Genil | TOUS, Ray-Ban"
        description="Descubre nuestra exclusiva colección de joyas TOUS, relojes de diseño y gafas Ray-Ban en Puente Genil, Córdoba. Envío gratis en pedidos superiores a 50€. Visítanos en Calle Cristobal Castillo 13."
        keywords="joyería Puente Genil, óptica Puente Genil, TOUS Córdoba, Ray-Ban, relojes mujer, gafas de sol, joyas, Dolce & Gabbana"
        url="https://opticadelvaljoyeros.es"
        structuredData={generateOrganizationSchema()}
      />

      {/* Acordeón Hero */}
      <div className="container mx-auto pt-4 sm:pt-6 md:pt-8">
        <AnimatedSection>
          <VerticalAccordion />
        </AnimatedSection>
      </div>

      {/* Secciones con contenedor y padding consistente */}
      <div className="container mx-auto px-5 sm:px-4">
        {/* Grid de artículos */}
        <AnimatedSection className="mt-16 sm:mt-20 md:mt-24 lg:mt-28">
          <GridArticulos />
        </AnimatedSection>

        {/* Colección TOUS */}
        <AnimatedSection className="mt-16 sm:mt-20 md:mt-24 lg:mt-28">
          <ColeccionTous />
        </AnimatedSection>

        {/* Promoción */}
        <AnimatedSection className="mt-16 sm:mt-20 md:mt-24 lg:mt-28">
          <Promocion />
        </AnimatedSection>

        {/* Banner Marcas Relojes */}
        <AnimatedSection className="mt-16 sm:mt-20 md:mt-24 lg:mt-28">
          <BannerMarcasRelojes />
        </AnimatedSection>
      </div>

      {/* Banner Ray-Ban Meta (ancho completo) */}
      <AnimatedSection className="mt-16 sm:mt-20 md:mt-24 lg:mt-28">
        <BannerRaybanMeta />
      </AnimatedSection>

      {/* Banner Marcas Óptica */}
      <div className="container mx-auto px-5 sm:px-4">
        <AnimatedSection className="mt-16 sm:mt-20 md:mt-24 lg:mt-28">
          <BannerMarcas
            titulo="Tenemos tus marcas favoritas en gafas de sol"
            marcas={marcasOptica}
            categoriaBase="gafas"
          />
        </AnimatedSection>
      </div>

      {/* Banner Instagram (ancho completo) */}
      <AnimatedSection className="mt-16 sm:mt-20 md:mt-24 lg:mt-28">
        <BannerInstagram />
      </AnimatedSection>

      {/* Colecciones Destacadas (ancho completo) */}
      <AnimatedSection className="mt-16 sm:mt-20 md:mt-24 lg:mt-28">
        <h2 className="mb-6 font-bold hidden sm:block text-center sm:mb-8 text-3xl">
          La mejor selección de joyería disponible en tienda
        </h2>
        <ColeccionesDestacadas />
      </AnimatedSection>

      {/* Contacto (ancho completo, sin AnimatedSection para evitar doble animación) */}
      <section className="mt-16 sm:mt-20 md:mt-24 lg:mt-28 mb-0">
        <ContactoOptica />
      </section>
    </>
  );
}
