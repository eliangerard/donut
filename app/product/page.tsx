import Layout from '@/components/layout'
import Home from './Home';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

const Page = async ({ searchParams }: { searchParams: { id: string } }) => {

    console.log(searchParams);

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);


    let { data: images = [] } = await supabase
        .from('images')
        .select().eq('idProduct', searchParams?.id);

    let { data: products = [] } = await supabase
        .from('products')
        .select(`*,
        categories (
            name
        )`).eq('id', searchParams?.id);

        console.log(products, images);

        return (
            <Layout>
                {products && images && (
                    <Home imagenes={images} product={products[0]}/>
                )}        
        </Layout>
    )
}

export default Page;