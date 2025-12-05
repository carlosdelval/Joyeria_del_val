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
  ];

  return (
    <BannerMarcas
      titulo="Nuestras Marcas en Relojería"
      marcas={marcas}
      categoriaBase="relojes"
    />
  );
}
