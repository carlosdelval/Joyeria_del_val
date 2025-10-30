# 💎 Joyería del Val - E-commerce

Tienda online de joyería y óptica construida con React + Vite, con sistema de gestión de inventario mediante CSV/Excel.

## 🚀 Inicio Rápido

```powershell
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build para producción
npm run build
```

## 📦 Gestión de Stock

### Actualizar Productos

```powershell
# Editar productos en Excel
1. Abrir PLANTILLA-PRODUCTOS.csv
2. Editar/añadir productos
3. Guardar como CSV

# Convertir a JSON
npm run update:productos
```

### Documentación

- 📖 **[GUIA-GESTION-STOCK.md](./GUIA-GESTION-STOCK.md)** - Documentación completa
- 📝 **[STOCK-README.md](./STOCK-README.md)** - Guía rápida
- 📊 **[RESUMEN-SISTEMA-STOCK.md](./RESUMEN-SISTEMA-STOCK.md)** - Resumen ejecutivo

## ✨ Características

### 🛍️ E-commerce

- ✅ Sistema de productos con múltiples imágenes
- ✅ Galería con zoom interactivo
- ✅ Gestión de stock CSV → JSON
- ✅ **Integración Shopify completa** (Cart API 2024-10)
- ✅ **Checkout directo a Shopify** desde el carrito
- ✅ Filtros por categoría, material, precio, género
- ✅ Sistema de descuentos automático
- ✅ Carrito de compra con persistencia
- ✅ Control de stock en tiempo real
- ✅ Indicadores visuales de disponibilidad
- ✅ **Scripts de testing y conversión** Shopify
- ✅ **Lookup automático de variants** por SKU

### 🍪 RGPD & Privacidad

- ✅ Banner de cookies personalizado
- ✅ Panel de configuración de cookies
- ✅ Gestión granular de consentimientos
- ✅ Persistencia en cookies (365 días favoritos, 7 días carrito)
- ✅ Fallback a localStorage sin consentimiento
- ✅ Cumplimiento RGPD completo

### 📧 Email & Notificaciones

- ✅ Emails de confirmación de pedido (EmailJS)
- ✅ Plantillas HTML personalizadas
- ✅ Diseño minimalista blanco/negro
- ✅ Seguimiento de envíos
- ✅ 200 emails/mes gratuitos

### 🚀 Optimizaciones Avanzadas

- ✅ **Imágenes optimizadas**: WebP, lazy loading, CDN-ready
- ✅ **Error Boundary**: Recuperación elegante de errores
- ✅ **Perfil de usuario rediseñado**: Hero elegante, tabs animados, edición in-place
- ✅ **Analytics**: Google Analytics 4 + Meta Pixel integrados
- ✅ **Shopify Customer API ready**: Estructura preparada para sincronización

### 🎨 UI/UX

- ✅ Diseño elegante minimalista (blanco/negro/gris)
- ✅ Animaciones fluidas con Framer Motion
- ✅ Responsive design completo
- ✅ **Skeleton loaders elegantes** con efecto shimmer
- ✅ **Spinners consistentes** para todos los estados de carga
- ✅ Feedback visual en todas las acciones
- ✅ Loading states optimizados (ver `LOADING-STATES.md`)

## 🛠️ Tecnologías

- **React 19** - UI Library
- **Vite 7** - Build tool
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **React Router 7** - Routing
- **Shopify Storefront API 2024-10** - E-commerce backend
- **EmailJS** - Servicio de emails transaccionales
- **js-cookie** - Gestión de cookies
- **Firebase** - Backend (opcional)

## 📂 Estructura del Proyecto

