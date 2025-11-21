# Guía: Sistema de Tallas para Gafas con Shopify

## 📋 Resumen del Sistema Implementado

Se ha implementado un selector de tallas para gafas que:

- ✅ Muestra botones de selección de talla en la página de producto
- ✅ Valida el stock de cada talla individualmente
- ✅ Envía la variante seleccionada a Shopify al crear el pedido
- ✅ Muestra guía de ayuda "¿Qué talla necesito?"
- ✅ Diseño responsive para móvil y desktop

---

## 🏗️ Estructura de Datos en Shopify

### 1. **Variantes de Producto (Product Variants)**

En Shopify, las variantes se configuran con opciones personalizadas. Para gafas, usamos:

**Opción: "Talla"**

- Valores: `52-20-145`, `54-20-145`, `56-22-150`, etc.

Cada variante tiene:

- `id`: ID único de Shopify (formato: `gid://shopify/ProductVariant/...`)
- `title`: Nombre de la variante (ej: "52-20-145")
- `price`: Precio específico de la variante
- `availableForSale`: Boolean de disponibilidad
- `quantityAvailable`: Stock disponible de esa talla
- `sku`: Código SKU único para inventario

---

## 🔧 Configuración en Shopify Admin

### Paso 1: Crear el Producto Base

1. Ve a **Productos** → **Añadir producto**
2. Nombre: "Ray-Ban Aviator Clásico RB3025"
3. Descripción completa del producto
4. Imágenes del producto

### Paso 2: Añadir Opciones de Variante

1. En la sección **Variantes**:
   - Haz clic en "Añadir opción"
   - Nombre de opción: `Talla`
   - Valores:
     ```
     52-20-145
     54-20-145
     56-22-150
     ```

### Paso 3: Configurar Cada Variante

Para cada talla creada, configura:

| Campo                        | Ejemplo         | Descripción                           |
| ---------------------------- | --------------- | ------------------------------------- |
| **SKU**                      | `RB3025-001-52` | Código único de inventario            |
| **Precio**                   | `169.00 EUR`    | Precio (normalmente igual para todas) |
| **Precio comparado**         | `189.00 EUR`    | Precio anterior (opcional)            |
| **Cantidad**                 | `15`            | Stock disponible de esta talla        |
| **Permite ventas sin stock** | ❌              | Mantener desactivado                  |

### Paso 4: Etiquetas (Tags)

Añade tags al producto para filtrado:

```
gafas, gafas-sol, ray-ban, aviator, unisex
```

---

## 📊 Formato de Tallas de Gafas

### Nomenclatura Estándar: **Calibre-Puente-Varilla**

Ejemplo: **52-20-145**

- **52**: Calibre (ancho de la lente en mm)
- **20**: Puente (distancia entre lentes en mm)
- **145**: Varilla (longitud de la patilla en mm)

### Tallas Comunes por Marca

#### Ray-Ban

- **Pequeña**: 50-20-140, 52-18-140
- **Mediana**: 54-20-145, 55-20-145
- **Grande**: 58-22-150, 60-22-150

#### Oakley (deportivas)

- **Pequeña**: 55-17-130
- **Mediana**: 57-17-135
- **Grande**: 59-17-140

#### Dolce & Gabbana

- **Pequeña**: 52-20-140
- **Mediana**: 54-20-145
- **Grande**: 56-22-150

---

## 🛠️ Implementación Técnica

### Estructura de Datos del Producto

```javascript
{
  id: "producto-123",
  titulo: "Ray-Ban Aviator RB3025",
  precio: 169,
  stock: 50, // Stock total (suma de variantes)
  variantes: [
    {
      id: "variant-1",
      shopifyId: "gid://shopify/ProductVariant/44556677889900",
      talla: "52-20-145",
      nombre: "52-20-145",
      descripcion: "Calibre 52mm - Ideal para rostros pequeños",
      sku: "RB3025-001-52",
      precio: 169,
      stock: 15,
      disponible: true
    },
    {
      id: "variant-2",
      shopifyId: "gid://shopify/ProductVariant/44556677889911",
      talla: "54-20-145",
      nombre: "54-20-145",
      descripcion: "Calibre 54mm - Talla más popular",
      sku: "RB3025-001-54",
      precio: 169,
      stock: 25,
      disponible: true
    },
    {
      id: "variant-3",
      shopifyId: "gid://shopify/ProductVariant/44556677889922",
      talla: "56-22-150",
      nombre: "56-22-150",
      descripcion: "Calibre 56mm - Para rostros grandes",
      sku: "RB3025-001-56",
      precio: 169,
      stock: 10,
      disponible: true
    }
  ]
}
```

### Obtener Variantes desde Shopify API

