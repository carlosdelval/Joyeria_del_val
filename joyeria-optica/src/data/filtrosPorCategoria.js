export const filtrosPorCategoria = {
  relojes: {
    marca: {
      label: "Marca",
      type: "checkbox",
      options: [
        { value: "tous", label: "TOUS", count: 0 },
        { value: "casio", label: "Casio", count: 0 },
        { value: "seiko", label: "Seiko", count: 0 },
        { value: "citizen", label: "Citizen", count: 0 },
        { value: "fossil", label: "Fossil", count: 0 },
        { value: "tissot", label: "Tissot", count: 0 },
      ],
      priority: 1,
    },
    genero: {
      label: "Género",
      type: "checkbox",
      options: [
        { value: "hombre", label: "Caballero", count: 0 },
        { value: "mujer", label: "Señora", count: 0 },
        { value: "unisex", label: "Unisex", count: 0 },
      ],
      priority: 2,
    },
  },
  gafas: {
    marca: {
      label: "Marca",
      type: "checkbox",
      options: [
        { value: "tous", label: "TOUS", count: 0 },
        { value: "ray-ban", label: "Ray-Ban", count: 0 },
        { value: "dolce-gabbana", label: "Dolce & Gabbana", count: 0 },
        { value: "oakley", label: "Oakley", count: 0 },
        { value: "persol", label: "Persol", count: 0 },
        { value: "hawkers", label: "Hawkers", count: 0 },
      ],
      priority: 1,
    },
  },
  bolsos: {
    marca: {
      label: "Marca",
      type: "checkbox",
      options: [{ value: "tous", label: "TOUS", count: 0 }],
      priority: 1,
    },
  },
  todos: {},
  global: {
    precio: {
      label: "Precio",
      type: "range",
      min: 0,
      max: 1000,
      unit: "€",
      priority: 10,
    },
  },
};