```
joyeria-optica/
├── public/
│   └── data/
│       └── productos.json          # Productos generados (AUTO)
├── src/
│   ├── pages/                      # Páginas principales
│   │   ├── Home.jsx
│   │   ├── Catalogo.jsx
│   │   ├── Producto.jsx
│   │   ├── CheckoutPage.jsx
│   │   └── PerfilUsuario.jsx      # NUEVO: Perfil + historial
│   ├── components/                 # Componentes React
│   │   ├── CookieBanner.jsx       # NUEVO: Banner RGPD
│   │   ├── CookieSettings.jsx     # NUEVO: Panel cookies
│   │   ├── OptimizedImage.jsx     # NUEVO: Imágenes optimizadas
│   │   ├── ErrorBoundary.jsx      # NUEVO: Error handling
│   │   ├── Spinner.jsx            # NUEVO: Sistema de spinners
│   │   └── Skeleton.jsx           # NUEVO: Skeleton loaders
│   ├── services/                   # Servicios externos
│   │   ├── emailService.js        # NUEVO: EmailJS
│   │   └── shopify.js
│   ├── context/                    # Context providers
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx        # ACTUALIZADO: Soporte cookies
│   │   └── WishlistContext.jsx    # ACTUALIZADO: Soporte cookies
│   └── hooks/                      # Custom hooks
├── scripts/
│   └── csv-to-json.js              # Script conversión CSV
├── PLANTILLA-PRODUCTOS.csv         # Editar productos aquí
├── GUIA-GESTION-STOCK.md
├── OPTIMIZATIONS.md                # NUEVO: Docs de optimizaciones
├── COOKIES-SYSTEM.md               # NUEVO: Docs sistema cookies
├── EMAILJS-SETUP.md                # NUEVO: Configuración EmailJS
└── EMAILJS-CONFIG-RAPIDA.md        # NUEVO: Guía rápida EmailJS
```

## 🎯 Scripts Disponibles

```powershell
npm run dev              # Servidor desarrollo
npm run build            # Build producción
npm run preview          # Preview del build
npm run lint             # Linter

# Gestión de stock
npm run update:productos              # Actualizar desde plantilla
npm run csv:convert archivo.csv       # Conversión personalizada

# Shopify
npm run test:shopify                  # Test de conexión Shopify (3 pruebas)
npm run convert:shopify               # Convertir CSV a formato Shopify
```

## 🔧 Configuración

### Variables de Entorno (.env)

```env
# Shopify (REQUIRED para checkout)
VITE_SHOPIFY_DOMAIN=opticadelvaljoyeros.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=tu_storefront_token
VITE_USE_SHOPIFY=true                 # false = modo local, true = Shopify

# EmailJS (para emails de confirmación)
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_PUBLIC_KEY=tu_public_key

# Desarrollo
VITE_APP_ENV=development
VITE_API_FALLBACK_ENABLED=true
```

### Configurar Shopify (5 minutos)

1. **Importar productos**: Sube `PLANTILLA-PRODUCTOS.csv` en Shopify Admin
2. **Activar modo Shopify**: `VITE_USE_SHOPIFY=true` en `.env`
3. **Reiniciar servidor**: `npm run dev`
4. **Probar checkout**: Añade producto al carrito → "Finalizar compra"

Ver guía completa: `SHOPIFY-QUICKSTART.md`

### Configurar EmailJS

