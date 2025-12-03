import { useState, useEffect, useRef } from "react";
import { Search, X, Clock, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { productService } from "../../services/productService";
import { useNavigate } from "react-router-dom";
import { trackSearch } from "../../utils/analytics";

const RECENT_SEARCHES_KEY = "recentSearches";
const MAX_RECENT_SEARCHES = 5;

const SearchBar = ({ className = "", onSearch }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Cargar búsquedas recientes al montar el componente
  useEffect(() => {
    const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (error) {
        console.error("Error al cargar búsquedas recientes:", error);
      }
    }
  }, []);

  // Gestionar apertura/cierre del dropdown
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      // Mostrar búsquedas recientes si el campo está vacío
      if (recentSearches.length === 0) {
        setIsOpen(false);
      }
    } else {
      // Si hay texto, cerrar el dropdown (no mostrar productos)
      setIsOpen(false);
    }
  }, [query, recentSearches.length]);

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

  // Guardar búsqueda reciente
  const saveRecentSearch = (searchQuery) => {
    const trimmedQuery = searchQuery.trim().slice(0, 100); // Limitar longitud

    // Validar que tenga al menos 2 caracteres y no sea solo espacios
    if (!trimmedQuery || trimmedQuery.length < 2) return;

    // Validar que no contenga solo caracteres especiales
    if (!/[a-zA-Z0-9]/.test(trimmedQuery)) return;

    const updated = [
      trimmedQuery,
      ...recentSearches.filter((s) => s !== trimmedQuery),
    ].slice(0, MAX_RECENT_SEARCHES);

    setRecentSearches(updated);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  };

  // Eliminar una búsqueda reciente
  const removeRecentSearch = (searchQuery) => {
    const updated = recentSearches.filter((s) => s !== searchQuery);
    setRecentSearches(updated);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  };

  // Limpiar todas las búsquedas recientes
  const clearAllRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sanitizedQuery = query.trim().slice(0, 100); // Limitar y sanitizar

    if (sanitizedQuery && sanitizedQuery.length >= 2) {
      // Mínimo 2 caracteres
      trackSearch(sanitizedQuery);
      saveRecentSearch(sanitizedQuery);
      window.scrollTo(0, 0);
      navigate(`/catalogo?q=${encodeURIComponent(sanitizedQuery)}`);
      setIsOpen(false);
      setQuery("");
      // Cerrar menú móvil si existe
      if (onSearch) onSearch();
    }
  };

  const handleRecentSearchClick = (searchQuery) => {
    const sanitizedQuery = searchQuery.trim().slice(0, 100); // Sanitizar búsqueda reciente

    trackSearch(sanitizedQuery);
    saveRecentSearch(sanitizedQuery);
    window.scrollTo(0, 0);
    navigate(`/catalogo?q=${encodeURIComponent(sanitizedQuery)}`);
    setIsOpen(false);
    setQuery("");
    // Cerrar menú móvil si existe
    if (onSearch) onSearch();
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    if (!query.trim() && recentSearches.length > 0) {
      setIsOpen(true);
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleInputFocus}
          maxLength={100}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
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

      {/* Búsquedas recientes */}
      <AnimatePresence>
        {isOpen && !query.trim() && recentSearches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg max-h-96"
          >
            <div className="py-2">
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                <h3 className="text-sm font-medium text-gray-900">
                  Búsquedas recientes
                </h3>
                <button
                  onClick={clearAllRecentSearches}
                  className="text-xs text-gray-500 transition-colors hover:text-gray-700"
                  title="Limpiar búsquedas recientes"
                >
                  Limpiar todo
                </button>
              </div>
              {recentSearches.map((search, index) => (
                <div
                  key={`${search}-${index}`}
                  className="flex items-center justify-between gap-2 px-4 py-3 transition-colors group hover:bg-gray-50"
                >
                  <button
                    onClick={() => handleRecentSearchClick(search)}
                    className="flex items-center flex-1 gap-3 text-left"
                  >
                    <Clock className="flex-shrink-0 w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{search}</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeRecentSearch(search);
                    }}
                    className="flex-shrink-0 p-1 text-gray-400 transition-colors opacity-0 hover:text-gray-600 group-hover:opacity-100"
                    title="Eliminar"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
