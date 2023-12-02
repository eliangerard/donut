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
    return (
        <Layout>
            <div className="w-fit grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                <Image className="w-full col-span-2 md:col-span-3 lg:col-span-4 " src="/ad.png" alt="" width={800} height={100} quality={100} />
                <ProductsList products={products} />
            </div>
        </Layout>
    )
}