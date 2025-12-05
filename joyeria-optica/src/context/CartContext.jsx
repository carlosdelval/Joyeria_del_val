// Context para manejo del carrito
import { createContext, useReducer, useEffect, useState } from "react";
import { analytics } from "../utils/helpers";
import { couponService } from "../services/couponService";
import { checkoutService } from "../services/checkoutService";
import Cookies from "js-cookie";

// Acciones del carrito
const CART_ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  CLEAR_CART: "CLEAR_CART",
  LOAD_CART: "LOAD_CART",
  SET_SHIPPING: "SET_SHIPPING",
  APPLY_DISCOUNT: "APPLY_DISCOUNT",
  REMOVE_DISCOUNT: "REMOVE_DISCOUNT",
};

// Reducer del carrito
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity = 1, variant = null } = action.payload;
      const tallaKey = product.tallaSeleccionada ? `-${product.tallaSeleccionada}` : '';
      const itemId = variant 
        ? `${product.id}-${variant.id}${tallaKey}` 
        : `${product.id}${tallaKey}`;

      const existingItem = state.items.find((item) => item.id === itemId);

      if (existingItem) {
        // Verificar que no se exceda el stock máximo
        const newQuantity = Math.min(
          existingItem.quantity + quantity,
          existingItem.maxStock
        );

        return {
          ...state,
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          ),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            id: itemId,
            productId: product.id,
            shopifyVariantId:
              variant?.shopifyId || product.variantes?.[0]?.shopifyId || null, // ID de Shopify para checkout
            sku: variant?.sku || product.sku || product.id,
            slug: product.slug,
            titulo: product.titulo,
            precio: variant ? variant.precio : product.precio,
            imagen: product.imagenes[0],
            quantity,
            variant: variant || null,
            maxStock: variant ? variant.stock : product.stock || 0,
            tallaSeleccionada: product.tallaSeleccionada || null,
            customAttributes: product.customAttributes || [],
          },
        ],
      };
    }

    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.itemId),
      };

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { itemId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== itemId),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === itemId
            ? { ...item, quantity: Math.min(quantity, item.maxStock) }
            : item
        ),
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
        discountCode: null,
        discountAmount: 0,
      };

    case CART_ACTIONS.LOAD_CART:
      return {
        ...state,
        ...action.payload,
      };

    case CART_ACTIONS.SET_SHIPPING:
      return {
        ...state,
        shipping: action.payload,
      };

    case CART_ACTIONS.APPLY_DISCOUNT:
      return {
        ...state,
        discountCode: action.payload.code,
        discountAmount: action.payload.amount,
        freeShipping: action.payload.freeShipping || false,
        appliedCoupon: action.payload.coupon || null,
      };

    case CART_ACTIONS.REMOVE_DISCOUNT:
      return {
        ...state,
        discountCode: null,
        discountAmount: 0,
        freeShipping: false,
        appliedCoupon: null,
      };

    default:
      return state;
  }
}

// Estado inicial
const initialState = {
  items: [],
  shipping: {
    method: "standard",
    cost: 0,
    estimatedDays: "2-3",
  },
  discountCode: null,
  discountAmount: 0,
  freeShipping: false,
  appliedCoupon: null,
};

// Context
const CartContext = createContext();

