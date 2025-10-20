# 💎 Joyería del Val - E-commerce

Tienda online de joyería y óptica construida con React + Vite, con sistema de gestión de inventario mediante CSV/Excel.

## 🚀 Inicio Rápido

```powershell
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build para producción
npm run build
```

## 📦 Gestión de Stock

### Actualizar Productos

```powershell
# Editar productos en Excel
1. Abrir PLANTILLA-PRODUCTOS.csv
2. Editar/añadir productos
3. Guardar como CSV

# Convertir a JSON
npm run update:productos
```

### Documentación

- 📖 **[GUIA-GESTION-STOCK.md](./GUIA-GESTION-STOCK.md)** - Documentación completa
- 📝 **[STOCK-README.md](./STOCK-README.md)** - Guía rápida
- 📊 **[RESUMEN-SISTEMA-STOCK.md](./RESUMEN-SISTEMA-STOCK.md)** - Resumen ejecutivo

## ✨ Características

- ✅ Sistema de productos con múltiples imágenes
- ✅ Galería con zoom interactivo
- ✅ Gestión de stock CSV → JSON
- ✅ Compatible con Shopify desde el inicio
- ✅ Filtros por categoría, material, precio, género
- ✅ Sistema de descuentos automático
- ✅ Carrito de compra con persistencia
- ✅ Checkout integrado
- ✅ Responsive design

## 🛠️ Tecnologías

- **React 19** - UI Library
- **Vite 7** - Build tool
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **React Router 7** - Routing
- **Firebase** - Backend (opcional)

## 📂 Estructura del Proyecto

```
joyeria-optica/
├── public/
│   └── data/
│       └── productos.json          # Productos generados (AUTO)
├── src/
│   ├── pages/                      # Páginas
│   ├── components/                 # Componentes React
│   ├── api/                        # APIs y servicios
│   ├── context/                    # Context providers
│   └── hooks/                      # Custom hooks
├── scripts/
│   └── csv-to-json.js              # Script conversión CSV
├── PLANTILLA-PRODUCTOS.csv         # Editar productos aquí
└── GUIA-GESTION-STOCK.md           # Documentación
```

## 🎯 Scripts Disponibles

```powershell
npm run dev              # Servidor desarrollo
npm run build            # Build producción
npm run preview          # Preview del build
npm run lint             # Linter

# Gestión de stock
npm run update:productos              # Actualizar desde plantilla
npm run csv:convert archivo.csv       # Conversión personalizada
```

## 📸 Gestión de Imágenes

Cada producto soporta múltiples imágenes:

- Mínimo 2 imágenes por producto
- Separadas por `|` en el CSV
- Galería interactiva con zoom

## 🏷️ Categorías Soportadas

- Anillos - Pendientes - Pulseras - Colgantes
- Relojes - Gafas de Sol - Gafas de Vista

## 🔐 Firebase (Opcional)

Para autenticación y backend:

1. Crear proyecto en Firebase
2. Configurar `.env` con credenciales
3. Habilitar Authentication y Firestore

## 📱 Deploy

### Netlify / Vercel

```powershell
npm run build
# Deploy carpeta dist/
```

### Firebase Hosting

```powershell
npm run build
firebase deploy
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado - © 2025 Joyería del Val

## 📞 Contacto

Para soporte, consulta la documentación en `/docs` o contacta al equipo de desarrollo.
