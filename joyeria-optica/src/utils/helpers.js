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

// Calcular descuento
export const calculateDiscount = (originalPrice, salePrice) => {
  if (!originalPrice || !salePrice || salePrice >= originalPrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
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

    // Shopify Analytics (cuando esté integrado)
    if (window.ShopifyAnalytics) {
      window.ShopifyAnalytics.lib.track(event, properties);
    }

    console.log("Analytics:", event, properties);
  },

  trackPurchase: (transactionId, value, currency = "EUR", items = []) => {
    analytics.track("purchase", {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      items: items,
    });
  },

  trackAddToCart: (item) => {
    analytics.track("add_to_cart", {
      currency: "EUR",
      value: item.precio,
      items: [
        {
          item_id: item.id,
          item_name: item.titulo,
          item_category: item.categorias?.[0],
          price: item.precio,
          quantity: 1,
        },
      ],
    });
  },
};
