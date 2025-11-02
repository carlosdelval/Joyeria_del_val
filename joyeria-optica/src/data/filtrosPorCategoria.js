export const filtrosPorCategoria = {
  relojes: {
    marca: {
      label: "Marca",
      type: "checkbox",
      options: [
        { value: "tous", label: "TOUS" },
        { value: "tommy hilfiger", label: "Tommy Hilfiger" },
        { value: "seiko", label: "Seiko" },
        { value: "citizen", label: "Citizen" },
        { value: "lacoste", label: "Lacoste" },
        { value: "orient", label: "Orient" },
        { value: "viceroy", label: "Viceroy" },
        { value: "maserati", label: "Maserati" },
      ],
      priority: 1,
    },
    genero: {
      label: "Género",
      type: "checkbox",
      options: [
        { value: "hombre", label: "Caballero" },
        { value: "mujer", label: "Señora" },
        { value: "unisex", label: "Unisex" },
      ],
      priority: 2,
    },
  },
  gafas: {
    marca: {
      label: "Marca",
      type: "checkbox",
      options: [
        { value: "tous", label: "TOUS" },
        { value: "ray-ban", label: "Ray-Ban" },
        { value: "dolce-gabbana", label: "Dolce & Gabbana" },
        { value: "persol", label: "Persol" },
      ],
      priority: 1,
    },
    genero: {
      label: "Género",
      type: "checkbox",
      options: [
        { value: "hombre", label: "Caballero" },
        { value: "mujer", label: "Señora" },
        { value: "unisex", label: "Unisex" },
      ],
      priority: 2,
    },
  },
  bolsos: {
    marca: {
      label: "Marca",
      type: "checkbox",
      options: [{ value: "tous", label: "TOUS" }],
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
      step: 10,
      unit: "€",
      priority: 10,
    },
  },
};
