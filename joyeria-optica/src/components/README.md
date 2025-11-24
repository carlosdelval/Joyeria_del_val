# Estructura de Componentes

Esta carpeta contiene todos los componentes de React organizados por funcionalidad:

## 📁 Estructura de Carpetas

### `layout/` - Componentes de Estructura Principal

- **Navbar.jsx** - Barra de navegación principal
- **Footer.jsx** - Pie de página
- **HamburguerButton.jsx** - Botón menú hamburguesa móvil
- **SearchBar.jsx** - Barra de búsqueda

### `banners/` - Banners y Heros

- **BannerBlackFriday.jsx** - Banner promocional Black Friday
- **BannerInstagram.jsx** - Banner de Instagram
- **BannerMarcas.jsx** - Banner grid de marcas (reutilizable)
- **BannerMarcasRelojes.jsx** - Banner específico de marcas de relojes
- **BannerRaybanMeta.jsx** - Banner Ray-Ban Meta
- **VideoHeroBanner.jsx** - Hero banner con video

### `products/` - Componentes de Productos

- **ProductoCard.jsx** - Tarjeta de producto
- **WishlistButton.jsx** - Botón de favoritos
- **ColeccionTous.jsx** - Carrusel colección TOUS bolsos
- **ColeccionesDestacadas.jsx** - Grid de colecciones destacadas
- **GridArticulos.jsx** - Grid de artículos destacados
- **Promoción.jsx** - Grid promocional relojes TOUS

### `cart/` - Carrito de Compras

- **CartSidebar.jsx** - Sidebar del carrito
- **CouponInput.jsx** - Input de cupones descuento
- **FlyToAnimation.jsx** - Animación de producto volando al carrito

### `modals/` - Modales y Popups

- **AuthModal.jsx** - Modal de login/registro
- **ConfirmModal.jsx** - Modal de confirmación genérico
- **CookieBanner.jsx** - Banner de cookies (RGPD)
- **CookieSettings.jsx** - Configuración de cookies

### `ui/` - Componentes UI Reutilizables

- **Accordion.jsx** - Acordeón vertical (hero móvil)
- **DrawOutlineButton.jsx** - Botón con animación de contorno
- **FiltroSidebar.jsx** - Sidebar de filtros de catálogo
- **FlyoutLink.jsx** - Enlaces con menú desplegable
- **PriceRangeSlider.jsx** - Slider de rango de precios
- **SliderToggle.jsx** - Toggle switch animado
- **Spinner.jsx** - Indicadores de carga
- **Skeleton.jsx** - Placeholders de carga
- **Toast.jsx** - Notificaciones toast

### `common/` - Componentes Comunes y Utilidades

- **ContactCard.jsx** - Tarjeta de contacto con acordeón
- **ErrorBoundary.jsx** - Manejo de errores React
- **OptimizedImage.jsx** - Componente de imagen optimizada
- **ScreenReaderOnly.jsx** - Componente accesibilidad
- **SEO.jsx** - Componente SEO y meta tags
- **useWindowSize.jsx** - Hook de tamaño de ventana

## 🎯 Guía de Importación

```javascript
// Layout
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// Banners
import BannerBlackFriday from "../components/banners/BannerBlackFriday";
import VideoHeroBanner from "../components/banners/VideoHeroBanner";

// Products
import ProductoCard from "../components/products/ProductoCard";
import ColeccionTous from "../components/products/ColeccionTous";

// Cart
import CartSidebar from "../components/cart/CartSidebar";

// Modals
import AuthModal from "../components/modals/AuthModal";
import ConfirmModal from "../components/modals/ConfirmModal";

// UI
import { Spinner } from "../components/ui/Spinner";
import FiltroSidebar from "../components/ui/FiltroSidebar";

// Common
import SEO from "../components/common/SEO";
import ErrorBoundary from "../components/common/ErrorBoundary";
```

## 📝 Convenciones

- **Nombres de archivo**: PascalCase (ej: `ProductoCard.jsx`)
- **Componentes de página**: En `/src/pages/`
- **Hooks personalizados**: En `/src/hooks/`
- **Contextos**: En `/src/context/`
- **Utilidades**: En `/src/utils/`
