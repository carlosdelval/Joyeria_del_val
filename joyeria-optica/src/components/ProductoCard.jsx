import React from "react";

const ProductoCard = ({ producto }) => {
  const {
    nombre,
    imagen,
    precio,
    precioAnterior,
    descuento,
    slug,
  } = producto;

  return (
    <a
      href={`/producto/${slug}`}
      className="block overflow-hidden transition-shadow duration-300 bg-white shadow-sm group rounded-xl hover:shadow-md"
    >
      <div className="relative">
        <img
          src={imagen}
          alt={nombre}
          className="object-cover w-full h-64 transition duration-300 group-hover:brightness-110"
        />
        {descuento && (
          <div className="absolute px-2 py-1 text-sm font-bold text-white bg-red-600 rounded top-2 right-2">
            -{descuento}%
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-black">
          {nombre}
        </h3>
        <div className="mt-1 text-base font-bold text-gray-900">
          {precio.toLocaleString("es-ES", {
            style: "currency",
            currency: "EUR",
          })}
          {precioAnterior && (
            <span className="ml-2 text-sm text-gray-500 line-through">
              {precioAnterior.toLocaleString("es-ES", {
                style: "currency",
                currency: "EUR",
              })}
            </span>
          )}
        </div>
      </div>
    </a>
  );
};

export default ProductoCard;
