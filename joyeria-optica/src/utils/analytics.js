/**
 * Analytics utilities for tracking e-commerce events
 * Compatible with Google Analytics 4 via GTM
 */

/**
 * Track when user views a product detail page
 * @param {Object} product - Product data
 */
export const trackViewItem = (product) => {
  if (typeof window === "undefined" || !window.dataLayer) return;

  try {
    window.dataLayer.push({
      event: "view_item",
      ecommerce: {
        currency: "EUR",
        value: product.precio || 0,
        items: [
          {
            item_id: product.id || product.slug,
            item_name: product.titulo,
            item_brand: product.marca || "",
            item_category: product.categorias?.[0] || "",
            item_category2: product.categorias?.[1] || "",
            price: product.precio || 0,
            quantity: 1,
          },
        ],
      },
    });
  } catch (error) {
    console.error("Error tracking view_item:", error);
  }
};

/**
 * Track when user adds item to cart
 * @param {Object} product - Product data
 * @param {number} quantity - Quantity added
 */
export const trackAddToCart = (product, quantity = 1) => {
  if (typeof window === "undefined" || !window.dataLayer) return;

  try {
    window.dataLayer.push({
      event: "add_to_cart",
      ecommerce: {
        currency: "EUR",
        value: (product.precio || 0) * quantity,
        items: [
          {
            item_id: product.id || product.slug,
            item_name: product.titulo,
            item_brand: product.marca || "",
            item_category: product.categorias?.[0] || "",
            item_category2: product.categorias?.[1] || "",
            price: product.precio || 0,
            quantity: quantity,
          },
        ],
      },
    });
  } catch (error) {
    console.error("Error tracking add_to_cart:", error);
  }
};

/**
 * Track when user removes item from cart
 * @param {Object} product - Product data
 * @param {number} quantity - Quantity removed
 */
export const trackRemoveFromCart = (product, quantity = 1) => {
  if (typeof window === "undefined" || !window.dataLayer) return;

  try {
    window.dataLayer.push({
      event: "remove_from_cart",
      ecommerce: {
        currency: "EUR",
        value: (product.precio || 0) * quantity,
        items: [
          {
            item_id: product.id || product.slug,
            item_name: product.titulo,
            item_brand: product.marca || "",
            item_category: product.categorias?.[0] || "",
            price: product.precio || 0,
            quantity: quantity,
          },
        ],
      },
    });
  } catch (error) {
    console.error("Error tracking remove_from_cart:", error);
  }
};

/**
 * Track when user begins checkout
 * @param {Array} cartItems - Cart items
 * @param {number} totalValue - Total cart value
 */
export const trackBeginCheckout = (cartItems, totalValue) => {
  if (typeof window === "undefined" || !window.dataLayer) return;

  try {
    window.dataLayer.push({
      event: "begin_checkout",
      ecommerce: {
        currency: "EUR",
        value: totalValue,
        items: cartItems.map((item) => ({
          item_id: item.id || item.slug,
          item_name: item.titulo,
          item_brand: item.marca || "",
          item_category: item.categorias?.[0] || "",
          price: item.precio || 0,
          quantity: item.cantidad || 1,
        })),
      },
    });
  } catch (error) {
    console.error("Error tracking begin_checkout:", error);
  }
};

/**
 * Track when user adds item to wishlist
 * @param {Object} product - Product data
 */
export const trackAddToWishlist = (product) => {
  if (typeof window === "undefined" || !window.dataLayer) return;

  try {
    window.dataLayer.push({
      event: "add_to_wishlist",
      ecommerce: {
        currency: "EUR",
        value: product.precio || 0,
        items: [
          {
            item_id: product.id || product.slug,
            item_name: product.titulo,
            item_brand: product.marca || "",
            item_category: product.categorias?.[0] || "",
            price: product.precio || 0,
            quantity: 1,
          },
        ],
      },
    });
  } catch (error) {
    console.error("Error tracking add_to_wishlist:", error);
  }
};

/**
 * Track search query
 * @param {string} searchTerm - Search term used
 */
export const trackSearch = (searchTerm) => {
  if (typeof window === "undefined" || !window.dataLayer) return;

  try {
    window.dataLayer.push({
      event: "search",
      search_term: searchTerm,
    });
  } catch (error) {
    console.error("Error tracking search:", error);
  }
};

/**
 * Track when user views a product list/category
 * @param {string} listId - Category or list identifier
 * @param {string} listName - Human readable list name
 * @param {Array} products - Products in the list
 */
export const trackViewItemList = (listId, listName, products) => {
  if (typeof window === "undefined" || !window.dataLayer) return;

  try {
    window.dataLayer.push({
      event: "view_item_list",
      ecommerce: {
        item_list_id: listId,
        item_list_name: listName,
        items: products.slice(0, 20).map((product, index) => ({
          item_id: product.id || product.slug,
          item_name: product.titulo,
          item_brand: product.marca || "",
          item_category: product.categorias?.[0] || "",
          price: product.precio || 0,
          index: index,
        })),
      },
    });
  } catch (error) {
    console.error("Error tracking view_item_list:", error);
  }
};
