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
          className="hidden lg:block text-xl font-light rotate-180"
        >
          {title}
        </span>
        <span className="block lg:hidden text-xl font-light">{title}</span>
        <div className="w-6 lg:w-full aspect-square text-black grid place-items-center">
          <Icon />
        </div>
        <span className="w-4 h-4 bg-white group-hover:bg-slate-50 transition-colors border-r-[1px] border-b-[1px] lg:border-b-0 lg:border-t-[1px] border-slate-200 rotate-45 absolute bottom-0 lg:bottom-[50%] right-[50%] lg:right-0 translate-y-[50%] translate-x-[50%] z-20" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={`panel-${id}`}
            variants={width && width > 1024 ? panelVariants : panelVariantsSm}
            initial="closed"
            animate="open"
            exit="closed"
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="w-full h-full overflow-hidden relative bg-black flex items-end"
          >
            <motion.div
              variants={descriptionVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="px-4 py-2 bg-black/40 backdrop-blur-sm text-white"
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
    title: "Tus gafas de sol favoritas",
    Icon: Glasses,
    imgSrc:
      "https://www.opticabaca.com/wp-content/uploads/2023/08/%C2%BFComo-saber-si-unas-gafas-de-sol-son-buenas-o-no.webp",
    description:
      "Protege tus ojos con estilo. Explora nuestra colección de gafas de sol de las mejores marcas.",
  },
  {
    id: 3,
    title: "Relojería",
    Icon: Watch,
    imgSrc:
      "https://www.timeshop24.es/media/design/homepage/markenuhren-guenstig-kaufen.jpg",
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
      "¡Reserva ya tu cita para graduarte con los mejores profesionales!",
  },
  {
    id: 5,
    title: "Alianzas y comuniones",
    Icon: Church,
    imgSrc:
      "https://imagenes.heraldo.es/files/image_990_556/uploads/imagenes/2018/11/30/_weddingrings36112771920_327dfd14.jpg",
    description:
      "¿Buscas alianza? Encuentra tu joya perfecta para bodas y comuniones. Regalos únicos y elegantes.",
  },
];
