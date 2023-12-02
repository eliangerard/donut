import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Order from "./Order";

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
        .select('*, users(*), orderStatus(status)');

    const { data: ordersImages, error: imagesError } = await supabase
        .from('orderImages')
        .select('*');

    console.log(orders);

    return (
        <>
            <h1 className="text-4xl font-black pt-8">Pedidos</h1>
            <p className="font-bold text-neutral-400 pb-8">{date.toLocaleString('es-MX', { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
            
            {orders?.map((order: any) => (<Order order={order} orderImages={ordersImages?.filter((image: any) => image.idOrder == order.id)} acceptOrder={acceptOrder} />))}
            
            <div className="w-fit grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"></div>
        </>
    )
}