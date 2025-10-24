/**
 * Servicio de email para confirmaciones de pedidos
 * Usa EmailJS (gratis hasta 200 emails/mes) o puedes cambiarlo por SendGrid, Resend, etc.
 */

// Configuración de EmailJS (alternativa gratuita)
const EMAILJS_SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_xxxxxxx";
const EMAILJS_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_xxxxxxx";
const EMAILJS_PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "your_public_key";

/**
 * Enviar email de confirmación de pedido usando EmailJS
 */
export async function sendOrderConfirmation(orderData) {
  try {
    const {
      orderId,
      customerEmail,
      customerName,
      items,
      subtotal,
      shippingCost,
      discountAmount,
      total,
      shippingAddress,
      paymentMethod,
      orderDate,
    } = orderData;

    // Verificar que EmailJS esté cargado
    if (!window.emailjs) {
      throw new Error(
        "EmailJS no está cargado. Verifica que el script esté en index.html"
      );
    }

    // Preparar items para la plantilla de EmailJS
    const itemsForEmail = items.map((item) => ({
      titulo: item.titulo || item.nombre,
      imagen: item.imagen || "https://placehold.co/80x80",
      quantity: item.quantity || item.cantidad || 1,
      total: (
        (item.precio || 0) * (item.quantity || item.cantidad || 1)
      ).toFixed(2),
    }));

    // Formatear fecha
    const formattedDate = new Date(orderDate).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // Preparar método de pago
    const paymentMethodText =
      paymentMethod === "card"
        ? "💳 Tarjeta de crédito/débito"
        : "💰 Transferencia bancaria";

    // Datos para EmailJS (deben coincidir con las variables de la plantilla)
    const templateParams = {
      orderId: orderId,
      customerName: customerName,
      customerEmail: customerEmail,
      orderDate: formattedDate,
      items: itemsForEmail,
      subtotal: subtotal.toFixed(2),
      shippingCost: shippingCost > 0 ? shippingCost.toFixed(2) : "GRATIS",
      total: total.toFixed(2),
      shippingName: shippingAddress.name,
      shippingAddress: shippingAddress.address,
      shippingCity: shippingAddress.city,
      shippingPostalCode: shippingAddress.postalCode,
      shippingPhone: shippingAddress.phone,
      paymentMethod: paymentMethodText,
    };

    console.log("📧 Enviando email con EmailJS...", {
      serviceId: EMAILJS_SERVICE_ID,
      templateId: EMAILJS_TEMPLATE_ID,
      to: customerEmail,
    });

    // Enviar email con EmailJS
    const response = await window.emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log("✅ Email enviado correctamente:", response);
    return { success: true, response };
  } catch (error) {
    console.error("Error enviando email de confirmación:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Enviar email de actualización de envío
 */
export async function sendShippingUpdate(orderData) {
  const { orderId, customerEmail, customerName, trackingNumber, courier } =
    orderData;

  const emailTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Tu pedido ha sido enviado</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif, Arial;">
      <div style="font-size: 14px; color: #333; padding: 14px 8px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: auto; background-color: #fff; border: 1px solid #e0e0e0;">
          
          <!-- Header -->
          <div style="border-top: 4px solid #000; padding: 20px 16px; border-bottom: 1px solid #e0e0e0;">
            <span style="font-size: 20px; font-weight: 300; letter-spacing: 3px; text-transform: uppercase; color: #000;">
              <strong>JOYERÍA DEL VAL</strong>
            </span>
          </div>

          <!-- Mensaje principal -->
          <div style="padding: 32px 16px 24px;">
            <div style="font-size: 18px; font-weight: 400; color: #000; margin-bottom: 12px;">
              Tu pedido está en camino, ${customerName}
            </div>
            <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6;">
              Tu pedido #${orderId} ha sido enviado y llegará pronto.
            </p>
          </div>

          <!-- Información de seguimiento -->
          <div style="padding: 0 16px 32px;">
            <div style="background-color: #f9f9f9; border-left: 3px solid #000; padding: 20px;">
              <div style="margin-bottom: 12px;">
                <div style="color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 6px;">
                  NÚMERO DE SEGUIMIENTO
                </div>
                <div style="font-size: 16px; font-weight: 500; color: #000; font-family: monospace;">
                  ${trackingNumber}
                </div>
              </div>
              <div>
                <div style="color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 6px;">
                  TRANSPORTISTA
                </div>
                <div style="font-size: 14px; color: #000;">
                  ${courier}
                </div>
              </div>
            </div>
          </div>

          <!-- Botón de seguimiento -->
          <div style="padding: 0 16px 32px; text-align: center;">
            <a href="#" style="display: inline-block; padding: 14px 32px; background-color: #000; color: #fff; text-decoration: none; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; font-weight: 500;">
              RASTREAR PEDIDO
            </a>
          </div>

          <!-- Footer -->
          <div style="padding: 32px 16px; text-align: center; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0 0 8px 0; color: #666; font-size: 13px;">
              ¿Necesitas ayuda? Contáctanos
            </p>
            <p style="margin: 0 0 20px 0;">
              <a href="mailto:info@joyeriadelval.com" style="color: #000; text-decoration: none; font-weight: 500;">
                info@joyeriadelval.com
              </a>
            </p>
            <p style="margin: 0; color: #999; font-size: 11px; letter-spacing: 0.5px;">
              © ${new Date().getFullYear()} JOYERÍA DEL VAL
            </p>
          </div>

        </div>

        <!-- Nota de privacidad -->
        <div style="max-width: 600px; margin: auto; padding: 20px 0;">
          <p style="color: #999; font-size: 12px; text-align: center; line-height: 1.6; margin: 0;">
            El email fue enviado a <strong style="color: #666;">${customerEmail}</strong><br>
            Recibiste este email porque realizaste un pedido en nuestra tienda
          </p>
        </div>

      </div>
    </body>
    </html>
  `;

  try {
    // Enviar email similar a confirmación
    await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: customerEmail,
        subject: `Tu pedido #${orderId} ha sido enviado`,
        html: emailTemplate,
      }),
    });

    return { success: true };
  } catch (error) {
    console.error("Error enviando email de envío:", error);
    return { success: false, error: error.message };
  }
}
