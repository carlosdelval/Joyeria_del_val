// Servicio adaptador para transición gradual a Shopify
import { shopifyService } from "./shopify";

class ProductService {
  constructor() {
    this.useShopify = import.meta.env.VITE_USE_SHOPIFY === "true";
    this.fallbackEnabled = import.meta.env.VITE_API_FALLBACK_ENABLED === "true";
  }

  // Método principal que decide qué API usar
  async fetchProductos(filters) {
    try {
      if (this.useShopify) {
        return await this.fetchFromShopify(filters);
      } else {
        return await this.fetchFromLocal(filters);
      }
    } catch (error) {
      console.error("Error fetching products:", error);

      // Fallback automático si está habilitado
      if (this.fallbackEnabled && this.useShopify) {
        console.log("Fallback a datos locales activado");
        return await this.fetchFromLocal(filters);
      }

      throw error;
    }
  }

  // Obtener productos desde Shopify
  async fetchFromShopify(filters) {
    const response = await shopifyService.getProducts(filters);
    const products = response.data.products.edges.map((edge) =>
      shopifyService.transformProductData(edge)
    );

    return this.applyLocalFilters(products, filters);
  }

  // Obtener productos desde archivo local (actual)
  async fetchFromLocal(filters) {
    const { fetchProductos } = await import("../api/productos");
    return await fetchProductos(filters);
  }

  // Aplicar filtros adicionales que Shopify no maneja nativamente
  applyLocalFilters(products, filters) {
    return products.filter((product) => {
      // Aplicar filtros personalizados aquí si es necesario
      return true;
    });
  }

  // Método para obtener un producto individual
  async fetchProducto(slug) {
    try {
      if (this.useShopify) {
        const response = await shopifyService.getProduct(slug);
        return shopifyService.transformProductData(
          response.data.productByHandle
        );
      } else {
        const { fetchProducto } = await import("../api/productos");
        return await fetchProducto(slug);
      }
    } catch (error) {
      console.error("Error fetching product:", error);

      if (this.fallbackEnabled && this.useShopify) {
        const { fetchProducto } = await import("../api/productos");
        return await fetchProducto(slug);
      }

      throw error;
    }
  }

  // Método para búsqueda con autocompletado
  async searchProducts(query, limit = 10) {
    try {
      const products = await this.fetchProductos({
        busqueda: query,
        first: limit,
      });

      return products.slice(0, limit).map((product) => ({
        id: product.id,
        titulo: product.titulo,
        slug: product.slug,
        precio: product.precio,
        imagen: product.imagenes[0],
      }));
    } catch (error) {
      console.error("Error searching products:", error);
      return [];
    }
  }

  // Cache con TTL para mejorar performance
  cache = new Map();
  cacheTimeout = 5 * 60 * 1000; // 5 minutos

  async cachedFetch(key, fetchFn) {
    const cached = this.cache.get(key);

    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    const data = await fetchFn();
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });

    return data;
  }

  // Método wrapper con cache
  async fetchProductosWithCache(filters) {
    const cacheKey = JSON.stringify(filters);
    return this.cachedFetch(cacheKey, () => this.fetchProductos(filters));
  }
}

export const productService = new ProductService();
