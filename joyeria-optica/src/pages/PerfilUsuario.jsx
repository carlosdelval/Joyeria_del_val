import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Package,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
  Calendar,
  MapPin,
  CreditCard,
  Eye,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useWishlist } from "../hooks/useWishlist";
import SEO from "../components/SEO";

export default function PerfilUsuario() {
  const { user, logout } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const [activeTab, setActiveTab] = useState("pedidos");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar historial de pedidos del usuario
    const loadOrders = async () => {
      try {
        setLoading(true);
        // Aquí harías la llamada a tu API
        // const response = await fetch(`/api/orders?userId=${user.id}`);
        // const data = await response.json();

        // Datos de ejemplo (simulados)
        const mockOrders = [
          {
            id: "ORD-2024-001",
            date: "2024-10-15T10:30:00",
            status: "entregado",
            total: 89.99,
            items: 3,
            shippingAddress: "Calle Ejemplo 123, Madrid",
            trackingNumber: "ES123456789",
          },
          {
            id: "ORD-2024-002",
            date: "2024-10-20T15:45:00",
            status: "en_transito",
            total: 156.5,
            items: 2,
            shippingAddress: "Av. Principal 456, Barcelona",
            trackingNumber: "ES987654321",
          },
          {
            id: "ORD-2024-003",
            date: "2024-10-23T09:20:00",
            status: "procesando",
            total: 234.0,
            items: 4,
            shippingAddress: "Plaza Mayor 789, Valencia",
            trackingNumber: null,
          },
        ];

        setOrders(mockOrders);
      } catch (error) {
        console.error("Error cargando pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadOrders();
    }
  }, [user]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      procesando: {
        label: "Procesando",
        className: "bg-yellow-100 text-yellow-800 border-yellow-200",
      },
      enviado: {
        label: "Enviado",
        className: "bg-blue-100 text-blue-800 border-blue-200",
      },
      en_transito: {
        label: "En tránsito",
        className: "bg-blue-100 text-blue-800 border-blue-200",
      },
      entregado: {
        label: "Entregado",
        className: "bg-green-100 text-green-800 border-green-200",
      },
      cancelado: {
        label: "Cancelado",
        className: "bg-red-100 text-red-800 border-red-200",
      },
    };

    const config = statusConfig[status] || statusConfig.procesando;

    return (
      <span
        className={`px-3 py-1 text-xs font-medium border ${config.className}`}
      >
        {config.label}
      </span>
    );
  };

  const tabs = [
    { id: "pedidos", label: "Mis Pedidos", icon: Package },
    { id: "favoritos", label: "Favoritos", icon: Heart },
    { id: "datos", label: "Mis Datos", icon: User },
    { id: "ajustes", label: "Ajustes", icon: Settings },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-light tracking-wider text-black mb-4">
            Inicia sesión para ver tu perfil
          </h2>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors font-light tracking-wider uppercase text-sm"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`Mi Perfil - ${user.displayName || user.email}`}
        description="Gestiona tu cuenta, consulta tus pedidos y actualiza tus preferencias"
      />
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-light tracking-wider text-black mb-2">
              MI CUENTA
            </h1>
            <div className="w-24 h-px bg-black"></div>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="md:col-span-1"
            >
              {/* User Info */}
              <div className="mb-6 p-4 bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-black flex items-center justify-center text-white font-medium">
                    {user.displayName?.[0]?.toUpperCase() ||
                      user.email[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-black">
                      {user.displayName || "Usuario"}
                    </p>
                    <p className="text-sm text-gray-600 font-light">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-light transition-colors ${
                        activeTab === tab.id
                          ? "bg-black text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                      <ChevronRight
                        className={`w-4 h-4 ml-auto transition-transform ${
                          activeTab === tab.id ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                  );
                })}

                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-light text-red-600 hover:bg-red-50 border border-red-200 transition-colors mt-4"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar Sesión
                </button>
              </nav>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="md:col-span-3"
            >
              {/* Pedidos Tab */}
              {activeTab === "pedidos" && (
                <div>
                  <h2 className="text-2xl font-light tracking-wider text-black mb-6">
                    HISTORIAL DE PEDIDOS
                  </h2>

                  {loading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-32 bg-gray-100 animate-pulse"
                        ></div>
                      ))}
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-12 border border-gray-200">
                      <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-600 font-light">
                        Aún no has realizado ningún pedido
                      </p>
                      <a
                        href="/catalogo"
                        className="inline-block mt-4 px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors font-light tracking-wider uppercase text-sm"
                      >
                        Explorar productos
                      </a>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="border border-gray-200 p-6 hover:border-black transition-colors"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-medium text-black mb-1">
                                Pedido {order.id}
                              </h3>
                              <p className="text-sm text-gray-600 font-light flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {new Date(order.date).toLocaleDateString(
                                  "es-ES",
                                  {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  }
                                )}
                              </p>
                            </div>
                            {getStatusBadge(order.status)}
                          </div>

                          <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
                            <div>
                              <p className="text-gray-500 font-light mb-1">
                                Total
                              </p>
                              <p className="font-medium text-black">
                                {order.total.toFixed(2)}€
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500 font-light mb-1">
                                Artículos
                              </p>
                              <p className="font-medium text-black">
                                {order.items} productos
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500 font-light mb-1 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                Dirección de envío
                              </p>
                              <p className="font-light text-gray-700 text-xs">
                                {order.shippingAddress}
                              </p>
                            </div>
                          </div>

                          {order.trackingNumber && (
                            <div className="pt-4 border-t border-gray-200">
                              <p className="text-sm text-gray-600 font-light mb-2">
                                Número de seguimiento:
                              </p>
                              <p className="font-mono text-sm bg-gray-50 px-3 py-2 inline-block border border-gray-200">
                                {order.trackingNumber}
                              </p>
                            </div>
                          )}

                          <div className="flex gap-3 mt-4">
                            <button className="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors font-light text-sm">
                              <Eye className="w-4 h-4" />
                              Ver detalles
                            </button>
                            {order.trackingNumber && (
                              <button className="flex items-center gap-2 px-4 py-2 bg-white text-black border border-gray-300 hover:bg-gray-50 transition-colors font-light text-sm">
                                Rastrear pedido
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Favoritos Tab */}
              {activeTab === "favoritos" && (
                <div>
                  <h2 className="text-2xl font-light tracking-wider text-black mb-6">
                    MIS FAVORITOS
                  </h2>

                  {wishlistItems.length === 0 ? (
                    <div className="text-center py-12 border border-gray-200">
                      <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-600 font-light">
                        No tienes productos en favoritos
                      </p>
                      <a
                        href="/catalogo"
                        className="inline-block mt-4 px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors font-light tracking-wider uppercase text-sm"
                      >
                        Explorar productos
                      </a>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-3 gap-6">
                      {wishlistItems.map((item) => (
                        <a
                          key={item.id}
                          href={`/producto/${item.slug}`}
                          className="border border-gray-200 hover:border-black transition-colors group"
                        >
                          <div className="aspect-square bg-gray-50 overflow-hidden">
                            <img
                              src={item.imagen}
                              alt={item.titulo}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-light text-black mb-2 line-clamp-2">
                              {item.titulo}
                            </h3>
                            <p className="font-medium text-black">
                              {item.precio.toFixed(2)}€
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Datos Tab */}
              {activeTab === "datos" && (
                <div>
                  <h2 className="text-2xl font-light tracking-wider text-black mb-6">
                    MIS DATOS
                  </h2>

                  <div className="space-y-6">
                    <div className="border border-gray-200 p-6">
                      <h3 className="font-medium text-black mb-4 flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Información Personal
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600 font-light mb-1">
                            Nombre completo
                          </label>
                          <input
                            type="text"
                            value={user.displayName || ""}
                            className="w-full px-4 py-2 border border-gray-300 focus:border-black focus:outline-none font-light"
                            placeholder="Tu nombre"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 font-light mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            value={user.email}
                            disabled
                            className="w-full px-4 py-2 border border-gray-300 bg-gray-50 font-light"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 font-light mb-1">
                            Teléfono
                          </label>
                          <input
                            type="tel"
                            className="w-full px-4 py-2 border border-gray-300 focus:border-black focus:outline-none font-light"
                            placeholder="+34 600 000 000"
                          />
                        </div>
                      </div>
                      <button className="mt-4 px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors font-light tracking-wider uppercase text-sm">
                        Guardar cambios
                      </button>
                    </div>

                    <div className="border border-gray-200 p-6">
                      <h3 className="font-medium text-black mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Dirección de Envío
                      </h3>
                      <div className="grid gap-4">
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 focus:border-black focus:outline-none font-light"
                          placeholder="Dirección"
                        />
                        <div className="grid md:grid-cols-3 gap-4">
                          <input
                            type="text"
                            className="px-4 py-2 border border-gray-300 focus:border-black focus:outline-none font-light"
                            placeholder="Ciudad"
                          />
                          <input
                            type="text"
                            className="px-4 py-2 border border-gray-300 focus:border-black focus:outline-none font-light"
                            placeholder="Código Postal"
                          />
                          <input
                            type="text"
                            className="px-4 py-2 border border-gray-300 focus:border-black focus:outline-none font-light"
                            placeholder="Provincia"
                          />
                        </div>
                      </div>
                      <button className="mt-4 px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors font-light tracking-wider uppercase text-sm">
                        Guardar dirección
                      </button>
                    </div>

                    <div className="border border-gray-200 p-6">
                      <h3 className="font-medium text-black mb-4 flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Métodos de Pago
                      </h3>
                      <p className="text-sm text-gray-600 font-light mb-4">
                        No tienes métodos de pago guardados
                      </p>
                      <button className="px-6 py-2 bg-white text-black border border-gray-300 hover:bg-gray-50 transition-colors font-light tracking-wider uppercase text-sm">
                        Añadir método de pago
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Ajustes Tab */}
              {activeTab === "ajustes" && (
                <div>
                  <h2 className="text-2xl font-light tracking-wider text-black mb-6">
                    AJUSTES
                  </h2>

                  <div className="space-y-6">
                    <div className="border border-gray-200 p-6">
                      <h3 className="font-medium text-black mb-4">
                        Notificaciones
                      </h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            className="w-4 h-4"
                            defaultChecked
                          />
                          <span className="text-sm font-light">
                            Recibir emails sobre ofertas y novedades
                          </span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            className="w-4 h-4"
                            defaultChecked
                          />
                          <span className="text-sm font-light">
                            Notificaciones de pedidos
                          </span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input type="checkbox" className="w-4 h-4" />
                          <span className="text-sm font-light">
                            Recomendaciones personalizadas
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="border border-gray-200 p-6">
                      <h3 className="font-medium text-black mb-4">
                        Privacidad
                      </h3>
                      <div className="space-y-3">
                        <a
                          href="/privacidad"
                          className="block text-sm font-light text-black hover:underline"
                        >
                          Ver política de privacidad
                        </a>
                        <a
                          href="/privacidad"
                          className="block text-sm font-light text-black hover:underline"
                        >
                          Gestionar cookies
                        </a>
                        <button className="block text-sm font-light text-red-600 hover:underline">
                          Eliminar mi cuenta
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
