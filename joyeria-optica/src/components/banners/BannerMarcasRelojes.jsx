import BannerMarcas from "./BannerMarcas";

export default function BannerMarcasRelojes() {
  const marcas = [
    {
      nombre: "Tommy Hilfiger",
      imagen: "/tommy-banner.jpg",
      slug: "tommy+hilfiger",
      objectPosition: "object-center",
    },
    {
      nombre: "Citizen",
      imagen: "/citizen-banner.jpg",
      slug: "citizen",
      objectPosition: "object-center",
    },
    {
      nombre: "Seiko",
      imagen: "/seiko-banner.jpg",
      slug: "seiko",
      objectPosition: "object-left",
    },
    {
      nombre: "Orient",
      imagen: "/orient-banner.jpg",
      slug: "orient",
      objectPosition: "object-right",
    },
    {
      nombre: "Lacoste",
      imagen: "/lacoste-promo.jpg",
      slug: "lacoste",
      objectPosition: "object-center",
    },
    {
      nombre: "TOUS",
      imagen: "/tous-relojeria.jpg",
      slug: "tous",
      objectPosition: "object-right",
    },
    {
      nombre: "Viceroy",
      imagen: "/viceroy-promo.jpg",
      slug: "viceroy",
      objectPosition: "object-center",
    },
    {
      nombre: "Maserati",
      imagen: "/maserati-promo.jpg",
      slug: "maserati",
      objectPosition: "object-center",
    },
  ];

  return (
    <BannerMarcas
      titulo="Relojería"
      subtitulo="Nuestras marcas en relojería. Calidad y precisión."
      marcas={marcas}
      categoriaBase="relojes"
    />
  );
}
