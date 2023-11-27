import Layout from '@/components/layout'
import Home from './Home';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

const Page = async ({ searchParams }: { searchParams: { id: string } }) => {

    console.log(searchParams);

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);


    let { data: products, error } = await supabase
        .from('images')
        .select().eq('idProduct', searchParams?.id);

        console.log(products);

        return (
            <Layout>
                <h1>Product</h1>
                {searchParams?.id && (
                    <p>
                        {searchParams.id}
                    </p>
                )}
                {products && (
                    <Home imagenes={products}/>
                )}        
        </Layout>
    )
}

export default Page;