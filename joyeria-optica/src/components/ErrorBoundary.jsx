import { Component } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console in development
    console.error("Error capturado por ErrorBoundary:", error, errorInfo);

    // Update state with error details
    this.setState((prevState) => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1,
    }));

    // En producción, aquí enviarías el error a un servicio como Sentry
    // this.logErrorToService(error, errorInfo);
  }

  logErrorToService = (error, errorInfo) => {
    // Ejemplo: enviar a Sentry, LogRocket, etc.
    // Sentry.captureException(error, { extra: errorInfo });

    // O a tu propio backend
    fetch("/api/log-error", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: error.toString(),
        errorInfo: errorInfo.componentStack,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        url: window.location.href,
      }),
    }).catch((err) => console.error("Error logging failed:", err));
  };

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      const isDevelopment = import.meta.env.DEV;

      return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl w-full"
          >
            {/* Error Icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
                <AlertTriangle className="w-10 h-10 text-red-600" />
              </div>
              <h1 className="text-3xl font-light tracking-wider text-black mb-2">
                Algo salió mal
              </h1>
              <p className="text-gray-600 font-light">
                Lo sentimos, ha ocurrido un error inesperado. Nuestro equipo ha
                sido notificado.
              </p>
            </div>

            {/* Error Details (solo en desarrollo) */}
            {isDevelopment && this.state.error && (
              <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-sm">
                <h2 className="text-sm font-medium text-gray-900 mb-2">
                  Detalles del error (solo visible en desarrollo):
                </h2>
                <pre className="text-xs text-red-600 overflow-auto max-h-40 mb-2">
                  {this.state.error.toString()}
                </pre>
                {this.state.errorInfo && (
                  <pre className="text-xs text-gray-600 overflow-auto max-h-40">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors font-light tracking-wider uppercase text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Intentar de nuevo
              </button>

              <button
                onClick={this.handleGoHome}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black border border-gray-300 hover:bg-gray-50 transition-colors font-light tracking-wider uppercase text-sm"
              >
                <Home className="w-4 h-4" />
                Volver al inicio
              </button>

              {this.state.errorCount > 2 && (
                <button
                  onClick={this.handleReload}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors font-light text-sm"
                >
                  Recargar página completa
                </button>
              )}
            </div>

            {/* Help Text */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 font-light">
                Si el problema persiste, por favor{" "}
                <a
                  href="/contacto"
                  className="text-black underline hover:text-gray-600"
                >
                  contáctanos
                </a>
                .
              </p>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
