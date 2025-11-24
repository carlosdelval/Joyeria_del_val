import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import {
  validateField,
  validateForm,
  getPasswordStrength,
} from "../../utils/validators";
import { ButtonSpinner } from "../ui/Spinner";

const AuthModal = ({ isOpen, onClose, initialMode = "login" }) => {
  const [mode, setMode] = useState(initialMode); // 'login', 'register', 'forgot'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  const { login, register, loading, error, resetError } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validar campo en tiempo real si ya fue tocado
    if (touchedFields[name]) {
      const fieldError = validateField(name, value, {
        ...formData,
        [name]: value,
      });
      setFieldErrors((prev) => ({
        ...prev,
        [name]: fieldError,
      }));
    }

    if (error) resetError();
  };

  const handleFieldBlur = (fieldName) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));

    const fieldError = validateField(fieldName, formData[fieldName], formData);
    setFieldErrors((prev) => ({
      ...prev,
      [fieldName]: fieldError,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar todo el formulario
    const validation = validateForm(formData, mode);

    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      // Marcar todos los campos como tocados para mostrar errores
      const allFields = Object.keys(formData);
      const touched = {};
      allFields.forEach((field) => (touched[field] = true));
      setTouchedFields(touched);
      return;
    }

    try {
      if (mode === "login") {
        await login(formData.email, formData.password);
        onClose();
      } else if (mode === "register") {
        await register({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
        });
        onClose();
      }
    } catch (err) {
      // Error manejado por el context
      console.error("Auth error:", err);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setFormData({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      confirmPassword: "",
    });
    setFieldErrors({});
    setTouchedFields({});
    resetError();
  };

  // Componente helper para mostrar errores de campo
  const FieldError = ({ error }) => {
    if (!error) return null;
    return (
      <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
        <AlertCircle className="w-4 h-4" />
        <span>{error}</span>
      </div>
    );
  };

  // Función helper para obtener el estilo del campo según su estado
  const getFieldClassName = (fieldName) => {
    const hasError = fieldErrors[fieldName];
    const baseClass =
      "w-full py-2 pl-10 pr-4 border rounded-lg focus:ring-2 focus:border-transparent transition-colors";

    if (hasError) {
      return `${baseClass} border-red-300 focus:ring-red-500`;
    }

    return `${baseClass} border-gray-300 focus:ring-black`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-lg shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold">
                {mode === "login" && "Iniciar sesión"}
                {mode === "register" && "Crear cuenta"}
                {mode === "forgot" && "Recuperar mi contraseña"}
              </h2>
              <button
                onClick={onClose}
                className="p-2 transition-colors rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Error Message */}
              {error && (
                <div className="p-3 text-sm text-red-600 border border-red-200 rounded bg-red-50">
                  {error}
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={() => handleFieldBlur("email")}
                    className={getFieldClassName("email")}
                    placeholder="tu@email.com"
                    autoComplete="email"
                  />
                  {fieldErrors.email && !error && (
                    <AlertCircle className="absolute w-4 h-4 text-red-500 transform -translate-y-1/2 right-3 top-1/2" />
                  )}
                </div>
                <FieldError error={fieldErrors.email} />
              </div>

              {/* Nombre y Apellido (solo registro) */}
              {mode === "register" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Nombre *
                    </label>
                    <div className="relative">
                      <User className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        onBlur={() => handleFieldBlur("firstName")}
                        className={getFieldClassName("firstName")}
                        placeholder="Juan"
                        autoComplete="given-name"
                      />
                      {fieldErrors.firstName && (
                        <AlertCircle className="absolute w-4 h-4 text-red-500 transform -translate-y-1/2 right-3 top-1/2" />
                      )}
                    </div>
                    <FieldError error={fieldErrors.firstName} />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Apellido *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        onBlur={() => handleFieldBlur("lastName")}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${
                          fieldErrors.lastName
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-300 focus:ring-black"
                        }`}
                        placeholder="Pérez"
                        autoComplete="family-name"
                      />
                      {fieldErrors.lastName && (
                        <AlertCircle className="absolute w-4 h-4 text-red-500 transform -translate-y-1/2 right-3 top-1/2" />
                      )}
                    </div>
                    <FieldError error={fieldErrors.lastName} />
                  </div>
                </div>
              )}

              {/* Teléfono (solo registro) */}
              {mode === "register" && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Teléfono (opcional)
                  </label>
                  <div className="relative">
                    <Phone className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={() => handleFieldBlur("phone")}
                      className={getFieldClassName("phone")}
                      placeholder="+34 600 000 000"
                      autoComplete="tel"
                    />
                    {fieldErrors.phone && (
                      <AlertCircle className="absolute w-4 h-4 text-red-500 transform -translate-y-1/2 right-3 top-1/2" />
                    )}
                  </div>
                  <FieldError error={fieldErrors.phone} />
                </div>
              )}

              {/* Password */}
              {mode !== "forgot" && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Contraseña *
                  </label>
                  <div className="relative">
                    <Lock className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onBlur={() => handleFieldBlur("password")}
                      className={`w-full py-2 pl-10 pr-10 border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${
                        fieldErrors.password
                          ? "border-red-300 focus:ring-red-500"
                          : "border-gray-300 focus:ring-black"
                      }`}
                      autoComplete={
                        mode === "login" ? "current-password" : "new-password"
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Password Strength Indicator (solo registro) */}
                  {mode === "register" && formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">
                          Fortaleza de contraseña:
                        </span>
                        <span
                          className={`text-xs font-medium ${
                            getPasswordStrength(formData.password).score >= 4
                              ? "text-green-600"
                              : getPasswordStrength(formData.password).score >=
                                3
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {getPasswordStrength(formData.password).label}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            getPasswordStrength(formData.password).color
                          }`}
                          style={{
                            width: `${
                              (getPasswordStrength(formData.password).score /
                                5) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <FieldError error={fieldErrors.password} />
                </div>
              )}

              {/* Confirm Password (solo registro) */}
              {mode === "register" && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Confirmar Contraseña *
                  </label>
                  <div className="relative">
                    <Lock className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      onBlur={() => handleFieldBlur("confirmPassword")}
                      className={`w-full py-2 pl-10 pr-10 border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${
                        fieldErrors.confirmPassword
                          ? "border-red-300 focus:ring-red-500"
                          : "border-gray-300 focus:ring-black"
                      }`}
                      autoComplete="new-password"
                    />
                    {formData.confirmPassword &&
                      formData.password === formData.confirmPassword &&
                      !fieldErrors.confirmPassword && (
                        <CheckCircle className="absolute w-4 h-4 text-green-500 transform -translate-y-1/2 right-3 top-1/2" />
                      )}
                    {fieldErrors.confirmPassword && (
                      <AlertCircle className="absolute w-4 h-4 text-red-500 transform -translate-y-1/2 right-3 top-1/2" />
                    )}
                  </div>
                  <FieldError error={fieldErrors.confirmPassword} />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={
                  loading || Object.values(fieldErrors).some((error) => error)
                }
                className="w-full py-3 font-medium text-white transition-colors bg-black rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <ButtonSpinner color="white" label="Procesando..." />
                ) : (
                  <>
                    {mode === "login" && "Iniciar Sesión"}
                    {mode === "register" && "Crear Cuenta"}
                    {mode === "forgot" && "Enviar Enlace"}
                  </>
                )}
              </button>

              {/* Mode Switchers */}
              <div className="space-y-2 text-center">
                {mode === "login" && (
                  <>
                    <p className="text-sm text-gray-600">
                      ¿No tienes cuenta?{" "}
                      <button
                        type="button"
                        onClick={() => switchMode("register")}
                        className="font-medium text-black hover:underline cursor-pointer"
                      >
                        Regístrate aquí
                      </button>
                    </p>
                    <button
                      type="button"
                      onClick={() => switchMode("forgot")}
                      className="text-sm text-gray-500 hover:underline cursor-pointer"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </>
                )}

                {mode === "register" && (
                  <p className="text-sm text-gray-600">
                    ¿Ya tienes cuenta?{" "}
                    <button
                      type="button"
                      onClick={() => switchMode("login")}
                      className="font-medium text-black hover:underline"
                    >
                      Inicia sesión aquí
                    </button>
                  </p>
                )}

                {mode === "forgot" && (
                  <p className="text-sm text-gray-600">
                    ¿Recordaste tu contraseña?{" "}
                    <button
                      type="button"
                      onClick={() => switchMode("login")}
                      className="font-medium text-black hover:underline cursor-pointer"
                    >
                      Inicia sesión
                    </button>
                  </p>
                )}
              </div>

              {/* Terms (solo registro) */}
              {mode === "register" && (
                <p className="text-xs text-center text-gray-500">
                  Al crear una cuenta, acepto los{" "}
                  <a
                    href="/terminos-legales"
                    className="underline hover:text-black"
                  >
                    términos y condiciones
                  </a>{" "}
                  y la{" "}
                  <a href="/privacidad" className="underline hover:text-black">
                    política de privacidad
                  </a>
                </p>
              )}
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
