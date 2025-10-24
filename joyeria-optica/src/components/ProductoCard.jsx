// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import React, { useState } from "react";
import WishlistButton from "./WishlistButton";

const ProductoCard = ({ producto }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { titulo: nombre, imagenes, precio, precioAnterior, slug, stock = 99 } = producto;

  const descuento = precioAnterior
    ? Math.round(((precioAnterior - precio) / precioAnterior) * 100)
    : null;

  return (
    <motion.a
      href={`/producto/${slug}`}
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        window.location.href = `/producto/${slug}`;
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, duration: 0.2 }}
      className="block overflow-hidden bg-white border border-gray-100 rounded-sm"
    >
      {/* Contenedor de imagen con skeleton - SIEMPRE mantiene aspect-square */}
      <div className="relative overflow-hidden aspect-square bg-gray-50">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
        )}
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
            <span className="text-xs">Imagen no disponible</span>
          </div>
        ) : (
          <motion.img
            src={imagenes[0]}
            alt={nombre}
            className="object-cover w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}

        {descuento && (
          <motion.div
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="absolute px-3 py-1 text-xs font-light tracking-wider text-white bg-red-600 rounded top-4 left-4"
          >
            -{descuento}%
          </motion.div>
        )}

        {/* Botón de wishlist */}
        <div className="absolute top-4 right-4 z-10">
          <WishlistButton product={producto} size="sm" />
        </div>
      </div>

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
              minimumFractionDigits: 0,
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
                minimumFractionDigits: 0,
              })}
            </motion.span>
          )}
        </div>
      </div>
    </motion.a>
  );
};

export default ProductoCard;
