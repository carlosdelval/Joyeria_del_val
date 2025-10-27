import { Glasses, Gem, Watch, Eye, Church } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useWindowSize } from "./useWindowSize";
import { useState } from "react";

const VerticalAccordion = () => {
  const [open, setOpen] = useState(items[0].id);

  return (
      <div className="flex flex-col lg:flex-row h-fit lg:h-[450px] w-full max-w-6xl mx-auto shadow overflow-hidden">
        {items.map((item) => {
          return (
            <Panel
              key={item.id}
              open={open}
              setOpen={setOpen}
              id={item.id}
              Icon={item.Icon}
              title={item.title}
              imgSrc={item.imgSrc}
              description={item.description}
            />
          );
        })}
      </div>
  );
};

const Panel = ({ open, setOpen, id, Icon, title, imgSrc, description }) => {
  const { width } = useWindowSize();
  const isOpen = open === id;

  return (
    <>
      <button
        className="bg-white hover:bg-slate-50 transition-colors p-3 border-r-[1px] border-b-[1px] border-slate-200 flex flex-row-reverse lg:flex-col justify-end items-center gap-4 relative group"
        onClick={() => setOpen(id)}
      >
        <span
          style={{
            writingMode: "vertical-lr",
          }}
          className="hidden text-xl font-light rotate-180 lg:block"
        >
          {title}
        </span>
        <span className="block text-xl font-light lg:hidden">{title}</span>
        <div className="grid w-6 text-black lg:w-full aspect-square place-items-center">
          <Icon />
        </div>
        <span className="w-4 h-4 bg-white group-hover:bg-slate-50 transition-colors border-r-[1px] border-b-[1px] lg:border-b-0 lg:border-t-[1px] border-slate-200 rotate-45 absolute bottom-0 lg:bottom-[50%] right-[50%] lg:right-0 translate-y-[50%] translate-x-[50%] z-20" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={`panel-${id}`}
            variants={width && width >= 1024 ? panelVariants : panelVariantsSm}
            initial="closed"
            animate="open"
            exit="closed"
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="relative flex items-end w-full h-full overflow-hidden bg-black"
          >
            <motion.div
              variants={descriptionVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="px-4 py-2 text-white bg-black/40 backdrop-blur-sm"
            >
              <p>{description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VerticalAccordion;

const panelVariants = {
  open: {
    width: "100%",
    height: "100%",
  },
  closed: {
    width: "0%",
    height: "100%",
  },
};

const panelVariantsSm = {
  open: {
    width: "100%",
    height: "200px",
  },
  closed: {
    width: "100%",
    height: "0px",
  },
};

const descriptionVariants = {
  open: {
    opacity: 1,
    y: "0%",
    transition: {
      delay: 0.125,
    },
  },
  closed: { opacity: 0, y: "100%" },
};

const items = [
  {
    id: 1,
    title: "La mejor selección en joyería",
    Icon: Gem,
    imgSrc:
      "https://imagenes.eltiempo.com/files/og_thumbnail/uploads/2023/05/15/64628bf667ab8.png",
    description:
      "Encuentra joyas únicas y elegantes para cada ocasión. Desde anillos hasta collares, tenemos lo que buscas.",
  },
  {
    id: 2,
    title: "Tus gafas favoritas",
    Icon: Glasses,
    imgSrc:
      "/gafas_acordeon.jpg",
    description:
      "Protege tus ojos con estilo. Explora nuestra colección de gafas de sol de las mejores marcas.",
  },
  {
    id: 3,
    title: "Relojería",
    Icon: Watch,
    imgSrc:
      "/reloj_acordeon.jpg",
    description:
      "Descubre nuestra amplia selección de relojes de lujo y moda. Encuentra el reloj perfecto para cada ocasión.",
  },
  {
    id: 4,
    title: "Graduación de vista",
    Icon: Eye,
    imgSrc:
      "/cartelGraduacion.svg",
    description:
      "¡Reserva ya tu cita!",
  }
];
