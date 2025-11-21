# 🔥 Guía de Gestión - Black Friday

## 📋 Resumen

Sistema completo de Black Friday implementado con animaciones, badges especiales y sección destacada. Los productos con la categoría `black_friday` se mostrarán automáticamente con estilos especiales y aparecerán en la nueva sección del catálogo.

---

## 🎯 Características Implementadas

### 1. **Banner Animado en Home**

- ✅ Fondo degradado negro con rayas diagonales animadas
- ✅ Partículas flotantes doradas
- ✅ Contador de cuenta regresiva hasta el 30 de noviembre 2025
- ✅ Badges con efectos de brillo (glow)
- ✅ Botón CTA con animaciones hover
- ✅ Features destacadas (descuentos, ofertas flash, stock limitado)

### 2. **Sección de Catálogo Black Friday**

- ✅ Ruta: `/catalogo/black-friday`
- ✅ Título: "🔥 BLACK FRIDAY - Ofertas Exclusivas"
- ✅ Filtros específicos por marca y género
- ✅ SEO optimizado para Black Friday

### 3. **Badges Especiales en Productos**

- ✅ Badge amarillo con emoji de fuego: "🔥 BLACK FRIDAY"
- ✅ Animación de entrada (rotación + escala)
- ✅ Efecto de brillo pulsante (glow)
- ✅ Prioridad sobre badges normales de descuento

### 4. **Animaciones Especiales**

- ✅ Fondo con rayas diagonales en movimiento
- ✅ Partículas doradas flotantes
- ✅ Contador con flip animation
- ✅ Botones con efectos hover
- ✅ Glow effect en badges

---

## 📦 Cómo Marcar Productos para Black Friday

### Opción 1: JSON Local (`public/data/productos.json`)

Agregar `"black_friday"` al array de `categorias`:

```json
{
  "id": "producto-123",
  "titulo": "Ray-Ban Aviator Classic RB3025",
  "precio": 99.0,
  "precioAnterior": 169.0,
  "categorias": ["gafas", "gafas-sol", "black_friday"],
  "marca": "ray-ban",
  "stock": 15,
  "imagenes": ["/images/productos/rayban-aviator.webp"]
}
```

### Opción 2: Shopify

**En Shopify Admin:**

1. Ir a `Products` → Seleccionar producto
2. Scroll hasta `Tags`
3. Agregar tag: `black_friday` o `black-friday`
4. Save

**GraphQL (si usas API):**

```graphql
mutation productUpdate($input: ProductInput!) {
  productUpdate(input: $input) {
    product {
      id
      tags
    }
  }
}
```

Variables:

```json
{
  "input": {
    "id": "gid://shopify/Product/123456789",
    "tags": ["gafas", "ray-ban", "black_friday"]
  }
}
```

---

## 🎨 Estilos y Colores Utilizados

### Paleta de Colores Black Friday

```css
/* Fondo principal */
background: linear-gradient(to bottom right, #000000, #1f2937, #000000);

/* Amarillo destacado */
--yellow-400: #facc15; /* Badges, botones */
--yellow-300: #fde047; /* Hover states */

/* Efectos glow */
box-shadow: 0 0 20px rgba(250, 204, 21, 0.8);

/* Texto */
--text-black: #000000; /* Sobre amarillo */
--text-white: #ffffff; /* Sobre negro */
--text-gray: #9ca3af; /* Secundario */
```

### Animaciones Clave

```jsx
// Badge con glow pulsante
animate={{
  boxShadow: [
    "0 0 0px rgba(250, 204, 21, 0.4)",
    "0 0 20px rgba(250, 204, 21, 0.8)",
    "0 0 0px rgba(250, 204, 21, 0.4)",
  ],
}}
transition={{ duration: 2, repeat: Infinity }}

// Partículas flotantes
animate={{
  y: [0, -30, 0],
  opacity: [0.2, 0.5, 0.2],
  scale: [1, 1.5, 1],
}}
transition={{ duration: 3, repeat: Infinity }}

// Entrada de badge
initial={{ scale: 0, rotate: -180 }}
animate={{ scale: 1, rotate: 0 }}
transition={{ type: "spring", stiffness: 200 }}
```

