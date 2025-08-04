import { Instagram } from "lucide-react";

export default function BannerInstagram() {
return (
    <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative flex flex-col items-center justify-between px-6 py-12 text-white md:flex-row md:py-16 md:px-12">
            <div className="w-full space-y-6 text-center md:w-2/3 md:text-left md:space-y-4 md:pr-8">
                <h2 className="text-2xl font-bold leading-tight tracking-wide md:text-4xl lg:text-5xl">
                    ¡SÍGUENOS EN INSTAGRAM PARA NO PERDERTE LAS NOVEDADES!
                </h2>
                <p className="text-lg font-medium opacity-90 md:text-xl lg:text-2xl">
                    PARTICIPA EN SORTEOS Y MANTENTE AL DÍA
                </p>
            </div>
            <div className="flex-shrink-0 mt-8 md:mt-0 md:pl-8">
                <button
                    onClick={() =>
                        window.open(
                            "https://www.instagram.com/opticadelvaljoyeros?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
                            "_blank"
                        )
                    }
                    className="flex items-center gap-3 px-8 py-4 text-lg font-semibold text-black transition-all duration-300 bg-white rounded-lg shadow-lg group hover:bg-gray-100 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30"
                >
                    <Instagram className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                    @opticadelvaljoyeros
                </button>
            </div>
        </div>
    </div>
);
}
