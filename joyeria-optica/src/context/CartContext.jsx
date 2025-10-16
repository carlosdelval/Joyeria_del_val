// Context para manejo del carrito
import { createContext, useReducer, useEffect } from "react";

// Acciones del carrito
const CART_ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  CLEAR_CART: "CLEAR_CART",
  LOAD_CART: "LOAD_CART",
  SET_SHIPPING: "SET_SHIPPING",
  APPLY_DISCOUNT: "APPLY_DISCOUNT",
};

// Reducer del carrito
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity = 1, variant = null } = action.payload;
      const itemId = variant ? `${product.id}-${variant.id}` : product.id;

      const existingItem = state.items.find((item) => item.id === itemId);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === itemId
              ? { ...item, quantity: item.quantity + quantity }
              : item
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
            slug: product.slug,
            titulo: product.titulo,
            precio: variant ? variant.precio : product.precio,
            imagen: product.imagenes[0],
            quantity,
            variant: variant || null,
            maxStock: variant ? variant.stock : product.stock || 99,
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
};

// Context
const CartContext = createContext();

// Provider del carrito
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Persistir carrito en localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("optica-del-val-cart");
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: cartData });
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("optica-del-val-cart", JSON.stringify(state));
  }, [state]);

  // Funciones del carrito
  const addToCart = (product, quantity = 1, variant = null) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product, quantity, variant },
    });
  };

  const removeFromCart = (itemId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { itemId },
    });
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

  const applyDiscount = (code, amount) => {
    dispatch({
      type: CART_ACTIONS.APPLY_DISCOUNT,
      payload: { code, amount },
    });
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

  const shippingCost = subtotal > 50 ? 0 : state.shipping.cost; // Envío gratis >50€

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

    // Acciones
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setShipping,
    applyDiscount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Exportar el contexto para el hook
export { CartContext };