---

## 🗂️ Estructura de Archivos

```
src/
├── components/
│   ├── BannerBlackFriday.jsx    ← Banner principal (nuevo)
│   └── ProductoCard.jsx          ← Badge especial agregado
├── pages/
│   ├── Home.jsx                  ← Banner integrado
│   └── Catalogo.jsx              ← Ruta /black-friday agregada
├── data/
│   └── filtrosPorCategoria.js    ← Filtros de Black Friday
└── api/
    └── productos.js              ← Lógica de filtrado blackFriday
```

---

## 🚀 Testing y Validación

### 1. **Verificar Banner en Home**

- ✅ Visitar `/`
- ✅ Debe aparecer banner Black Friday después del video hero
- ✅ Countdown debe estar funcionando
- ✅ Animaciones suaves sin lag

### 2. **Verificar Catálogo Black Friday**

- ✅ Hacer click en "Ver ofertas Black Friday"
- ✅ Debe redirigir a `/catalogo/black-friday`
- ✅ Solo productos con categoría `black_friday` deben aparecer
- ✅ Título debe ser "🔥 BLACK FRIDAY - Ofertas Exclusivas"

### 3. **Verificar Badges en Productos**

- ✅ Productos con `black_friday` en categorías deben mostrar badge amarillo
- ✅ Badge debe tener efecto glow pulsante
- ✅ Badge de Black Friday debe tener prioridad sobre badge de descuento normal

### 4. **Verificar Filtros**

- ✅ Sidebar debe mostrar filtros específicos (marca, género)
- ✅ Filtros deben funcionar correctamente

### 5. **Verificar SEO**

```html
<title>
  🔥 BLACK FRIDAY 2025 - Ofertas en Joyería, Relojes y Gafas | Óptica Del Val
</title>
<meta
  name="description"
  content="¡Aprovecha las mejores ofertas de Black Friday!..."
/>
```

---

## 📱 Responsive Design

### Mobile (< 768px)

- ✅ Countdown con números más pequeños (w-16 h-16)
- ✅ Features en columna única
- ✅ Padding reducido (py-12)
- ✅ Título responsive (text-4xl)

### Tablet (768px - 1024px)

- ✅ Features en grid 3 columnas
- ✅ Countdown tamaño medio (w-20 h-20)
- ✅ Título text-5xl

### Desktop (> 1024px)

- ✅ Layout completo (w-24 h-24)
- ✅ Título text-7xl
- ✅ Padding máximo (py-24)

---

## ⚙️ Configuración del Countdown

**Fecha límite actual:** 30 de noviembre 2025, 23:59:59

Para cambiar la fecha:

```jsx
// src/components/BannerBlackFriday.jsx
const targetDate = new Date("2025-11-30T23:59:59");

// Para 2026:
const targetDate = new Date("2026-11-29T23:59:59");
```

---

## 🎯 Productos Recomendados para Black Friday

### Categorías Ideales

1. **Gafas de Sol Ray-Ban** - Descuentos agresivos (30-40%)
2. **Relojes TOUS** - Stock limitado, alta demanda
3. **Joyería TOUS** - Regalos navideños, descuentos 20-30%
4. **Relojes Tommy Hilfiger** - Público joven, descuentos 25-35%

### Estrategia de Descuentos

```
Descuento < 30%  → Badge rojo normal
Descuento ≥ 30%  → Badge Black Friday (+ categoría black_friday)
```

### Ejemplo de Producto Óptimo

```json
{
  "titulo": "Ray-Ban Aviator Classic RB3025",
  "precio": 99.0,
  "precioAnterior": 169.0, // -41% de descuento
  "categorias": ["gafas", "gafas-sol", "black_friday"],
  "marca": "ray-ban",
  "stock": 15, // Stock limitado crea urgencia
  "imagenes": ["/images/productos/rayban-aviator.webp"]
}
```

---

## 📊 Métricas de Conversión

### KPIs a Monitorizar

- ✅ Click-through rate (CTR) del banner Black Friday
- ✅ Tasa de conversión en `/catalogo/black-friday`
- ✅ Productos más vendidos con badge Black Friday
- ✅ Tiempo promedio en página Black Friday

