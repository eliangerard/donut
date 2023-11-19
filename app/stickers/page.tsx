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
        .select(`categories (name), *`);

    const productsByCategory = products?.filter(product => product.categories?.name! && product.categories.name == "Stickers")!;

    console.log(productsByCategory);

    return (
        <Layout>
            <h2 className="text-xl font-bold m-4 w-7/12">Stickers</h2>
            <ProductsList products={productsByCategory} />
        </Layout>
    )
}