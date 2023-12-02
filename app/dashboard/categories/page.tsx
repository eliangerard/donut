import Grip from "@/components/Grip";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function page () {

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    let { data: categories, error } = await supabase
        .from('categories')
        .select();

    const date = new Date(Date.now());

    return (
        <>
            <h1 className="text-4xl font-black pt-8">Categorías</h1>
            <p className="font-bold text-neutral-400 pb-8">{date.toLocaleString('es-MX', { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
            <div className="bg-white rounded-xl p-8 font-semibold text-2xl my-4 flex justify-between outline outline-0 focus-within:outline-neutral-400 focus-within:outline-4 transition-all">
                <input type="text" placeholder="Nueva categoría" className="w-full focus:outline-none"/>
                <button className='bg-turquoise-500 hover:bg-turquoise-600 active:bg-turquoise-700 text-white py-2 px-4 rounded-xl font-bold transition-all'>Agregar</button>
            </div>
            {categories?.map((category: any) => (
                <div className="bg-white rounded-xl p-8 font-semibold text-2xl my-4 flex justify-between border-neutral-200 border-2">
                    {category.name}
                    <div className="flex items-center">
                        <button>
                            <svg className="h-8" fill="#000000" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M264.8 604.7l61.8 61.8L512 481.1l185.4 185.4 61.8-61.8L512 357.5z"/></svg>
                        </button>
                        <button>
                            <svg className="h-8 rotate-180" fill="#000000" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M264.8 604.7l61.8 61.8L512 481.1l185.4 185.4 61.8-61.8L512 357.5z"/></svg>
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}