### Google Analytics Events (Recomendado)

```javascript
// Tracking de click en CTA Black Friday
gtag("event", "click_black_friday", {
  event_category: "engagement",
  event_label: "Banner Home",
});

// Tracking de productos Black Friday añadidos al carrito
gtag("event", "add_to_cart", {
  value: 99.0,
  items: [
    {
      item_name: "Ray-Ban Aviator",
      item_category: "black_friday",
    },
  ],
});
```

---

## 🔧 Troubleshooting

### Problema: Badge Black Friday no aparece

**Causas posibles:**

1. Producto no tiene `black_friday` en array de `categorias`
2. Typo en nombre: debe ser exactamente `black_friday` o `black-friday`

**Solución:**

```javascript
// Verificar en consola del navegador
console.log(producto.categorias); // Debe incluir "black_friday"
```

### Problema: Countdown muestra valores incorrectos

**Causa:** Fecha target incorrecta o timezone issues

**Solución:**

```javascript
// Usar UTC para evitar problemas de timezone
const targetDate = new Date(Date.UTC(2025, 10, 30, 23, 59, 59)); // Nov = mes 10
```

### Problema: Animaciones con lag

**Causa:** Demasiadas partículas o efectos simultáneos

**Solución:**

```jsx
// Reducir número de partículas en móvil
{[...Array(isMobile ? 10 : 20)].map((_, i) => (
  <motion.div ... />
))}
```

### Problema: No aparecen productos en /catalogo/black-friday

**Causa:** Ningún producto tiene la categoría `black_friday`

**Solución:**

```javascript
// Verificar en productos.json
{
  "categorias": ["gafas", "gafas-sol", "black_friday"] // ✅
  "categorias": ["gafas", "gafas-sol"]                 // ❌
}
```

---

## 🎁 Ideas de Mejora Futuras

### Funcionalidades Adicionales

- [ ] Ofertas flash con temporizador individual por producto
- [ ] Notificación push cuando se activa oferta flash
- [ ] Productos relacionados en Black Friday
- [ ] Wishlist con alertas de Black Friday
- [ ] Comparador de precios históricos

### Gamificación

- [ ] Ruleta de descuentos adicionales
- [ ] Cupones exclusivos de Black Friday
- [ ] Regalos por compra mínima
- [ ] Programa de puntos dobles

### Marketing

- [ ] Email campaign con productos Black Friday
- [ ] Carrito abandonado con recordatorio de ofertas
- [ ] Social media share buttons con descuentos exclusivos
- [ ] Countdown en meta tags para redes sociales

---

## 📞 Soporte

**Archivos modificados:**

- `src/components/BannerBlackFriday.jsx` (nuevo)
- `src/components/ProductoCard.jsx` (badge agregado)
- `src/pages/Home.jsx` (banner integrado)
- `src/pages/Catalogo.jsx` (ruta y SEO)
- `src/data/filtrosPorCategoria.js` (filtros)
- `src/api/productos.js` (lógica de filtrado)

**Dependencias:**

- `framer-motion` - Animaciones
- `lucide-react` - Iconos (Zap, Tag, Clock)
- `react-router-dom` - Navegación

---

## ✅ Checklist de Activación Black Friday

### Pre-lanzamiento

- [ ] Marcar productos con categoría `black_friday`
- [ ] Establecer `precioAnterior` para mostrar descuentos
- [ ] Verificar stock de productos destacados
- [ ] Test completo en mobile y desktop
- [ ] Configurar fecha del countdown
- [ ] Preparar imágenes de productos

### Día de Lanzamiento

- [ ] Deploy a producción
- [ ] Verificar que el banner aparece en home
- [ ] Confirmar que `/catalogo/black-friday` funciona
- [ ] Monitorizar métricas de conversión
- [ ] Responder a feedback de clientes

### Post Black Friday

- [ ] Remover categoría `black_friday` de productos
- [ ] Actualizar precios regulares
- [ ] Analizar productos más vendidos
- [ ] Planificar próxima campaña (Navidad, Rebajas)

---

**¡Sistema Black Friday listo para maximizar conversiones!** 🚀🔥
