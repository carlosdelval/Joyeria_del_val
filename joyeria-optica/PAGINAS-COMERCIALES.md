# 🎨 Páginas Comerciales - Documentación

## 📋 Resumen

Se han creado tres páginas comerciales específicas para **Joyería**, **Relojes** y **Gafas**, diseñadas para mostrar las marcas con las que trabajamos, información detallada sobre ellas y ofertas de productos.

---

## 🆕 Nuevas Páginas Creadas

### 1. 💎 **Joyería** (`/joyeria`)

**Archivo:** `src/pages/Joyeria.jsx`

**Características:**

- Hero section con imagen destacada de joyería
- Banner de 4 marcas principales (grid 2x2):
  - Marina García (Alta joyería de autor)
  - Salvatore (Plata de ley 925)
  - Nomination (Pulseras componibles)
  - La Petra (Oro de 18k)
- Sección informativa sobre cada marca
- 2 colecciones de productos destacados:
  - Anillos en oferta
  - Pulseras Salvatore
- CTA final para visitar tienda física

**Rutas:**

- Principal: `/joyeria`
- Integrada en navbar

---

### 2. ⌚ **Relojes** (`/relojes`)

**Archivo:** `src/pages/Relojes.jsx`

**Características:**

- Hero section con imagen de relojes
- Banner de 4 marcas principales:
  - Festina (Relojería suiza desde 1902)
  - Lotus (Estilo contemporáneo)
  - Viceroy (Elegancia atemporal)
  - Tous (Diseño y joyería)
- Sección informativa sobre cada marca
- **Servicios de relojería:**
  - Reparación especializada
  - Cambio de pila
  - Ajuste de correa
  - Limpieza ultrasónica
- 2 colecciones de productos:
  - Relojes Tous (hasta 50% dto)
  - Relojes premium
- CTA para solicitar cita de reparación

**Rutas:**

- Principal: `/relojes`
- Integrada en navbar

---

### 3. 👓 **Gafas** (`/gafas`)

**Archivo:** `src/pages/Gafas.jsx`

**Características:**

- Hero section con imagen de gafas
- Banner de 4 marcas principales:
  - Ray-Ban (Icono atemporal desde 1937)
  - Polaroid (Lentes polarizadas premium)
  - Hawkers (Diseño urbano y moderno)
  - Oakley (Tecnología deportiva)
- Sección informativa sobre cada marca
- **Banner Ray-Ban Meta Smart Glasses:**
  - Carrusel interactivo con 4 imágenes
  - Información sobre tecnología (Audio, Cámara HD, IA)
- **Servicios de óptica:**
  - Examen visual
  - Graduación
  - Personalización
  - Reparaciones
- 2 colecciones de productos:
  - Gafas Ray-Ban
  - Gafas de sol variadas
- CTA para reservar cita de examen visual

**Rutas:**

- Principal: `/gafas`
- Integrada en navbar

---

## 🔧 Componentes Reutilizados

### 1. **ColeccionProductos** (interno en cada página)

Componente que muestra productos en formato promocional:

- Banner con imagen y título
- Grid 2x2 de productos destacados
- Filtrado por categoría y marca
- Navegación al catálogo o producto individual

**Props:**

```jsx
<ColeccionProductos
  titulo="RELOJES TOUS"
  descripcion="HASTA 50% DE DESCUENTO"
  categoria="relojes"
  marca="tous"
  imagen="/promoRelojTous.jpg"
/>
```

### 2. **BannerMarcas** (componente global)

Banner reutilizable para mostrar marcas en grid 2x2:

- Animaciones con Framer Motion
- Hover effects
- Navegación automática al catálogo filtrado

**Props:**

```jsx
<BannerMarcas
  titulo="Nuestras Marcas de Joyería"
  marcas={marcasJoyeria}
  categoriaBase="joyeria"
/>
```

### 3. **BannerRaybanMeta** (usado en página Gafas)

Carrusel específico para gafas Ray-Ban Meta:

- 4 imágenes rotativas
- Transiciones suaves (0.6s)
- Auto-rotación cada 5 segundos
- Reset de timer en navegación manual

---

## 🎨 Estructura de las Páginas

Todas las páginas siguen una estructura similar:

