import { useState } from "react";
import { Search, User, ShoppingBag } from "lucide-react";
import AnimatedHamburgerButton from "./HamburguerButton";
import FlyoutLink from "./FlyoutLink";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const categorias = [
    {
      label: "REBAJAS ⚡",
      content: () => (
        <div className="w-64 p-4 space-y-2">
          <h3 className="text-red-600 font-bold text-xl">
            Descuentos especiales
          </h3>
          <a href="#" className="block text-sm hover:underline">
            Hasta -50%
          </a>
          <a href="#" className="block text-sm hover:underline">
            Últimas unidades
          </a>
          <a href="#" className="block text-sm hover:underline">
            Ofertas semanales
          </a>
        </div>
      ),
    },
    {
      label: "TOUS",
      content: () => (
        <div className="w-64 p-4 space-y-2">
          <h3 className="font-bold text-xl">Colección TOUS</h3>
          <a href="#" className="block text-sm hover:underline">
            Novedades
          </a>
          <a href="#" className="block text-sm hover:underline">
            Pulseras
          </a>
          <a href="#" className="block text-sm hover:underline">
            Anillos
          </a>
        </div>
      ),
    },
    {
      label: "Anillos",
      content: () => (
        <div className="w-64 p-4 space-y-2">
          <h3 className="font-bold text-xl">Descubre nuestros anillos</h3>
          <a href="#" className="block text-sm hover:underline">
            Compromiso
          </a>
          <a href="#" className="block text-sm hover:underline">
            Personalizados
          </a>
          <a href="#" className="block text-sm hover:underline">
            Clásicos
          </a>
        </div>
      ),
    },
    {
      label: "Pendientes",
      content: () => (
        <div className="w-64 p-4">
          <h3 className="font-bold text-xl mb-2">Para cada ocasión</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Aro
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Largos
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Perlas
              </a>
            </li>
          </ul>
        </div>
      ),
    },
    {
      label: "Pulseras",
      content: () => (
        <div className="w-64 p-4 space-y-2">
          <p className="text-sm">
            Pulseras elegantes, casuales y personalizadas.
          </p>
          <button className="w-full border border-black px-3 py-1 text-sm hover:bg-black hover:text-white transition duration-300">
            Ver todas
          </button>
        </div>
      ),
    },
    {
      label: "Colgantes y collares",
      content: () => (
        <div className="w-64 p-4">
          <h3 className="font-bold text-xl mb-2">Estilos populares</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Iniciales
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Corazones
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Personalizados
              </a>
            </li>
          </ul>
        </div>
      ),
    },
    {
      label: "Relojes",
      content: () => (
        <div className="w-64 p-4 text-sm">
          <p>Relojes de mujer y hombre para todos los estilos.</p>
          <a href="#" className="hover:underline block mt-2">
            Descubrir
          </a>
        </div>
      ),
    },
    {
      label: "Bebé",
      content: () => (
        <div className="w-64 p-4 text-sm">
          <p>Joyas delicadas y personalizadas para recién nacidos.</p>
        </div>
      ),
    },
    {
      label: "Comunión",
      content: () => (
        <div className="w-64 p-4 text-sm">
          <p>Regalos inolvidables para un día especial.</p>
        </div>
      ),
    },
    {
      label: "Alianzas",
      content: () => (
        <div className="w-64 p-4 text-sm">
          <p>Encuentra las alianzas perfectas para tu boda.</p>
        </div>
      ),
    },
    {
      label: "Gafas de sol",
      content: () => (
        <div className="w-64 p-4 text-sm">
          <p>Protección y estilo en cada mirada.</p>
        </div>
      ),
    },
  ];

  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="grid grid-cols-3 items-center px-4 py-3 md:py-4 md:px-8">
        {/* Izquierda */}
        <div className="flex items-center gap-4">
          <div className="lg:hidden">
            <AnimatedHamburgerButton
              active={menuOpen}
              setActive={setMenuOpen}
            />
          </div>
          <div className="hidden lg:block w-64 relative">
            <input
              type="text"
              placeholder="Búsqueda en catálogo"
              className="w-full rounded-full px-4 py-2 pl-10 text-sm bg-white shadow-sm border border-gray-300"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Search className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Centro: logo */}
        <div className="flex justify-center">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="h-10 md:h-20 object-contain mx-auto"
            onClick={() => window.location.reload()}
          />
        </div>

        {/* Derecha: iconos */}
        <div className="flex items-center justify-end gap-4">
          <User className="w-5 h-5" />
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1.5">
              0
            </span>
          </div>
        </div>
      </div>
      {/* Mobile search */}
      <div className="px-4 pb-3 md:hidden">
        <div className="relative">
          <input
            type="text"
            placeholder="Búsqueda en catálogo"
            className="w-full rounded-full px-4 py-2 pl-10 text-sm bg-white shadow-sm border border-gray-300"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Search className="w-5 h-5" />
          </div>
        </div>
      </div>
      {/* Desktop nav */}
      <nav className="hidden lg:flex justify-center space-x-8 py-2 border-t border-gray-200">
        {categorias.map(({ label, content: Content }, index) => (
          <FlyoutLink
            key={label}
            href="#"
            FlyoutContent={Content}
            classes={`text-md ${
              index === 0
                ? "text-red-700 hover:text-red-500 hover:border-red-500"
                : "text-gray-700 hover:text-black hover:border-black"
            } font-semibold no-underline ease-in-out transition-colors duration-400 border-b-2 border-white pb-2`}
          >
            {label}
          </FlyoutLink>
        ))}
      </nav>

      {/* Mobile menu animado */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-4 py-4 grid gap-2 border-t border-gray-200">
          {categorias.map(({ label }, index) => (
            <a
              key={`mobile-${label}`} // ✅ clave segura
              href="#"
              className={`${
                index === 0
                  ? "text-red-700 hover:text-red-500 font-semibold"
                  : "text-gray-800 hover:text-black"
              } text-sm border-b pb-1 no-underline transition-colors duration-400`}
            >
              {label} {/* ✅ solo renderizamos el texto */}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
