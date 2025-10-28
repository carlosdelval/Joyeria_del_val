import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "Óptica Del Val Joyeros - Joyería y Óptica en Puente Genil",
  description = "Descubre nuestra selección de joyas, relojes y gafas de las mejores marcas: TOUS, Ray-Ban, Dolce & Gabbana. Envío gratis en pedidos +50€.",
  keywords = "joyería, óptica, relojes, gafas, TOUS, Ray-Ban, Puente Genil, Córdoba",
  image = "https://opticadelvaljoyeros.es/og-image.jpg",
  url = "https://opticadelvaljoyeros.es",
  type = "website",
  structuredData = null,
  noindex = false,
}) => {
  const siteName = "Óptica Del Val Joyeros";
  const twitterHandle = "@opticadelval"; // Actualizar con tu handle real

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="es_ES" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />

      {/* Additional Meta Tags */}
      <meta name="author" content={siteName} />
      <meta name="language" content="es" />
      <meta name="geo.region" content="ES-CO" />
      <meta name="geo.placename" content="Puente Genil" />
      <meta name="geo.position" content="37.3899;-4.7685" />
      <meta name="ICBM" content="37.3899, -4.7685" />

      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

// Helper para generar Schema.org de producto
export const generateProductSchema = (producto) => {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: producto.titulo,
    image: producto.imagenes || [],
    description: producto.descripcion,
    brand: {
      "@type": "Brand",
      name: producto.marca || "Óptica Del Val",
    },
    offers: {
      "@type": "Offer",
      url: `https://opticadelvaljoyeros.com/producto/${producto.slug}`,
      priceCurrency: "EUR",
      price: producto.precio,
      availability: producto.disponible
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Óptica Del Val Joyeros",
      },
    },
  };

  // Añadir precio anterior si existe (para mostrar descuento)
  if (producto.precioAnterior) {
    schema.offers.priceValidUntil = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .split("T")[0];
  }

  // Añadir SKU si existe
  if (producto.sku) {
    schema.sku = producto.sku;
  }

  // Añadir categoría
  if (producto.categorias && producto.categorias.length > 0) {
    schema.category = producto.categorias[0];
  }

  return schema;
};

// Helper para generar Schema.org de organización
export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Óptica Del Val Joyeros",
  image: "https://opticadelvaljoyeros.com/logo.png",
  description:
    "Joyería y óptica en Puente Genil especializada en TOUS, Ray-Ban y marcas premium",
  "@id": "https://opticadelvaljoyeros.es",
  url: "https://opticadelvaljoyeros.es",
  telephone: "+34957602123",
  email: "opticadelvaljoyeros@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle Cristobal Castillo 13",
    addressLocality: "Puente Genil",
    addressRegion: "Córdoba",
    postalCode: "14500",
    addressCountry: "ES",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.3899,
    longitude: -4.7685,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "14:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "17:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "14:00",
    },
  ],
  priceRange: "€€",
  sameAs: [
    "https://www.facebook.com/opticadelval",
    "https://www.instagram.com/opticadelvaljoyeros",
  ],
});

// Helper para generar Schema.org de breadcrumbs
export const generateBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
