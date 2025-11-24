import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { productService } from "../../services/productService";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ className = "" }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Debounce para la búsqueda
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const searchResults = await productService.searchProducts(query, 8);
        setResults(searchResults);
        setIsOpen(true);
      } catch (error) {
        console.error("Error en búsqueda:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Cerrar resultados al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      window.scrollTo(0, 0);
      navigate(`/catalogo?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setQuery("");
    }
  };

  const handleProductClick = (slug) => {
    window.scrollTo(0, 0);
    navigate(`/producto/${slug}`);
    setIsOpen(false);
    setQuery("");
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 pl-10 pr-10 text-sm bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute transform -translate-y-1/2 left-3 top-1/2 hover:text-gray-600"
        >
          <Search className="w-4 h-4" />
        </button>

        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </form>

      {/* Resultados de búsqueda */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg max-h-96"
          >
            {loading ? (
              <div className="p-4 text-center text-gray-500">
                <div className="w-5 h-5 mx-auto mb-2 border-2 border-gray-300 rounded-full border-t-gray-600 animate-spin" />
                Buscando...
              </div>
            ) : results.length > 0 ? (
              <div className="py-2">
                {results.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product.slug)}
                    className="flex items-center w-full gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50"
                  >
                    <img
                      src={product.imagen}
                      alt={product.titulo}
                      loading="lazy"
                      className="object-cover w-10 h-10 bg-gray-100 rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {product.titulo}
                      </p>
                      <p className="text-sm text-gray-600">
                        {product.precio.toLocaleString("es-ES", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </p>
                    </div>
                  </button>
                ))}

                {/* Ver todos los resultados */}
                <button
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/catalogo?q=${encodeURIComponent(query)}`);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 text-sm text-center text-gray-600 transition-colors border-t border-gray-100 hover:bg-gray-50"
                >
                  Ver todos los resultados para "{query}"
                </button>
              </div>
            ) : query.trim() && !loading ? (
              <div className="p-4 text-center text-gray-500">
                <p className="text-sm">No se encontraron productos</p>
                <button
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate("/catalogo/todos");
                  }}
                  className="mt-1 text-sm text-blue-600 hover:underline"
                >
                  Ver todo el catálogo
                </button>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
