# Guía de Instalación y Configuración - Sistema de Usuarios y Checkout

## 📦 Instalación de Dependencias

```bash
npm install js-cookie react-helmet-async react-hook-form yup
```

## 🔧 Variables de Entorno

Copia `.env.example` a `.env` y configura:

```env
# Shopify Configuration
VITE_SHOPIFY_DOMAIN=tu-tienda.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=tu_storefront_access_token
VITE_SHOPIFY_ADMIN_TOKEN=tu_admin_api_token

# Feature Flags
VITE_USE_SHOPIFY=false
VITE_API_FALLBACK_ENABLED=true

# Development Settings
VITE_APP_ENV=development
VITE_API_URL=http://localhost:3001
```

## 🚀 Funcionalidades Implementadas

### ✅ Sistema de Usuarios
- **Autenticación completa** (login/registro/logout)
- **Integración Shopify Customer API**
- **Persistencia en localStorage**
- **Gestión de sesiones**
- **Dropdown de usuario en navbar**

### ✅ Carrito de Compras Avanzado
- **Context API con persistencia**
- **Sidebar animado**
- **Cálculos automáticos de totales**
- **Gestión de cantidades**
- **Envío gratis configurable**

### ✅ Checkout Completo
- **Proceso paso a paso (4 pasos)**
- **Formularios validados**
- **Métodos de envío**
- **Integración de pagos preparada**
- **Confirmación de pedido**

### ✅ Integración Shopify Ready
- **APIs preparadas para Shopify**
- **Fallback a sistema local**
- **GraphQL queries optimizadas**
- **Transformación automática de datos**

## 🛍️ Flujo de Compra

1. **Añadir productos al carrito** → Desde cualquier página de producto
2. **Revisar carrito** → Sidebar con resumen y totales
3. **Ir a checkout** → Botón "Finalizar compra"
4. **Información de envío** → Formulario con autocompletado si está logueado
5. **Seleccionar método de envío** → Estándar/Express con precios
6. **Información de pago** → Formulario seguro con validaciones
7. **Confirmación** → Página de éxito con detalles del pedido

## 🔐 Sistema de Autenticación

### Usuarios de Prueba (Modo Local)
```javascript
Email: test@opticadelval.com
Password: password
```

### Funciones Principales
- **Login/Registro** → Modal unificado
- **Gestión de perfil** → Datos del usuario
- **Historial de pedidos** → Lista de compras
- **Direcciones guardadas** → Para checkout rápido

## 📱 Responsive Design

- **Mobile First** → Diseño optimizado para móviles
- **Touch Friendly** → Botones y gestos táctiles
- **Sidebar móvil** → Carrito y menús adaptados
- **Formularios responsive** → Checkout adaptado a pantallas

## 🔄 Transición a Shopify

### Paso 1: Configuración Inicial
1. Crear tienda en Shopify
2. Obtener tokens de API
3. Configurar variables de entorno
4. Activar `VITE_USE_SHOPIFY=true`

### Paso 2: Migración de Productos
1. Importar catálogo a Shopify
2. Configurar variants y precios
3. Actualizar imágenes y descripciones
4. Mapear categorías y tags

### Paso 3: Testing
1. Probar autenticación con clientes reales
2. Validar proceso de checkout
3. Testear pagos en modo sandbox
4. Verificar webhooks de pedidos

### Paso 4: Producción
1. Configurar dominio personalizado
2. Activar pagos en vivo
3. Configurar envíos y taxes
4. Monitoring y analytics

## 📊 Métricas y Analytics

### Eventos Trackeados
- **Visualizaciones de producto**
- **Añadir al carrito**
- **Inicios de checkout**
- **Conversiones completadas**
- **Abandonos de carrito**

### Integración Google Analytics
```javascript
// Ejemplo de tracking
analytics.trackAddToCart({
  item_id: producto.id,
  item_name: producto.titulo,
  price: producto.precio,
  quantity: 1
});
```

## 🛡️ Seguridad

- **Validación client-side y server-side**
- **Sanitización de inputs**
- **Protección CSRF**
- **HTTPS obligatorio**
- **Tokens con expiración**

## 📈 Performance

- **Lazy loading** de componentes
- **Cache inteligente** con TTL
- **Optimización de imágenes**
- **Bundle splitting**
- **Preload de recursos críticos**

## 🚨 Manejo de Errores

- **Fallbacks automáticos**
- **Mensajes user-friendly**
- **Logging detallado**
- **Recovery graceful**
- **Offline support preparado**

## 💡 Próximas Mejoras

1. **PWA Support** → App instalable
2. **Push Notifications** → Abandono de carrito
3. **Wishlist** → Lista de deseos
4. **Reviews & Ratings** → Valoraciones de productos
5. **Recomendaciones** → AI-powered suggestions
6. **Multi-currency** → Soporte múltiples monedas
7. **Inventory tracking** → Control de stock en tiempo real

## 🆘 Soporte y Documentación

- **Logs detallados** en consola del navegador
- **Error boundaries** para recovery automático
- **Documentación inline** en el código
- **Testing suite** preparado
