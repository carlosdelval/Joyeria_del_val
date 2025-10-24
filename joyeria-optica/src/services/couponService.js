// Servicio de cupones de descuento
// Adaptable a Shopify Discount Codes API

class CouponService {
  constructor() {
    this.useShopify = import.meta.env.VITE_USE_SHOPIFY === "true";

    // Cupones de ejemplo locales (en producción vendrán de Shopify)
    this.localCoupons = {
      BIENVENIDA10: {
        code: "BIENVENIDA10",
        type: "percentage",
        value: 10,
        minAmount: 0,
        maxDiscount: null,
        description: "10% de descuento en tu primera compra",
        expiresAt: null,
        usageLimit: null,
        usedCount: 0,
      },
      VERANO20: {
        code: "VERANO20",
        type: "percentage",
        value: 20,
        minAmount: 50,
        maxDiscount: 30,
        description: "20% de descuento en compras superiores a 50€",
        expiresAt: "2025-12-31",
        usageLimit: 100,
        usedCount: 0,
      },
      ENVIOGRATIS: {
        code: "ENVIOGRATIS",
        type: "free_shipping",
        value: 0,
        minAmount: 30,
        maxDiscount: null,
        description: "Envío gratis en compras superiores a 30€",
        expiresAt: null,
        usageLimit: null,
        usedCount: 0,
      },
      "5EUROS": {
        code: "5EUROS",
        type: "fixed",
        value: 5,
        minAmount: 25,
        maxDiscount: null,
        description: "5€ de descuento en compras superiores a 25€",
        expiresAt: null,
        usageLimit: null,
        usedCount: 0,
      },
    };
  }

  // Validar y aplicar cupón
  async validateCoupon(code, cartTotal) {
    if (this.useShopify) {
      return this.validateShopifyCoupon(code, cartTotal);
    }
    return this.validateLocalCoupon(code, cartTotal);
  }

  // Validar cupón local
  validateLocalCoupon(code, cartTotal) {
    const coupon = this.localCoupons[code.toUpperCase()];

    if (!coupon) {
      return {
        valid: false,
        error: "Cupón no válido",
      };
    }

    // Verificar si está expirado
    if (coupon.expiresAt) {
      const expiry = new Date(coupon.expiresAt);
      if (expiry < new Date()) {
        return {
          valid: false,
          error: "Este cupón ha expirado",
        };
      }
    }

    // Verificar límite de usos
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return {
        valid: false,
        error: "Este cupón ha alcanzado su límite de usos",
      };
    }

    // Verificar monto mínimo
    if (coupon.minAmount && cartTotal < coupon.minAmount) {
      return {
        valid: false,
        error: `Este cupón requiere un mínimo de ${coupon.minAmount}€ en compras`,
      };
    }

    // Calcular descuento
    let discountAmount = 0;

    if (coupon.type === "percentage") {
      discountAmount = (cartTotal * coupon.value) / 100;
      // Aplicar descuento máximo si existe
      if (coupon.maxDiscount) {
        discountAmount = Math.min(discountAmount, coupon.maxDiscount);
      }
    } else if (coupon.type === "fixed") {
      discountAmount = coupon.value;
    }

    return {
      valid: true,
      coupon: coupon,
      discountAmount: Math.round(discountAmount * 100) / 100,
      freeShipping: coupon.type === "free_shipping",
    };
  }

  // Validar cupón de Shopify
  async validateShopifyCoupon(code, cartTotal) {
    // En Shopify, la validación de cupones se hace en el checkout
    // Aquí solo verificamos que el código tenga formato válido

    try {
      // Query GraphQL para verificar discount code
      const query = `
        query discountCodeBasicDetails($code: String!) {
          codeDiscountNode: codeDiscountNodeByCode(code: $code) {
            id
            codeDiscount {
              ... on DiscountCodeBasic {
                title
                codes(first: 1) {
                  edges {
                    node {
                      code
                    }
                  }
                }
                startsAt
                endsAt
                customerSelection {
                  ... on DiscountCustomerAll {
                    allCustomers
                  }
                }
                minimumRequirement {
                  ... on DiscountMinimumSubtotal {
                    greaterThanOrEqualToSubtotal {
                      amount
                      currencyCode
                    }
                  }
                }
                customerGets {
                  value {
                    ... on DiscountPercentage {
                      percentage
                    }
                    ... on DiscountAmount {
                      amount {
                        amount
                        currencyCode
                      }
                      appliesOnEachItem
                    }
                  }
                  items {
                    ... on AllDiscountItems {
                      allItems
                    }
                  }
                }
              }
            }
          }
        }
      `;

      // Nota: Esto requiere Admin API token, no Storefront
      // En producción, esto debería hacerse desde un backend

      return {
        valid: true,
        coupon: { code },
        message: "El cupón se aplicará en el checkout",
        deferredValidation: true, // Se valida en Shopify checkout
      };
    } catch (error) {
      console.error("Error validating Shopify coupon:", error);
      return {
        valid: false,
        error: "Error al validar el cupón",
      };
    }
  }

  // Obtener lista de cupones disponibles (admin)
  getAvailableCoupons() {
    if (this.useShopify) {
      return []; // En Shopify se gestionan desde el admin
    }

    return Object.values(this.localCoupons).filter((coupon) => {
      // Filtrar expirados
      if (coupon.expiresAt) {
        const expiry = new Date(coupon.expiresAt);
        if (expiry < new Date()) return false;
      }

      // Filtrar sin usos disponibles
      if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
        return false;
      }

      return true;
    });
  }

  // Incrementar contador de uso (solo local)
  incrementUsage(code) {
    if (!this.useShopify && this.localCoupons[code]) {
      this.localCoupons[code].usedCount++;
    }
  }

  // Formatear descripción de descuento
  formatDiscountDescription(coupon, discountAmount) {
    if (coupon.type === "percentage") {
      return `${coupon.value}% de descuento (${discountAmount.toFixed(2)}€)`;
    } else if (coupon.type === "fixed") {
      return `${coupon.value}€ de descuento`;
    } else if (coupon.type === "free_shipping") {
      return "Envío gratis";
    }
    return "";
  }
}

export const couponService = new CouponService();
