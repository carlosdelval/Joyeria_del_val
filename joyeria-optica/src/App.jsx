import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import CookieBanner from "./components/CookieBanner";
import ErrorBoundary from "./components/ErrorBoundary";
import ProductoPage from "./pages/Producto";
import TerminosLegales from "./pages/TerminosLegales";
import Contacto from "./pages/Contacto";
import Privacidad from "./pages/Privacidad";
import PoliticaEnviosDevoluciones from "./pages/Devoluciones";
import CheckoutPage from "./pages/CheckoutPage";
import Favoritos from "./pages/Favoritos";
import PerfilUsuario from "./pages/PerfilUsuario";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <Router>
              <div className="min-h-screen text-black bg-white">
                <Navbar />
                <CookieBanner />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/catalogo" element={<Catalogo />} />
                  <Route path="/catalogo/:categoria" element={<Catalogo />} />
                  <Route path="/producto/:slug" element={<ProductoPage />} />
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
                </Routes>
                <Footer />
              </div>
            </Router>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
