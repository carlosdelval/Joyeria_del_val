import Example from "./DrawOutlineButton";

export default function ProductCard({ producto }) {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden p-4 h-96">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="w-full h-2/3 object-cover rounded"
      />
      <div className="mt-4">
        <h2 className="text-lg font-semibold">{producto.nombre}</h2>
        <p className="text-gray-700 mt-2">{producto.precio.toFixed(2)} €</p>
        <Example />
      </div>
    </div>
  );
}
