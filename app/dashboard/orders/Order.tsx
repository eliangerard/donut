import Profile from "@/components/Profile"

export default function Order({ order, orderImages, acceptOrder }: { order: { id: string, created_at: string, idStatus: number, users: { avatar_url: string, name: string, email: string, phone: string } }, orderImages: any[] | undefined, acceptOrder: any }) {

    const acceptOrderWithId = acceptOrder.bind(null, order.id)
    return (
        <div className="bg-white rounded-xl p-8 font-semibold text-2xl my-4 flex flex-col border-neutral-200 border-2">
            <div className="flex justify-between">
                <p className="text-neutral-300 text-sm mb-4">{order.id}</p>
                <div className="flex items-center">
                    <p className="text-sm text-neutral-400 mr-4">{new Date(order.created_at).toLocaleDateString('es-MX')}</p>
                    {order.idStatus == 1 ? (<p className="w-32 flex justify-center bg-hit-pink-100 border-2 border-hit-pink-200 rounded-xl text-hit-pink-500 text-sm px-4 py-2">Pendiente</p>)
                        : order.idStatus == 2 ? (<p className="w-32 flex justify-center bg-turquoise-100 border-2 border-turquoise-200 rounded-xl text-turquoise-500 text-sm px-4 py-2">En curso</p>)
                            : (<p className="w-32 flex justify-center bg-neutral-100 border-2 border-neutral-200 rounded-xl text-sm px-4 py-2">Terminado</p>)}

                </div>
            </div>
            <div className="flex items-center">
                {
                    order.users.avatar_url ?
                        <img src={order.users.avatar_url} alt="Avatar" className="w-16 h-16 rounded-full mr-4" />
                        :
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-turquoise-100 mr-4 overflow-hidden">
                            <Profile />
                        </div>
                }
                <div>
                    <div className="text-4xl font-bold">Pedido de {order.users.name}</div>
                    <div className="flex">
                        <a className="text-md m-0 text-turquoise-600" href={`mailto:${order.users.email}`}>{order.users.email}</a>
                        { order.users.phone && <a className="text-md m-0 text-turquoise-600" href={`tel:${order.users.phone}`}>&nbsp;- {order.users.phone}</a>}
                    </div>
                </div>
            </div>
            <hr className="my-4" />
            <div className="flex overflow-auto w-full">
                {orderImages && orderImages.reverse().map((image: any) => (
                    <img src={'https://esxjkvrtdgmcwzmxnbgu.supabase.co/storage/v1/object/public/orders/' + image.url} alt="" className="w-28 h-28 rounded-xl mr-4 bg-neutral-200 p-4" />
                ))}
            </div>
            <div className="flex justify-end">
                {order.idStatus == 1 && (

                    <form action={acceptOrderWithId}>
                        <button
                            className='text-sm bg-turquoise-500 hover:bg-turquoise-600 active:bg-turquoise-700 text-white py-2 px-4 rounded-xl font-bold ml-4 transition-all'
                            type="submit"
                        >
                            Aceptar pedido
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}