// Provider del carrito
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  // Verificar consentimiento de cookies al iniciar
  useEffect(() => {
    const consent = Cookies.get("cookie-consent");
    if (consent === "accepted") {
      setCookiesAccepted(true);
      // Cargar carrito desde cookies
      const savedCart = Cookies.get("optica-del-val-cart");
      if (savedCart) {
        try {
          const cartData = JSON.parse(savedCart);
          dispatch({ type: CART_ACTIONS.LOAD_CART, payload: cartData });
        } catch (error) {
          console.error("Error loading cart from cookies:", error);
        }
      }
    } else {
      // Fallback a localStorage si no hay consentimiento aún
      const savedCart = localStorage.getItem("optica-del-val-cart");
      if (savedCart) {
        try {
          const cartData = JSON.parse(savedCart);
          dispatch({ type: CART_ACTIONS.LOAD_CART, payload: cartData });
        } catch (error) {
          console.error("Error loading cart from localStorage:", error);
        }
      }
    }

    // Suscribirse a cambios en el consentimiento
    const checkConsent = setInterval(() => {
      const currentConsent = Cookies.get("cookie-consent");
      if (currentConsent === "accepted" && !cookiesAccepted) {
        setCookiesAccepted(true);
        // Migrar de localStorage a cookies
        const localStorageData = localStorage.getItem("optica-del-val-cart");
        if (localStorageData) {
          Cookies.set("optica-del-val-cart", localStorageData, {
            expires: 7, // 7 días para el carrito
            sameSite: "Lax",
            secure: window.location.protocol === "https:",
          });
        }
      }
    }, 1000);

    return () => clearInterval(checkConsent);
  }, [cookiesAccepted]);

  // Guardar en cookies o localStorage según consentimiento
  useEffect(() => {
    const cartData = JSON.stringify(state);

    if (cookiesAccepted) {
      // Guardar en cookies (7 días de duración)
      Cookies.set("optica-del-val-cart", cartData, {
        expires: 7,
        sameSite: "Lax",
        secure: window.location.protocol === "https:",
      });
    } else {
      // Guardar en localStorage mientras no hay consentimiento
      localStorage.setItem("optica-del-val-cart", cartData);
    }
  }, [state, cookiesAccepted]);

  // Funciones del carrito
  const addToCart = (product, quantity = 1, variant = null) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product, quantity, variant },
    });

    // Track añadir al carrito
    analytics.trackAddToCart(product, quantity);
  };

  const removeFromCart = (itemId) => {
    // Encontrar el item antes de eliminarlo para tracking
    const item = state.items.find((i) => i.id === itemId);

    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { itemId },
    });

    // Track eliminar del carrito
    if (item) {
      analytics.trackRemoveFromCart(item);
    }
  };

  const updateQuantity = (itemId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { itemId, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const setShipping = (shipping) => {
    dispatch({
      type: CART_ACTIONS.SET_SHIPPING,
      payload: shipping,
    });
  };

  const applyDiscount = async (code) => {
    const validation = await couponService.validateCoupon(code, subtotal);

    if (!validation.valid) {
      throw new Error(validation.error);
    }

    dispatch({
      type: CART_ACTIONS.APPLY_DISCOUNT,
      payload: {
        code: validation.coupon.code,
        amount: validation.discountAmount || 0,
        freeShipping: validation.freeShipping || false,
        coupon: validation.coupon,
      },
    });

    return validation;
  };

  const removeDiscount = () => {
    dispatch({ type: CART_ACTIONS.REMOVE_DISCOUNT });
  };

  // Proceder al checkout (Shopify o local)
  const proceedToCheckout = async (customerInfo = null) => {
    try {
      const result = await checkoutService.createCheckout(
        state.items,
        customerInfo
      );

      if (result.success && result.checkoutUrl) {
        // Redirigir al checkout de Shopify
        window.location.href = result.checkoutUrl;
        return { success: true, url: result.checkoutUrl };
      } else if (result.success && result.orderId) {
        // Checkout local procesado
        return { success: true, orderId: result.orderId };
      } else {
        // Error al crear checkout
        console.error("Error al crear checkout:", result.errors);
        return { success: false, errors: result.errors };
      }
    } catch (error) {
      console.error("Error al proceder al checkout:", error);
      return { success: false, error: error.message };
    }
  };

  // Cálculos
  const itemCount = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = state.items.reduce(
    (total, item) => total + item.precio * item.quantity,
    0
  );

  const shippingCost = state.freeShipping
    ? 0
    : subtotal > 50
    ? 0
    : state.shipping.cost; // Envío gratis >50€ o con cupón

  const total = subtotal + shippingCost - state.discountAmount;

  const value = {
    // Estado
    items: state.items,
    itemCount,
    subtotal,
    shippingCost,
    total,
    shipping: state.shipping,
    discountCode: state.discountCode,
    discountAmount: state.discountAmount,
    freeShipping: state.freeShipping,
    appliedCoupon: state.appliedCoupon,

    // Acciones
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setShipping,
    applyDiscount,
    removeDiscount,
    proceedToCheckout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Exportar el contexto para el hook
export { CartContext };
