import React from "react";

const colecciones = [
  {
    titulo: "Marina García Joyería",
    img: "/marinagarcia-banner.jpg",
    slug: "Alta Joyería",
  },
  {
    titulo: "Salvatore PLATA",
    img: "/salvatore-banner.jpg",
    slug: "Plata de ley"
  },
  {
    titulo: "Nomination Italy",
    img: "/nomination-banner.jpg",
    slug: "¡Pregunta en nuestro local!"
  },
  {
    titulo: "La Petra",
    img: "/lapetra-banner.jpg",
    slug: "Pequeños tesoros de oro"
  },
];

const ColeccionesDestacadas = () => {
  return (
    <section>
      <h2 className="mb-6 font-bold hidden sm:block text-center sm:mb-8 text-3xl">
        La mejor selección de joyería disponible en tienda
      </h2>
      <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
        {colecciones.map((coleccion, index) => (
          <a
            key={index}
            href={coleccion.href}
            className="relative block overflow-hidden cursor-pointer group"
          >
            <img
              src={coleccion.img}
              alt={coleccion.titulo}
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
          </a>
        ))}
      </div>
    </section>
  );
};

export default ColeccionesDestacadas;
