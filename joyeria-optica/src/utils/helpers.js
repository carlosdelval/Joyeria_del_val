// Utilidades para optimización de imágenes
export const generateImageSrcSet = (baseUrl, sizes = [400, 800, 1200]) => {
  if (!baseUrl) return "";

  // Para imágenes de Shopify, generar diferentes tamaños
  if (baseUrl.includes("shopify") || baseUrl.includes("cdn.shopify.com")) {
    return sizes.map((size) => `${baseUrl}&width=${size} ${size}w`).join(", ");
  }

  // Para otras imágenes, usar el formato original
  return `${baseUrl} 1x`;
};

export const getOptimizedImageUrl = (url, width = 800, height = 800) => {
  if (!url) return "/placeholder-product.jpg";

  // Optimización para imágenes de Shopify
  if (url.includes("shopify") || url.includes("cdn.shopify.com")) {
    return `${url}&width=${width}&height=${height}&crop=center`;
  }

  return url;
};

// Lazy loading observer para imágenes
export const createImageObserver = (callback) => {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry.target);
        }
      });
    },
    {
      rootMargin: "50px 0px",
      threshold: 0.1,
    }
  );
};

// Preloader para imágenes críticas
export const preloadImages = (urls) => {
  urls.forEach((url) => {
    if (url) {
      const img = new Image();
      img.src = url;
    }
  });
};

// Debounce para funciones
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle para scroll events
export const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Formatear moneda
export const formatCurrency = (amount, currency = "EUR", locale = "es-ES") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Redondear descuento a múltiplos de 10 de forma inteligente
// Solo redondea hacia arriba si está a 1-2 puntos del siguiente múltiplo de 10
// Ejemplo: 8% o 9% -> 10%, pero 7% -> 10%, 13% -> 10% (redondeo normal)
export const roundDiscountUp = (percentage) => {
  if (!percentage || percentage <= 0) return 0;
  
  const rounded = Math.round(percentage / 10) * 10;
  const decimal = percentage % 10;
  
  // Si está entre 8-9.99 (falta 1-2 puntos para el siguiente múltiplo), redondear hacia arriba
  if (decimal >= 8) {
    return Math.ceil(percentage / 10) * 10;
  }
  
  // En otros casos, usar redondeo normal
  return rounded;
};

// Calcular descuento (redondeado a múltiplos de 10)
export const calculateDiscount = (originalPrice, salePrice) => {
  if (!originalPrice || !salePrice || salePrice >= originalPrice) return 0;
  const rawPercentage = ((originalPrice - salePrice) / originalPrice) * 100;
  return roundDiscountUp(rawPercentage);
};

// Validador de email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generar slug desde título
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remover acentos
    .replace(/[^a-z0-9\s-]/g, "") // Remover caracteres especiales
    .replace(/\s+/g, "-") // Espacios a guiones
    .replace(/-+/g, "-") // Múltiples guiones a uno
    .trim("-"); // Remover guiones al inicio/final
};

