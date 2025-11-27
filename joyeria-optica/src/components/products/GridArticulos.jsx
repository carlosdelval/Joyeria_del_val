export default function GridArticulos() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
      <a
        href="/catalogo/bolsos"
        className="group transition-transform duration-300 ease-in-out hover:scale-105 hover:text-yellow-500"
      >
        <div className="flex justify-center">
          <img
            src="/bolso-tous.jpg"
            alt="Oferta bolsos"
            className="object-cover rounded-full w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 shadow-md group-hover:shadow-xl transition-shadow"
          />
        </div>
        <div className="p-2 sm:p-3 md:p-4 text-center">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold">
            Bolsos TOUS
          </h3>
        </div>
      </a>

      <a
        href="/catalogo/gafas"
        className="group transition-transform duration-300 ease-in-out hover:scale-105 hover:text-yellow-500"
      >
        <div className="flex justify-center">
          <img
            src="https://media.istockphoto.com/id/621358528/es/foto/este-es-el-lugar-perfecto.jpg?s=612x612&w=0&k=20&c=M0pYVxBXe-yccoY5jpKO3O1UNqk-1-L4uKRqP4f2hoU="
            alt="Oferta gafas de sol"
            className="object-cover rounded-full w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 shadow-md group-hover:shadow-xl transition-shadow"
          />
        </div>
        <div className="p-2 sm:p-3 md:p-4 text-center">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold">
            Gafas de sol
          </h3>
        </div>
      </a>

      <a
        href="/catalogo/relojes?genero=hombre"
        className="group transition-transform duration-300 ease-in-out hover:scale-105 hover:text-yellow-500"
      >
        <div className="flex justify-center">
          <img
            src="https://viceroy.es/cdn/shop/collections/VICEROY_VIERNES_11_JULIO_0720-copia_copia-reloj.jpg?v=1759158961"
            alt="Oferta relojes caballero"
            className="object-cover rounded-full w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 shadow-md group-hover:shadow-xl transition-shadow"
          />
        </div>
        <div className="p-2 sm:p-3 md:p-4 text-center">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold">
            Relojes caballero
          </h3>
        </div>
      </a>

      <a
        href="/catalogo/relojes?genero=mujer"
        className="group transition-transform duration-300 ease-in-out hover:scale-105 hover:text-yellow-500"
      >
        <div className="flex justify-center">
          <img
            src="https://sevilla.abc.es/contenidopromocionado/wp-content/uploads/sites/2/2022/12/AdobeStock_427750191.jpeg"
            alt="Oferta relojes señora"
            className="object-cover rounded-full w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 shadow-md group-hover:shadow-xl transition-shadow"
          />
        </div>
        <div className="p-2 sm:p-3 md:p-4 text-center">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold">
            Relojes señora
          </h3>
        </div>
      </a>

      <a
        href="/catalogo/joyeria"
        className="group transition-transform duration-300 ease-in-out hover:scale-105 hover:text-yellow-500"
      >
        <div className="flex justify-center">
          <img
            src="/joyeria.jpg"
            alt="Oferta joyería"
            className="object-cover rounded-full w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 shadow-md group-hover:shadow-xl transition-shadow"
          />
        </div>
        <div className="p-2 sm:p-3 md:p-4 text-center">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold">
            Joyería
          </h3>
        </div>
      </a>

      <a
        href="/optica"
        className="group transition-transform duration-300 ease-in-out hover:scale-105 hover:text-yellow-500"
      >
        <div className="flex justify-center">
          <img
            src="/optica.jpg"
            alt="Oferta óptica"
            className="object-cover rounded-full w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 shadow-md group-hover:shadow-xl transition-shadow"
          />
        </div>
        <div className="p-2 sm:p-3 md:p-4 text-center">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold">
            Óptica
          </h3>
        </div>
      </a>
    </div>
  );
}
