# 💰 Guía Completa Shopify para Óptica del Val

## 📋 Índice

1. [Cómo Funciona el Flujo de Pedidos](#flujo-pedidos)
2. [Configuración de Pagos (Cobrar Dinero)](#configuracion-pagos)
3. [Gestión de Pedidos](#gestion-pedidos)
4. [Notificaciones y Alertas](#notificaciones)
5. [Guía Diaria para tu Cliente](#guia-cliente)
6. [Costes y Tarifas](#costes)

---

## 🛒 1. Cómo Funciona el Flujo de Pedidos {#flujo-pedidos}

### Paso a Paso del Cliente

```
1. Cliente navega en opticadelvaljoyeros.es
   ↓
2. Añade productos al carrito
   ↓
3. Click en "Finalizar compra"
   ↓
4. Redirige a Shopify Checkout (opticadelvaljoyeros.myshopify.com)
   ↓
5. Cliente introduce:
   - Email
   - Dirección de envío
   - Método de pago (tarjeta, PayPal, etc.)
   ↓
6. Shopify procesa el pago
   ↓
7. ✅ PEDIDO CONFIRMADO
   ↓
8. Notificaciones automáticas:
   - Email al cliente (confirmación)
   - Email a la tienda (nuevo pedido)
   - Notificación en Shopify Admin
   - Notificación en app móvil Shopify
```

### ¿Dónde Aparece el Pedido?

**Instantáneamente en 4 lugares:**

1. **Shopify Admin** (web): https://admin.shopify.com/store/opticadelvaljoyeros/orders
2. **App móvil Shopify**: Notificación push + ver pedido
3. **Email de la tienda**: pedido@opticadelvaljoyeros.es (configurable)
4. **Panel de estadísticas**: Resumen diario de ventas

---

## 💳 2. Configuración de Pagos (Cobrar Dinero) {#configuracion-pagos}

### A. Shopify Payments (RECOMENDADO) ⭐

**Ventajas:**

- ✅ Integración nativa (sin plugins)
- ✅ Comisiones más bajas: **1.9% + 0.25€** por transacción
- ✅ Sin tarifas mensuales adicionales
- ✅ Pago directo a tu cuenta bancaria
- ✅ Acepta: Visa, Mastercard, Amex, Apple Pay, Google Pay
- ✅ Anti-fraude incluido
- ✅ Transferencias cada 2-3 días laborables

**Cómo Activar:**

```
1. Ve a: Shopify Admin > Configuración > Pagos
2. Click en "Configurar Shopify Payments"
3. Completa el formulario:
   ✓ Nombre legal de la empresa
   ✓ NIF/CIF
   ✓ Dirección fiscal
   ✓ Cuenta bancaria (IBAN español)
   ✓ Datos del representante legal
4. Verificación de identidad (1-2 días)
5. ✅ ¡Activado! Empiezas a cobrar
```

**¿Cuándo Recibes el Dinero?**

- **Primer pago**: 7-10 días (verificación inicial)
- **Siguientes**: Cada 2-3 días laborables
- **Destino**: Directamente a tu cuenta bancaria

**Ejemplo de Comisiones:**

```
Venta de 100€:
- Comisión Shopify: 1.90€ + 0.25€ = 2.15€
- Recibes: 97.85€
```

### B. PayPal (Alternativa)

**Ventajas:**

- ✅ Clientes confían en PayPal
- ✅ Fácil de configurar
- ❌ Comisiones más altas: **3.4% + 0.35€**
- ❌ Dinero queda en cuenta PayPal (tienes que transferir manualmente)

**Cómo Activar:**

```
1. Shopify Admin > Configuración > Pagos
2. Activar "PayPal Express"
3. Vincular cuenta PayPal Business
4. ✅ Listo
```

### C. Redsys/TPV Español (Bancos)

Si tu banco ofrece TPV virtual (Redsys):

**Ventajas:**

- ✅ Integración con tu banco
- ❌ Comisiones variables (2-3%)
- ❌ Configuración más compleja
- ❌ Requiere plugin de pago

**Bancos compatibles:**

- BBVA, Santander, CaixaBank, Sabadell, etc.

### 📊 Comparativa de Comisiones

| Método           | Comisión Fija | Comisión % | Pago a Cuenta | Recomendado |
| ---------------- | ------------- | ---------- | ------------- | ----------- |
| Shopify Payments | 0.25€         | 1.9%       | 2-3 días      | ⭐⭐⭐⭐⭐  |
| PayPal           | 0.35€         | 3.4%       | Manual        | ⭐⭐⭐      |
| Redsys/TPV       | Variable      | 2-3%       | Variable      | ⭐⭐        |

**RECOMENDACIÓN:** Usa **Shopify Payments** + **PayPal** como alternativa.

---

## 📦 3. Gestión de Pedidos {#gestion-pedidos}

### A. Panel de Pedidos en Shopify Admin

**URL:** https://admin.shopify.com/store/opticadelvaljoyeros/orders

**Vista Principal:**

```
┌─────────────────────────────────────────────────────┐
│ 🔍 Buscar pedido por número, cliente, email         │
├─────────────────────────────────────────────────────┤
│ Filtros:                                             │
│ [ Todos ] [ Sin completar ] [ En proceso ] [ Env... │
├─────────────────────────────────────────────────────┤
│ PEDIDO #1001     Cliente: Juan Pérez                │
│ 30 Oct 2025      Total: 89.99€                      │
│ 📧 juan@email.com  Estado: Pagado                    │
│ [ Ver detalles ] [ Marcar como enviado ]            │
├─────────────────────────────────────────────────────┤
│ PEDIDO #1002     Cliente: María García              │
│ 30 Oct 2025      Total: 234.50€                     │
│ ...                                                  │
└─────────────────────────────────────────────────────┘
```

### B. Detalles de un Pedido

Cuando haces click en un pedido ves:

```
┌─────────────────────────────────────────────────────┐
│ PEDIDO #1001                                         │
│ 30 de octubre de 2025, 14:35                        │
├─────────────────────────────────────────────────────┤
│ PRODUCTOS:                                           │
│ • Reloj TOUS Bear Time (x1)        89.99€           │
│                                                      │
│ Subtotal:                           89.99€          │
│ Envío:                             GRATIS           │
│ TOTAL:                             89.99€           │
├─────────────────────────────────────────────────────┤
│ CLIENTE:                                             │
│ Juan Pérez                                           │
│ juan@email.com                                       │
│ +34 654 321 098                                      │
├─────────────────────────────────────────────────────┤
│ ENVÍO A:                                             │
│ Calle Mayor, 123                                     │
│ 28001 Madrid, España                                 │
├─────────────────────────────────────────────────────┤
│ PAGO:                                                │
│ ✅ Pagado con Visa ••••1234                         │
│                                                      │
│ [ 📦 Marcar como enviado ]                          │
│ [ 📧 Enviar email al cliente ]                      │
│ [ 🖨️ Imprimir albarán ]                             │
│ [ 📱 Ver en app móvil ]                              │
└─────────────────────────────────────────────────────┘
```

### C. Estados de Pedido

| Estado               | Significado                     | Acción Necesaria              |
| -------------------- | ------------------------------- | ----------------------------- |
| **🟡 Sin completar** | Cliente no terminó el pago      | Esperar o enviar recordatorio |
| **✅ Pagado**        | Pago confirmado, preparar envío | **Preparar paquete**          |
| **📦 En proceso**    | Marcado como en preparación     | Empaquetar producto           |
| **🚚 Enviado**       | Paquete enviado con seguimiento | Actualizar número tracking    |
| **✅ Entregado**     | Cliente recibió el pedido       | Pedido completado             |
| **❌ Cancelado**     | Pedido cancelado                | Reembolsar si fue pagado      |

### D. Flujo de Trabajo Diario Recomendado

**Cada Mañana (9:00 AM):**

```
1. Abrir Shopify Admin o App Móvil
2. Ir a Pedidos > Filtrar "Pagados" y "Sin enviar"
3. Para cada pedido:
   ✓ Verificar stock del producto
   ✓ Preparar paquete físico
   ✓ Marcar como "En proceso"
   ✓ Imprimir albarán/etiqueta
```

**Después de Enviar (Al finalizar el día):**

```
1. Para cada paquete enviado:
   ✓ Click en pedido
   ✓ "Marcar como enviado"
   ✓ Añadir número de seguimiento
   ✓ Seleccionar empresa de transporte
   ✓ 📧 Shopify envía email automático al cliente con tracking
```

**Cada Semana:**

```
✓ Revisar pedidos "Entregados" (confirmar satisfacción)
✓ Contactar pedidos "Sin completar" >3 días (recordatorio)
✓ Revisar estadísticas de ventas
```

---

## 🔔 4. Notificaciones y Alertas {#notificaciones}

### A. Emails Automáticos de Shopify

Shopify envía emails automáticamente en cada evento:

#### Para el Cliente:

1. **Confirmación de pedido** (inmediato)

   ```
   ✅ Pedido #1001 confirmado
   Gracias por tu compra de 89.99€
   [Ver pedido] [Seguimiento]
   ```

2. **Pedido enviado** (cuando tú lo marcas)

   ```
   📦 Tu pedido está en camino
   Número de seguimiento: SEUR123456789
   Fecha estimada: 2-3 días
   [Rastrear envío]
   ```

3. **Pedido entregado** (automático si usas seguimiento)
   ```
   ✅ Pedido entregado
   Esperamos que disfrutes tu compra
   [Dejar opinión]
   ```

#### Para la Tienda (tú):

1. **Nuevo pedido recibido** (inmediato)
   ```
   🛍️ Nuevo pedido #1001
   Cliente: Juan Pérez
   Total: 89.99€
   [Ver pedido en Shopify Admin]
   ```

### B. App Móvil Shopify

**Descarga:** App Store / Google Play → "Shopify"

**Funciones:**

```
📱 Notificaciones Push:
   • Nuevo pedido (sonido + vibración)
   • Pedido pagado
   • Mensaje de cliente
   • Stock bajo

📊 Panel en Tiempo Real:
   • Ventas del día
   • Pedidos pendientes
   • Productos más vendidos
   • Ingresos totales

⚡ Acciones Rápidas:
   • Marcar como enviado
   • Responder a clientes
   • Ver detalles de pedido
   • Actualizar stock
```

**Configuración Recomendada:**

```
Ajustes de la App > Notificaciones:
✅ Nuevos pedidos: SÍ (con sonido)
✅ Mensajes de clientes: SÍ
✅ Stock bajo: SÍ
❌ Actualizaciones de app: NO
❌ Tips de Shopify: NO
```

### C. Configurar Email de Notificaciones

**Para recibir emails en tu email de la tienda:**

```
1. Shopify Admin > Configuración > Notificaciones
2. Email del remitente: noreply@opticadelvaljoyeros.es
3. Email de notificaciones: pedidos@opticadelvaljoyeros.es
4. Activar:
   ✅ Nuevos pedidos
   ✅ Pedidos cancelados
   ✅ Consultas de clientes
   ✅ Stock bajo (< 5 unidades)
```

### D. Integración con WhatsApp (Opcional)

Puedes usar apps de Shopify para recibir notificaciones en WhatsApp:

**Apps Recomendadas:**

- **WhatsApp by Shopify** (oficial, gratis)
- **Pushdaddy** (notificaciones automáticas)

**Funciona así:**

```
Nuevo pedido → Shopify → WhatsApp:
"🛍️ Nuevo pedido #1001
Cliente: Juan Pérez
Total: 89.99€
[Ver detalles]"
```

---

## 👥 5. Guía Diaria para tu Cliente (Óptica del Val) {#guia-cliente}

### Manual Simplificado para el Personal

```
┌─────────────────────────────────────────────────────┐
│  INSTRUCCIONES DIARIAS - GESTIÓN DE PEDIDOS ONLINE  │
└─────────────────────────────────────────────────────┘

📱 OPCIÓN 1: Desde el Móvil (RECOMENDADO)

1. Abrir app "Shopify" en tu móvil
2. Ver notificación de nuevo pedido
3. Hacer click en el pedido
4. Anotar productos que hay que preparar
5. Cuando lo prepares: "Marcar como en proceso"
6. Cuando lo envíes: "Marcar como enviado" + número seguimiento
✅ LISTO - Cliente recibe email automático

───────────────────────────────────────────────────────

💻 OPCIÓN 2: Desde el Ordenador

1. Ir a: admin.shopify.com/store/opticadelvaljoyeros
2. Iniciar sesión
3. Click en "Pedidos" (menú izquierda)
4. Ver lista de pedidos nuevos (color amarillo)
5. Click en cada pedido para ver detalles
6. Seguir mismos pasos que en móvil

───────────────────────────────────────────────────────

🖨️ IMPRIMIR ALBARÉ/FACTURA

1. Dentro del pedido: Click "Más acciones"
2. Seleccionar "Imprimir albarán de entrega"
3. Incluir en el paquete

───────────────────────────────────────────────────────

❓ PREGUNTAS FRECUENTES

P: ¿Cuándo recibo el dinero?
R: Cada 2-3 días a tu cuenta bancaria automáticamente

P: ¿Cómo sé si hay un nuevo pedido?
R: Recibirás email + notificación en el móvil

P: ¿Qué hago si no tengo stock?
R: En el pedido: "Más acciones" > "Cancelar pedido"
   > Motivo: "Sin stock" > Reembolso automático

P: ¿Puedo cambiar el precio de un pedido?
R: Sí, antes de que el cliente pague. Después no.

P: ¿Cómo contacto con el cliente?
R: Dentro del pedido hay un botón "Contactar cliente"
   Te abre un chat/email directo

───────────────────────────────────────────────────────

🚨 IMPORTANTE

✅ Revisar pedidos CADA MAÑANA
✅ Enviar pedidos el MISMO DÍA si es posible
✅ Actualizar SIEMPRE el número de seguimiento
❌ NO ignorar pedidos sin completar >2 días
❌ NO cancelar pedidos sin contactar al cliente primero
```

---

## 💰 6. Costes y Tarifas {#costes}

### A. Plan de Shopify

**Plan Recomendado: Shopify Basic**

```
📦 Shopify Basic Plan
├─ 29€/mes (o 25€/mes si pagas anual)
├─ Productos ilimitados
├─ 2 cuentas de staff
├─ Informes básicos
├─ Shopify Payments incluido
├─ SSL gratuito
├─ App móvil incluida
└─ Soporte 24/7
```

**Alternativas:**

| Plan         | Precio/Mes | Comisión Tarjeta | Recomendado Para              |
| ------------ | ---------- | ---------------- | ----------------------------- |
| **Starter**  | 5€         | 5%               | Solo redes sociales (sin web) |
| **Basic**    | 29€        | 1.9% + 0.25€     | ⭐ Tiendas pequeñas (IDEAL)   |
| **Shopify**  | 79€        | 1.8% + 0.25€     | Tiendas medianas              |
| **Advanced** | 289€       | 1.6% + 0.25€     | Tiendas grandes               |

### B. Costes Totales Estimados

**Escenario: 50 ventas/mes, ticket medio 100€**

```
INGRESOS:
50 pedidos x 100€ = 5,000€

GASTOS:
├─ Shopify Basic:           29€
├─ Comisiones pago:
│  (1.9% + 0.25€) x 50 =   107.50€
├─ Dominio .es:              1€/mes (12€/año)
├─ Email profesional:        0€ (Gmail gratis o Zoho)
└─ TOTAL GASTOS:           137.50€

═══════════════════════════════
BENEFICIO NETO:            4,862.50€
MARGEN:                    97.25%
═══════════════════════════════
```

**Comparado con comisión marketplace:**

- Amazon/eBay: 15-20% comisión = 750-1,000€ en comisiones
- Shopify: 2.75% comisión = 137.50€
- **AHORRO: 612.50€/mes** 💰

### C. Sin Costes Ocultos

✅ **Incluido en el plan (sin coste extra):**

- Productos ilimitados
- Ancho de banda ilimitado
- SSL/HTTPS gratuito
- Recuperación de carritos abandonados
- Códigos de descuento
- Blog integrado
- SEO tools
- Soporte 24/7 en español

❌ **Costes adicionales opcionales:**

- Apps premium del marketplace (20-50€/mes)
- Temas premium (150-300€ una vez)
- Desarrollo personalizado

---

## 🎯 Resumen Ejecutivo

### Para Empezar HOY:

1. ✅ **Activar Shopify Payments** (30 min)

   - Ingresos directos a tu cuenta en 2-3 días
   - Comisiones: solo 1.9% + 0.25€

2. ✅ **Descargar App Móvil** (5 min)

   - Notificaciones instantáneas
   - Gestión desde cualquier lugar

3. ✅ **Configurar Emails** (10 min)

   - pedidos@opticadelvaljoyeros.es
   - Notificaciones automáticas

4. ✅ **Importar Productos** (1 hora)
   - Subir CSV con tus 193 productos
   - Activar VITE_USE_SHOPIFY=true

### Flujo Completo:

```
Cliente compra → Shopify procesa pago → Notificación instantánea
   → Preparas pedido → Marcas como enviado → Cliente recibe tracking
   → Dinero en tu cuenta (2-3 días) → ✅ COMPLETADO
```

### Ventajas vs Gestión Manual:

| Antes (Manual)    | Ahora (Shopify)          |
| ----------------- | ------------------------ |
| Llamadas/WhatsApp | Pedidos automáticos 24/7 |
| Cobro presencial  | Pago online seguro       |
| Sin seguimiento   | Tracking automático      |
| Inventario Excel  | Stock en tiempo real     |
| Sin histórico     | Base de datos completa   |
| Email manual      | Emails automáticos       |

---

## 📞 Soporte

**Shopify España:**

- ☎️ Teléfono: 900 828 803
- 💬 Chat 24/7: admin.shopify.com
- 📧 Email: soporte@shopify.com
- 🎓 Tutoriales: shopify.com/es/blog

**Tu Desarrollador (para dudas técnicas):**

- 📧 [Tu email]
- 💻 Personalización de la web
- 🔧 Integraciones avanzadas

---

**Última actualización:** 30 de Octubre, 2025  
**Versión:** 1.0 - Guía Completa Shopify
