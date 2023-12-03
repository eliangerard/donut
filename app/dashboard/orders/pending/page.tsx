import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Order from "../Order";

export default async function page() {
    const acceptOrder = async (orderId : string, formData: FormData) => {
        'use server';

        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        console.log(orderId);

        const { data: orders, error: insertError,  } = await supabase
            .from('order')
            .update({ idStatus: 2 })
            .eq('id', orderId);

        console.log("Pedido", orders, insertError);
    }

    const date = new Date(Date.now());

    const cookieStore = cookies();

    const supabase = createClient(cookieStore);

    const { data: user } = await supabase.auth.getSession()

    const { data: orders, error: insertError } = await supabase
        .from('order')
        .select('*, users(*), orderStatus(status)')
        .eq('idStatus', 1);

    const { data: ordersImages, error: imagesError } = await supabase
        .from('orderImages')
        .select('*');

    console.log(orders);

    return (
        <>
            {orders?.map((order: any) => (<Order order={order} orderImages={ordersImages?.filter((image: any) => image.idOrder == order.id)} acceptOrder={acceptOrder} />))}
        </>
    )
}