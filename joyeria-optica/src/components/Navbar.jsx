// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";
import { Search, User, ShoppingBag } from "lucide-react";
import AnimatedHamburgerButton from "./HamburguerButton";
import FlyoutLink from "./FlyoutLink";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
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
  const { isAuthenticated, user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/catalogo/${encodeURIComponent(searchTerm)}`);
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
      href: "/catalogo/relojes-hombre",
    },
    {
      label: "Relojes señora",
      href: "/catalogo/relojes-mujer",
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
          {/* User Menu */}
          <div className="relative">
            {isAuthenticated ? (
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-2 transition-colors rounded-full hover:bg-gray-100"
              >
                <div className="flex items-center justify-center w-6 h-6 bg-black rounded-full">
                  <span className="text-xs font-medium text-white">
                    {user?.firstName?.charAt(0) || 'U'}
                  </span>
                </div>
                <span className="hidden text-sm font-medium md:block">
                  {user?.firstName || 'Usuario'}
                </span>
              </button>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="flex items-center gap-2 transition-colors hover:text-gray-600"
              >
                <User className="w-5 h-5" />
                <span className="hidden text-sm md:block">Iniciar sesión</span>
              </button>
            )}

            {/* User Dropdown */}
            {isAuthenticated && showUserMenu && (
              <div className="absolute right-0 z-50 w-48 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg top-full">
                <div className="p-3 border-b border-gray-100">
                  <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
                <div className="py-2">
                  <button
                    onClick={() => {
                      navigate('/cuenta');
                      setShowUserMenu(false);
                    }}
                    className="w-full px-4 py-2 text-sm text-left transition-colors hover:bg-gray-50"
                  >
                    Mi Cuenta
                  </button>
                  <button
                    onClick={() => {
                      navigate('/pedidos');
                      setShowUserMenu(false);
                    }}
                    className="w-full px-4 py-2 text-sm text-left transition-colors hover:bg-gray-50"
                  >
                    Mis Pedidos
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="w-full px-4 py-2 text-sm text-left text-red-600 transition-colors hover:bg-red-50"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cart Button */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative transition-colors hover:text-gray-600"
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1.5 min-w-[1.25rem] h-5 flex items-center justify-center">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </button>
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
