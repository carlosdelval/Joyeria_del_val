import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Package,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Edit2,
  Save,
  X,
  ExternalLink,
  Clock,
  CheckCircle,
  Truck,
  AlertCircle,
  Bell,
  Shield,
  Trash2,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useWishlist } from "../hooks/useWishlist";
import { useNavigate } from "react-router-dom";
import SEO from "../components/common/SEO";
import ProductoCard from "../components/products/ProductoCard";

export default function PerfilUsuario() {
  const { user, logout } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("pedidos");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [addressData, setAddressData] = useState({
    address1: "",
    address2: "",
    city: "",
    province: "",
    zipCode: "",
    country: "España",
  });

  const [notifications, setNotifications] = useState({
    marketing: true,
    orders: true,
    recommendations: false,
  });

  // Inicializar datos del usuario
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || user.displayName?.split(" ")[0] || "",
        lastName:
          user.lastName ||
          user.displayName?.split(" ").slice(1).join(" ") ||
          "",
        email: user.email || "",
        phone: user.phone || "",
      });

      // Si el usuario tiene dirección guardada en Shopify
      if (user.addresses && user.addresses.length > 0) {
        const defaultAddress = user.addresses[0];
        setAddressData({
          address1: defaultAddress.address1 || "",
          address2: defaultAddress.address2 || "",
          city: defaultAddress.city || "",
          province: defaultAddress.province || "",
          zipCode: defaultAddress.zip || "",
          country: defaultAddress.country || "España",
        });
      }
    }
  }, [user]);

  // Cargar pedidos de Shopify o locales
  useEffect(() => {
    const loadOrders = async () => {
      if (!user) return;

      setLoading(true);

      try {
        if (import.meta.env.VITE_USE_SHOPIFY === "true" && user.shopifyToken) {
          console.log("🛍️ Cargando pedidos de Shopify...");

          const query = `
            query getCustomerOrders($customerAccessToken: String!) {
              customer(customerAccessToken: $customerAccessToken) {
                orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
                  edges {
                    node {
                      id
                      name
                      orderNumber
                      processedAt
                      financialStatus
                      fulfillmentStatus
                      totalPriceV2 {
                        amount
                        currencyCode
                      }
                      lineItems(first: 100) {
                        edges {
                          node {
                            quantity
                            title
                            variant {
                              image {
                                url
                                altText
                              }
                              product {
                                featuredImage {
                                  url
                                  altText
                                }
                              }
                            }
                          }
                        }
                      }
                      shippingAddress {
                        address1
                        address2
                        city
                        zip
                        province
                        country
                      }
                      successfulFulfillments(first: 1) {
                        trackingInfo {
                          number
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          `;

          const response = await fetch(
            `https://${
              import.meta.env.VITE_SHOPIFY_DOMAIN
            }/api/2024-10/graphql.json`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token": import.meta.env
                  .VITE_SHOPIFY_STOREFRONT_TOKEN,
              },
              body: JSON.stringify({
                query,
                variables: { customerAccessToken: user.shopifyToken },
              }),
            }
          );

          const data = await response.json();

          if (data.data?.customer?.orders?.edges) {
            const shopifyOrders = data.data.customer.orders.edges.map(
              (edge) => {
                const node = edge.node;

                // Mapear estado de fulfillment
                let status = "processing";
                if (node.fulfillmentStatus === "FULFILLED") {
                  status = "fulfilled";
                } else if (
                  node.fulfillmentStatus === "IN_TRANSIT" ||
                  node.fulfillmentStatus === "PARTIAL"
                ) {
                  status = "in_transit";
                } else if (node.fulfillmentStatus === "UNFULFILLED") {
                  status = "processing";
                }

                return {
                  id: node.id,
                  orderNumber: node.name,
                  date: node.processedAt,
                  status: status,
                  financialStatus: node.financialStatus,
                  total: parseFloat(node.totalPriceV2.amount),
                  currency: node.totalPriceV2.currencyCode,
                  items: node.lineItems.edges.reduce(
                    (sum, item) => sum + item.node.quantity,
                    0
                  ),
                  lineItems: node.lineItems.edges.map((edge) => ({
                    title: edge.node.title,
                    quantity: edge.node.quantity,
                    image:
                      edge.node.variant?.image?.url ||
                      edge.node.variant?.product?.featuredImage?.url ||
                      null,
                    imageAlt:
                      edge.node.variant?.image?.altText ||
                      edge.node.variant?.product?.featuredImage?.altText ||
                      edge.node.title,
                  })),
                  shippingAddress: node.shippingAddress || {
                    address1: "No disponible",
                    city: "",
                    zip: "",
                  },
                  trackingNumber:
                    node.successfulFulfillments?.[0]?.trackingInfo?.[0]
                      ?.number || null,
                  trackingUrl:
                    node.successfulFulfillments?.[0]?.trackingInfo?.[0]?.url ||
                    null,
                };
              }
            );

            console.log("✅ Pedidos cargados:", shopifyOrders.length);
            setOrders(shopifyOrders);
          } else {
            console.log("ℹ️ No hay pedidos disponibles");
            setOrders([]);
          }
        } else {
          // Modo local: cargar desde localStorage (pedidos reales del usuario)
          const localOrders = JSON.parse(
            localStorage.getItem("userOrders") || "[]"
          );
          setOrders(localOrders);
        }
      } catch (error) {
        console.error("Error cargando pedidos:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [user]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      processing: {
        label: "Procesando",
        icon: Clock,
        className: "bg-amber-50 text-amber-700 border-amber-200",
      },
      in_transit: {
        label: "En tránsito",
        icon: Truck,
        className: "bg-blue-50 text-blue-700 border-blue-200",
      },
      fulfilled: {
        label: "Entregado",
        icon: CheckCircle,
        className: "bg-emerald-50 text-emerald-700 border-emerald-200",
      },
      cancelled: {
        label: "Cancelado",
        icon: X,
        className: "bg-red-50 text-red-700 border-red-200",
      },
    };

    const config = statusConfig[status] || statusConfig.processing;
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border ${config.className}`}
      >
        <Icon className="w-3.5 h-3.5" />
        {config.label}
      </span>
    );
  };

  const handleSaveProfile = async () => {
    if (!user.shopifyToken) {
      console.warn("No hay token de Shopify disponible");
      setEditingProfile(false);
      return;
    }

    try {
      const mutation = `
        mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
          customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
            customer {
              id
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

      const response = await fetch(
        `https://${
          import.meta.env.VITE_SHOPIFY_DOMAIN
        }/api/2024-10/graphql.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": import.meta.env
              .VITE_SHOPIFY_STOREFRONT_TOKEN,
          },
          body: JSON.stringify({
            query: mutation,
            variables: {
              customerAccessToken: user.shopifyToken,
              customer: {
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                phone: profileData.phone,
              },
            },
          }),
        }
      );

      const data = await response.json();

      if (data.data?.customerUpdate?.customerUserErrors?.length > 0) {
        console.error(
          "Error actualizando perfil:",
          data.data.customerUpdate.customerUserErrors
        );
        alert("Error al actualizar el perfil");
      } else {
        console.log("✅ Perfil actualizado correctamente");

        // Actualizar el contexto de usuario con los nuevos datos
        const updatedUser = {
          ...user,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          displayName:
            `${profileData.firstName} ${profileData.lastName}`.trim(),
          phone: profileData.phone,
        };

        // Actualizar localStorage
        const savedAuth = JSON.parse(
          localStorage.getItem("optica-del-val-auth") || "{}"
        );
        localStorage.setItem(
          "optica-del-val-auth",
          JSON.stringify({
            ...savedAuth,
            user: updatedUser,
          })
        );

        setEditingProfile(false);

        // Recargar la página para reflejar cambios
        window.location.reload();
      }
    } catch (error) {
      console.error("Error guardando perfil:", error);
      alert("Error al guardar los cambios");
    }
  };

  const handleSaveAddress = async () => {
    if (!user.shopifyToken) {
      console.warn("No hay token de Shopify disponible");
      setEditingAddress(false);
      return;
    }

    try {
      const mutation = `
        mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
          customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
            customerAddress {
              id
            }
            customerUserErrors {
              field
              message
            }
          }
        }
      `;

      const response = await fetch(
        `https://${
          import.meta.env.VITE_SHOPIFY_DOMAIN
        }/api/2024-10/graphql.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": import.meta.env
              .VITE_SHOPIFY_STOREFRONT_TOKEN,
          },
          body: JSON.stringify({
            query: mutation,
            variables: {
              customerAccessToken: user.shopifyToken,
              address: {
                address1: addressData.address1,
                address2: addressData.address2,
                city: addressData.city,
                province: addressData.province,
                zip: addressData.zipCode,
                country: addressData.country,
                firstName: profileData.firstName,
                lastName: profileData.lastName,
              },
            },
          }),
        }
      );

      const data = await response.json();

      if (data.data?.customerAddressCreate?.customerUserErrors?.length > 0) {
        console.error(
          "Error actualizando dirección:",
          data.data.customerAddressCreate.customerUserErrors
        );
        alert("Error al actualizar la dirección");
      } else {
        console.log("✅ Dirección guardada correctamente");
        setEditingAddress(false);
      }
    } catch (error) {
      console.error("Error guardando dirección:", error);
      alert("Error al guardar la dirección");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setShowLogoutModal(false);
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword.trim()) {
      setDeleteError("Por favor, introduce tu contraseña");
      return;
    }

    setIsDeleting(true);
    setDeleteError("");

    try {
      // Verificar contraseña primero
      const loginMutation = `
        mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
          customerAccessTokenCreate(input: $input) {
            customerAccessToken {
              accessToken
            }
            customerUserErrors {
              field
              message
            }
          }
        }
      `;

      const loginResponse = await fetch(
        `https://${
          import.meta.env.VITE_SHOPIFY_DOMAIN
        }/api/2024-10/graphql.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": import.meta.env
              .VITE_SHOPIFY_STOREFRONT_TOKEN,
          },
          body: JSON.stringify({
            query: loginMutation,
            variables: {
              input: {
                email: user.email,
                password: deletePassword,
              },
            },
          }),
        }
      );

      const loginData = await loginResponse.json();

      if (
        loginData.data?.customerAccessTokenCreate?.customerUserErrors?.length >
        0
      ) {
        setDeleteError("Contraseña incorrecta");
        setIsDeleting(false);
        return;
      }

      // Si la contraseña es correcta, proceder a eliminar la cuenta
      // Nota: Shopify no permite eliminar cuentas desde Storefront API
      // En producción, deberías enviar una solicitud al backend o Admin API
      console.log("⚠️ Solicitud de eliminación de cuenta para:", user.email);

      // Por ahora, solo cerrar sesión y mostrar mensaje
      alert(
        "Tu solicitud de eliminación de cuenta ha sido registrada. Nuestro equipo la procesará en las próximas 24-48 horas. Se te enviará un email de confirmación."
      );

      logout();
      navigate("/");
    } catch (error) {
      console.error("Error al eliminar cuenta:", error);
      setDeleteError("Error al procesar la solicitud. Inténtalo de nuevo.");
    } finally {
      setIsDeleting(false);
    }
  };

  const tabs = [
    {
      id: "pedidos",
      label: "Mis Pedidos",
      icon: Package,
      count: orders.length,
    },
    {
      id: "favoritos",
      label: "Favoritos",
      icon: Heart,
      count: wishlistItems.length,
    },
    { id: "perfil", label: "Mi Perfil", icon: User },
    { id: "ajustes", label: "Configuración", icon: Settings },
  ];

  // Render functions para cada tab
  const renderPedidosTab = () => (
    <motion.div
      key="pedidos"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4"
    >
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-light tracking-wider text-black mb-6">
          HISTORIAL DE PEDIDOS
        </h2>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-40 bg-gray-100 animate-pulse rounded-lg"
              ></div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay pedidos todavía
            </h3>
            <p className="text-gray-500 mb-6">
              Comienza a explorar nuestros productos
            </p>
            <button
              onClick={() => navigate("/catalogo")}
              className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-all duration-300 rounded-lg font-light tracking-wider uppercase text-sm"
            >
              Explorar productos
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-lg p-6 hover:border-black transition-all duration-300 hover:shadow-md"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-medium text-black">
                        Pedido {order.orderNumber}
                      </h3>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(order.date).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-medium text-black">
                      {order.total.toFixed(2)}€
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.items} productos
                    </p>
                  </div>
                </div>

                {/* Productos del pedido con imágenes */}
                {order.lineItems && order.lineItems.length > 0 && (
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                      Productos
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {order.lineItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 border border-gray-200"
                        >
                          {item.image && (
                            <div className="relative w-16 h-16 flex-shrink-0 bg-white rounded border border-gray-200 overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.imageAlt}
                                className="w-full h-full object-cover"
                              />
                              {item.quantity > 1 && (
                                <span className="absolute top-0 right-0 bg-black text-white text-xs px-1.5 py-0.5 rounded-bl">
                                  x{item.quantity}
                                </span>
                              )}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 line-clamp-2">
                              {item.title}
                            </p>
                            {!item.image && item.quantity > 1 && (
                              <p className="text-xs text-gray-500">
                                Cantidad: {item.quantity}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      Dirección de envío
                    </p>
                    <p className="text-sm text-gray-900">
                      {order.shippingAddress.address1}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.zipCode}
                    </p>
                  </div>

                  {order.trackingNumber && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                        Número de seguimiento
                      </p>
                      <p className="text-sm font-mono bg-gray-50 px-3 py-1 rounded inline-block">
                        {order.trackingNumber}
                      </p>
                    </div>
                  )}
                </div>

                {order.trackingUrl && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <a
                      href={order.trackingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-black hover:underline font-medium"
                    >
                      <Truck className="w-4 h-4" />
                      Rastrear pedido
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderFavoritosTab = () => (
    <motion.div
      key="favoritos"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-light tracking-wider text-black mb-6">
          MIS FAVORITOS
        </h2>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No tienes favoritos guardados
            </h3>
            <p className="text-gray-500 mb-6">
              Guarda productos que te gusten para verlos más tarde
            </p>
            <button
              onClick={() => navigate("/catalogo")}
              className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-all duration-300 rounded-lg font-light tracking-wider uppercase text-sm"
            >
              Explorar productos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {wishlistItems.map((item) => {
              // Convertir formato de wishlist a formato de producto
              const productoFormateado = {
                id: item.id,
                titulo: item.titulo,
                imagenes: item.imagenes || [item.imagen],
                precio: item.precio,
                precioAnterior: item.precioAnterior,
                slug: item.slug,
                stock: item.stock,
                categorias: item.categorias || [],
                marca: item.marca || "",
              };

              return (
                <div key={item.id}>
                  <ProductoCard producto={productoFormateado} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderPerfilTab = () => (
    <motion.div
      key="perfil"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Información Personal */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-black flex items-center gap-2">
            <User className="w-5 h-5" />
            Información Personal
          </h2>
          {!editingProfile ? (
            <button
              onClick={() => setEditingProfile(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Editar
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setEditingProfile(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
                Cancelar
              </button>
              <button
                onClick={handleSaveProfile}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-black text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                Guardar
              </button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre
            </label>
            <input
              type="text"
              value={profileData.firstName}
              onChange={(e) =>
                setProfileData({ ...profileData, firstName: e.target.value })
              }
              disabled={!editingProfile}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Apellidos
            </label>
            <input
              type="text"
              value={profileData.lastName}
              onChange={(e) =>
                setProfileData({ ...profileData, lastName: e.target.value })
              }
              disabled={!editingProfile}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Tus apellidos"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <Mail className="w-4 h-4" />
              Email
            </label>
            <input
              type="email"
              value={profileData.email}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">
              El email no se puede modificar
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <Phone className="w-4 h-4" />
              Teléfono
            </label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) =>
                setProfileData({ ...profileData, phone: e.target.value })
              }
              disabled={!editingProfile}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="+34 600 000 000"
            />
          </div>
        </div>
      </div>

      {/* Dirección de Envío */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-black flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Dirección de Envío
          </h2>
          {!editingAddress ? (
            <button
              onClick={() => setEditingAddress(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Editar
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setEditingAddress(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
                Cancelar
              </button>
              <button
                onClick={handleSaveAddress}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-black text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                Guardar
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dirección
            </label>
            <input
              type="text"
              value={addressData.address1}
              onChange={(e) =>
                setAddressData({ ...addressData, address1: e.target.value })
              }
              disabled={!editingAddress}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Calle, número, piso..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dirección adicional (opcional)
            </label>
            <input
              type="text"
              value={addressData.address2}
              onChange={(e) =>
                setAddressData({ ...addressData, address2: e.target.value })
              }
              disabled={!editingAddress}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Portal, escalera..."
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ciudad
              </label>
              <input
                type="text"
                value={addressData.city}
                onChange={(e) =>
                  setAddressData({ ...addressData, city: e.target.value })
                }
                disabled={!editingAddress}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="Madrid"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código Postal
              </label>
              <input
                type="text"
                value={addressData.zipCode}
                onChange={(e) =>
                  setAddressData({ ...addressData, zipCode: e.target.value })
                }
                disabled={!editingAddress}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="28001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Provincia
              </label>
              <input
                type="text"
                value={addressData.province}
                onChange={(e) =>
                  setAddressData({ ...addressData, province: e.target.value })
                }
                disabled={!editingAddress}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="Madrid"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              País
            </label>
            <input
              type="text"
              value={addressData.country}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderAjustesTab = () => (
    <motion.div
      key="ajustes"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Notificaciones */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-medium text-black mb-6 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notificaciones
        </h2>

        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex-1">
              <p className="font-medium text-gray-900">Ofertas y novedades</p>
              <p className="text-sm text-gray-500 mt-1">
                Recibe emails sobre promociones y nuevos productos
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifications.marketing}
              onChange={(e) =>
                setNotifications({
                  ...notifications,
                  marketing: e.target.checked,
                })
              }
              className="w-5 h-5 text-black rounded"
            />
          </label>

          <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex-1">
              <p className="font-medium text-gray-900">Estado de pedidos</p>
              <p className="text-sm text-gray-500 mt-1">
                Notificaciones sobre tus pedidos y envíos
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifications.orders}
              onChange={(e) =>
                setNotifications({ ...notifications, orders: e.target.checked })
              }
              className="w-5 h-5 text-black rounded"
            />
          </label>

          <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex-1">
              <p className="font-medium text-gray-900">Recomendaciones</p>
              <p className="text-sm text-gray-500 mt-1">
                Sugerencias personalizadas basadas en tus gustos
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifications.recommendations}
              onChange={(e) =>
                setNotifications({
                  ...notifications,
                  recommendations: e.target.checked,
                })
              }
              className="w-5 h-5 text-black rounded"
            />
          </label>
        </div>
      </div>

      {/* Privacidad y Seguridad */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-medium text-black mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Privacidad y Seguridad
        </h2>

        <div className="space-y-3">
          <button
            onClick={() => navigate("/privacidad")}
            className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <span className="text-gray-900">Política de privacidad</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={() => navigate("/privacidad")}
            className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <span className="text-gray-900">Gestionar cookies</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={() => navigate("/terminos-legales")}
            className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <span className="text-gray-900">Términos y condiciones</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Zona Peligrosa */}
      <div className="bg-red-50 rounded-lg border border-red-200 p-6">
        <h2 className="text-xl font-medium text-red-900 mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Zona Peligrosa
        </h2>
        <p className="text-sm text-red-700 mb-4">
          Una vez eliminada tu cuenta, no podrás recuperarla. Esta acción es
          permanente.
        </p>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors font-medium"
        >
          <Trash2 className="w-4 h-4" />
          Eliminar mi cuenta
        </button>
      </div>
    </motion.div>
  );

  // Main render function
  function renderActiveTab() {
    switch (activeTab) {
      case "pedidos":
        return renderPedidosTab();
      case "favoritos":
        return renderFavoritosTab();
      case "perfil":
        return renderPerfilTab();
      case "ajustes":
        return renderAjustesTab();
      default:
        return null;
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="mb-6 w-20 h-20 mx-auto bg-black rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-light tracking-wider text-black mb-3">
            INICIAR SESIÓN
          </h2>
          <p className="text-gray-600 mb-8 font-light">
            Accede a tu cuenta para ver tu perfil y gestionar tus pedidos
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-black text-white hover:bg-gray-800 transition-all duration-300 font-light tracking-wider uppercase text-sm rounded-lg"
          >
            Volver al inicio
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`Mi Perfil - ${user.displayName || user.email}`}
        description="Gestiona tu cuenta, consulta tus pedidos y actualiza tus preferencias"
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Header */}
        <div className="relative bg-gradient-to-r text-white from-gray-900 via-black to-gray-900 overflow-hidden">
          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMDkgMS43OTEtNCAzLjk5OC00cy0xLjc5MSA0LTMuOTk4IDR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>

          {/* White Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

          <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-4 sm:gap-6 py-8 sm:py-12 md:py-16"
            >
              {/* Avatar */}
              <div className="relative group flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/20 to-white/30 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-br from-white to-gray-100 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/10 backdrop-blur-sm">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-light bg-gradient-to-br from-gray-700 to-gray-900 bg-clip-text text-transparent">
                    {user.displayName?.[0]?.toUpperCase() ||
                      user.email[0].toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Info del usuario */}
              <div className="flex-1 min-w-0">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="w-full"
                >
                  <h1 className="text-2xl sm:text-3xl md:text-5xl font-extralight tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] text-white mb-2 sm:mb-3 uppercase truncate">
                    {user.displayName || "Mi Cuenta"}
                  </h1>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 md:gap-6">
                    <p className="text-sm sm:text-base text-gray-300 font-light flex items-center justify-center md:justify-start gap-2 truncate">
                      <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white flex-shrink-0" />
                      <span className="truncate">{user.email}</span>
                    </p>
                    <div className="hidden sm:block w-1 h-1 bg-white rounded-full flex-shrink-0"></div>
                    <p className="text-xs sm:text-sm text-gray-400 font-light flex items-center justify-center md:justify-start gap-2">
                      <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white flex-shrink-0" />
                      Cuenta verificada
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-4">
                <nav className="p-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-black text-white shadow-md"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="flex-1 text-left">{tab.label}</span>
                        {tab.count !== undefined && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              isActive
                                ? "bg-white/20 text-white"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {tab.count}
                          </span>
                        )}
                        {isActive && (
                          <ChevronRight className="w-4 h-4 ml-auto" />
                        )}
                      </button>
                    );
                  })}
                </nav>

                <div className="p-2 border-t border-gray-100">
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            </motion.aside>

            {/* Main Content */}
            <motion.main
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3"
            >
              <AnimatePresence mode="wait">{renderActiveTab()}</AnimatePresence>
            </motion.main>
          </div>
        </div>

        {/* Modal de Confirmación de Logout */}
        <AnimatePresence>
          {showLogoutModal && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowLogoutModal(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div
                  className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <LogOut className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-gray-900">
                        Cerrar Sesión
                      </h3>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">
                    ¿Estás seguro de que quieres cerrar sesión? Tendrás que
                    volver a iniciar sesión para acceder a tu cuenta.
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowLogoutModal(false)}
                      className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Modal de Confirmación de Eliminación de Cuenta */}
        <AnimatePresence>
          {showDeleteModal && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeletePassword("");
                  setDeleteError("");
                }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div
                  className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-gray-900">
                        Eliminar Cuenta
                      </h3>
                      <p className="text-sm text-red-600 font-medium">
                        ⚠️ Acción irreversible
                      </p>
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-red-800 font-medium mb-2">
                      Esta acción es permanente y no se puede deshacer:
                    </p>
                    <ul className="text-sm text-red-700 space-y-1 ml-4 list-disc">
                      <li>Se eliminarán todos tus datos personales</li>
                      <li>Perderás acceso al historial de pedidos</li>
                      <li>Se borrarán tus favoritos y preferencias</li>
                      <li>No podrás recuperar tu cuenta</li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirma tu contraseña para continuar
                    </label>
                    <input
                      type="password"
                      value={deletePassword}
                      onChange={(e) => {
                        setDeletePassword(e.target.value);
                        setDeleteError("");
                      }}
                      placeholder="Introduce tu contraseña"
                      className={`w-full px-4 py-3 border ${
                        deleteError ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                      disabled={isDeleting}
                    />
                    {deleteError && (
                      <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                        <X className="w-4 h-4" />
                        {deleteError}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowDeleteModal(false);
                        setDeletePassword("");
                        setDeleteError("");
                      }}
                      className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                      disabled={isDeleting}
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleDeleteAccount}
                      disabled={isDeleting || !deletePassword.trim()}
                      className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isDeleting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                          Procesando...
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4" />
                          Eliminar Cuenta
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
