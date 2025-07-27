const productos = [
  {
    nombre: "Anillo oro 18k y diamantes 0.66cts",
    precioOriginal: "3.380,00 €",
    precioDescuento: "1.690,00 €",
    imagen: "https://media.istockphoto.com/id/1219309412/es/foto/anillo-de-diamantes-aislado-en-el-anillo-de-estilo-solitario-de-compromiso-blanco.jpg?s=612x612&w=0&k=20&c=wg4DSWOFKt0SgBObfJqXRSBqEyuugTqWc1KvzcyB9o4=",
  },
  {
    nombre: "Anillo oro 18k, zafiro y diamantes 0.2cts",
    precioOriginal: "1.990,00 €",
    precioDescuento: "995,00 €",
    imagen: "https://media.istockphoto.com/id/469421498/es/foto/anillo-de-diamante-aislado-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=yyB1FPgE3c5Quvyixi1T1AmgU2Ce-w0zBiYwiSQqeB8=",
  },
  {
    nombre: "Anillo oro blanco diamantes 0.50cts",
    precioOriginal: "3.066,00 €",
    precioDescuento: "1.533,00 €",
    imagen: "https://media.thejewellershop.com/images/products/500/DR0548-18KW_01.jpg",
  },
  {
    nombre: "Anillo oro diamantes 0.51cts",
    precioOriginal: "3.140,00 €",
    precioDescuento: "1.570,00 €",
    imagen: "https://www.baunat.com/es/122413_bau_9582_722x722/venta-exclusiva-de-stock-de-baunat-sin-30-dias-de-devolucion-0-77-quilates-anillo-de-compromiso-diamante-diseno-en-oro-blanco-disponible-en-talla-55.jpg",
  },
];

const PromocionDiamantes = () => {
  return (
    <section className="">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* Banner principal */}
        <div className="relative w-full h-full min-h-[400px]">
          <img
            src="https://www.oksilver.es/blog/wp-content/uploads/2023/02/tipos-anillos-compromiso-1.png"
            alt="Promo Diamantes"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-6 bg-black/30">
            <p className="text-xl tracking-widest">DIAMANTES HASTA</p>
            <h2 className="text-6xl font-bold">50% DTO</h2>
            <p className="mt-2 tracking-widest text-sm">CALIDAD CERTIFICADA</p>
            <button className="mt-4 px-6 py-2 bg-white text-black font-medium transition hover:bg-gray-200 duration-300 ease-in-out">
              VER MÁS
            </button>
          </div>
        </div>

        {/* Productos en oferta */}
        <div className="grid grid-cols-2 gap-4">
          {productos.map((prod, idx) => (
            <div key={idx} className="relative bg-white p-2 border rounded">
              <img
                src={prod.imagen}
                alt={prod.nombre}
                className="w-full object-contain mb-2"
              />
              <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                -50%
              </span>
              <p className="text-sm font-medium">{prod.nombre}</p>
              <p className="text-red-600 font-semibold">{prod.precioDescuento}</p>
              <p className="text-gray-400 line-through text-sm">{prod.precioOriginal}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromocionDiamantes;
