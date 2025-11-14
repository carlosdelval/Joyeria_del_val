// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import React, { useState } from "react";
import WishlistButton from "./WishlistButton";

const ProductoCard = ({ producto }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const {
    titulo: nombre,
    imagenes,
    precio,
    precioAnterior,
    slug,
    stock = 99,
    categorias = [],
    marca = "",
  } = producto;

  const descuento = precioAnterior
    ? Math.round(((precioAnterior - precio) / precioAnterior) * 100)
    : null;

  // Detectar si es gafa de sol (ratio panorámico 16:9)
  const isGafa =
    categorias.some((cat) => cat?.toLowerCase().includes("gafas")) ||
    marca?.toLowerCase().includes("ray-ban") ||
    nombre?.toLowerCase().includes("gafas");

  // Detectar si la imagen es panorámica (Ray-Ban CDN)
  const isPanoramicImage =
    imagenes[0]?.includes("ray-ban.com") || imagenes[0]?.includes("width=720");

  // Elegir aspect ratio según tipo de producto
  const aspectRatioClass =
    isGafa || isPanoramicImage
      ? "aspect-[4/3]" // Ratio 4:3 para gafas (más horizontal)
      : "aspect-square"; // Ratio 1:1 para relojes y joyería

  // Elegir object-fit según tipo de imagen
  const objectFitClass =
    isGafa || isPanoramicImage
      ? "object-contain" // Contener imagen completa sin recortar
      : "object-cover"; // Cubrir área (comportamiento actual)

  // Zoom sutil para gafas (elimina franjas sin recortar demasiado)
  const imageScale = isGafa || isPanoramicImage ? "scale-140" : "";

  return (
    <motion.a
      href={`/producto/${slug}`}
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        window.location.href = `/producto/${slug}`;
      }}
      data-product-card
      aria-label={`Ver detalles de ${nombre} - ${precio.toLocaleString(
        "es-ES",
        {
          style: "currency",
          currency: "EUR",
        }
      )}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, duration: 0.2 }}
      className="block overflow-hidden bg-white border border-gray-100 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
    >
      {/* Contenedor de imagen con skeleton - Aspect ratio dinámico */}
      <div
        className={`relative overflow-hidden ${aspectRatioClass} bg-gray-50`}
        role="img"
        aria-label={imageLoaded && !imageError ? nombre : "Cargando imagen"}
      >
        {!imageLoaded && !imageError && (
          <div
            className="absolute inset-0 bg-gray-200 animate-pulse"
            aria-live="polite"
            aria-busy="true"
          ></div>
        )}
        {imageError ? (
          <div
            className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400"
            role="alert"
          >
            <span className="text-xs">Imagen no disponible</span>
          </div>
        ) : (
          <motion.img
            src={imagenes[0]}
            alt={`Imagen de producto ${nombre}`}
            className={`w-full h-full ${objectFitClass} ${imageScale}`}
            loading="lazy"
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
            role="status"
            aria-label={`Descuento del ${descuento}%`}
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

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center">
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

            {(precioAnterior ?? 0) > 0 && (
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

          {/* Indicador de stock */}
          {stock !== undefined && (
            <div className="flex items-center gap-1.5">
              {stock > 5 ? (
                <span className="text-xs text-green-600 font-medium">
                  Disponible
                </span>
              ) : stock > 0 ? (
                <span className="text-xs text-amber-600 font-medium">
                  Últimas {stock}
                </span>
              ) : (
                <span className="text-xs text-red-600 font-medium">
                  Agotado
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.a>
  );
};

export default ProductoCard;