```
┌─────────────────────────────┐
│      Hero Section           │  ← Imagen full width + overlay
├─────────────────────────────┤
│   Banner de Marcas (2x2)    │  ← Grid con 4 marcas principales
├─────────────────────────────┤
│  Información de Marcas      │  ← Detalles sobre cada marca
├─────────────────────────────┤
│   Sección Especial          │  ← Servicios o tecnología
├─────────────────────────────┤
│  Colección Productos 1      │  ← Banner + 4 productos
├─────────────────────────────┤
│  Colección Productos 2      │  ← Banner + 4 productos
├─────────────────────────────┤
│      CTA Final              │  ← Llamada a la acción
└─────────────────────────────┘
```

---

## 🖼️ Imágenes Utilizadas

### Joyería

- Hero: `/joyeria_acordeon.jpg`
- Marcas:
  - Marina García: `/marinagarcia-banner.jpg`
  - Salvatore: `/salvatore-banner.jpg`
  - Nomination: `/nomination-banner.jpg`
  - La Petra: `/lapetra-banner.jpg`

### Relojes

- Hero: `/reloj_acordeon.jpg`
- Marcas:
  - Festina: `/fossil-banner.jpg`
  - Lotus: `/seiko-banner.jpg`
  - Viceroy: `/citizen-banner.jpg`
  - Tous: `/promoRelojTous.jpg`

### Gafas

- Hero: `/gafas_acordeon.jpg`
- Marcas:
  - Ray-Ban: `/rayban.jpg`
  - Polaroid: `/persol.jpg`
  - Hawkers: `/dolce-gabbana.jpg`
  - Oakley: `/raybanmeta-banner.jpg`
- Ray-Ban Meta:
  - `/raybanmeta1.jpg`
  - `/raybanmeta2.jpg`
  - `/raybanmeta3.jpg`

---

## 🧭 Actualización del Navbar

El navbar se ha actualizado con las nuevas páginas:

**Antes:**

- REBAJAS ⚡
- TOUS
- Joyería Oro 18K
- Salvatore Plata
- Nomination Italy
- Gafas graduadas
- Gafas de sol
- Relojes caballero
- Relojes señora

**Después:**

- REBAJAS ⚡
- **Joyería** ← NUEVA
- **Relojes** ← NUEVA
- **Gafas** ← NUEVA
- TOUS
- Anillos
- Pulseras
- Pendientes
- Gafas de sol

---

## 🚀 Rutas Configuradas

**App.jsx actualizado:**

```jsx
<Route path="/joyeria" element={<Joyeria />} />
<Route path="/relojes" element={<Relojes />} />
<Route path="/gafas" element={<Gafas />} />
```

---

## 📱 Responsive Design

Todas las páginas son completamente responsive:

### Mobile (< 768px)

- Hero adaptado a altura menor
- Banner de marcas en columna simple
- Productos en grid 2x2
- Servicios en columna simple
- Navegación táctil en carruseles

### Tablet (768px - 1024px)

- Hero a altura media
- Banner de marcas en grid 2x2
- Productos mantienen grid 2x2
- Servicios en 2 columnas

### Desktop (> 1024px)

- Hero a altura completa
- Banner de marcas en grid 2x2 optimizado
- Productos con mejor spacing
- Servicios en 4 columnas horizontales

---

## 🎯 SEO Optimizado

Cada página incluye:

- Meta tags personalizados
- Títulos únicos
- Descripciones específicas
- Keywords relevantes
- Open Graph tags

**Ejemplo (Joyería):**

```jsx
<SEO
  title="Joyería de Lujo - Óptica del Val Joyeros"
  description="Descubre nuestra exclusiva colección de joyería de autor..."
  keywords="joyería, joyas de autor, Marina García, Salvatore..."
/>
```

---

## 🎨 Animaciones

Todas las secciones incluyen animaciones con **Framer Motion**:

- `initial={{ opacity: 0, y: 20 }}`
- `whileInView={{ opacity: 1, y: 0 }}`
- `viewport={{ once: true }}`
- Delays progresivos en listas

---

## 🔗 Integración con Sistema Existente

Las páginas se integran perfectamente con:

✅ **Sistema de productos:**

- Usa `fetchProductos()` con filtros
- Respeta categorías y marcas
- Muestra precios con descuentos

✅ **Navegación:**

- Links al catálogo filtrado
- Links a páginas de producto
- Scroll to top en navegación

✅ **Carrito:**

