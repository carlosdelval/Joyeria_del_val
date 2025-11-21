# Cómo Ver las Tallas de Gafas en Shopify

## 📋 Resumen

Cuando un cliente selecciona una talla de gafas en la web, esta información se envía a Shopify como **atributo personalizado** del producto en el carrito. El personal de la tienda puede ver esta información en varios lugares de Shopify Admin.

---

## 🛒 Visualización en Shopify Admin

### 1. **En el Pedido (Order)**

Cuando se completa una compra, la talla aparece en el detalle del pedido:

**Ruta:** `Shopify Admin` → `Pedidos` → `[Seleccionar pedido]`

En la sección de **Artículos del pedido** verás:

```
┌────────────────────────────────────────────┐
│ Ray-Ban Aviator RB3025                     │
│ SKU: RB3025-001                            │
│ Cantidad: 1                                │
│                                            │
│ Propiedades del artículo:                 │
│ • Talla: 54-20-145                        │
└────────────────────────────────────────────┘
```

### 2. **En el Carrito Abandonado (Abandoned Cart)**

Si el cliente no completa la compra, puedes ver la talla en los carritos abandonados:

**Ruta:** `Shopify Admin` → `Clientes` → `Carritos abandonados` → `[Seleccionar carrito]`

```
┌────────────────────────────────────────────┐
│ Artículos en el carrito                    │
│                                            │
│ Ray-Ban Wayfarer RB2140                    │
│ Talla: 52-20-145                          │
│ Precio: €169.00                           │
└────────────────────────────────────────────┘
```

### 3. **En la Página de Checkout**

Durante el proceso de checkout, antes de completar el pago:

**Ruta:** El cliente ve en su checkout:

```
┌────────────────────────────────────────────┐
│ Resumen del pedido                         │
│                                            │
│ Ray-Ban Clubmaster RB3016                  │
│ Talla: 56-22-150                          │
│ €189.00                                   │
└────────────────────────────────────────────┘
```

---

## 📧 Notificaciones por Email

### Email de Confirmación de Pedido

El cliente y la tienda reciben un email con los detalles. La talla aparece así:

**Asunto:** Pedido #1234 confirmado

**Cuerpo del email:**

```
Gracias por tu pedido!

Artículos pedidos:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ray-Ban Aviator Clásico RB3025
SKU: RB3025-001
Talla: 54-20-145
Cantidad: 1
Precio: €169.00

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Subtotal: €169.00
Envío: Gratis
Total: €169.00
```

---

## 🔧 Implementación Técnica

### Código que Envía la Talla

En `src/services/checkoutService.js`:

```javascript
// Construir el line item con atributos personalizados
const lineItem = {
  merchandiseId: variantId,
  quantity: item.quantity,
};

// Añadir talla como atributo personalizado
if (item.tallaSeleccionada) {
  lineItem.attributes = [
    {
      key: "Talla",
      value: item.tallaSeleccionada, // Ej: "54-20-145"
    },
  ];
}
```

### Estructura en la Petición GraphQL

```graphql
mutation cartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      id
      lines(first: 100) {
        edges {
          node {
            attributes {
              key
              value
            }
          }
        }
      }
    }
  }
}
```

**Input que se envía:**

```json
{
  "input": {
    "lines": [
      {
        "merchandiseId": "gid://shopify/ProductVariant/44556677889900",
        "quantity": 1,
        "attributes": [
          {
            "key": "Talla",
            "value": "54-20-145"
          }
        ]
      }
    ]
  }
}
```

---

## 📱 API de Shopify: Line Item Properties

### Shopify Storefront API (Cart API)

Los **attributes** (atributos) en Shopify Cart API permiten añadir información personalizada a cada producto del carrito. Esta información:

✅ **Se mantiene** durante todo el proceso de checkout
✅ **Se muestra** en el pedido completado
✅ **Aparece** en emails de confirmación
✅ **Se guarda** en la base de datos de Shopify
✅ **Es visible** para el personal en Shopify Admin

### Documentación Oficial

