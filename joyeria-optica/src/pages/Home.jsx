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
      <VideoHeroBanner
        videoSrc="/rayban-video.mp4"
        posterSrc="/rayban-video-miniatura.jpg"
        title="RAY-BAN"
        subtitle="Descubre nuestra colección exclusiva. Estilo, calidad y protección certificada."
        ctaText="Ver colección Ray-Ban"
        ctaLink="/catalogo/gafas?marca=ray-ban"
        secondaryCta={{
          text: "Visítanos en tienda",
          link: "/contacto",
        }}
        overlayOpacity="45"
        height="h-screen"
      />

      {/* Acordeón Hero */}
      <div className="container mx-auto block md:hidden sm:mt-20 md:mt-24 lg:mt-28">
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
