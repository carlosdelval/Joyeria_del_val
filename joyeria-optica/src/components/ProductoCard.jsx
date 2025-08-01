import { motion } from "framer-motion";
import React from "react";

const ProductoCard = ({ producto }) => {
  const {
    titulo: nombre, // Mapeamos titulo a nombre
    imagenes,      // Cambiamos imagen por imagenes
    precio,
    precioAnterior,
    categorias,
    slug
  } = producto;

  // Calculamos descuento si hay precioAnterior
  const descuento = precioAnterior 
    ? Math.round(((precioAnterior - precio) / precioAnterior) * 100)
    : null;

  return (
    <motion.a
      href={`/producto/${slug}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="block overflow-hidden bg-white border border-gray-100 rounded-sm"
    >
      <motion.div 
        className="relative overflow-hidden aspect-square bg-gray-50"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={imagenes[0]} // Tomamos la primera imagen del array
          alt={nombre}
          className="object-cover w-full h-full transition-opacity duration-300 hover:opacity-90"
        />
        
        {descuento && (
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="absolute px-2 py-1 text-xs font-light tracking-wider text-white bg-red-600 rounded top-2 right-2"
          >
            -{descuento}%
          </motion.div>
        )}
      </motion.div>

      <div className="p-4">
        <motion.h3 
          className="text-sm font-light tracking-wide text-gray-700 line-clamp-2"
          whileHover={{ color: "#000000" }}
        >
          {nombre}
        </motion.h3>
        
        <div className="flex items-center mt-3">
          <motion.span 
            className="text-sm font-medium text-black"
            whileHover={{ scale: 1.05 }}
          >
            {precio.toLocaleString("es-ES", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 0
            })}
          </motion.span>
          
          {precioAnterior && (
            <motion.span 
              className="ml-2 text-xs text-gray-400 line-through"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              {precioAnterior.toLocaleString("es-ES", {
                style: "currency",
                currency: "EUR",
                minimumFractionDigits: 0
              })}
            </motion.span>
          )}
        </div>
      </div>
    </motion.a>
  );
};

export default ProductoCard;