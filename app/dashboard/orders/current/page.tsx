import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Order from "../Order";

export default async function page() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: orders, error: insertError } = await supabase
        .from('order')
        .select('*, users(*), orderStatus(status)')
        .eq('idStatus', 2);

    const { data: ordersImages, error: imagesError } = await supabase
        .from('orderImages')
        .select('*');

    console.log(orders);

    return (
        <>
            {orders?.map((order: any) => (<Order order={order} orderImages={ordersImages?.filter((image: any) => image.idOrder == order.id)} acceptOrder={null} />))}
        </>
    )
}