1. Crear cuenta en [EmailJS](https://www.emailjs.com/)
2. Configurar servicio de email
3. Crear plantilla (ver `EMAILJS-CONFIG-RAPIDA.md`)
4. Añadir credenciales al `.env`

Ver documentación completa en `EMAILJS-SETUP.md`

## 📸 Gestión de Imágenes

Cada producto soporta múltiples imágenes:

- Mínimo 2 imágenes por producto
- Separadas por `|` en el CSV
- Galería interactiva con zoom

## 🏷️ Categorías Soportadas

- Anillos - Pendientes - Pulseras - Colgantes
- Relojes - Gafas de Sol - Gafas de Vista

## 🔐 Firebase (Opcional)

Para autenticación y backend:

1. Crear proyecto en Firebase
2. Configurar `.env` con credenciales
3. Habilitar Authentication y Firestore

## 📱 Deploy

### Netlify / Vercel

```powershell
npm run build
# Deploy carpeta dist/
```

### Firebase Hosting

```powershell
npm run build
firebase deploy
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📚 Documentación Adicional

### 🛍️ Shopify

- **[SHOPIFY-QUICKSTART.md](./SHOPIFY-QUICKSTART.md)** - ⚡ Guía rápida 5 minutos
- **[SHOPIFY-INTEGRACION-COMPLETA.md](./SHOPIFY-INTEGRACION-COMPLETA.md)** - Documentación completa
- **[SHOPIFY-SETUP.md](./SHOPIFY-SETUP.md)** - Setup inicial y credenciales
- **[CHECKOUT-DIRECTO-SHOPIFY.md](./CHECKOUT-DIRECTO-SHOPIFY.md)** - Flujo de checkout

### 🎨 UI/UX

- **[LOADING-STATES.md](./LOADING-STATES.md)** - Sistema completo de loading states
- **[OPTIMIZATIONS.md](./OPTIMIZATIONS.md)** - Optimizaciones avanzadas implementadas

### 🔐 Privacidad

- **[COOKIES-SYSTEM.md](./COOKIES-SYSTEM.md)** - Sistema de cookies y RGPD

### 📧 Email

- **[EMAILJS-SETUP.md](./EMAILJS-SETUP.md)** - Configuración completa de EmailJS
- **[EMAILJS-CONFIG-RAPIDA.md](./EMAILJS-CONFIG-RAPIDA.md)** - Guía rápida EmailJS

### 📦 Inventario

- **[GUIA-GESTION-STOCK.md](./GUIA-GESTION-STOCK.md)** - Gestión de inventario

## 🎯 Mejoras Implementadas (Octubre 2025)

### ✨ Actualización 30 de Octubre 2025 - Shopify Checkout + Perfil Usuario

#### 🛍️ Integración Shopify Completa (Cart API 2024-10)

- **Migración a Cart API**: Deprecado checkoutCreate → cartCreate
- **Checkout directo desde carrito**: Eliminada página intermedia
- **CartSidebar actualizado**: Botón "Finalizar compra" crea cart y redirige
- **CheckoutPage inteligente**: Auto-redirect en modo Shopify con loading screen
- **Lookup automático de variants**: Busca variant ID por SKU del producto
- **Logs detallados**: Console logs para debugging del proceso completo
- **Dual-mode**: Soporta modo local (JSON) y modo Shopify con variable .env

#### 🧪 Scripts y Herramientas Shopify

- **test-shopify.js**: 3 tests automáticos (conexión tienda, productos, checkout)
- **convert-to-shopify-csv.js**: Conversión masiva de PLANTILLA-PRODUCTOS.csv a formato Shopify
- **Soporte múltiples imágenes**: Script maneja imágenes separadas por `|`
- **SHOPIFY-QUICKSTART.md**: Guía de activación en 5 minutos
- **Validación de credenciales**: Verificación automática de tokens y dominio

#### 👤 Rediseño Completo Perfil Usuario

- **Hero banner elegante**: Degradado oscuro (gray-900 → black) con líneas decorativas blancas
- **Avatar premium**: Efecto halo blanco con blur, animación hover, degradado gris en inicial
- **Layout moderno**: Sticky sidebar + 4 tabs animados (Pedidos, Favoritos, Perfil, Ajustes)
- **AnimatePresence**: Transiciones suaves entre tabs con fade + slide
- **Edición in-place**: Perfiles y direcciones editables con botones Edit/Save/Cancel
- **Empty states elegantes**: Ilustraciones con CTAs claros para pedidos y favoritos vacíos
- **Badge verificación**: Shield icon + "Cuenta verificada" en header
- **Responsive completo**: Mobile-first con breakpoints md/lg optimizados

#### 🧹 Limpieza y Estructura

- **Eliminados datos mock**: No más pedidos falsos que confunden
- **TODO comments**: Guías inline para integración Shopify Customer API
- **Estructura Shopify-ready**: Order format compatible con GraphQL de Shopify
- **Console logs útiles**: Mensajes emoji para debugging rápido
- **Error handling**: Try-catch robusto en todas las llamadas API

#### 🎨 Sistema de Diseño Consistente

- **Paleta monocromática**: Negro, gris (50-900), blanco exclusivamente
- **Tipografía elegante**: font-extralight + tracking-[0.2em] en títulos principales
- **Iconos Lucide**: Colores blancos en elementos destacados, consistencia total
- **Glassmorphism**: bg-white/5 + backdrop-blur-sm en botones sobre fondos oscuros
- **Bordes sutiles**: border-white/10 con hover a border-white/50
- **Hover effects**: Transiciones duration-300 en todos los elementos interactivos

#### 🔧 Mejoras Técnicas

- **CartContext actualizado**: Items incluyen SKU, exporta proceedToCheckout
- **checkoutService refactorizado**: Queries GraphQL documentadas inline
- **SKU matching**: Búsqueda de variant en Shopify por SKU del producto local
- **Response parsing**: Adaptado a estructura cart.checkoutUrl de Cart API
- **Validación pre-checkout**: Verifica productos disponibles antes de crear cart

#### 📚 Documentación Nueva

- **SHOPIFY-QUICKSTART.md**: Pasos inmediatos para activar (5 min)
- **CHECKOUT-DIRECTO-SHOPIFY.md**: Explicación del flujo completo
- **Comentarios inline**: Ejemplos de Customer API queries listos para implementar
- **TODO estructurados**: Roadmap claro para próximas integraciones

#### 🚀 Flujo de Checkout Optimizado

**ANTES**: Carrito → CheckoutPage (formulario) → Email local → Nada en Shopify  
**AHORA**: Carrito → Crear Cart en Shopify → Redirect a Shopify Checkout → Order en Shopify Admin

**Ventajas**:

- ✅ Pedidos llegan a Shopify automáticamente
- ✅ Cliente ve checkout nativo de Shopify
- ✅ Shopify maneja pagos, emails, fulfillment
- ✅ Inventario se actualiza automáticamente
- ✅ Una página menos en el flujo (más rápido)

## 🎯 Mejoras Implementadas (Octubre 2025) - Anteriores

### ✨ Actualización 29 de Octubre 2025 (Tarde) - SEO, SSL y UX

#### 🔍 Implementación SEO Completa

- **Sitemap.xml**: 22 URLs indexadas con prioridades optimizadas
- **Robots.txt**: Configurado para permitir indexación correcta
- **Meta tags**: Open Graph, Twitter Cards, Schema.org LocalBusiness
- **Dominio correcto**: Actualizado a opticadelvaljoyeros.es en todos los archivos
- **Guía SEO completa**: Documentación en SEO-GUIA.md con checklist y estrategias

#### 🔒 Configuración SSL y Troubleshooting

- **Firebase Hosting**: Headers configurados para favicon y assets
- **SSL Troubleshooting**: Guía completa en SSL-TROUBLESHOOTING.md
- **Cache-Control**: Optimizado para favicon (24h) e imágenes (7 días)
- **Favicon funcional**: Múltiples formatos y versión con cache-busting

#### 🎯 UX: Scroll Automático al Inicio

- **9 páginas actualizadas**: Home, Óptica, Joyería, Relojería, Contacto, 404, Privacidad, Términos, Devoluciones
- **scrollRestoration manual**: Previene scroll automático del navegador
- **Timing perfecto**: Scroll instantáneo al cargar y después del spinner
- **Estrategia definida**: Páginas comerciales scroll top, catálogos mantienen posición

#### 🖼️ objectPosition Funcional

- **3 páginas actualizadas**: Óptica, Joyería, Relojería
- **Posicionamiento responsive**: Soporte para object-left, object-right, object-center con breakpoints
- **Fallback inteligente**: object-center por defecto si no se especifica

### ✨ Actualización 29 de Octubre 2025 (Mañana) - Rediseño Minimalista

#### 🎨 Redesign Completo Páginas Comerciales

- **Estilo minimalista blanco y negro**: Eliminados gradientes de colores, enfoque en negro/blanco/gris
- **Página 404**: Rediseñada con estética profesional minimalista
- **Página Óptica**: Enfoque en servicios (sin productos), hero con imagen restaurado, 6 marcas con imágenes promocionales
- **Página Joyería**: Nueva estructura con categorías clickables, 4 marcas con banners, productos destacados
- **Página Relojería**: 8 marcas de relojes, carrusel Tous adaptado, servicios detallados con iconos Lucide

#### 🏗️ Componentes y Estructura

- **Componentes nuevos**: MarcasRelojes, CarruselRelojesTous, CategoriasJoyeria, MarcasJoyeria, ProductosDestacados
- **Servicios detallados**: 4 servicios por página con descripciones completas y listas de características
- **Animaciones scroll**: useInView con delays escalonados para efecto cascada
- **Imágenes promocionales**: h-48 con overlay y etiquetas de especialidad (eliminadas en relojes)

#### 🎯 Sistema de Diseño Unificado

- **Tipografía**: font-light en todo, uppercase tracking-widest en títulos
- **Bordes**: border-2 border-gray-200, hover:border-black, sin rounded corners
- **Iconos**: Lucide React en cuadrados negros (w-16 h-16)
- **Animaciones hover**: scale-110 en iconos, bottom line scale-x-0 to scale-x-100
- **Líneas decorativas**: h-px bg-gray-300/black para separadores visuales
- **WhatsApp CTAs**: Integrados estratégicamente en múltiples secciones

#### 🔧 Mejoras Técnicas

- **objectPosition funcional**: Soporte para posicionamiento de imágenes responsive
- **Descripciones de marcas**: Actualizadas con información precisa y característica de cada marca
- **Carrusel adaptado**: ColeccionTous convertido para relojes con estilo minimalista
- **Grid responsive**: sm:grid-cols-2 lg:grid-cols-4 consistente en todas las páginas

### ✨ Actualización 28 de Octubre 2025

#### 🎨 Sistema de Loading States Optimizado

- **Spinners elegantes**: 6 variantes consistentes (Spinner, PageSpinner, ButtonSpinner, OverlaySpinner, InlineSpinner, CardSpinner)
- **Skeleton loaders**: Efecto shimmer animado con 6 componentes especializados
- **Integración completa**: Producto.jsx, CheckoutPage.jsx, AuthModal.jsx, Catalogo.jsx
- Ver documentación en `LOADING-STATES.md`

#### 🖼️ Optimización Masiva de Imágenes

- **Script de optimización**: Sharp para compresión JPEG progresiva (quality 80%, max 1920px)
- **Resultados**: 11.5 MB → 596 KB (94% reducción) en galería principal
- **Acordeón**: joyeria_acordeon.jpg 1778 KB → 152 KB (91.5% reducción)
- **Backup automático**: Originales guardados en `public/original-images/`

#### 🎚️ Filtro de Precio Mejorado

- **PriceRangeSlider**: Doble slider con validación min/max
- **UX mejorada**: Inputs numéricos + slider visual sincronizados
- **Animaciones**: Framer Motion para feedback visual suave
- **Responsive**: Diseño optimizado para móvil y desktop

#### 🍪 Sistema de Cookies Optimizado

- **Overlay bloqueante**: Fondo semi-transparente con blur que impide interacción
- **Diseño elegante**: bg-black/20 + backdrop-blur-sm
- **UX clara**: Usuario debe aceptar/rechazar antes de navegar

#### 🎯 Refactorización de Componentes de Marcas

- **BannerMarcas reutilizable**: Componente genérico para grids 2x2 de marcas
- **BannerMarcasRelojes**: Simplificado usando BannerMarcas
- **Eliminado GridMarcas**: Migrado a BannerMarcas con mejor diseño
- **Consistencia visual**: Mismo estilo elegante en todas las secciones

#### 📱 Banner Ray-Ban Meta (Nuevo)

- **Carrusel automático**: 3 imágenes promocionales con transición suave cada 5s
- **Diseño premium**: Fondo oscuro con efectos de luz azul/púrpura
- **Layout adaptativo**: Imagen primero en móvil, contenido optimizado
- **Elementos ocultos en móvil**: Descripción, características y badge "Disponible ahora"
- **Controles interactivos**: Indicadores de puntos clicables
- **Animaciones**: Fade + zoom con AnimatePresence
- **CTA directo**: Botones "Visítanos" y "Llámanos" destacados

#### 📐 Optimización de Espaciado en Home

- **Sistema coherente**: mt-16 sm:mt-20 md:mt-24 lg:mt-28 (progresivo)
- **Sin márgenes bottom**: Evita espaciado duplicado
- **Padding consistente**: px-5 sm:px-4 solo donde necesario
- **Secciones width completo**: BannerRaybanMeta, BannerInstagram, ColeccionesDestacadas
- **Ritmo visual perfecto**: Espaciado proporcional mobile-first

#### 🛠️ Componentes Creados/Modificados

- ✅ `Spinner.jsx` - 6 variantes de spinners
- ✅ `Skeleton.jsx` - 6 tipos de skeleton loaders
- ✅ `PriceRangeSlider.jsx` - Slider de rango dual
- ✅ `BannerMarcas.jsx` - Componente reutilizable de marcas
- ✅ `BannerRaybanMeta.jsx` - Banner promocional con carrusel
- ✅ `scripts/optimize-images.js` - Optimizador de imágenes
- ✅ `LOADING-STATES.md` - Documentación completa

#### 🗑️ Limpieza de Código

- ❌ Eliminado `GridMarcas.jsx` - Reemplazado por BannerMarcas
- 🧹 Refactorizado sistema de z-index en PriceRangeSlider
- 🔧 Simplificado layout de Home.jsx

### ✅ Sistema de Cookies y RGPD

- Banner de cookies elegante con diseño minimalista
- Panel de configuración granular de cookies
- Persistencia: 365 días (favoritos), 7 días (carrito)
- Cumplimiento total de RGPD

### ✅ Control de Stock Avanzado

- Indicadores visuales de disponibilidad
- Badges de stock en tarjetas de producto
- Límites de cantidad en carrito
- Validación en tiempo real
- Avisos de bajo stock

### ✅ Optimizaciones de Rendimiento

- **OptimizedImage**: WebP, lazy loading, skeleton loaders
- **ErrorBoundary**: Recuperación elegante de errores React
- **Code splitting**: Carga bajo demanda de componentes

### ✅ Sistema de Emails

- Confirmación de pedidos automática
- Plantillas HTML responsive personalizadas
- Integración con EmailJS (200 emails/mes gratis)
- Notificaciones de envío

### ✅ Loading States Elegantes (Octubre 2025)

- **Spinners consistentes**: 6 variantes para diferentes contextos
- **Skeleton loaders**: Efecto shimmer animado para catálogo
- **Optimización de performance**: Imágenes 94% más ligeras
- **Animaciones fluidas**: 60 FPS constantes en todas las transiciones
- Ver documentación completa en `LOADING-STATES.md`

### ✅ Página de Perfil de Usuario

- Historial completo de pedidos
- Gestión de favoritos integrada
- Edición de datos personales
- Configuración de notificaciones

## �📄 Licencia

Este proyecto es privado - © 2025 Joyería del Val

## 📞 Contacto

Para soporte, consulta la documentación o contacta al equipo de desarrollo.
