import ProductsList from "@/components/ProductsList";
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import Image from "next/image";

export default async function Page() {

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);


    let { data: products, error } = await supabase
        .from('products')
        .select(`*,
        categories (
            name
        )`);

    console.log(products, error);
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-7/12">
                <Image className="w-full" src="/ad.png" alt="" width={2000} height={1000} quality={100} />
                <h2 className="text-xl font-bold m-4">Destacados</h2>
            </div>
            <ProductsList products={products} />
        </div>
    )
}