import ProductsList from "@/components/ProductsList";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function page() {

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    let { data: products = [] } = await supabase
        .from('products')
        .select(`*,
        categories (
            name
        )`);

    const date = new Date(Date.now());

    return (
        <>
            <h1 className="text-4xl font-black pt-8">Productos</h1>
            <p className="font-bold text-neutral-400 pb-8">{date.toLocaleString('es-MX', { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>

            <div className="hidden w-screen h-screen fixed top-0 left-0 bg-shader z-20 flex items-center justify-center">
                <div className="flex flex-col rounded-xl p-8 bg-white">
                    <h3 className="py-4 text-2xl font-bold">Agregar producto</h3>
                    <input type="text" placeholder="name" />
                    <input type="text" placeholder="category" />
                    <input type="text" placeholder="price" />
                    <input type="file" multiple placeholder="images" />
                    <button className='bg-turquoise-500 hover:bg-turquoise-600 active:bg-turquoise-700 text-white py-2 px-4 rounded-xl font-bold mt-4 transition-all'>Agregar</button>
                </div>
            </div>
            <div className="w-fit grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <button className="bg-[length:200%_300%] hover:bg-[center_top_100%] hover:bg-[length:100%_200%] bg-gradient-to-br from-turquoise-50 to-turquoise-200 hover:cursor-pointer w-full md:w-60 h-80 rounded-xl p-4 flex flex-col justify-center items-center group transition-all">
                    <div className="w-full flex justify-center relative">
                        <p className="text-8xl m-0 p-0 font-black text-turquoise-800">+</p>
                    </div>
                    <div>
                        <p className="font-bold text-turquoise-800">Nuevo Producto</p>
                        <div className="flex justify-between h-8">
                            <div className="flex">
                                {/* <button className="opacity-0 group-hover:opacity-100 bg-turquoise-500 hover:bg-turquoise-600 text-white p-1 rounded-full font-bold ml-2 w-8 h-8 transition-all">
                                    +
                                </button> */}
                            </div>
                        </div>
                    </div>
                </button>
                <ProductsList products={products} />
            </div>
        </>
    )
}