import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

/**
 * FlyoutLink: enlace con dropdown animado
 *
 * @param {string} href - El destino del enlace
 * @param {ReactNode} children - El texto del enlace
 * @param {ReactNode} FlyoutContent - El contenido que se muestra en el dropdown
 */
const FlyoutLink = ({ href = "#", children, FlyoutContent, classes }) => {
  const [open, setOpen] = useState(false);

  const showFlyout = FlyoutContent && open;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={`relative w-fit h-fit ${classes}`}
    >
      <a href={href}>
        {children}
        <span
          style={{ transform: showFlyout ? "scaleX(1)" : "scaleX(0)" }}
          className="absolute -bottom-2 -left-2 -right-2 h-0.5 origin-left scale-x-0 rounded-full bg-black transition-transform duration-300 ease-out"
        />
      </a>

      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ translateX: "-50%" }}
            className="absolute z-50 text-black bg-white rounded-lg shadow-xl left-1/2 top-10"
          >
            <div className="absolute left-0 right-0 h-6 bg-transparent -top-6" />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FlyoutLink;
