// Utilidades de validación para formularios de autenticación
export const validators = {
  email: {
    required: (value) => {
      if (!value || value.trim() === "") {
        return "El email es obligatorio";
      }
      return null;
    },
    format: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Por favor, introduce un email válido";
      }
      return null;
    },
  },

  password: {
    required: (value) => {
      if (!value || value.trim() === "") {
        return "La contraseña es obligatoria";
      }
      return null;
    },
    minLength: (value) => {
      if (value && value.length < 8) {
        return "La contraseña debe tener al menos 8 caracteres";
      }
      return null;
    },
    strength: (value) => {
      if (!value) return null;

      const hasLowerCase = /[a-z]/.test(value);
      const hasUpperCase = /[A-Z]/.test(value);
      const hasNumbers = /\d/.test(value);

      if (!hasLowerCase || !hasUpperCase || !hasNumbers) {
        return "La contraseña debe contener al menos: 1 mayúscula, 1 minúscula y 1 número";
      }

      return null;
    },
  },

  confirmPassword: {
    required: (value) => {
      if (!value || value.trim() === "") {
        return "Confirma tu contraseña";
      }
      return null;
    },
    match: (value, originalPassword) => {
      if (value !== originalPassword) {
        return "Las contraseñas no coinciden";
      }
      return null;
    },
  },

  firstName: {
    required: (value) => {
      if (!value || value.trim() === "") {
        return "El nombre es obligatorio";
      }
      return null;
    },
    minLength: (value) => {
      if (value && value.trim().length < 2) {
        return "El nombre debe tener al menos 2 caracteres";
      }
      return null;
    },
    format: (value) => {
      if (value && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
        return "El nombre solo puede contener letras";
      }
      return null;
    },
  },

  lastName: {
    required: (value) => {
      if (!value || value.trim() === "") {
        return "El apellido es obligatorio";
      }
      return null;
    },
    minLength: (value) => {
      if (value && value.trim().length < 2) {
        return "El apellido debe tener al menos 2 caracteres";
      }
      return null;
    },
    format: (value) => {
      if (value && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
        return "El apellido solo puede contener letras";
      }
      return null;
    },
  },

  phone: {
    format: (value) => {
      if (!value) return null; // Opcional

      // Regex para teléfonos españoles e internacionales
      const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{9}$/;
      if (!phoneRegex.test(value.replace(/\s/g, ""))) {
        return "Introduce un número de teléfono válido";
      }
      return null;
    },
  },
};

// Función para validar un campo específico
export const validateField = (fieldName, value, allValues = {}) => {
  const fieldValidators = validators[fieldName];
  if (!fieldValidators) return null;

  for (const validator of Object.values(fieldValidators)) {
    let error;

    // Casos especiales que necesitan valores adicionales
    if (
      fieldName === "confirmPassword" &&
      validator === fieldValidators.match
    ) {
      error = validator(value, allValues.password);
    } else {
      error = validator(value);
    }

    if (error) return error;
  }

  return null;
};

// Función para validar todo el formulario
export const validateForm = (formData, mode) => {
  const errors = {};

  // Campos obligatorios según el modo
  const fieldsToValidate = {
    login: ["email", "password"],
    register: [
      "email",
      "password",
      "confirmPassword",
      "firstName",
      "lastName",
      "phone",
    ],
    forgot: ["email"],
  };

  const fields = fieldsToValidate[mode] || [];

  fields.forEach((field) => {
    const error = validateField(field, formData[field], formData);
    if (error) {
      errors[field] = error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Función para obtener la fortaleza de contraseña
export const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: "", color: "" };

  let score = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  score = Object.values(checks).filter(Boolean).length;

  if (score < 2) return { score, label: "Muy débil", color: "bg-red-500" };
  if (score < 3) return { score, label: "Débil", color: "bg-orange-500" };
  if (score < 4) return { score, label: "Media", color: "bg-yellow-500" };
  if (score < 5) return { score, label: "Fuerte", color: "bg-blue-500" };
  return { score, label: "Muy fuerte", color: "bg-green-500" };
};