- [Cart API - Line Item Attributes](https://shopify.dev/docs/api/storefront/2024-10/input-objects/CartLineInput#field-cartlineinput-attributes)
- [Order Line Item Properties](https://shopify.dev/docs/api/admin-rest/2024-10/resources/order#line-item-properties)

---

## 🎯 Flujo Completo

```
┌─────────────────────────────────────────────────────┐
│ 1. CLIENTE SELECCIONA TALLA EN WEB                  │
│    ↓                                                │
│    "54-20-145" → tallaSeleccionada                 │
└─────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────┐
│ 2. AÑADE AL CARRITO                                 │
│    ↓                                                │
│    CartContext guarda: { tallaSeleccionada: "..." }│
└─────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────┐
│ 3. PROCEDE AL CHECKOUT                              │
│    ↓                                                │
│    checkoutService.createShopifyCheckout()         │
└─────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────┐
│ 4. SE ENVÍA A SHOPIFY CON ATTRIBUTES                │
│    ↓                                                │
│    attributes: [{ key: "Talla", value: "54..." }]  │
└─────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────┐
│ 5. SHOPIFY GUARDA LA INFORMACIÓN                    │
│    ↓                                                │
│    • En el carrito                                  │
│    • En el pedido                                   │
│    • En los emails                                  │
└─────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────┐
│ 6. PERSONAL VE LA TALLA EN ADMIN                    │
│    ↓                                                │
│    Pedidos → Detalle → Propiedades del artículo    │
└─────────────────────────────────────────────────────┘
```

---

## ✅ Verificación

### Cómo Probar que Funciona

1. **Añadir producto de gafas al carrito** seleccionando talla
2. **Abrir consola del navegador** (F12)
3. **Ver log**: `📏 Talla: 54-20-145`
4. **Ir al checkout de Shopify**
5. **Verificar en el resumen** que aparece la talla
6. **Completar pedido de prueba**
7. **Ver en Shopify Admin** → Pedidos → [Tu pedido] → Debe aparecer "Talla: ..."

### Console Logs Importantes

```javascript
// En checkoutService.js verás:
✅ Ray-Ban Aviator: gid://shopify/ProductVariant/... x1
   📏 Talla: 54-20-145
```

---

## 🚨 Troubleshooting

### La talla no aparece en Shopify

**Posibles causas:**

1. **Producto no es gafa**: Solo productos detectados como gafas tienen selector

   - Verificar que `categorias` incluya "gafas" o "gafas-sol"

2. **No se seleccionó talla**: Cliente intentó añadir sin seleccionar

   - El botón debe estar deshabilitado si no hay talla

3. **Error en el envío**: Revisa console.log

   - Debe aparecer `📏 Talla: ...` antes de crear el cart

4. **Problema de formato**: Asegúrate que attributes sea array
   ```javascript
   attributes: [{ key: "Talla", value: "54-20-145" }];
   ```

### Ver datos en tiempo real

```javascript
// Añade en checkoutService.js después de lineItems.push():
console.log("📤 Line item enviado:", JSON.stringify(lineItem, null, 2));
```

---

## 📞 Soporte

- **Frontend**: `src/pages/Producto.jsx` - Selector de tallas
- **Carrito**: `src/context/CartContext.jsx` - Almacenamiento talla
- **Checkout**: `src/services/checkoutService.js` - Envío a Shopify
- **Shopify API**: [Documentación oficial](https://shopify.dev/docs)

---

## 🎓 Ejemplo Real

**Cliente:**

- Selecciona Ray-Ban Aviator RB3025
- Elige talla "54-20-145"
- Añade al carrito
- Completa checkout

**Personal en Shopify Admin ve:**

```
┌────────────────────────────────────────────────────┐
│ PEDIDO #1234                                       │
├────────────────────────────────────────────────────┤
│ Cliente: Juan Pérez                                │
│ Email: juan@example.com                            │
│                                                    │
│ ARTÍCULOS:                                         │
│                                                    │
│ ┌──────────────────────────────────────────────┐  │
│ │ Ray-Ban Aviator Clásico RB3025               │  │
│ │ SKU: RB3025-001                              │  │
│ │ Cantidad: 1                                   │  │
│ │                                              │  │
│ │ Propiedades:                                 │  │
│ │ • Talla: 54-20-145                          │  │
│ │                                              │  │
│ │ Precio: €169.00                             │  │
│ └──────────────────────────────────────────────┘  │
│                                                    │
│ Total: €169.00                                     │
└────────────────────────────────────────────────────┘
```

**¡La talla está claramente visible para preparar el pedido correctamente!** ✅
