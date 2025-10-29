# 🛍️ Guía Completa: Implementación de Shopify en Óptica del Val Joyeros

## 📋 Índice

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [¿Qué Plan de Shopify Contratar?](#qué-plan-de-shopify-contratar)
3. [Proceso de Contratación Paso a Paso](#proceso-de-contratación-paso-a-paso)
4. [Configuración Inicial de Shopify](#configuración-inicial-de-shopify)
5. [Obtención de Credenciales API](#obtención-de-credenciales-api)
6. [Integración con el Proyecto](#integración-con-el-proyecto)
7. [Migración de Productos](#migración-de-productos)
8. [Testing y Pruebas](#testing-y-pruebas)
9. [Puesta en Producción](#puesta-en-producción)
10. [Mantenimiento y Gestión](#mantenimiento-y-gestión)

---

## 🎯 Resumen Ejecutivo

Tu proyecto **ya está preparado** para integrarse con Shopify. La arquitectura actual incluye:

✅ **Servicios preparados:**

- `shopify.js` - Cliente completo de Shopify Storefront API
- `checkoutService.js` - Sistema dual (Shopify/Local)
- `AuthContext.jsx` - Autenticación con Shopify Customer API

✅ **Funcionalidades listas:**

- Catálogo de productos
- Gestión de carrito
- Checkout integrado
- Autenticación de clientes
- Sincronización de stock

**Tiempo estimado de implementación:** 2-3 días
**Coste mensual estimado:** 27-79€ según plan elegido

---

## 💰 ¿Qué Plan de Shopify Contratar?

### Comparativa de Planes (2025)

| Característica              | Basic        | Shopify      | Advanced     |
| --------------------------- | ------------ | ------------ | ------------ |
| **Precio/mes**              | 27€          | 49€          | 299€         |
| **Productos ilimitados**    | ✅           | ✅           | ✅           |
| **Ventas online**           | ✅           | ✅           | ✅           |
| **Comisión tarjeta**        | 2.3% + 0.30€ | 2.1% + 0.30€ | 1.9% + 0.30€ |
| **Cuentas staff**           | 2            | 5            | 15           |
| **Informes**                | Básicos      | Completos    | Avanzados    |
| **APIs**                    | ✅           | ✅           | ✅           |
| **Calculadora envíos**      | ❌           | ✅           | ✅           |
| **Códigos descuento**       | Limitados    | Completos    | Completos    |
| **Informes personalizados** | ❌           | ❌           | ✅           |

### 🎖️ **Recomendación: Plan Basic (27€/mes)**

**¿Por qué Basic es suficiente para empezar?**

1. ✅ **Acceso completo a APIs** (Storefront + Admin)
2. ✅ Productos y variantes ilimitados
3. ✅ Checkout profesional con Shopify Payments
4. ✅ Gestión de inventario en tiempo real
5. ✅ SSL incluido para transacciones seguras
6. ✅ Soporte 24/7

**Cuándo escalar a Shopify:**

- Cuando tengas más de 2 empleados gestionando pedidos
- Si necesitas informes detallados de ventas
- Cuando quieras tarjetas regalo automáticas

**Cuándo escalar a Advanced:**

- Más de 10 empleados
- Ventas internacionales complejas
- Reporting avanzado con APIs de métricas

---

## 📝 Proceso de Contratación Paso a Paso

### Paso 1: Crear Cuenta Shopify

1. Ve a [shopify.es](https://www.shopify.es)
2. Click en **"Prueba gratuita durante 3 días"**
3. Introduce el email: `info@opticadelvaljoyeros.es`
4. Completa el formulario:
   ```
   Nombre de la tienda: optica-del-val-joyeros
   URL: optica-del-val-joyeros.myshopify.com
   ```
5. Responde el cuestionario (opcional, puedes saltarlo)

### Paso 2: Completar Información de la Tienda

Durante el onboarding:

1. **Información de contacto:**

   ```
   Nombre comercial: Óptica del Val Joyeros
   Email: info@opticadelvaljoyeros.es
   Teléfono: [Tu teléfono]
   ```

2. **Dirección de la tienda:**

   ```
   País: España
   Dirección: [Tu dirección física]
   Ciudad: [Tu ciudad]
   Código Postal: [Tu código postal]
   Provincia: [Tu provincia]
   ```

3. **Información fiscal:**
   ```
   NIF/CIF: [Tu NIF/CIF]
   Nombre fiscal: [Razón social]
   ```

### Paso 3: Configurar Métodos de Pago

1. Ve a **Configuración > Pagos**
2. Activa **Shopify Payments** (recomendado):

   - Sin comisiones adicionales
   - Menores tasas de transacción
   - Checkout más rápido

3. **Documentación necesaria:**

   - DNI/NIE del titular
   - Documento de titularidad de cuenta bancaria
   - Licencia de negocio (si aplica)

4. **Métodos de pago adicionales:**
   - ✅ Tarjetas de crédito/débito (Visa, Mastercard)
   - ✅ PayPal (opcional)
   - ✅ Apple Pay / Google Pay (incluido gratis)
   - ✅ Bizum (si usas gateway español)

### Paso 4: Configurar Envíos

1. Ve a **Configuración > Envíos y entrega**

2. **Zona de envío: España Peninsular**

   ```
   Envío estándar: 4.95€ (3-5 días)
   Envío gratuito: Pedidos >50€
   ```

3. **Zona de envío: Baleares/Canarias**

   ```
   Envío estándar: 9.95€ (5-7 días)
   Envío gratuito: Pedidos >100€
   ```

4. **Zona de envío: Internacional**
   ```
   Consultar (o desactivar inicialmente)
   ```

### Paso 5: Configurar Políticas Legales

1. Ve a **Configuración > Políticas**
2. Shopify genera plantillas automáticamente
3. **Personaliza estos documentos:**
   - ✅ Política de devoluciones (30 días)
   - ✅ Política de privacidad (RGPD)
   - ✅ Términos de servicio
   - ✅ Política de envíos

**⚠️ IMPORTANTE:** Revisa estas políticas con un abogado para cumplir normativa española.

---

## 🔑 Obtención de Credenciales API

### Paso 1: Crear App Privada

1. En el panel de Shopify, ve a **Configuración > Aplicaciones y canales de venta**
2. Click en **"Desarrollar aplicaciones"**
3. Click en **"Crear una aplicación"**
4. Nombre: `Optica Del Val - Web Frontend`

### Paso 2: Configurar Storefront API

1. Dentro de la aplicación, ve a **"Configuración"**
2. Click en **"Configurar Storefront API"**
3. **Activa estos permisos:**
   ```
   ✅ unauthenticated_read_product_listings
   ✅ unauthenticated_read_product_inventory
   ✅ unauthenticated_read_product_tags
   ✅ unauthenticated_write_checkouts
   ✅ unauthenticated_read_checkouts
   ✅ unauthenticated_write_customers
   ✅ unauthenticated_read_customers
   ✅ unauthenticated_read_customer_tags
   ```
4. Guarda los cambios

### Paso 3: Obtener Storefront Access Token

1. Ve a la pestaña **"Tokens de acceso de API"**
2. Click en **"Instalar aplicación"**
3. Copia el **Storefront Access Token** (empieza con `shpat_...`)
4. ⚠️ **GUÁRDALO EN LUGAR SEGURO** - Solo se muestra una vez

### Paso 4: Configurar Admin API (Opcional)

1. Ve a **"Configuración" > "API de Admin"**
2. **Activa estos permisos:**
   ```
   ✅ read_products
   ✅ write_products
   ✅ read_inventory
   ✅ write_inventory
   ✅ read_orders
   ✅ write_orders
   ✅ read_customers
   ✅ write_customers
   ```
3. Click en **"Instalar aplicación"**
4. Copia el **Admin API Access Token**

### Paso 5: Obtener Credenciales Finales

Al terminar deberías tener:

```
Domain: optica-del-val-joyeros.myshopify.com
Storefront Token: shpat_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
Admin Token: shpua_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

---

## 🔌 Integración con el Proyecto

### Paso 1: Configurar Variables de Entorno

Edita el archivo `.env` en la raíz del proyecto:

```env
# ========================================
# SHOPIFY CONFIGURATION
# ========================================

# Activar modo Shopify (cambiar a 'true' para usar Shopify)
VITE_USE_SHOPIFY=true

# Dominio de tu tienda Shopify
VITE_SHOPIFY_DOMAIN=optica-del-val-joyeros.myshopify.com

# Storefront Access Token (para el frontend)
VITE_SHOPIFY_STOREFRONT_TOKEN=shpat_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Admin API Token (para gestión backend)
VITE_SHOPIFY_ADMIN_TOKEN=shpua_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# ========================================
# EMAILJS (mantener configuración actual)
# ========================================
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_PUBLIC_KEY=tu_public_key

# ========================================
# ENVIRONMENT
# ========================================
VITE_APP_ENV=production
VITE_API_FALLBACK_ENABLED=false
```

### Paso 2: Verificar Integración

El proyecto ya tiene toda la lógica implementada en:

1. **`src/services/shopify.js`**

   - Cliente GraphQL configurado
   - Métodos para productos, carrito, checkout
   - Transformación de datos Shopify → App

2. **`src/services/checkoutService.js`**

   - Sistema dual Shopify/Local
   - Se activa automáticamente con `VITE_USE_SHOPIFY=true`
   - Gestión completa del flujo de compra

3. **`src/context/AuthContext.jsx`**
   - Login/Registro con Shopify Customer API
   - Gestión de sesiones de cliente
   - Persistencia de datos de usuario

### Paso 3: Adaptar API de Productos (Opcional)

Si quieres cargar productos desde Shopify en lugar del JSON local:

Edita `src/api/productos.js`:

```javascript
import { shopifyService } from "../services/shopify";

const useShopify = import.meta.env.VITE_USE_SHOPIFY === "true";

export const fetchProductos = async (filtros = {}) => {
  if (useShopify) {
    // Cargar desde Shopify
    const response = await shopifyService.getProducts({
      first: 50,
      category: filtros.categoria,
      minPrice: filtros.precioMin,
      maxPrice: filtros.precioMax,
    });

    return response.data.products.edges.map((edge) =>
      shopifyService.transformProductData(edge)
    );
  }

  // Cargar desde JSON local (modo actual)
  const response = await fetch("/data/productos.json");
  return response.json();
};
```

---

## 📦 Migración de Productos

### Opción A: Import Masivo (Recomendado)

Tu archivo `PLANTILLA-PRODUCTOS.csv` ya está listo. Shopify acepta CSV directamente:

1. Ve a **Productos > Importar**
2. Sube `PLANTILLA-PRODUCTOS.csv`
3. Mapea las columnas:

   ```
   Handle → slug
   Title → titulo
   Body (HTML) → descripcion
   Vendor → marca
   Type → categoria
   Tags → etiquetas (separadas por coma)
   Price → precio
   Compare At Price → precioAnterior
   Inventory Tracker → shopify
   Inventory Qty → stock
   Image Src → imagenes (primera imagen)
   Image Alt Text → titulo
   ```

4. Click en **"Importar productos"**

### Opción B: Migración con Script

Crea un script de migración `scripts/migrate-to-shopify.js`:

```javascript
import fs from "fs";
import { shopifyService } from "../src/services/shopify.js";

const productos = JSON.parse(
  fs.readFileSync("./public/data/productos.json", "utf-8")
);

async function migrateProducts() {
  console.log(`Migrando ${productos.length} productos a Shopify...`);

  for (const producto of productos) {
    try {
      await shopifyService.createProduct({
        title: producto.titulo,
        handle: producto.slug,
        description: producto.descripcion,
        productType: producto.categorias[0],
        tags: producto.etiquetas,
        variants: [
          {
            price: producto.precio.toString(),
            compareAtPrice: producto.precioAnterior?.toString(),
            inventoryQuantity: producto.stock || 99,
            sku: producto.id,
          },
        ],
        images: producto.imagenes.map((url) => ({ src: url })),
      });

      console.log(`✅ Migrado: ${producto.titulo}`);
    } catch (error) {
      console.error(`❌ Error en ${producto.titulo}:`, error);
    }
  }

  console.log("✅ Migración completada");
}

migrateProducts();
```

Ejecutar:

```powershell
node scripts/migrate-to-shopify.js
```

### Opción C: Sincronización Continua

Para mantener ambos sistemas sincronizados temporalmente:

```javascript
// En productos-utils.js
export async function syncWithShopify(producto) {
  if (import.meta.env.VITE_USE_SHOPIFY === "true") {
    await shopifyService.updateProduct(producto.id, {
      inventoryQuantity: producto.stock,
    });
  }
}
```

---

## 🧪 Testing y Pruebas

### Fase 1: Pruebas en Modo Desarrollo

1. **Activar modo test:**

   ```env
   VITE_USE_SHOPIFY=true
   VITE_APP_ENV=development
   ```

2. **Habilitar pedidos de prueba en Shopify:**

   - Ve a **Configuración > Pagos**
   - Activa **"Modo de prueba de Shopify Payments"**

3. **Tarjetas de prueba:**
   ```
   Visa exitosa: 1
   Visa rechazada: 2
   Mastercard: 5555555555554444
   CVV: 123
   Fecha: Cualquier fecha futura
   ```

### Fase 2: Lista de Verificación

- [ ] **Productos:**

  - [ ] Se cargan correctamente desde Shopify
  - [ ] Imágenes se muestran bien
  - [ ] Precios y descuentos correctos
  - [ ] Stock actualizado en tiempo real

- [ ] **Carrito:**

  - [ ] Añadir productos funciona
  - [ ] Cantidades respetan el stock
  - [ ] Totales calculados correctamente
  - [ ] Descuentos aplicables

- [ ] **Checkout:**

  - [ ] Redirige correctamente a Shopify
  - [ ] Datos de envío se guardan
  - [ ] Métodos de pago disponibles
  - [ ] Email de confirmación enviado

- [ ] **Autenticación:**
  - [ ] Registro de clientes funciona
  - [ ] Login persiste sesión
  - [ ] Recuperación de contraseña funciona

### Fase 3: Prueba de Compra Real

1. Realiza una compra de prueba con tarjeta real (mínimo 0.50€)
2. Verifica el pedido en **Pedidos** de Shopify
3. Comprueba que llega el email de confirmación
4. Verifica actualización de stock
5. Prueba el flujo de reembolso desde Shopify

---

## 🚀 Puesta en Producción

### Paso 1: Preparar Build de Producción

```powershell
# Asegúrate de tener las variables de entorno correctas
# .env debe tener VITE_USE_SHOPIFY=true

# Crear build optimizado
npm run build

# Verificar build (opcional)
npm run preview
```

### Paso 2: Configurar Dominio en Shopify

1. Ve a **Configuración > Dominios**
2. Click en **"Conectar dominio existente"**
3. Introduce: `opticadelvaljoyeros.es`
4. Shopify te dará instrucciones DNS

**IMPORTANTE:** Tu web actual seguirá funcionando. Solo necesitas:

- Mantener el dominio apuntando a tu hosting actual
- Shopify manejará el checkout en `checkout.opticadelvaljoyeros.es`

### Paso 3: Deploy Frontend

**Opción A: Firebase (tu configuración actual)**

```powershell
npm run build
firebase deploy
```

**Opción B: Netlify**

```powershell
npm run build
netlify deploy --prod --dir=dist
```

**Opción C: Vercel**

```powershell
npm run build
vercel --prod
```

### Paso 4: Desactivar Modo Prueba

1. En Shopify: **Configuración > Pagos**
2. Desactiva **"Modo de prueba"**
3. Activa **"Cobrar pagos reales"**

### Paso 5: Configurar Notificaciones

1. Ve a **Configuración > Notificaciones**
2. Personaliza emails:
   - ✅ Confirmación de pedido
   - ✅ Pedido enviado
   - ✅ Pedido entregado
   - ✅ Reembolso procesado
3. Añade tu logo y colores de marca

---

## 🔧 Mantenimiento y Gestión

### Gestión Diaria de Pedidos

1. **Ver nuevos pedidos:**

   - Panel Shopify > **Pedidos**
   - Filtra por "No cumplidos"

2. **Procesar pedido:**

   - Click en pedido
   - Verifica stock físico
   - Click **"Marcar como cumplido"**
   - Añade número de seguimiento
   - Shopify envía email automáticamente

3. **Gestión de devoluciones:**
   - Pedido > **"Reembolsar"**
   - Selecciona productos
   - Elige si reestockear
   - Confirmar reembolso

### Actualización de Stock

**Método 1: Manual**

```
Productos > [Producto] > Variantes > Cantidad disponible
```

**Método 2: Desde tu sistema actual**

```javascript
// En productos-utils.js
import { shopifyService } from "../services/shopify";

export async function updateStock(productoId, newStock) {
  // Actualizar JSON local
  updateLocalStock(productoId, newStock);

  // Sincronizar con Shopify
  if (import.meta.env.VITE_USE_SHOPIFY === "true") {
    await shopifyService.updateInventory(productoId, newStock);
  }
}
```

**Método 3: Import masivo**

```
Productos > Exportar > Editar CSV > Importar
```

### Monitoreo y Analytics

1. **Dashboard principal:**

   - Ventas del día
   - Productos más vendidos
   - Valor medio del pedido
   - Tasa de conversión

2. **Informes detallados:**

   - Análisis > **Informes**
   - Ventas por producto
   - Ventas por canal
   - Abandono de carrito

3. **Integración con Google Analytics:**
   - Configuración > **Análisis**
   - Conecta tu cuenta GA4
   - Habilita tracking mejorado de e-commerce

### Optimización SEO

Shopify gestiona automáticamente:

- ✅ URLs amigables
- ✅ Meta tags optimizados
- ✅ Schema markup (JSON-LD)
- ✅ Sitemap.xml
- ✅ Robots.txt

**Para personalizar:**

```
Productos > [Producto] > Vista previa de motor de búsqueda
```

### Seguridad y Backups

**Shopify gestiona automáticamente:**

- ✅ Certificado SSL
- ✅ Protección DDoS
- ✅ Backups diarios
- ✅ Cumplimiento PCI-DSS
- ✅ Protección contra fraude

**Tu responsabilidad:**

- Exporta productos mensualmente (CSV backup)
- Guarda credenciales en lugar seguro
- Revisa logs de acceso

---

## 📊 Costes Detallados

### Costes Mensuales Estimados

| Concepto                   | Coste Mensual           |
| -------------------------- | ----------------------- |
| **Shopify Basic**          | 27€                     |
| **Comisiones transacción** | ~30-50€ (1000€ ventas)  |
| **EmailJS**                | Gratis hasta 200 emails |
| **Firebase Hosting**       | Gratis (plan Spark)     |
| **Total mensual**          | **~57-77€**             |

### Comisiones por Transacción

Con **Shopify Payments** (recomendado):

- 2.3% + 0.30€ por transacción

Con **gateway externo** (Redsys, PayPal):

- 2.3% + 0.30€ (Shopify)
- +0.5-2% (gateway externo)

**Ejemplo:**

- Venta de 100€
- Comisión: 2.60€
- Recibes: 97.40€

---

## 🆘 Troubleshooting

### Error: "Access token is invalid"

**Solución:**

```powershell
# Verificar que el token está bien copiado
echo $env:VITE_SHOPIFY_STOREFRONT_TOKEN

# Regenerar token si es necesario
# Shopify Admin > Apps > [Tu app] > API credentials > Regenerate token
```

### Error: "GraphQL error: Field 'customer' doesn't exist"

**Causa:** Permisos insuficientes

**Solución:**

1. Ve a tu app en Shopify
2. Configuración > Storefront API
3. Asegura que `unauthenticated_read_customers` está activado
4. Reinstala la aplicación

### Productos no se cargan

**Checklist:**

```javascript
// 1. Verificar modo Shopify activo
console.log(import.meta.env.VITE_USE_SHOPIFY); // debe ser 'true'

// 2. Test de conexión
const testConnection = async () => {
  try {
    const result = await shopifyService.getProducts({ first: 1 });
    console.log("✅ Conexión exitosa", result);
  } catch (error) {
    console.error("❌ Error de conexión", error);
  }
};
```

### Checkout no redirige

**Posibles causas:**

- URL de checkout bloqueada por CORS
- Token sin permisos de `write_checkouts`
- Carrito vacío o inválido

**Solución:**

```javascript
// Verificar en consola del navegador
console.log(checkoutData.url); // Debe ser una URL válida de Shopify
```

---

## 📞 Soporte

### Recursos Oficiales

- **Documentación Shopify:** [shopify.dev](https://shopify.dev)
- **Storefront API:** [shopify.dev/docs/api/storefront](https://shopify.dev/docs/api/storefront)
- **Soporte Shopify:** 24/7 vía chat/teléfono
- **Comunidad:** [community.shopify.com](https://community.shopify.com)

### Desarrollo Adicional

Si necesitas personalizar algo no cubierto en esta guía:

1. **Webhooks** para sincronización automática
2. **Shopify Flow** para automatizaciones
3. **Shopify Scripts** para descuentos complejos
4. **APIs avanzadas** para integraciones personalizadas

---

## ✅ Checklist Final de Implementación

### Pre-lanzamiento

- [ ] Cuenta Shopify creada (plan Basic contratado)
- [ ] Información fiscal completada
- [ ] Métodos de pago configurados (Shopify Payments)
- [ ] Zonas de envío configuradas
- [ ] Políticas legales revisadas y publicadas
- [ ] App privada creada
- [ ] Storefront Access Token obtenido
- [ ] Admin API Token obtenido (opcional)
- [ ] Variables de entorno configuradas
- [ ] `.env` con `VITE_USE_SHOPIFY=true`

### Migración de Datos

- [ ] Productos exportados a CSV
- [ ] CSV importado a Shopify
- [ ] Imágenes verificadas
- [ ] Precios y stock verificados
- [ ] Categorías y etiquetas correctas

### Testing

- [ ] Modo de prueba activado
- [ ] Compra de prueba exitosa (tarjeta test)
- [ ] Email de confirmación recibido
- [ ] Stock actualizado correctamente
- [ ] Checkout fluido y funcional
- [ ] Login/Registro funcionando
- [ ] Responsive en móvil verificado

### Producción

- [ ] Build de producción creado
- [ ] Deploy en hosting (Firebase/Netlify/Vercel)
- [ ] Modo de prueba desactivado
- [ ] Compra real de verificación (mínimo 0.50€)
- [ ] Dominio configurado (si aplica)
- [ ] SSL activo y funcional
- [ ] Analytics conectado
- [ ] Notificaciones personalizadas

### Post-lanzamiento

- [ ] Monitoreo de primeras 24 horas
- [ ] Backup de productos realizado
- [ ] Procedimientos de pedidos documentados
- [ ] Staff capacitado en uso de Shopify
- [ ] Plan de contingencia definido

---

## 🎓 Próximos Pasos

Una vez Shopify esté funcionando:

1. **Semana 1-2:** Monitorear pedidos y ajustar
2. **Mes 1:** Analizar métricas y optimizar
3. **Mes 2:** Considerar funciones avanzadas:

   - Programas de fidelización
   - Descuentos automáticos
   - Remarketing
   - Integración con redes sociales

4. **Mes 3+:** Evaluar escalado de plan si:
   - Superas 500 pedidos/mes
   - Necesitas más usuarios administradores
   - Requieres reporting avanzado

---

## 📝 Notas Finales

- **Esta guía está actualizada para Shopify 2025**
- Tu proyecto ya tiene el 90% de la integración lista
- Solo necesitas configurar Shopify y las credenciales
- El tiempo real de implementación es de 2-3 días
- Shopify ofrece 3 días de prueba gratuita

**¿Dudas?** Consulta la documentación técnica en:

- `src/services/shopify.js` - Implementación completa
- `src/services/checkoutService.js` - Flujo de compra
- `src/context/AuthContext.jsx` - Sistema de usuarios

---

**Última actualización:** Octubre 2025
**Versión del proyecto:** Compatible con arquitectura actual
**Autor:** Óptica del Val Joyeros - Equipo Técnico
