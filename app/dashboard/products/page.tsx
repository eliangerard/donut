import ProductsList from "@/components/ProductsList";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";

export const page = async () => {

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    let { data: products = [] } = await supabase
        .from('products')
        .select(`*,
        categories (
            name
        )`);

    const date = new Date(Date.now());
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    return (
        <>
            <h1 className="text-4xl font-black pt-8">Productos</h1>
            <p className="font-bold text-neutral-400 pb-8">{date.toLocaleString('es-MX', { weekday:"long", year: "numeric", month: "long", day: "numeric" })}</p>
            <div className="w-fit grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <ProductsList products={products} />
            </div>
        </>
    )
}

export default page;