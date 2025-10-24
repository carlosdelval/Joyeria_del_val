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
- ✅ Compatible con Shopify desde el inicio
- ✅ Filtros por categoría, material, precio, género
- ✅ Sistema de descuentos automático
- ✅ Carrito de compra con persistencia
- ✅ Checkout integrado con validación
- ✅ Control de stock en tiempo real
- ✅ Indicadores visuales de disponibilidad

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
- ✅ **Perfil de usuario**: Historial de pedidos, favoritos, configuración
- ✅ **Analytics**: Google Analytics 4 + Meta Pixel integrados

### 🎨 UI/UX
- ✅ Diseño elegante minimalista (blanco/negro/gris)
- ✅ Animaciones fluidas con Framer Motion
- ✅ Responsive design completo
- ✅ Skeleton loaders y estados de carga
- ✅ Feedback visual en todas las acciones

## 🛠️ Tecnologías

- **React 19** - UI Library
- **Vite 7** - Build tool
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **React Router 7** - Routing
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
│   │   └── ErrorBoundary.jsx      # NUEVO: Error handling
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
```

## 🔧 Configuración

### Variables de Entorno (.env)

```env
# Shopify (opcional)
VITE_SHOPIFY_DOMAIN=tu-tienda.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=tu_token
VITE_SHOPIFY_ADMIN_TOKEN=tu_admin_token

# EmailJS (para emails de confirmación)
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_PUBLIC_KEY=tu_public_key

# Desarrollo
VITE_APP_ENV=development
VITE_API_FALLBACK_ENABLED=true
```

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

## � Documentación Adicional

- **[OPTIMIZATIONS.md](./OPTIMIZATIONS.md)** - Optimizaciones avanzadas implementadas
- **[COOKIES-SYSTEM.md](./COOKIES-SYSTEM.md)** - Sistema de cookies y RGPD
- **[EMAILJS-SETUP.md](./EMAILJS-SETUP.md)** - Configuración completa de EmailJS
- **[EMAILJS-CONFIG-RAPIDA.md](./EMAILJS-CONFIG-RAPIDA.md)** - Guía rápida EmailJS
- **[GUIA-GESTION-STOCK.md](./GUIA-GESTION-STOCK.md)** - Gestión de inventario

## 🎯 Mejoras Implementadas (Octubre 2025)

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

### ✅ Página de Perfil de Usuario
- Historial completo de pedidos
- Gestión de favoritos integrada
- Edición de datos personales
- Configuración de notificaciones

## �📄 Licencia

Este proyecto es privado - © 2025 Joyería del Val

## 📞 Contacto

Para soporte, consulta la documentación o contacta al equipo de desarrollo.
