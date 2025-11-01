import { Glasses, Gem, Watch, Eye, Church } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useWindowSize } from "./useWindowSize";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";

const VerticalAccordion = () => {
  const [open, setOpen] = useState(items[0].id);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  return (
    <>
      <div className="flex flex-col lg:flex-row h-fit lg:h-[450px] w-full max-w-7xl mx-auto shadow overflow-hidden">
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
              href={item.href}
              onWhatsAppClick={() => setShowWhatsAppModal(true)}
            />
          );
        })}
      </div>

      <ConfirmModal
        isOpen={showWhatsAppModal}
        onClose={() => setShowWhatsAppModal(false)}
        onConfirm={() => {
          const phoneNumber = "664146433";
          const message = encodeURIComponent(
            "Hola, me gustaría reservar una cita para graduación de vista."
          );
          window.open(
            `https://wa.me/34${phoneNumber}?text=${message}`,
            "_blank"
          );
        }}
        title="Reservar Cita"
        message="Se abrirá WhatsApp para contactar con nosotros y reservar tu cita para graduación de vista."
        confirmText="Abrir WhatsApp"
        cancelText="Cancelar"
        type="info"
      />
    </>
  );
};

const Panel = ({
  open,
  setOpen,
  id,
  Icon,
  title,
  imgSrc,
  description,
  href,
  onWhatsAppClick,
}) => {
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const isOpen = open === id;

  const handleImageClick = () => {
    if (href) {
      // Navegación interna para las primeras 3 opciones
      window.scrollTo(0, 0);
      navigate(href);
    } else if (id === 4) {
      // Modal de confirmación para WhatsApp
      onWhatsAppClick();
    }
  };

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
            onClick={handleImageClick}
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="relative flex items-end w-full h-full overflow-hidden bg-black cursor-pointer hover:brightness-110 transition-all duration-700 ease-out"
          >
            <motion.div
              variants={descriptionVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="px-4 py-2 text-white bg-black/40 backdrop-blur-sm"
              onClick={(e) => e.stopPropagation()} // Evitar que el click en la descripción active la navegación
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
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  closed: {
    width: "0%",
    height: "100%",
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const panelVariantsSm = {
  open: {
    width: "100%",
    height: "200px",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  closed: {
    width: "100%",
    height: "0px",
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
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
    imgSrc: "/joyeria-acordeon3.jpg",
    description: "Encuentra joyas únicas y elegantes para cada ocasión.",
    href: "/joyeria",
  },
  {
    id: 2,
    title: "Tus gafas favoritas",
    Icon: Glasses,
    imgSrc: "/optica-acordeon.jpg",
    description:
      "Descubre nuestra colección de gafas de sol y vista. Estilo y protección para tu mirada.",
    href: "/optica",
  },
  {
    id: 3,
    title: "Relojería",
    Icon: Watch,
    imgSrc: "/relojeria-acordeon.jpg",
    description: "Amplia selección de relojes caballero y señora.",
    href: "/relojeria",
  },
  {
    id: 4,
    title: "Graduación de vista",
    Icon: Eye,
    imgSrc: "/cartelGraduacion.svg",
    description: "¡Clicka y reserva cita!",
  },
];
