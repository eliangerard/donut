import { createClient } from "@/utils/supabase/server";
import { NextRequest } from "next/server";
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid'; // Importar la librería uuid

export async function POST(req: NextRequest) {
    const { canvasData, product } = await req.json();

    const cookieStore = cookies();

    const supabase = createClient(cookieStore);

    const { data: user } = await supabase.auth.getSession()

    console.log("user", user);

    if (user.session == null) {
        return Response.json({ error: 'Inicia sesión para hacer tu pedido' })
    }

    const { data: order, error: orderError, status } = await supabase
        .from('order')
        .insert({ idUser: user.session.user.id, idOrder : 1 }).select();

    console.log("order", order, orderError);

    if (orderError || !order)
        return Response.json({ error: 'Error al crear el pedido' });


    let hasError = false; // Variable para realizar un seguimiento de los errores

    await Promise.all(canvasData.map(async (canvasDataItem: { imageData: string }, i: number) => {
        const binaryString = atob(canvasDataItem.imageData.split(',')[1]);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        const { data, error } = await supabase
            .storage
            .from('orders')
            .upload('public/' + user.session.user.id + '/' + uuidv4() + '.png', bytes.buffer, {
                cacheControl: '3600',
                upsert: false
            })

        console.log("Subiendo imagen", data, error);

        if (error) {
            hasError = true; // Establecer la variable hasError en true si hay un error
            return Response.json({ error: 'Error al subir la imagen' });
        }

        const { data: insertData, error: insertError } = await supabase
            .from('orderImages')
            .insert({ idOrder: order[0]['id'], url: data.path })

        console.log(insertData, insertError);

        if (insertError) {
            hasError = true; // Establecer la variable hasError en true si hay un error
            return Response.json({ error: 'Error al subir la imagen' });
        }

        console.log("papu", data, error);
    }));

    if (hasError) {
        return Response.json({ error: 'Error al subir las imágenes' });
    }

    const { data: insertData, error: insertError } = await supabase
    .from('orderProduct')
    .insert({ idOrder: order[0]['id'], idProduct: product.id });

    return Response.json({ data: 'Pedido realizado' })
}