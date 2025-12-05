// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import SEO, { generateOrganizationSchema } from "../components/common/SEO";
import VerticalAccordion from "../components/ui/Accordion";
import GridArticulos from "../components/products/GridArticulos";
import BannerMarcas from "../components/banners/BannerMarcas";
import ColeccionTous from "../components/products/ColeccionTous";
import ColeccionSalvatorePlata from "../components/products/ColeccionSalvatorePlata";
import ColeccionesDestacadas from "../components/products/ColeccionesDestacadas";
import Promocion from "../components/products/Promoción";
import ContactoOptica from "../components/common/ContactCard";
import BannerInstagram from "../components/banners/BannerInstagram";
import BannerMarcasRelojes from "../components/banners/BannerMarcasRelojes";
import BannerRaybanMeta from "../components/banners/BannerRaybanMeta";
import VideoHeroBanner from "../components/banners/VideoHeroBanner";
import BentoGrid from "../components/products/BentoGrid";
import TimelineMarcas from "../components/banners/TimelineMarcas";
import HeroCarousel from "../components/banners/HeroCarousel";
import BannerBlackFriday from "../components/banners/BannerBlackFriday";
import BannerBlackFridayGafas from "../components/banners/BannerBlackFridayGafas";

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
  // Datos de marcas de óptica
  const marcasOptica = [
    {
      imagen: "/rayban.jpg",
      slug: "ray-ban",
      objectPosition: "object-right",
    },
    {
      imagen: "/persol.jpg",
      slug: "persol",
      objectPosition: "object-center",
    },
    {
      imagen: "/dolce-gabbana.jpg",
      slug: "dolce-gabbana",
      objectPosition: "object-right",
    },
    {
      imagen: "/tous-promo.jpg",
      slug: "tous",
      objectPosition: "object-center",
    },
  ];

  return (
    <>
      <SEO
        title="Óptica Del Val Joyeros | TOUS, Ray-Ban, Salvatore Plata y más"
        description="Descuentos exclusivos en joyería TOUS y Salvatore Plata, relojes de diseño, gafas Ray-Ban y más. Hasta 10% DTO. Envío gratis +50€. Ofertas limitadas en Puente Genil, Córdoba."
        keywords="Ofertas joyería, descuentos TOUS, Ray-Ban ofertas, relojes descuento, gafas rebajas, joyería Puente Genil, óptica Córdoba, Dolce Gabbana, bolsos TOUS, Ray-Ban Meta"
        url="https://opticadelvaljoyeros.es"
        structuredData={generateOrganizationSchema()}
      />

      {/* Banner Black Friday - Destacado 
      <AnimatedSection>
        <BannerBlackFriday />
      </AnimatedSection> */}

      {/* Video Hero Banner - Pantalla Completa */}
      <HeroCarousel />

      {/* Acordeón Hero */}
      <AnimatedSection className="block md:hidden">
        <VerticalAccordion />
      </AnimatedSection>

      {/* Colección TOUS */}
      <AnimatedSection className="mt-16 sm:mt-20 md:mt-24 lg:mt-28">
        <ColeccionTous />
      </AnimatedSection>

      {/* Colección Salvatore Plata */}
      <AnimatedSection className="mt-16 sm:mt-20 md:mt-24 lg:mt-28">
        <ColeccionSalvatorePlata />
      </AnimatedSection>

      {/* Promoción */}
      <AnimatedSection className="mt-16 sm:mt-20 md:mt-24 lg:mt-28">
        <Promocion />
      </AnimatedSection>

      {/* Banner Marcas Relojes */}
      <AnimatedSection className="mt-16 sm:mt-20 md:mt-24 lg:mt-28">
        <BannerMarcasRelojes />
      </AnimatedSection>

      {/* Banner Marcas Óptica */}
      <AnimatedSection className="mt-16 sm:mt-20 md:mt-24 lg:mt-28">
        <BannerMarcas
          titulo="Gafas de sol"
          subtitulo="Tus marcas favoritas de gafas de sol. Diseño y elegancia."
          marcas={marcasOptica}
          categoriaBase="gafas"
        />
      </AnimatedSection>

      {/* Banner Ray-Ban Meta */}
      <AnimatedSection className="mt-16 sm:mt-20 md:mt-24 lg:mt-28">
        <BannerRaybanMeta />
      </AnimatedSection>

      {/* Banner Instagram && Colecciones Destacadas */}
      <AnimatedSection className="mt-16 sm:mt-20 md:mt-24 lg:mt-28">
        {/* Título de sección */}
        <div className="px-4 sm:px-6 lg:px-8 mb-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-gray-300"></div>
            <h2 className="text-2xl font-light tracking-widest text-black uppercase sm:text-3xl">
              Descubre nuestra colección en joyería
            </h2>
            <div className="w-12 h-px bg-gray-300"></div>
          </div>
        </div>
        <ColeccionesDestacadas />
        <BannerInstagram />
      </AnimatedSection>

      {/* Contacto */}
      <AnimatedSection className="mt-16 sm:mt-20 md:mt-24 lg:mt-28 mb-0">
        <ContactoOptica />
      </AnimatedSection>
    </>
  );
}
