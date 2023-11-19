import ProductsList from "@/components/ProductsList";
import Layout from "@/components/layout";
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
        <Layout>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full p-4 md:w-7/12">
                    <Image className="w-full" src="/ad.png" alt="" width={2000} height={1000} quality={100} />
                    <h2 className="text-xl font-bold mt-8 ml-0 mb-0">Destacados</h2>
                </div>
                <ProductsList products={products} />
            </div>
        </Layout>
    )
}