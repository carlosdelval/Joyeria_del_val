export default function GridMarcas() {
return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="overflow-hidden bg-white">
            <img
                src="https://res.cloudinary.com/leightons/image/upload/HOfYjEezJgJ51Iq4JQQw8kWG5oIuQREMd7PxJR39.png"
                alt="Rayban"
                className="object-cover object-center w-full mb-4 h-44"
            />
        </div>

        <div className="overflow-hidden bg-white">
            <img
                src="https://prodevision.com/uploads/marcas/gafas-de-sol-tous-bannerh_es.jpg"
                alt="Tous"
                className="w-full h-44 object-cover mb-4 object-[90%_center] md:object-center"
            />
        </div>

        <div className="overflow-hidden bg-white">
            <img
                src="https://www.ohgafas.com/c/197-category_default/dolce-gabbana-rx.jpg"
                alt="Dolce & Gabbana"
                className="w-full h-44 object-cover mb-4 object-[93%_center] md:object-center"
            />
        </div>

        <div className="overflow-hidden bg-white">
            <img
                src="https://images.edel-optics.com/eoContentsMediaImagesLeadImage/Persol_PLP_sunglasses_unisex/691381_con_sSmall_PLP_Persol_sunglasses_woman_S.jpg"
                alt="Persol"
                className="w-full h-44 object-cover mb-4 object-[70%_center] md:object-center"
            />
        </div>
    </div>
);
}
