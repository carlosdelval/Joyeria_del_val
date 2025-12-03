// eslint-disable-next-line no-unused-vars
import { useState, useEffect, useRef } from "react";
import { User, ShoppingBag, Heart } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedHamburgerButton from "./HamburguerButton";
import FlyoutLink from "../ui/FlyoutLink";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { useWishlist } from "../../hooks/useWishlist";
import CartSidebar from "../cart/CartSidebar";
import AuthModal from "../modals/AuthModal";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);
  const [wishlistPulse, setWishlistPulse] = useState(false);
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const { isAuthenticated, user, logout } = useAuth();
  const prevItemCount = useRef(itemCount);
  const prevWishlistCount = useRef(wishlistCount);

  // Detectar cuando se añade algo al carrito
  useEffect(() => {
    if (itemCount > prevItemCount.current) {
      setCartPulse(true);
      setTimeout(() => setCartPulse(false), 600);
    }
    prevItemCount.current = itemCount;
  }, [itemCount]);

  // Detectar cuando se añade algo a favoritos
  useEffect(() => {
    if (wishlistCount > prevWishlistCount.current) {
      setWishlistPulse(true);
      setTimeout(() => setWishlistPulse(false), 600);
    }
    prevWishlistCount.current = wishlistCount;
  }, [wishlistCount]);

  const categorias = [
    {
      label: "OFERTAS ⚡",
      href: "/catalogo/rebajas",
    },
    {
      label: "Inicio",
      href: "/",
    },
    {
      label: "Joyería",
      href: "/joyeria",
    },
    {
      label: "Óptica",
      href: "/optica",
    },
    {
      label: "Relojería",
      href: "/relojeria",
    },
    {
      label: "TOUS",
      href: "/catalogo/tous",
    },
    {
      label: "Salvatore Plata",
      href: "/catalogo/joyeria?marca=salvatore+plata",
    },
    {
      label: "Relojes caballero",
      href: "/catalogo/relojes?genero=hombre",
    },
    {
      label: "Relojes señora",
      href: "/catalogo/relojes?genero=mujer",
    },
    {
      label: "Gafas de sol",
      href: "/catalogo/gafas",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm md:relative md:shadow-none">
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
              loading="eager"
              className="object-contain h-7 sm:h-8 md:h-10"
            />
          </a>

          {/* Buscador solo en desktop */}
          <div className="relative hidden w-56 lg:w-64 xl:w-72 lg:block">
            <SearchBar />
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
              loading="eager"
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
                className="flex items-center gap-2 px-3 py-2 transition-colors rounded-full hover:bg-gray-100 focus:outline-none cursor-pointer"
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
            data-wishlist-icon
          >
            <motion.div
              animate={wishlistPulse ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.4 }}
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
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
            data-cart-icon
          >
            <motion.div
              animate={cartPulse ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.4 }}
            >
              <ShoppingBag
                className="w-5 h-5 sm:w-6 sm:h-6"
                aria-hidden="true"
              />
            </motion.div>
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
          menuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {/* Mobile search dentro del menú */}
        <div className="px-4 pt-4 pb-3 border-t border-gray-200">
          <SearchBar onSearch={() => setMenuOpen(false)} />
        </div>

        <nav className="grid gap-2 px-4 py-4 border-t border-gray-200">
          {categorias.map(({ label, href }, index) => {
            // Prefetch map for common routes
            const prefetchMap = {
              "/joyeria": () => import("../../pages/Joyeria"),
              "/optica": () => import("../../pages/Optica"),
              "/relojeria": () => import("../../pages/Relojeria"),
            };

            return (
              <Link
                key={`mobile-${label}`}
                to={href}
                onClick={() => setMenuOpen(false)}
                onMouseEnter={() => {
                  const basePath = href.split("?")[0];
                  const prefetchFn = prefetchMap[basePath];
                  if (prefetchFn) {
                    prefetchFn().catch(() => {});
                  }
                }}
                className={`${
                  index === 0
                    ? "text-red-700 hover:text-red-500 font-semibold"
                    : "text-gray-800 hover:text-black"
                } text-sm border-b pb-1 no-underline transition-colors duration-400`}
              >
                {label}
              </Link>
            );
          })}
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
