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
  "black-friday": {
    categoria: {
      label: "Categoría",
      type: "checkbox",
      options: [
        { value: "relojes", label: "Relojes" },
        { value: "gafas", label: "Gafas" },
        { value: "bolsos", label: "Bolsos" },
      ],
      priority: 1,
    },
    descuento: {
      label: "Descuento",
      type: "checkbox",
      options: [
        { value: "40", label: "Hasta 40% OFF" },
        { value: "30", label: "Hasta 30% OFF" },
        { value: "20", label: "Hasta 20% OFF" },
      ],
      priority: 2,
    },
    marca: {
      label: "Marca",
      type: "checkbox",
      options: [
        { value: "tous", label: "TOUS" },
        { value: "ray-ban", label: "Ray-Ban" },
        { value: "dolce-gabbana", label: "Dolce & Gabbana" },
        { value: "tommy hilfiger", label: "Tommy Hilfiger" },
        { value: "seiko", label: "Seiko" },
        { value: "citizen", label: "Citizen" },
      ],
      priority: 3,
    },
    genero: {
      label: "Género",
      type: "checkbox",
      options: [
        { value: "hombre", label: "Caballero" },
        { value: "mujer", label: "Señora" },
        { value: "unisex", label: "Unisex" },
      ],
      priority: 4,
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
