import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import CookieBanner from "./components/CookieBanner";
import ErrorBoundary from "./components/ErrorBoundary";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ToastProvider } from "./context/ToastContext";
import { PageSpinner } from "./components/Spinner";

// Lazy loading de páginas - cargan solo cuando se navega a ellas
const Home = lazy(() => import("./pages/Home"));
const Catalogo = lazy(() => import("./pages/Catalogo"));
const ProductoPage = lazy(() => import("./pages/Producto"));
const Joyeria = lazy(() => import("./pages/Joyeria"));
const Relojes = lazy(() => import("./pages/Relojeria"));
const Gafas = lazy(() => import("./pages/Optica"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const Favoritos = lazy(() => import("./pages/Favoritos"));
const PerfilUsuario = lazy(() => import("./pages/PerfilUsuario"));
const TerminosLegales = lazy(() => import("./pages/TerminosLegales"));
const Contacto = lazy(() => import("./pages/Contacto"));
const Privacidad = lazy(() => import("./pages/Privacidad"));
const PoliticaEnviosDevoluciones = lazy(() => import("./pages/Devoluciones"));
const NotFound = lazy(() => import("./pages/404"));

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <ToastProvider>
              <Router>
                <div className="min-h-screen text-black bg-white">
                  <Navbar />
                  <CookieBanner />
                  <Suspense fallback={<PageSpinner />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/catalogo" element={<Catalogo />} />
                      <Route
                        path="/catalogo/:categoria"
                        element={<Catalogo />}
                      />
                      <Route
                        path="/producto/:slug"
                        element={<ProductoPage />}
                      />
                      <Route path="/joyeria" element={<Joyeria />} />
                      <Route path="/relojeria" element={<Relojes />} />
                      <Route path="/optica" element={<Gafas />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/favoritos" element={<Favoritos />} />
                      <Route path="/perfil" element={<PerfilUsuario />} />
                      <Route
                        path="/terminos-legales"
                        element={<TerminosLegales />}
                      />
                      <Route path="/contacto" element={<Contacto />} />
                      <Route path="/privacidad" element={<Privacidad />} />
                      <Route
                        path="/envios-devoluciones"
                        element={<PoliticaEnviosDevoluciones />}
                      />
                      {/* Ruta 404 - debe ir al final */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                  <Footer />
                </div>
              </Router>
            </ToastProvider>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
