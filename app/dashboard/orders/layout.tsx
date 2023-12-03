import Link from "next/link";
import Header from "./Header";

export default function layout({
    children,
}: {
    children: React.ReactNode
}) {

    const date = new Date(Date.now());
    

    return (
        <>
            <h1 className="text-4xl font-black pt-8">Pedidos</h1>
            <p className="font-bold text-neutral-400 pb-8">{date.toLocaleString('es-MX', { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
            <Header/>
            {children}
        </>
    )
}