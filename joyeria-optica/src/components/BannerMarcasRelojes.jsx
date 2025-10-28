import BannerMarcas from "./BannerMarcas";

export default function BannerMarcasRelojes() {
  const marcas = [
    {
      nombre: "Casio",
      descripcion: "Tecnología y precisión japonesa",
      imagen: "/casio-banner.jpg",
      slug: "casio",
      objectPosition: "",
    },
    {
      nombre: "Fossil",
      descripcion: "Estilo americano clásico",
      imagen: "/fossil-banner.jpg",
      slug: "fossil",
      objectPosition: "",
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
      titulo="Trabajando con las mejores marcas relojeras"
      marcas={marcas}
      categoriaBase="relojes"
    />
  );
}
