// Context para autenticación de usuarios
import { createContext, useReducer, useEffect } from 'react';
import { storage } from '../utils/helpers';

// Acciones de autenticación
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGOUT: 'LOGOUT',
  REGISTER_START: 'REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_ERROR: 'REGISTER_ERROR',
  UPDATE_PROFILE: 'UPDATE_PROFILE',
  LOAD_USER: 'LOAD_USER',
  RESET_ERROR: 'RESET_ERROR'
};

// Reducer de autenticación
function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
    case AUTH_ACTIONS.REGISTER_START:
      return {
        ...state,
        loading: true,
        error: null
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
    case AUTH_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };

    case AUTH_ACTIONS.LOGIN_ERROR:
    case AUTH_ACTIONS.REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload.error
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null
      };

    case AUTH_ACTIONS.UPDATE_PROFILE:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };

    case AUTH_ACTIONS.LOAD_USER:
      return {
        ...state,
        ...action.payload
      };

    case AUTH_ACTIONS.RESET_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
}

// Estado inicial
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null
};

// Context
const AuthContext = createContext();

// Servicio de autenticación (adaptable a Shopify Customer API)
class AuthService {
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    this.useShopify = import.meta.env.VITE_USE_SHOPIFY === 'true';
  }

  // Login local o Shopify
  async login(email, password) {
    if (this.useShopify) {
      return this.loginShopify(email, password);
    }
    return this.loginLocal(email, password);
  }

  // Login con Shopify Customer API
  async loginShopify(email, password) {
    const mutation = `
      mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken {
            accessToken
            expiresAt
          }
          customerUserErrors {
            field
            message
          }
        }
      }
    `;

    const response = await fetch(`https://${import.meta.env.VITE_SHOPIFY_DOMAIN}/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          input: { email, password }
        }
      })
    });

    const data = await response.json();
    
    if (data.data?.customerAccessTokenCreate?.customerUserErrors?.length > 0) {
      throw new Error(data.data.customerAccessTokenCreate.customerUserErrors[0].message);
    }

    const { accessToken } = data.data.customerAccessTokenCreate.customerAccessToken;
    
    // Obtener datos del cliente
    const customer = await this.getShopifyCustomer(accessToken);
    
    return {
      user: {
        id: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
        addresses: customer.addresses?.edges.map(edge => edge.node) || []
      },
      token: accessToken
    };
  }

  // Login local (simulado)
  async loginLocal(email, password) {
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'test@opticadelval.com' && password === 'password') {
      return {
        user: {
          id: '1',
          email: 'test@opticadelval.com',
          firstName: 'Usuario',
          lastName: 'Prueba',
          phone: '+34 600 000 000',
          addresses: []
        },
        token: 'local-token-' + Date.now()
      };
    }
    
    throw new Error('Credenciales incorrectas');
  }

  // Registro
  async register(userData) {
    if (this.useShopify) {
      return this.registerShopify(userData);
    }
    return this.registerLocal(userData);
  }

  // Registro con Shopify
  async registerShopify(userData) {
    const mutation = `
      mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer {
            id
            email
            firstName
            lastName
            phone
          }
          customerUserErrors {
            field
            message
          }
        }
      }
    `;

    const response = await fetch(`https://${import.meta.env.VITE_SHOPIFY_DOMAIN}/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: mutation,
        variables: { input: userData }
      })
    });

    const data = await response.json();
    
    if (data.data?.customerCreate?.customerUserErrors?.length > 0) {
      throw new Error(data.data.customerCreate.customerUserErrors[0].message);
    }

    // Auto-login después del registro
    return this.login(userData.email, userData.password);
  }

  // Registro local
  async registerLocal(userData) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      user: {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone || '',
        addresses: []
      },
      token: 'local-token-' + Date.now()
    };
  }

  // Obtener datos del cliente de Shopify
  async getShopifyCustomer(accessToken) {
    const query = `
      query customer($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
          id
          email
          firstName
          lastName
          phone
          addresses(first: 10) {
            edges {
              node {
                id
                firstName
                lastName
                company
                address1
                address2
                city
                province
                country
                zip
                phone
              }
            }
          }
          orders(first: 10) {
            edges {
              node {
                id
                orderNumber
                totalPrice {
                  amount
                  currencyCode
                }
                processedAt
                fulfillmentStatus
              }
            }
          }
        }
      }
    `;

    const response = await fetch(`https://${import.meta.env.VITE_SHOPIFY_DOMAIN}/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query,
        variables: { customerAccessToken: accessToken }
      })
    });

    const data = await response.json();
    return data.data.customer;
  }
}

const authService = new AuthService();

// Provider de autenticación
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const savedAuth = storage.get('optica-del-val-auth');
    if (savedAuth && savedAuth.token) {
      dispatch({ 
        type: AUTH_ACTIONS.LOAD_USER, 
        payload: {
          isAuthenticated: true,
          user: savedAuth.user,
          token: savedAuth.token
        }
      });
    }
  }, []);

  // Guardar en localStorage cuando cambie el estado
  useEffect(() => {
    if (state.isAuthenticated && state.user && state.token) {
      storage.set('optica-del-val-auth', {
        user: state.user,
        token: state.token
      });
    } else {
      storage.remove('optica-del-val-auth');
    }
  }, [state.isAuthenticated, state.user, state.token]);

  // Funciones del auth
  const login = async (email, password) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    try {
      const result = await authService.login(email, password);
      dispatch({ 
        type: AUTH_ACTIONS.LOGIN_SUCCESS, 
        payload: result 
      });
      return result;
    } catch (error) {
      dispatch({ 
        type: AUTH_ACTIONS.LOGIN_ERROR, 
        payload: { error: error.message }
      });
      throw error;
    }
  };

  const register = async (userData) => {
    dispatch({ type: AUTH_ACTIONS.REGISTER_START });
    try {
      const result = await authService.register(userData);
      dispatch({ 
        type: AUTH_ACTIONS.REGISTER_SUCCESS, 
        payload: result 
      });
      return result;
    } catch (error) {
      dispatch({ 
        type: AUTH_ACTIONS.REGISTER_ERROR, 
        payload: { error: error.message }
      });
      throw error;
    }
  };

  const logout = () => {
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  const updateProfile = (userData) => {
    dispatch({ 
      type: AUTH_ACTIONS.UPDATE_PROFILE, 
      payload: userData 
    });
  };

  const resetError = () => {
    dispatch({ type: AUTH_ACTIONS.RESET_ERROR });
  };

  const value = {
    // Estado
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    token: state.token,
    loading: state.loading,
    error: state.error,
    
    // Acciones
    login,
    register,
    logout,
    updateProfile,
    resetError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
