import { useNavigate } from "react-router-dom";

export default function GridMarcas() {
  const navigate = useNavigate();

  const marcas = [
    {
      nombre: "Ray-Ban",
      imagen: "/rayban.jpg",
      categoria: "rayban",
    },
    {
      nombre: "TOUS",
      imagen: "/tous.jpg",
      categoria: "tous",
    },
    {
      nombre: "Dolce & Gabbana",
      imagen: "/dolce-gabbana.jpg",
      categoria: "dolce-gabbana",
    },
    {
      nombre: "Persol",
      imagen: "/persol.jpg",
      categoria: "persol",
    },
  ];

  const handleClick = (marca) => {
    window.scrollTo(0, 0);
    navigate(`/catalogo/${marca.categoria}`);
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {marcas.map((marca, index) => (
        <div
          key={index}
          className="relative overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-md cursor-pointer group hover:shadow-xl hover:scale-[1.02]"
          onClick={() => handleClick(marca)}
        >
          <img
            src={marca.imagen}
            alt={marca.nombre}
            className="object-cover w-full h-48 transition-opacity duration-300 group-hover:opacity-90"
          />
          <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/60 to-transparent">
            <h3 className="text-xl font-bold text-white">{marca.nombre}</h3>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-transparent via-white to-transparent group-hover:opacity-100"></div>
        </div>
      ))}
    </div>
  );
}
