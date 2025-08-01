// src/api/productos.js
const productosData = [
  {
    id: "1",
    titulo: "Anillo oro 18k con diamantes",
    descripcion: "Anillo artesanal con diamantes y oro blanco 18k.",
    precio: 1790,
    precioAnterior: 2290,
    imagenes: ["https://image.made-in-china.com/318f0j00htBGRJpWILgY/eokbry3piqqs6m2nfnm-318774451451-mp4-264-sd-mp4.webp"],
    categorias: ["anillos", "diamantes", "bodas"],
    etiquetas: ["oro", "18k", "hecho a mano"],
    slug: "anillo-oro-18k-diamantes",
  },
  {
    id: "2",
    titulo: "Pendientes infantiles mariquita",
    descripcion: "Perfectos para los más pequeños.",
    precio: 49,
    precioAnterior: null,
    imagenes: ["https://m.media-amazon.com/images/I/61tD2xN54tL._UY1000_.jpg"],
    categorias: ["pendientes", "infantil"],
    etiquetas: ["niños", "alegría", "mariquita"],
    slug: "pendientes-infantiles-mariquita",
  },
  {
    id: "3",
    titulo: "Pendientes infantiles mariquita",
    descripcion: "Perfectos para los más pequeños.",
    precio: 49,
    precioAnterior: null,
    imagenes: ["https://m.media-amazon.com/images/I/61tD2xN54tL._UY1000_.jpg"],
    categorias: ["pendientes", "infantil"],
    etiquetas: ["niños", "alegría", "mariquita"],
    slug: "pendientes-infantiles-mariquita",
  },
  {
    id: "4",
    titulo: "Pendientes infantiles mariquita",
    descripcion: "Perfectos para los más pequeños.",
    precio: 49,
    precioAnterior: null,
    imagenes: ["https://m.media-amazon.com/images/I/61tD2xN54tL._UY1000_.jpg"],
    categorias: ["pendientes", "infantil"],
    etiquetas: ["niños", "alegría", "mariquita"],
    slug: "pendientes-infantiles-mariquita",
  },
  {
    id: "5",
    titulo: "Pendientes infantiles mariquita",
    descripcion: "Perfectos para los más pequeños.",
    precio: 49,
    precioAnterior: null,
    imagenes: ["https://m.media-amazon.com/images/I/61tD2xN54tL._UY1000_.jpg"],
    categorias: ["pendientes", "infantil"],
    etiquetas: ["niños", "alegría", "mariquita"],
    slug: "pendientes-infantiles-mariquita",
  },
  {
    id: "6",
    titulo: "Pendientes infantiles mariquita",
    descripcion: "Perfectos para los más pequeños.",
    precio: 49,
    precioAnterior: null,
    imagenes: ["https://m.media-amazon.com/images/I/61tD2xN54tL._UY1000_.jpg"],
    categorias: ["pendientes", "infantil"],
    etiquetas: ["niños", "alegría", "mariquita"],
    slug: "pendientes-infantiles-mariquita",
  },
  {
    id: "7",
    titulo: "Pendientes infantiles mariquita",
    descripcion: "Perfectos para los más pequeños.",
    precio: 49,
    precioAnterior: null,
    imagenes: ["https://m.media-amazon.com/images/I/61tD2xN54tL._UY1000_.jpg"],
    categorias: ["pendientes", "infantil"],
    etiquetas: ["niños", "alegría", "mariquita"],
    slug: "pendientes-infantiles-mariquita",
  },
];

// Función que devuelve los productos
export const fetchProductos = async ({ categoria = [], busqueda = "" }) => {
  try {
    // Simulamos retardo de red
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let resultados = productosData;
    
    // Filtrado por categoría si existe
    if (categoria.length > 0) {
      resultados = resultados.filter(producto => 
        categoria.some(cat => producto.categorias.includes(cat))
      );
    }
    
    // Búsqueda por texto (si existe)
    if (busqueda) {
      const termino = busqueda.toLowerCase();
      resultados = resultados.filter(producto => 
        producto.titulo.toLowerCase().includes(termino) ||
        producto.descripcion.toLowerCase().includes(termino) ||
        producto.categorias.some(cat => cat.toLowerCase().includes(termino)) ||
        producto.etiquetas.some(tag => tag.toLowerCase().includes(termino))
      );
    }
    
    return resultados;
  } catch (error) {
    console.error("Error fetching productos:", error);
    return [];
  }
};
