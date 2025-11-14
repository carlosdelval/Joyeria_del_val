# Stock en Tiempo Real con Shopify

## ✅ Configuración Completada

La aplicación ahora está completamente integrada con Shopify para gestionar el stock en tiempo real.

## 🔄 Cómo Funciona

### 1. **Carga de Productos**

- **Modo Shopify activado** (`VITE_USE_SHOPIFY=true`):

  - Los productos se cargan directamente desde Shopify Storefront API
  - El stock es el valor actual en tiempo real desde Shopify
  - Cada variante tiene su propio `quantityAvailable`

- **Modo JSON local** (`VITE_USE_SHOPIFY=false`):
  - Los productos se cargan desde `/public/data/productos.json`
  - Stock simulado para desarrollo

### 2. **Sincronización de Stock**

#### Cuando un producto se carga:

```javascript
// El servicio de Shopify transforma los datos:
{
  stock: variant.quantityAvailable,  // Stock EN TIEMPO REAL
  disponible: variant.availableForSale,
  shopifyId: variant.id,
  // ... otros campos
}
```

#### En las páginas:

- **ProductoCard**: Muestra badge de stock ("Disponible", "Últimas 3", "Agotado")
- **Página Producto**:
  - Barra visual de stock
  - Límite de cantidad basado en stock disponible
  - Botón "SIN STOCK" si no hay disponibilidad

### 3. **Proceso de Compra con Shopify**

Cuando un usuario hace checkout:

1. **Carrito → Shopify Cart API**

   ```javascript
   // CartContext almacena shopifyVariantId
   {
     shopifyVariantId: "gid://shopify/ProductVariant/123456",
     quantity: 2
   }
   ```

2. **Checkout Service crea carrito en Shopify**

   ```javascript
   mutation cartCreate {
     // Usa merchandiseId (el shopifyVariantId)
     // Shopify VALIDA stock automáticamente
   }
   ```

3. **Shopify actualiza stock automáticamente**
   - Cuando el usuario completa el pago en Shopify
   - El stock se reduce INSTANTÁNEAMENTE
   - No requiere sincronización manual

### 4. **Actualización Automática**

El stock se mantiene actualizado porque:

- **Cada carga de catálogo** hace una nueva petición a Shopify API
- **Cada vista de producto** obtiene el stock actual
- **No hay caché de stock** (solo de estructura de productos)
- La próxima vez que un usuario recargue, verá el stock actualizado

## 📊 Flujo Completo de una Venta

```
Usuario ve producto
    ↓
fetchProducto() → Shopify API
    ↓
Stock actual: 5 unidades
    ↓
Usuario añade 2 al carrito
    ↓
CartContext.addToCart() (guarda shopifyVariantId)
    ↓
Usuario hace checkout
    ↓
checkoutService.createShopifyCheckout()
    ↓
Shopify valida stock (5 - 2 = 3 ✓)
    ↓
Redirige a Shopify Checkout
    ↓
Usuario paga en Shopify
    ↓
Shopify reduce stock: 5 → 3 (AUTOMÁTICO)
    ↓
Próximo usuario recarga catálogo
    ↓
fetchProductos() → Shopify API
    ↓
Stock actualizado: 3 unidades ✅
```

## 🎯 Garantías de Stock en Tiempo Real

### ✅ SÍ - Garantizado:

1. **Stock al cargar productos**: Siempre el valor actual de Shopify
2. **Validación en checkout**: Shopify rechaza si no hay stock
3. **Actualización post-venta**: Automática por Shopify
4. **Stock en múltiples sesiones**: Cada carga obtiene valor real

### ⚠️ Limitaciones:

1. **Stock en carrito**: El usuario puede añadir al carrito, pero si otro compra antes, el checkout fallará (Shopify lo maneja)
2. **Actualización sin recargar**: No hay WebSocket, el usuario debe recargar la página para ver cambios
3. **Carrito persistente**: Si el stock baja mientras el carrito está guardado, el checkout validará

## 🔧 Campos de Producto

### Campos transformados desde Shopify:

```javascript
{
  // IDs
  id: "reloj-tous-123",              // handle de Shopify
  shopifyId: "gid://shopify/Product/...",
  slug: "reloj-tous-123",

  // Información básica
  titulo: "Reloj TOUS D-Bear",
  descripcion: "...",
  precio: 199,
  precioAnterior: 249,

  // STOCK (TIEMPO REAL)
  stock: 5,                          // quantityAvailable de Shopify
  disponible: true,                  // availableForSale de Shopify

  // Variantes
  variantes: [
    {
      shopifyId: "gid://shopify/ProductVariant/...",
      stock: 5,                      // quantityAvailable por variante
      disponible: true,
      precio: 199
    }
  ],

  // Categorización
  marca: "TOUS",
  categorias: ["TOUS", "acero", "relojes", "mujer"],
  tipo: "analogico",
  genero: "mujer"
}
```

## 📝 Archivos Modificados

### Core:

- ✅ `src/api/productos.js` - Integración con Shopify API
- ✅ `src/services/shopify.js` - Servicio GraphQL con transformación
- ✅ `src/services/checkoutService.js` - Checkout con Shopify Cart API
- ✅ `src/context/CartContext.jsx` - Almacena shopifyVariantId
- ✅ `src/hooks/useProductos.js` - Hook con reload

### Componentes:

- ✅ `src/components/ProductoCard.jsx` - Badge de stock
- ✅ `src/pages/Producto.jsx` - Validación y límites de stock

### Configuración:

- ✅ `.env` - Variables de Shopify configuradas
- ✅ `VITE_USE_SHOPIFY=true` - Modo Shopify activo

## 🚀 Cómo Usar

### Desarrollo:

```bash
# Usar JSON local (sin Shopify)
VITE_USE_SHOPIFY=false npm run dev

# Usar Shopify (stock real)
VITE_USE_SHOPIFY=true npm run dev
```

### Producción:

```bash
# El .env ya tiene VITE_USE_SHOPIFY=true
npm run build
```

## 🔐 Seguridad

- **Storefront Access Token**: Público, solo lectura de productos
- **Admin Token**: No se usa en frontend (solo para scripts backend)
- **Checkout**: Redirige a Shopify hosted checkout (seguro)

## 📦 Importar Productos a Shopify

1. Sube `SHOPIFY-PRODUCTOS.csv` a Shopify Admin
2. Shopify → Productos → Importar
3. Los productos tendrán stock inicial según el CSV
4. La app automáticamente sincronizará con ese stock

## ✅ Resultado Final

- **Stock 100% en tiempo real** desde Shopify
- **Ventas actualizan stock automáticamente** (Shopify lo maneja)
- **No requiere sincronización manual**
- **Validación automática** en checkout
- **Fallback a JSON local** si Shopify falla
