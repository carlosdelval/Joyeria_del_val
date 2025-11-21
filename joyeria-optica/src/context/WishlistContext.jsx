// Context para wishlist/favoritos
import { createContext, useReducer, useEffect, useState } from "react";
import Cookies from "js-cookie";

// Acciones del wishlist
const WISHLIST_ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  CLEAR_WISHLIST: "CLEAR_WISHLIST",
  LOAD_WISHLIST: "LOAD_WISHLIST",
  TOGGLE_ITEM: "TOGGLE_ITEM",
};

// Reducer del wishlist
function wishlistReducer(state, action) {
  switch (action.type) {
    case WISHLIST_ACTIONS.ADD_ITEM: {
      const { product } = action.payload;
      const exists = state.items.find((item) => item.id === product.id);

      if (exists) {
        return state; // Ya existe, no añadir duplicado
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            id: product.id,
            slug: product.slug,
            titulo: product.titulo,
            precio: product.precio,
            precioAnterior: product.precioAnterior,
            imagen: product.imagenes[0],
            marca: product.marca,
            disponible: product.disponible,
            stock: product.stock || 99, // Incluir stock del producto
            categorias: product.categorias || [], // Incluir categorías para detectar Black Friday
            addedAt: new Date().toISOString(),
          },
        ],
      };
    }

    case WISHLIST_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.itemId),
      };

    case WISHLIST_ACTIONS.TOGGLE_ITEM: {
      const { product } = action.payload;
      const exists = state.items.find((item) => item.id === product.id);

      if (exists) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== product.id),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            id: product.id,
            slug: product.slug,
            titulo: product.titulo,
            precio: product.precio,
            precioAnterior: product.precioAnterior,
            imagen: product.imagenes[0],
            marca: product.marca,
            disponible: product.disponible,
            stock: product.stock || 99, // Incluir stock del producto
            categorias: product.categorias || [], // Incluir categorías para detectar Black Friday
            addedAt: new Date().toISOString(),
          },
        ],
      };
    }

    case WISHLIST_ACTIONS.CLEAR_WISHLIST:
      return {
        ...state,
        items: [],
      };

    case WISHLIST_ACTIONS.LOAD_WISHLIST:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

// Estado inicial
const initialState = {
  items: [],
};

// Context
const WishlistContext = createContext();

// Provider del wishlist
export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  // Verificar consentimiento de cookies al iniciar
  useEffect(() => {
    const consent = Cookies.get("cookie-consent");
    if (consent === "accepted") {
      setCookiesAccepted(true);
      // Cargar wishlist desde cookies
      const savedWishlist = Cookies.get("optica-del-val-wishlist");
      if (savedWishlist) {
        try {
          const wishlistData = JSON.parse(savedWishlist);
          dispatch({
            type: WISHLIST_ACTIONS.LOAD_WISHLIST,
            payload: wishlistData,
          });
        } catch (error) {
          console.error("Error loading wishlist from cookies:", error);
        }
      }
    } else {
      // Fallback a localStorage si no hay consentimiento aún
      const savedWishlist = localStorage.getItem("optica-del-val-wishlist");
      if (savedWishlist) {
        try {
          const wishlistData = JSON.parse(savedWishlist);
          dispatch({
            type: WISHLIST_ACTIONS.LOAD_WISHLIST,
            payload: wishlistData,
          });
        } catch (error) {
          console.error("Error loading wishlist from localStorage:", error);
        }
      }
    }
  }, []);

  // Guardar en cookies o localStorage según consentimiento
  useEffect(() => {
    const wishlistData = JSON.stringify(state);

    if (cookiesAccepted) {
      // Guardar en cookies (365 días de duración)
      Cookies.set("optica-del-val-wishlist", wishlistData, {
        expires: 365,
        sameSite: "Lax",
        secure: window.location.protocol === "https:",
      });
    } else {
      // Guardar en localStorage mientras no hay consentimiento
      localStorage.setItem("optica-del-val-wishlist", wishlistData);
    }
  }, [state, cookiesAccepted]);

  // Migrar de localStorage a cookies cuando se acepta el consentimiento
  const migrateToCookies = () => {
    setCookiesAccepted(true);
    const localStorageData = localStorage.getItem("optica-del-val-wishlist");
    if (localStorageData) {
      Cookies.set("optica-del-val-wishlist", localStorageData, {
        expires: 365,
        sameSite: "Lax",
        secure: window.location.protocol === "https:",
      });
      // Opcional: limpiar localStorage después de migrar
      // localStorage.removeItem("optica-del-val-wishlist");
    }
  };

  // Funciones del wishlist
  const addToWishlist = (product) => {
    dispatch({
      type: WISHLIST_ACTIONS.ADD_ITEM,
      payload: { product },
    });
  };

  const removeFromWishlist = (itemId) => {
    dispatch({
      type: WISHLIST_ACTIONS.REMOVE_ITEM,
      payload: { itemId },
    });
  };

  const toggleWishlist = (product) => {
    dispatch({
      type: WISHLIST_ACTIONS.TOGGLE_ITEM,
      payload: { product },
    });
  };

  const clearWishlist = () => {
    dispatch({ type: WISHLIST_ACTIONS.CLEAR_WISHLIST });
  };

  const isInWishlist = (productId) => {
    return state.items.some((item) => item.id === productId);
  };

  const itemCount = state.items.length;

  const value = {
    // Estado
    items: state.items,
    itemCount,

    // Acciones
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    isInWishlist,
    migrateToCookies,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

// Exportar el contexto para el hook
export { WishlistContext };
