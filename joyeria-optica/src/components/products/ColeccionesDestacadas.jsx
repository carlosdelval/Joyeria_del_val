import React from "react";
import { useNavigate } from "react-router-dom";

const colecciones = [
  {
    titulo: "Marina García Joyería",
    img: "/marinagarcia-banner.jpg",
    slug: "Alta Joyería",
  },
  {
    titulo: "Salvatore PLATA",
    img: "/salvatore-banner.jpg",
    slug: "Plata de ley",
    href: "/catalogo/joyeria?marca=salvatore+plata",
  },
  {
    titulo: "Nomination Italy",
    img: "/nomination-banner.jpg",
    slug: "¡Pregunta en nuestro local!",
  },
  {
    titulo: "La Petra",
    img: "/lapetra-banner.jpg",
    slug: "Pequeños tesoros de oro",
  },
];

const ColeccionesDestacadas = () => {
  const navigate = useNavigate();

  // Navegar al catálogo
  const goToCatalog = (href) => {
    if (href) {
      window.scrollTo(0, 0);
      navigate(href);
    }
  };

  return (
    <section>
      <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
        {colecciones.map((coleccion, index) => (
          <div
            key={index}
            className={`relative block overflow-hidden group ${
              coleccion.href ? "cursor-pointer" : ""
            }`}
            onClick={() => goToCatalog(coleccion.href)}
          >
            <img
              src={coleccion.img}
              alt={coleccion.titulo}
              loading="lazy"
              className="object-cover w-full h-full transition duration-500 group-hover:brightness-100"
            />
            <div className="absolute z-10 text-white bottom-4 left-4">
              <h3 className="mb-1 text-base font-semibold">
                {coleccion.titulo}
              </h3>
              <div className="flex items-center text-sm font-semibold transition-all">
                {coleccion.slug}
              </div>
            </div>
            <div className="absolute inset-0 z-0 transition bg-black/20 group-hover:bg-black/10" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ColeccionesDestacadas;
