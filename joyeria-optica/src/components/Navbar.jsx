// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";
import { Search, User, ShoppingBag } from "lucide-react";
import AnimatedHamburgerButton from "./HamburguerButton";
import FlyoutLink from "./FlyoutLink";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/catalogo?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  const categorias = [
    {
      label: "REBAJAS ⚡",
      href: "/catalogo?categoria=rebajas",
      content: () => (
        <div className="w-64 p-4 space-y-2">
          <h3 className="text-xl font-bold text-red-600">
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
      href: "/catalogo?categoria=tous",
      content: () => (
        <div className="w-64 p-4 space-y-2">
          <h3 className="text-xl font-bold">Colección TOUS</h3>
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
      href: "/catalogo?categoria=anillos",
      content: () => (
        <div className="w-64 p-4 space-y-2">
          <h3 className="text-xl font-bold">Descubre nuestros anillos</h3>
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
      href: "/catalogo?categoria=pendientes",
      content: () => (
        <div className="w-64 p-4">
          <h3 className="mb-2 text-xl font-bold">Para cada ocasión</h3>
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
      href: "/catalogo?categoria=pulseras",
      content: () => (
        <div className="w-64 p-4 space-y-2">
          <p className="text-sm">
            Pulseras elegantes, casuales y personalizadas.
          </p>
          <button className="w-full px-3 py-1 text-sm transition duration-300 border border-black hover:bg-black hover:text-white">
            Ver todas
          </button>
        </div>
      ),
    },
    {
      label: "Colgantes y collares",
      href: "/catalogo?categoria=colgantes",
      content: () => (
        <div className="w-64 p-4">
          <h3 className="mb-2 text-xl font-bold">Estilos populares</h3>
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
      href: "/catalogo?categoria=relojes",
      content: () => (
        <div className="w-64 p-4 text-sm">
          <p>Relojes de mujer y hombre para todos los estilos.</p>
          <a href="#" className="block mt-2 hover:underline">
            Descubrir
          </a>
        </div>
      ),
    },
    {
      label: "Bebé",
      href: "/catalogo?categoria=bebe",
      content: () => (
        <div className="w-64 p-4 text-sm">
          <p>Joyas delicadas y personalizadas para recién nacidos.</p>
        </div>
      ),
    },
    {
      label: "Comunión",
      href: "/catalogo?categoria=comunion",
      content: () => (
        <div className="w-64 p-4 text-sm">
          <p>Regalos inolvidables para un día especial.</p>
        </div>
      ),
    },
    {
      label: "Alianzas",
      href: "/catalogo?categoria=alianzas",
      content: () => (
        <div className="w-64 p-4 text-sm">
          <p>Encuentra las alianzas perfectas para tu boda.</p>
        </div>
      ),
    },
    {
      label: "Gafas de sol",
      href: "/catalogo?categoria=gafas",
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
      <div className="grid items-center grid-cols-3 px-4 py-3 md:py-4 md:px-8">
        {/* Izquierda */}
        <div className="flex items-center gap-4">
          <div className="lg:hidden">
            <AnimatedHamburgerButton
              active={menuOpen}
              setActive={setMenuOpen}
            />
          </div>
          <div className="relative hidden w-64 lg:block">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Búsqueda en catálogo"
                className="w-full px-4 py-2 pl-10 text-sm bg-white border border-gray-300 rounded-full shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute transform -translate-y-1/2 left-3 top-1/2"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Centro: logo */}
        <div className="flex justify-center">
          <a href="/" className="flex items-center">
            <img
              src="/logo.jpg"
              alt="Logo"
              className="object-contain h-10 mx-auto md:h-20 pointer-coarse:"
            />
          </a>
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
      <div className="px-4 md:hidden">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Búsqueda en catálogo"
            className="w-full px-4 py-2 pl-10 text-sm bg-white border border-gray-300 rounded-full shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="absolute transform -translate-y-1/2 left-3 top-1/2"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>
      </div>
      {/* Desktop nav */}
      <nav className="justify-center hidden py-2 space-x-8 border-t border-gray-200 lg:flex">
        {categorias.map(({ label, href, content: Content }, index) => (
          <FlyoutLink
            key={label}
            href={href}
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
        <nav className="grid gap-2 px-4 py-4 border-t border-gray-200">
          {categorias.map(({ label, href }, index) => (
            <Link
              key={`mobile-${label}`}
              to={href}
              onClick={() => setMenuOpen(false)}
              className={`${
                index === 0
                  ? "text-red-700 hover:text-red-500 font-semibold"
                  : "text-gray-800 hover:text-black"
              } text-sm border-b pb-1 no-underline transition-colors duration-400`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
