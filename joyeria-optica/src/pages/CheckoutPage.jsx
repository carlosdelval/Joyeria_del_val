import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  Truck,
  Lock,
  Check,
} from "lucide-react";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { formatCurrency, analytics } from "../utils/helpers";
import AuthModal from "../components/AuthModal";
import { sendOrderConfirmation } from "../services/emailService";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, subtotal, shippingCost, total, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const [shippingData, setShippingData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address1: "",
    address2: "",
    city: "",
    province: "",
    zipCode: "",
    country: "España",
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Estados de validación
  const [validationErrors, setValidationErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  // Redirigir si no hay items
  useEffect(() => {
    if (items.length === 0 && !orderComplete) {
      navigate("/");
    } else if (items.length > 0) {
      // Track inicio de checkout
      analytics.trackBeginCheckout(items, total);
    }
  }, [items.length, navigate, orderComplete, items, total]);

  // Actualizar datos del usuario cuando se autentique
  useEffect(() => {
    if (isAuthenticated && user) {
      setShippingData((prev) => ({
        ...prev,
        firstName: user.firstName || prev.firstName,
        lastName: user.lastName || prev.lastName,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
      }));
    }
  }, [isAuthenticated, user]);

  const shippingMethods = [
    {
      id: "standard",
      name: "Envío Estándar",
      description: "3-5 días laborables",
      price: subtotal >= 50 ? 0 : 4.95,
      icon: <Truck className="w-5 h-5" />,
    },
    {
      id: "express",
      name: "Envío Express",
      description: "1-2 días laborables",
      price: 9.95,
      icon: <Truck className="w-5 h-5" />,
    },
  ];

  // Funciones de validación
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "El email es requerido";
    if (!emailRegex.test(email)) return "Formato de email inválido";
    return "";
  };

  const validatePhone = (phone) => {
    if (!phone) return ""; // Opcional
    const phoneRegex = /^[+]?[\d\s\-()]{9,}$/;
    if (!phoneRegex.test(phone)) return "Formato de teléfono inválido";
    return "";
  };

  const validateZipCode = (zipCode) => {
    if (!zipCode) return "El código postal es requerido";
    const zipRegex = /^[0-9]{5}$/;
    if (!zipRegex.test(zipCode)) return "Código postal debe tener 5 dígitos";
    return "";
  };

  const validateCardNumber = (cardNumber) => {
    if (!cardNumber) return "El número de tarjeta es requerido";
    const cleanNumber = cardNumber.replace(/\s/g, "");
    if (cleanNumber.length < 16)
      return "El número de tarjeta debe tener al menos 16 dígitos";
    if (!/^\d+$/.test(cleanNumber)) return "Solo se permiten números";
    return "";
  };

  const validateExpiryDate = (expiryDate) => {
    if (!expiryDate) return "La fecha de caducidad es requerida";
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(expiryDate)) return "Formato debe ser MM/AA";

    const [month, year] = expiryDate.split("/");
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (
      parseInt(year) < currentYear ||
      (parseInt(year) === currentYear && parseInt(month) < currentMonth)
    ) {
      return "La tarjeta está caducada";
    }
    return "";
  };

  const validateCVV = (cvv) => {
    if (!cvv) return "El CVV es requerido";
    if (!/^[0-9]{3,4}$/.test(cvv)) return "CVV debe tener 3 o 4 dígitos";
    return "";
  };

  const validateField = (section, field, value) => {
    switch (`${section}.${field}`) {
      case "shipping.firstName":
        return !value ? "El nombre es requerido" : "";
      case "shipping.lastName":
        return !value ? "Los apellidos son requeridos" : "";
      case "shipping.email":
        return validateEmail(value);
      case "shipping.phone":
        return validatePhone(value);
      case "shipping.address1":
        return !value ? "La dirección es requerida" : "";
      case "shipping.city":
        return !value ? "La ciudad es requerida" : "";
      case "shipping.zipCode":
        return validateZipCode(value);
      case "payment.cardNumber":
        return validateCardNumber(value);
      case "payment.expiryDate":
        return validateExpiryDate(value);
      case "payment.cvv":
        return validateCVV(value);
      case "payment.cardName":
        return !value ? "El nombre en la tarjeta es requerido" : "";
      default:
        return "";
    }
  };

  const handleInputChange = (section, field, value) => {
    // Formatear ciertos campos automáticamente
    let formattedValue = value;

    if (section === "payment") {
      if (field === "cardNumber") {
        // Formatear número de tarjeta: 1234 5678 9012 3456
        formattedValue = value
          .replace(/\s/g, "")
          .replace(/(.{4})/g, "$1 ")
          .trim();
        if (formattedValue.length > 19)
          formattedValue = formattedValue.substring(0, 19);
      } else if (field === "expiryDate") {
        // Formatear fecha: MM/AA
        formattedValue = value
          .replace(/\D/g, "")
          .replace(/(\d{2})(\d)/, "$1/$2");
        if (formattedValue.length > 5)
          formattedValue = formattedValue.substring(0, 5);
      } else if (field === "cvv") {
        // Solo números, máximo 4 dígitos
        formattedValue = value.replace(/\D/g, "").substring(0, 4);
      }
    }

    if (section === "shipping") {
      if (field === "zipCode") {
        // Solo números, máximo 5 dígitos
        formattedValue = value.replace(/\D/g, "").substring(0, 5);
      } else if (field === "phone") {
        // Permitir números, espacios, guiones y paréntesis
        formattedValue = value.replace(/[^+\d\s\-()]/g, "");
      }
    }

    // Actualizar datos
    if (section === "shipping") {
      setShippingData((prev) => ({ ...prev, [field]: formattedValue }));
    } else if (section === "payment") {
      setPaymentData((prev) => ({ ...prev, [field]: formattedValue }));
    }

    // Marcar campo como tocado
    setTouchedFields((prev) => ({ ...prev, [`${section}.${field}`]: true }));

    // Validar campo
    const error = validateField(section, field, formattedValue);
    setValidationErrors((prev) => ({
      ...prev,
      [`${section}.${field}`]: error,
    }));
  };

  const handleBlur = (section, field) => {
    setTouchedFields((prev) => ({ ...prev, [`${section}.${field}`]: true }));
    const value =
      section === "shipping" ? shippingData[field] : paymentData[field];
    const error = validateField(section, field, value);
    setValidationErrors((prev) => ({
      ...prev,
      [`${section}.${field}`]: error,
    }));
  };

  // Función auxiliar para obtener clases CSS de input con validación
  const getInputClasses = (
    section,
    field,
    baseClasses = "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
  ) => {
    const fieldKey = `${section}.${field}`;
    const hasError = touchedFields[fieldKey] && validationErrors[fieldKey];

    if (hasError) {
      return `${baseClasses} border-red-300 focus:ring-red-500 bg-red-50`;
    }
    return `${baseClasses} border-gray-300 focus:ring-black`;
  };

  // Función para mostrar mensajes de error
  const renderFieldError = (section, field) => {
    const fieldKey = `${section}.${field}`;
    const error = validationErrors[fieldKey];
    const isTouched = touchedFields[fieldKey];

    if (isTouched && error) {
      return (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xs">
            !
          </span>
          {error}
        </p>
      );
    }
    return null;
  };

  // Función para obtener el número de errores en un paso
  const getStepErrors = (step) => {
    if (step === 1) {
      const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "address1",
        "city",
        "zipCode",
      ];
      return requiredFields.filter((field) => {
        const fieldKey = `shipping.${field}`;
        return touchedFields[fieldKey] && validationErrors[fieldKey];
      }).length;
    } else if (step === 3 && paymentMethod === "card") {
      const requiredFields = ["cardNumber", "expiryDate", "cvv", "cardName"];
      return requiredFields.filter((field) => {
        const fieldKey = `payment.${field}`;
        return touchedFields[fieldKey] && validationErrors[fieldKey];
      }).length;
    }
    return 0;
  };

  const validateStep = (step) => {
    switch (step) {
      case 1: {
        const requiredFields = [
          "firstName",
          "lastName",
          "email",
          "address1",
          "city",
          "zipCode",
        ];
        const hasAllFields = requiredFields.every(
          (field) => shippingData[field]
        );
        const hasErrors = requiredFields.some((field) =>
          validateField("shipping", field, shippingData[field])
        );
        return hasAllFields && !hasErrors;
      }
      case 2:
        return shippingMethod;
      case 3:
        if (paymentMethod === "card") {
          const requiredFields = [
            "cardNumber",
            "expiryDate",
            "cvv",
            "cardName",
          ];
          const hasAllFields = requiredFields.every(
            (field) => paymentData[field]
          );
          const hasErrors = requiredFields.some((field) =>
            validateField("payment", field, paymentData[field])
          );
          return hasAllFields && !hasErrors;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    // Validar todos los campos del paso actual antes de continuar
    if (currentStep === 1) {
      const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "address1",
        "city",
        "zipCode",
      ];
      for (const field of requiredFields) {
        setTouchedFields((prev) => ({ ...prev, [`shipping.${field}`]: true }));
        const error = validateField("shipping", field, shippingData[field]);
        setValidationErrors((prev) => ({
          ...prev,
          [`shipping.${field}`]: error,
        }));
      }
    } else if (currentStep === 3 && paymentMethod === "card") {
      const requiredFields = ["cardNumber", "expiryDate", "cvv", "cardName"];
      for (const field of requiredFields) {
        setTouchedFields((prev) => ({ ...prev, [`payment.${field}`]: true }));
        const error = validateField("payment", field, paymentData[field]);
        setValidationErrors((prev) => ({
          ...prev,
          [`payment.${field}`]: error,
        }));
      }
    }

    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    setProcessing(true);

    try {
      // Track inicio de checkout
      analytics.trackBeginCheckout(items, total);

      // Aquí se integrará con Shopify Checkout API
      const shippingMethodData = shippingMethods.find(
        (m) => m.id === shippingMethod
      );
      const finalTotal = total + (shippingMethodData?.price || 0);
      const transactionId = `ORD-${Date.now()}`;

      const orderData = {
        orderId: transactionId,
        items: items,
        shipping: shippingData,
        shippingMethod: shippingMethodData,
        payment: paymentData,
        total: finalTotal,
        customerEmail: shippingData.email,
        customerName: `${shippingData.firstName} ${shippingData.lastName}`,
        orderDate: new Date().toISOString(),
      };

      // Simular procesamiento de pago
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Order placed:", orderData);

      // Track compra completada
      const shippingPrice = shippingMethodData?.price || 0;
      const tax = total * 0.21; // IVA 21%

      analytics.trackPurchase(
        transactionId,
        finalTotal,
        "EUR",
        items,
        tax,
        shippingPrice
      );

      // 📧 Enviar email de confirmación
      try {
        const emailData = {
          orderId: transactionId,
          customerEmail: shippingData.email,
          customerName: `${shippingData.firstName} ${shippingData.lastName}`,
          items: items,
          subtotal: subtotal,
          shippingCost: shippingPrice,
          discountAmount: 0, // Si tienes cupones, añádelo aquí
          total: finalTotal,
          shippingAddress: {
            name: `${shippingData.firstName} ${shippingData.lastName}`,
            address: `${shippingData.address1}${
              shippingData.address2 ? ", " + shippingData.address2 : ""
            }`,
            city: shippingData.city,
            postalCode: shippingData.zipCode,
            phone: shippingData.phone,
          },
          paymentMethod: paymentMethod,
          orderDate: orderData.orderDate,
        };

        const emailResult = await sendOrderConfirmation(emailData);

        if (emailResult.success) {
          console.log("✅ Email de confirmación enviado");
        } else {
          console.error("❌ Error enviando email:", emailResult.error);
          // No bloqueamos el pedido si falla el email
        }
      } catch (emailError) {
        console.error("Error en servicio de email:", emailError);
        // Continuamos con el pedido aunque falle el email
      }

      setOrderComplete(true);
      clearCart();
      setCurrentStep(4);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error al procesar el pedido. Por favor, inténtalo de nuevo.");
    } finally {
      setProcessing(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-lg"
        >
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="mb-4 text-2xl font-semibold">¡Pedido Confirmado!</h2>
          <p className="mb-6 text-gray-600">
            Hemos recibido tu pedido y te enviaremos un email de confirmación en
            breve.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 font-medium text-white transition-colors bg-black rounded-lg hover:bg-gray-800 cursor-pointer"
          >
            Volver a la tienda
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl px-4 py-4 mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 transition-colors rounded-full hover:bg-gray-100 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold">Finalizar Compra</h1>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl px-4 py-6 mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-2">
            {[
              {
                number: 1,
                title: "Envío",
                icon: <MapPin className="w-4 h-4" />,
              },
              {
                number: 2,
                title: "Método",
                icon: <Truck className="w-4 h-4" />,
              },
              {
                number: 3,
                title: "Pago",
                icon: <CreditCard className="w-4 h-4" />,
              },
              {
                number: 4,
                title: "Confirmación",
                icon: <Check className="w-4 h-4" />,
              },
            ].map((step, index) => (
              <div key={step.number} className="flex items-center min-w-0">
                <div
                  className={`flex items-center gap-2 ${
                    currentStep >= step.number ? "text-black" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep >= step.number
                        ? "bg-black text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <span className="text-sm font-medium truncate">
                    {step.title}
                  </span>
                </div>
                {index < 3 && (
                  <div
                    className={`hidden sm:block w-12 h-0.5 mx-4 ${
                      currentStep > step.number ? "bg-black" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="flex items-center gap-2 text-xl font-semibold">
                    <MapPin className="w-5 h-5" />
                    Información de Envío
                  </h2>

                  {!isAuthenticated && (
                    <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                      <p className="mb-2 text-sm text-blue-700">
                        ¿Tienes cuenta? Inicia sesión para autocompletar tus
                        datos
                      </p>
                      <button
                        onClick={() => setShowAuthModal(true)}
                        className="text-sm font-medium text-blue-600 hover:underline cursor-pointer"
                      >
                        Iniciar sesión
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        value={shippingData.firstName}
                        onChange={(e) =>
                          handleInputChange(
                            "shipping",
                            "firstName",
                            e.target.value
                          )
                        }
                        onBlur={() => handleBlur("shipping", "firstName")}
                        className={getInputClasses("shipping", "firstName")}
                        placeholder="Ingresa tu nombre"
                        required
                      />
                      {renderFieldError("shipping", "firstName")}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Apellidos *
                      </label>
                      <input
                        type="text"
                        value={shippingData.lastName}
                        onChange={(e) =>
                          handleInputChange(
                            "shipping",
                            "lastName",
                            e.target.value
                          )
                        }
                        onBlur={() => handleBlur("shipping", "lastName")}
                        className={getInputClasses("shipping", "lastName")}
                        placeholder="Ingresa tus apellidos"
                        required
                      />
                      {renderFieldError("shipping", "lastName")}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={shippingData.email}
                        onChange={(e) =>
                          handleInputChange("shipping", "email", e.target.value)
                        }
                        onBlur={() => handleBlur("shipping", "email")}
                        className={getInputClasses("shipping", "email")}
                        placeholder="tu@email.com"
                        required
                      />
                      {renderFieldError("shipping", "email")}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        value={shippingData.phone}
                        onChange={(e) =>
                          handleInputChange("shipping", "phone", e.target.value)
                        }
                        onBlur={() => handleBlur("shipping", "phone")}
                        className={getInputClasses("shipping", "phone")}
                        placeholder="+34 600 000 000"
                      />
                      {renderFieldError("shipping", "phone")}
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Dirección *
                    </label>
                    <input
                      type="text"
                      value={shippingData.address1}
                      onChange={(e) =>
                        handleInputChange(
                          "shipping",
                          "address1",
                          e.target.value
                        )
                      }
                      onBlur={() => handleBlur("shipping", "address1")}
                      placeholder="Calle, número, piso..."
                      className={getInputClasses("shipping", "address1")}
                      required
                    />
                    {renderFieldError("shipping", "address1")}
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Información adicional
                    </label>
                    <input
                      type="text"
                      value={shippingData.address2}
                      onChange={(e) =>
                        handleInputChange(
                          "shipping",
                          "address2",
                          e.target.value
                        )
                      }
                      placeholder="Edificio, empresa, etc. (opcional)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Ciudad *
                      </label>
                      <input
                        type="text"
                        value={shippingData.city}
                        onChange={(e) =>
                          handleInputChange("shipping", "city", e.target.value)
                        }
                        onBlur={() => handleBlur("shipping", "city")}
                        className={getInputClasses("shipping", "city")}
                        placeholder="Madrid"
                        required
                      />
                      {renderFieldError("shipping", "city")}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Provincia
                      </label>
                      <input
                        type="text"
                        value={shippingData.province}
                        onChange={(e) =>
                          handleInputChange(
                            "shipping",
                            "province",
                            e.target.value
                          )
                        }
                        className={getInputClasses("shipping", "province")}
                        placeholder="Madrid"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Código Postal *
                      </label>
                      <input
                        type="text"
                        value={shippingData.zipCode}
                        onChange={(e) =>
                          handleInputChange(
                            "shipping",
                            "zipCode",
                            e.target.value
                          )
                        }
                        onBlur={() => handleBlur("shipping", "zipCode")}
                        className={getInputClasses("shipping", "zipCode")}
                        placeholder="28001"
                        required
                      />
                      {renderFieldError("shipping", "zipCode")}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Shipping Method */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="flex items-center gap-2 text-xl font-semibold">
                    <Truck className="w-5 h-5" />
                    Método de Envío
                  </h2>

                  <div className="space-y-3">
                    {shippingMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                          shippingMethod === method.id
                            ? "border-black bg-gray-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value={method.id}
                            checked={shippingMethod === method.id}
                            onChange={(e) => setShippingMethod(e.target.value)}
                            className="text-black focus:ring-black"
                          />
                          {method.icon}
                          <div>
                            <div className="font-medium">{method.name}</div>
                            <div className="text-sm text-gray-600">
                              {method.description}
                            </div>
                          </div>
                        </div>
                        <div className="font-medium">
                          {method.price === 0
                            ? "Gratis"
                            : formatCurrency(method.price)}
                        </div>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="flex items-center gap-2 text-xl font-semibold">
                    <CreditCard className="w-5 h-5" />
                    Información de Pago
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Lock className="w-4 h-4" />
                      Tu información de pago está protegida con cifrado SSL
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Número de Tarjeta *
                      </label>
                      <input
                        type="text"
                        value={paymentData.cardNumber}
                        onChange={(e) =>
                          handleInputChange(
                            "payment",
                            "cardNumber",
                            e.target.value
                          )
                        }
                        onBlur={() => handleBlur("payment", "cardNumber")}
                        placeholder="1234 5678 9012 3456"
                        className={getInputClasses("payment", "cardNumber")}
                        maxLength="19"
                        required
                      />
                      {renderFieldError("payment", "cardNumber")}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Fecha de Caducidad *
                        </label>
                        <input
                          type="text"
                          value={paymentData.expiryDate}
                          onChange={(e) =>
                            handleInputChange(
                              "payment",
                              "expiryDate",
                              e.target.value
                            )
                          }
                          onBlur={() => handleBlur("payment", "expiryDate")}
                          placeholder="MM/AA"
                          className={getInputClasses("payment", "expiryDate")}
                          maxLength="5"
                          required
                        />
                        {renderFieldError("payment", "expiryDate")}
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          CVV *
                        </label>
                        <input
                          type="text"
                          value={paymentData.cvv}
                          onChange={(e) =>
                            handleInputChange("payment", "cvv", e.target.value)
                          }
                          onBlur={() => handleBlur("payment", "cvv")}
                          placeholder="123"
                          className={getInputClasses("payment", "cvv")}
                          maxLength="4"
                          required
                        />
                        {renderFieldError("payment", "cvv")}
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Nombre en la Tarjeta *
                      </label>
                      <input
                        type="text"
                        value={paymentData.cardName}
                        onChange={(e) =>
                          handleInputChange(
                            "payment",
                            "cardName",
                            e.target.value
                          )
                        }
                        onBlur={() => handleBlur("payment", "cardName")}
                        placeholder="Juan Pérez"
                        className={getInputClasses("payment", "cardName")}
                        required
                      />
                      {renderFieldError("payment", "cardName")}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                {currentStep > 1 ? (
                  <button
                    onClick={prevStep}
                    className="px-6 py-2 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    Anterior
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <button
                    onClick={nextStep}
                    disabled={!validateStep(currentStep)}
                    className="px-6 py-2 text-white transition-colors bg-black rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Continuar
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={!validateStep(currentStep) || processing}
                    className="px-6 py-2 text-white transition-colors bg-black rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {processing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
                        Procesando...
                      </div>
                    ) : (
                      "Confirmar Pedido"
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky p-6 bg-white border border-gray-200 rounded-lg shadow-sm top-6">
              <h3 className="mb-4 text-lg font-semibold">Resumen del Pedido</h3>

              {/* Items */}
              <div className="mb-6 space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.imagen}
                      alt={item.titulo}
                      className="object-cover w-12 h-12 bg-gray-100 rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item.titulo}
                      </p>
                      <p className="text-sm text-gray-600">
                        Cantidad: {item.quantity}
                      </p>
                    </div>
                    <div className="text-sm font-medium">
                      {formatCurrency(item.precio * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="pt-4 space-y-2 text-sm border-t border-gray-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span>
                    {currentStep >= 2 && shippingMethod
                      ? shippingMethods.find((m) => m.id === shippingMethod)
                          ?.price === 0
                        ? "Gratis"
                        : formatCurrency(
                            shippingMethods.find((m) => m.id === shippingMethod)
                              ?.price || 0
                          )
                      : "Calculando..."}
                  </span>
                </div>
                <div className="flex justify-between pt-2 text-lg font-semibold border-t border-gray-200">
                  <span>Total</span>
                  <span>
                    {formatCurrency(
                      subtotal +
                        (currentStep >= 2 && shippingMethod
                          ? shippingMethods.find((m) => m.id === shippingMethod)
                              ?.price || 0
                          : 0)
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="login"
      />
    </div>
  );
};

export default CheckoutPage;