- Compatible con sistema de carrito
- No interfiere con funcionalidad existente

✅ **Context Providers:**

- Funciona con CartContext
- Compatible con AuthContext
- Integrado con WishlistContext

---

## 🎨 Paletas de Color

### Joyería

- Gradient: `from-amber-900 to-amber-700`
- Buttons: amber scheme
- CTA: amber-900 text on white

### Relojes

- Gradient: `from-gray-900 to-gray-700`
- Buttons: gray scheme
- Services bg: gray-900 to gray-800

### Gafas

- Gradient: `from-blue-900 to-blue-700`
- Buttons: blue scheme
- Services bg: blue-900 to blue-800
- Ray-Ban Meta: black background

---

## 📊 Métricas de Rendimiento

**Tamaño de las páginas:**

- Joyeria.jsx: ~13KB
- Relojes.jsx: ~14KB
- Gafas.jsx: ~16KB (incluye Ray-Ban Meta)

**Componentes reutilizados:**

- BannerMarcas: compartido entre las 3 páginas
- ColeccionProductos: definido 6 veces (2 por página)
- SEO: componente global

**Carga de imágenes:**

- Lazy loading automático con `<img>`
- Fallbacks en caso de error
- Optimización de imágenes existentes

---

## 🔮 Futuras Mejoras

### Sugerencias de expansión:

1. **Sistema de filtros en página:**

   - Filtrar productos sin salir de la página
   - Más productos en las colecciones

2. **Testimonios de clientes:**

   - Añadir sección de reviews
   - Integración con sistema de valoraciones

3. **Video backgrounds:**

   - Hero sections con video
   - Showcase de productos en movimiento

4. **Blog/Noticias:**

   - Sección de novedades por categoría
   - Consejos y tendencias

5. **Comparador de productos:**

   - Comparar modelos dentro de cada categoría
   - Tablas comparativas

6. **Citas online:**
   - Sistema de reserva de citas
   - Integración con calendario

---

## 🛠️ Mantenimiento

### Actualizar marcas:

Editar el array `marcas[Categoria]` en cada página:

```jsx
const marcasJoyeria = [
  {
    nombre: "Nueva Marca",
    descripcion: "Descripción breve",
    imagen: "/nueva-marca-banner.jpg",
    slug: "nueva-marca",
    categoria: "anillos",
  },
];
```

### Actualizar colecciones:

Modificar componentes `<ColeccionProductos>`:

```jsx
<ColeccionProductos
  titulo="NUEVA COLECCIÓN"
  descripcion="Texto descriptivo"
  categoria="categoria"
  marca="marca-opcional"
  imagen="/imagen-banner.jpg"
/>
```

### Actualizar servicios:

Editar array `servicios` en componentes internos:

```jsx
const servicios = [
  {
    icon: "🔧",
    titulo: "Nuevo Servicio",
    descripcion: "Descripción del servicio",
  },
];
```

---

## 📝 Checklist de Implementación

- [x] Crear página Joyería
- [x] Crear página Relojes
- [x] Crear página Gafas
- [x] Actualizar rutas en App.jsx
- [x] Actualizar Navbar con nuevas páginas
- [x] Configurar SEO en cada página
- [x] Integrar BannerMarcas reutilizable
- [x] Implementar ColeccionProductos
- [x] Añadir animaciones Framer Motion
- [x] Responsive design completo
- [x] Testing en desarrollo
- [ ] Testing en producción
- [ ] Análisis de métricas de usuario

---

## 🎉 Resultado Final

Se han creado **3 páginas comerciales completas** que:

✅ Muestran las marcas con las que trabajamos
✅ Proporcionan información detallada
✅ Destacan ofertas y promociones
✅ Incluyen servicios adicionales (reparación, óptica)
✅ Tienen CTAs claros para conversión
✅ Son totalmente responsive
✅ Están optimizadas para SEO
✅ Se integran perfectamente con el sistema existente

**Acceso:**

- 💎 Joyería: [localhost:5173/joyeria](http://localhost:5173/joyeria)
- ⌚ Relojes: [localhost:5173/relojes](http://localhost:5173/relojes)
- 👓 Gafas: [localhost:5173/gafas](http://localhost:5173/gafas)

---

**Última actualización:** Octubre 29, 2025
**Versión:** 1.0.0
**Autor:** Óptica del Val Joyeros - Equipo de Desarrollo
