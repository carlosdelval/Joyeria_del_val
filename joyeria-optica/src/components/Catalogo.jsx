import ProductCard from './ProductCard';

const productos = [
  {
    id: 1,
    nombre: 'Anillo de oro 18k',
    precio: 120,
    imagen: 'https://www.jorgerevilla.com/3822-ultralarge_default/anillo-kymbal-de-plata-bano-de-oro-18k.jpg',
  },
  {
    id: 2,
    nombre: 'Gafas Ray-Ban',
    precio: 80,
    imagen: 'https://www.opticalh.com/303401-large_default/ray-ban-rb3765-919631-53-22.jpg',
  },
];

export default function Catalogo() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
}
