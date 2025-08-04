import React from "react";

const colecciones = [
  {
    titulo: "Así comienzan los nuevos capítulos",
    img: "https://www.serranojoyeros.es/46780-large_default/alianza-boda-argyor-oro-amarillo-18kt-facetada-brillante-5140544.jpg",
    href: "/catalogo/anillos",
  },
  {
    titulo: "Colección TOUS",
    img: "https://static.tous.com/21202/pub/directus/80d65115-e569-453d-b3eb-e39bc649fa68.jpg",
    href: "/catalogo/tous",
  },
  {
    titulo: "Plata de primera ley",
    img: "https://sansarushop.com/cdn/shop/files/tobilleras_32a6bd5d-873f-486d-9f41-9b1e57024303.jpg?v=1714992715&width=533",
    href: "/catalogo/plata",
  },
  {
    titulo: "Joyas para los más pequeños",
    img: "https://i.etsystatic.com/10590541/r/il/7b002b/5333591874/il_fullxfull.5333591874_pock.jpg",
    href: "/catalogo/infantil",
  },
];

const ColeccionesDestacadas = () => {
return (
    <section>
        <h2 className="mb-8 text-2xl font-bold text-center">
            Colecciones destacadas
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
                            VER COLECCIÓN
                            <span
                                className="ml-1 transition-transform duration-300 transform group-hover:translate-x-1 "
                            >
                                →
                            </span>
                        </div>
                    </div>
                    <div className="absolute inset-0 z-0 transition bg-black/30 group-hover:bg-black/20" />
                </a>
            ))}
        </div>
    </section>
);
};

export default ColeccionesDestacadas;