// Sanitizar título de producto para visualización
export const sanitizeProductTitle = (title) => {
  if (!title || typeof title !== "string") return "";

  return (
    title
      // Normalizar espacios múltiples a uno solo
      .replace(/\s+/g, " ")
      // Eliminar espacios al inicio y final
      .trim()
      // Convertir primera letra de cada palabra a mayúscula (Title Case)
      .toLowerCase()
      .split(" ")
      .map((word) => {
        // Excepciones comunes que deben permanecer en minúsculas
        const lowercase = ["de", "del", "la", "el", "en", "y", "con", "para"];
        // Excepciones que deben permanecer en mayúsculas
        const uppercase = ["mm", "cm", "ml", "uv"];

        if (lowercase.includes(word.toLowerCase())) {
          return word.toLowerCase();
        }
        if (uppercase.includes(word.toLowerCase())) {
          return word.toUpperCase();
        }
        // Capitalizar primera letra
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ")
      // Capitalizar primera palabra siempre
      .replace(/^./, (str) => str.toUpperCase())
  );
};

// Storage helpers con compresión
export const storage = {
  set: (key, value) => {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  },

  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return defaultValue;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  },
};

// Analytics helpers (preparado para Google Analytics/Shopify Analytics)
export const analytics = {
  track: (event, properties = {}) => {
    // Google Analytics 4
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", event, properties);
    }

    // Meta Pixel (Facebook)
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", event, properties);
    }

    // Shopify Analytics (cuando esté integrado)
    if (typeof window !== "undefined" && window.ShopifyAnalytics) {
      window.ShopifyAnalytics.lib.track(event, properties);
    }

    // Log en desarrollo
    if (import.meta.env.DEV) {
      console.log("📊 Analytics Event:", event, properties);
    }
  },

  // Evento: Ver página de producto
  trackViewProduct: (producto) => {
    analytics.track("view_item", {
      currency: "EUR",
      value: producto.precio,
      items: [
        {
          item_id: producto.id,
          item_name: producto.titulo,
          item_brand: producto.marca,
          item_category: producto.categorias?.[0],
          price: producto.precio,
        },
      ],
    });
  },

  // Evento: Añadir al carrito
  trackAddToCart: (item, quantity = 1) => {
    analytics.track("add_to_cart", {
      currency: "EUR",
      value: item.precio * quantity,
      items: [
        {
          item_id: item.id || item.productId,
          item_name: item.titulo,
          item_brand: item.marca,
          item_category: item.categorias?.[0],
          price: item.precio,
          quantity: quantity,
        },
      ],
    });
  },

  // Evento: Eliminar del carrito
  trackRemoveFromCart: (item) => {
    analytics.track("remove_from_cart", {
      currency: "EUR",
      value: item.precio * item.quantity,
      items: [
        {
          item_id: item.id || item.productId,
          item_name: item.titulo,
          price: item.precio,
          quantity: item.quantity,
        },
      ],
    });
  },

  // Evento: Iniciar checkout
  trackBeginCheckout: (items, value) => {
    analytics.track("begin_checkout", {
      currency: "EUR",
      value: value,
      items: items.map((item) => ({
        item_id: item.id || item.productId,
        item_name: item.titulo,
        price: item.precio,
        quantity: item.quantity,
      })),
    });
  },

  // Evento: Añadir información de envío
  trackAddShippingInfo: (shippingMethod, value) => {
    analytics.track("add_shipping_info", {
      currency: "EUR",
      value: value,
      shipping_tier: shippingMethod,
    });
  },

  // Evento: Añadir información de pago
  trackAddPaymentInfo: (paymentMethod, value) => {
    analytics.track("add_payment_info", {
      currency: "EUR",
      value: value,
      payment_type: paymentMethod,
    });
  },

  // Evento: Compra completada
  trackPurchase: (
    transactionId,
    value,
    currency = "EUR",
    items = [],
    tax = 0,
    shipping = 0
  ) => {
    analytics.track("purchase", {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      tax: tax,
      shipping: shipping,
      items: items.map((item) => ({
        item_id: item.id || item.productId,
        item_name: item.titulo || item.title,
        item_brand: item.marca,
        price: item.precio || item.price,
        quantity: item.quantity,
      })),
    });
  },

  // Evento: Búsqueda
  trackSearch: (searchTerm, resultsCount) => {
    analytics.track("search", {
      search_term: searchTerm,
      results_count: resultsCount,
    });
  },

  // Evento: Ver lista de productos
  trackViewItemList: (listName, items) => {
    analytics.track("view_item_list", {
      item_list_name: listName,
      items: items.slice(0, 10).map((item, index) => ({
        item_id: item.id,
        item_name: item.titulo,
        item_brand: item.marca,
        item_category: item.categorias?.[0],
        price: item.precio,
        index: index,
      })),
    });
  },

  // Evento: Click en producto
  trackSelectItem: (producto, listName, index) => {
    analytics.track("select_item", {
      item_list_name: listName,
      items: [
        {
          item_id: producto.id,
          item_name: producto.titulo,
          item_brand: producto.marca,
          item_category: producto.categorias?.[0],
          price: producto.precio,
          index: index,
        },
      ],
    });
  },

  // Evento: Ver carrito
  trackViewCart: (items, value) => {
    analytics.track("view_cart", {
      currency: "EUR",
      value: value,
      items: items.map((item) => ({
        item_id: item.id || item.productId,
        item_name: item.titulo,
        price: item.precio,
        quantity: item.quantity,
      })),
    });
  },
};