```javascript
// En src/services/shopify.js
async getProduct(handle) {
  const query = `
    query getProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        options {
          name
          values
        }
        variants(first: 50) {
          edges {
            node {
              id
              title
              sku
              availableForSale
              quantityAvailable
              price {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `;

  return this.graphqlRequest(query, { handle });
}
```

### Enviar Variante al Carrito de Shopify

```javascript
// CartContext.jsx - Ya implementado
addToCart(producto, quantity, varianteSeleccionada) {
  dispatch({
    type: CART_ACTIONS.ADD_ITEM,
    payload: {
      product: producto,
      quantity: quantity,
      variant: varianteSeleccionada // Incluye shopifyId, talla, stock
    }
  });
}
```

### Crear Pedido en Shopify

```javascript
// En checkoutService.js
async createShopifyCheckout(cartItems) {
  const lineItems = cartItems.map(item => ({
    variantId: item.shopifyVariantId, // ID de Shopify de la variante
    quantity: item.quantity,
    customAttributes: [
      {
        key: "Talla",
        value: item.variant?.talla || "Sin talla"
      }
    ]
  }));

  const mutation = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
          lineItems(first: 100) {
            edges {
              node {
                title
                quantity
                variant {
                  title
                  sku
                }
              }
            }
          }
        }
      }
    }
  `;

  return shopifyService.graphqlRequest(mutation, {
    input: { lineItems }
  });
}
```

---

## 🎨 Interfaz de Usuario

### Selector de Tallas (Desktop)

```
┌─────────────────────────────────────────┐
│ Selecciona tu talla:    ¿Qué talla...? │
├─────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌────────┐│
│  │52-20-145 │  │54-20-145 │  │56-22...││
│  │  ✓       │  │          │  │Sin stok││
│  └──────────┘  └──────────┘  └────────┘│
├─────────────────────────────────────────┤
│ Talla seleccionada: 52-20-145           │
│ Calibre 52mm - Ideal para rostros...    │
└─────────────────────────────────────────┘
```

### Estados Visuales

- **Seleccionada**: Fondo negro, texto blanco, borde negro
- **Disponible**: Fondo blanco, texto negro, hover gris
- **Sin stock**: Fondo gris, texto gris claro, deshabilitado

---

## 📱 Responsive Design

### Móvil (< 768px)

- Grid de 2 columnas
- Botones más compactos
- Tooltip de ayuda adaptado

### Tablet/Desktop (≥ 768px)

- Grid de 3 columnas
- Espaciado mayor
- Información adicional visible

---

## 🔍 Guía de Tallas Modal

Cuando el usuario hace clic en "¿Qué talla necesito?":

```
┌────────────────────────────────────────┐
│  Guía de Tallas - Gafas de Sol     ✕   │
├────────────────────────────────────────┤
│                                         │
│  Cómo medir tus gafas actuales:        │
│                                         │
│     [DIAGRAMA DE GAFAS]                │
│      52mm   20mm   145mm                │
│    ├─────┤ ├──┤ ├─────────┤           │
│                                         │
│  • CALIBRE: Ancho de la lente          │
│  • PUENTE: Distancia entre lentes      │
│  • VARILLA: Longitud de la patilla     │
│                                         │
│  Recomendaciones:                      │
│  ┌──────────────────────────────────┐  │
│  │ Rostro pequeño: 50-52mm          │  │
│  │ Rostro mediano: 54-56mm          │  │
│  │ Rostro grande: 58-60mm           │  │
│  └──────────────────────────────────┘  │
│                                         │
│        [ Entendido ]                   │
└────────────────────────────────────────┘
```

---

## ✅ Checklist de Implementación

### Frontend (✅ Completado)

- [x] Selector de tallas en página de producto
- [x] Validación de stock por variante
- [x] Estado de variante seleccionada
- [x] Diseño responsive
- [x] Guía de ayuda básica
- [ ] Modal mejorado de guía de tallas
- [ ] Imágenes de medición en modal

### Backend/Shopify (⚠️ Pendiente)

- [ ] Crear productos con variantes en Shopify
- [ ] Configurar SKUs únicos por talla
- [ ] Asignar stock individual a cada variante
- [ ] Probar sincronización de stock
- [ ] Verificar flujo de checkout completo

### Datos (⚠️ Pendiente)

- [ ] Mapear productos existentes a variantes
- [ ] Actualizar CSV con información de variantes
- [ ] Importar productos con variantes a Shopify

---

## 🚀 Próximos Pasos

1. **Crear productos de prueba en Shopify**

   - Usar 2-3 modelos de Ray-Ban populares
   - Configurar 3 tallas por modelo
   - Asignar stock ficticio para pruebas

2. **Probar flujo completo**

   - Seleccionar talla en web
   - Añadir al carrito
   - Verificar en checkout de Shopify
   - Confirmar pedido de prueba

3. **Migrar catálogo existente**

   - Identificar productos que necesitan tallas
   - Crear variantes masivamente vía API
   - Actualizar stock por SKU

4. **Mejorar UX**
   - Crear modal profesional de guía de tallas
   - Añadir imágenes de medición
   - Implementar recomendador según forma de rostro

---

## 📞 Soporte

Para dudas sobre:

- **Shopify Admin**: [Documentación oficial](https://help.shopify.com)
- **Storefront API**: [GraphQL Docs](https://shopify.dev/api/storefront)
- **Implementación frontend**: Ver código en `src/pages/Producto.jsx`
