export default function GridArticulos() {
  return (
    <div className="grid grid-cols-2 gap-2 min-[1280px]:grid-cols-6">
      <a href="/catalogo?categoria=anillos" className="transition-transform duration-300 ease-in-out hover:scale-115 hover:text-yellow-500">
        <div className="flex justify-center">
          <img
            src="https://st3.depositphotos.com/29384342/33684/i/450/depositphotos_336844190-stock-photo-high-angle-view-couple-hand.jpg"
            alt="Oferta anillos"
            className="object-cover rounded-full h-36 w-36 md:h-48 md:w-48"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="pb-2 text-lg font-semibold">Anillos</h3>
        </div>
      </a>

      <a href="/catalogo?categoria=pendientes" className="transition-transform duration-300 ease-in-out hover:scale-115 hover:text-yellow-500">
        <div className="flex justify-center">
          <img
            src="https://media.istockphoto.com/id/1583171571/es/foto/fotos-de-piercings-en-las-orejas-perforaci%C3%B3n-de-h%C3%A9lice-pendientes.jpg?s=612x612&w=0&k=20&c=NqTGpzYOQcMvEh8OTH29BKtAZlduo8IkRJ1rtxNA9IM="
            alt="Oferta pendientes"
            className="object-cover rounded-full h-36 w-36 md:h-48 md:w-48"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="pb-2 text-lg font-semibold">Pendientes</h3>
        </div>
      </a>

      <a href="/catalogo?categoria=collares" className="transition-transform duration-300 ease-in-out hover:scale-115 hover:text-yellow-500">
        <div className="flex justify-center">
          <img
            src="https://media.istockphoto.com/id/1317457980/es/foto/hermosa-chica-con-jewerly-dorado-un-collar-de-oro-y-anillos-de-oro.jpg?s=612x612&w=0&k=20&c=Bg-fU57eexdHSkALKmpxK3-NJ_Lt88CWI_Ri1cw9Z5c="
            alt="Oferta collares"
            className="object-cover rounded-full h-36 w-36 md:h-48 md:w-48"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="pb-2 text-lg font-semibold">Collares</h3>
        </div>
      </a>

      <a href="/catalogo?categoria=pulseras" className="transition-transform duration-300 ease-in-out hover:scale-115 hover:text-yellow-500">
        <div className="flex justify-center">
          <img
            src="https://f.fcdn.app/imgs/5905f7/unode50.com.uy/unoduy/ffee/original/catalogo/PUL2505VAM_PUL_4/2000-2000/pulsera-de-hilo-verde-azulado-con-perla-shell-fornitura-banada-en-plata-de-ley-pulsera.jpg"
            alt="Oferta pulseras"
            className="object-cover rounded-full h-36 w-36 md:h-48 md:w-48"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="pb-2 text-lg font-semibold">Pulseras</h3>
        </div>
      </a>

      <a href="/catalogo?categoria=relojes" className="transition-transform duration-300 ease-in-out hover:scale-115 hover:text-yellow-500">
        <div className="flex justify-center">
          <img
            src="https://sevilla.abc.es/contenidopromocionado/wp-content/uploads/sites/2/2022/12/AdobeStock_427750191.jpeg"
            alt="Oferta relojes"
            className="object-cover rounded-full h-36 w-36 min-[1024px]:h-48 min-[1024px]:w-48"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="pb-2 text-lg font-semibold">Relojes</h3>
        </div>
      </a>

      <a href="/catalogo?categoria=gafas" className="transition-transform duration-300 ease-in-out hover:scale-115 hover:text-yellow-500">
        <div className="flex justify-center">
          <img
            src="https://media.istockphoto.com/id/621358528/es/foto/este-es-el-lugar-perfecto.jpg?s=612x612&w=0&k=20&c=M0pYVxBXe-yccoY5jpKO3O1UNqk-1-L4uKRqP4f2hoU="
            alt="Oferta gafas de sol"
            className="object-cover rounded-full h-36 w-36 md:h-48 md:w-48"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="pb-2 text-lg font-semibold">Gafas de sol</h3>
        </div>
      </a>
    </div>
  );
}
