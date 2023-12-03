import ProductsList from "@/components/ProductsList";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import AddProduct from "./AddProduct";

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

            <AddProduct products={products}/>
        </>
    )
}