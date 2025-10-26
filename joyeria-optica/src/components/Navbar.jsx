// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";
import { Search, User, ShoppingBag, Heart } from "lucide-react";
import AnimatedHamburgerButton from "./HamburguerButton";
import FlyoutLink from "./FlyoutLink";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { useWishlist } from "../hooks/useWishlist";
import CartSidebar from "./CartSidebar";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const { isAuthenticated, user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.scrollTo(0, 0);
      navigate(`/catalogo?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  const categorias = [
    {
      label: "REBAJAS ⚡",
      href: "/catalogo/rebajas",
    },
    {
      label: "TOUS",
      href: "/catalogo/tous",
    },
    {
      label: "Joyería Oro 18K",
      href: "/catalogo/oro",
    },
    {
      label: "Salvatore Plata",
      href: "/catalogo/salvatore",
    },
    {
      label: "Nomination Italy",
      href: "/catalogo/nomination",
    },
    {
      label: "Gafas graduadas",
      href: "/catalogo/gafas-graduadas",
    },
    {
      label: "Gafas de sol",
      href: "/catalogo/gafas",
    },
    {
      label: "Relojes caballero",
      href: "/catalogo/relojes?genero=hombre",
    },
    {
      label: "Relojes señora",
      href: "/catalogo/relojes?genero=mujer",
    },
  ];

  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="flex items-center justify-between px-3 py-3 sm:px-4 md:py-4 lg:px-6 xl:px-8 md:grid md:grid-cols-3">
        {/* Izquierda - Mobile: Hamburguesa + Logo, Desktop: Buscador */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <div className="lg:hidden">
            <AnimatedHamburgerButton
              active={menuOpen}
              setActive={setMenuOpen}
            />
          </div>
          {/* Logo solo en móvil */}
          <a href="/" className="flex items-center md:hidden">
            <img
              src="/logo.jpg"
              alt="Logo"
              className="object-contain h-7 sm:h-8 md:h-10"
            />
          </a>

          {/* Buscador solo en desktop */}
          <div className="relative hidden w-56 lg:w-64 xl:w-72 lg:block">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Búsqueda en catálogo"
                className="w-full px-4 py-2 pl-10 text-sm transition-all bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute transition-colors transform -translate-y-1/2 left-3 top-1/2 hover:text-gray-600"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Centro: logo solo en desktop */}
        <div className="hidden md:flex md:justify-center">
          <a
            href="/"
            className="flex items-center"
            aria-label="Ir a la página principal de Joyería del Val"
          >
            <img
              src="/logo.jpg"
              alt="Logotipo de Joyería del Val"
              className="object-contain h-16 mx-auto lg:h-20 xl:h-24"
            />
          </a>
        </div>

        {/* Derecha: iconos */}
        <div className="flex items-center justify-end gap-2 sm:gap-3 lg:gap-4">
          {/* User Menu */}
          <div className="relative">
            {isAuthenticated ? (
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                aria-label="Abrir menú de usuario"
                aria-expanded={showUserMenu}
                aria-haspopup="true"
                className="flex items-center gap-2 px-3 py-2 transition-colors rounded-full hover:bg-gray-100 focus:outline-none"
              >
                <div className="flex items-center justify-center w-6 h-6 bg-black rounded-full sm:w-7 sm:h-7">
                  <span className="text-xs font-medium text-white sm:text-sm">
                    {user?.firstName?.charAt(0) || "U"}
                  </span>
                </div>
                <span className="hidden text-sm font-medium lg:block">
                  {user?.firstName || "Usuario"}
                </span>
              </button>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                aria-label="Iniciar sesión o registrarse"
                className="flex items-center gap-1 px-2 py-1 transition-colors rounded-md cursor-pointer sm:gap-2 hover:text-gray-600 focus:outline-none"
              >
                <User className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                <span className="hidden text-sm lg:block">Iniciar sesión</span>
              </button>
            )}
            {isAuthenticated && showUserMenu && (
              <div
                className="absolute right-0 z-50 w-48 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg top-full"
                role="menu"
                aria-label="Menú de usuario"
                ref={(node) => {
                  if (node) {
                    const handleClickOutside = (event) => {
                      if (
                        !node.contains(event.target) &&
                        !event.target.closest("button[aria-expanded]")
                      ) {
                        setShowUserMenu(false);
                      }
                    };

                    document.addEventListener("mousedown", handleClickOutside);
                    return () =>
                      document.removeEventListener(
                        "mousedown",
                        handleClickOutside
                      );
                  }
                }}
              >
                <div className="p-3 border-b border-gray-100">
                  <p className="font-medium">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
                <div className="py-2">
                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate("/perfil");
                      setShowUserMenu(false);
                    }}
                    role="menuitem"
                    className="w-full px-4 py-2 text-sm text-left transition-colors hover:bg-gray-50 focus:outline-none focus:bg-gray-100"
                  >
                    Mi Cuenta
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    role="menuitem"
                    className="w-full px-4 py-2 text-sm text-left text-red-600 transition-colors hover:bg-red-50 focus:outline-none focus:bg-red-100"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => navigate("/favoritos")}
            aria-label={`Ver favoritos (${wishlistCount} productos)`}
            className="relative p-1.5 sm:p-2 transition-colors rounded-md cursor-pointer hover:text-gray-600 focus:outline-none"
            title="Favoritos"
          >
            <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-xs rounded-full px-1 sm:px-1.5 min-w-[1rem] sm:min-w-[1.25rem] h-4 sm:h-5 flex items-center justify-center">
                {wishlistCount > 99 ? "99+" : wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setCartOpen(true)}
            aria-label={`Abrir carrito de compras (${itemCount} productos)`}
            aria-expanded={cartOpen}
            className="relative p-1.5 sm:p-2 transition-colors rounded-md cursor-pointer hover:text-gray-600 focus:outline-none"
            title="Carrito de compras"
          >
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
            {itemCount > 0 && (
              <span
                className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-xs rounded-full px-1 sm:px-1.5 min-w-[1rem] sm:min-w-[1.25rem] h-4 sm:h-5 flex items-center justify-center"
                aria-label={`${itemCount} productos en el carrito`}
              >
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
      {/* Mobile search */}
      <div className="px-3 pb-3 border-b border-gray-200 sm:px-4 lg:hidden">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Búsqueda en catálogo"
            className="w-full px-4 py-2 pl-10 text-sm bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="absolute transition-colors transform -translate-y-1/2 left-3 top-1/2 hover:text-gray-600"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>
      {/* Desktop nav */}
      <nav className="justify-center hidden py-3 space-x-4 border-t border-gray-200 lg:space-x-6 xl:space-x-8 lg:flex">
        {categorias.map(({ label, href, content: Content }, index) => (
          <FlyoutLink
            key={label}
            href={href}
            FlyoutContent={Content}
            classes={`text-sm lg:text-base ${
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

      {/* Cart Sidebar */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="login"
      />
    </header>
  );
}
