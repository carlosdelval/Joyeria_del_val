import BannerMarcas from "./BannerMarcas";

export default function BannerMarcasRelojes() {
  const marcas = [
    {
      nombre: "Tommy Hilfiger",
      descripcion: "Estilo y elegancia atemporal",
      imagen: "/tommy-banner.jpg",
      slug: "tommy-hilfiger",
      objectPosition: "object-right",
    },
    {
      nombre: "Citizen",
      descripcion: "Tecnología Eco-Drive",
      imagen: "/citizen-banner.jpg",
      slug: "citizen",
      objectPosition: "object-center md:object-left",
    },
    {
      nombre: "Seiko",
      descripcion: "Excelencia relojera desde 1881",
      imagen: "/seiko-banner.jpg",
      slug: "seiko",
      objectPosition: "object-right md:object-center",
    },
    {
      nombre: "Orient",
      descripcion: "Innovación en relojes mecánicos",
      imagen: "/orient-banner.jpg",
      slug: "orient",
      objectPosition: "object-left md:object-center",
    },
  ];

  return (
    <BannerMarcas
      titulo="Trabajamos con las mejores marcas relojeras"
      marcas={marcas}
      categoriaBase="relojes"
    />
  );
}
