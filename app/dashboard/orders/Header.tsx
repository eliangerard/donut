'use client'
import Link from "next/link";
import { usePathname } from "next/navigation"

export default function Header() {

    const pathname = usePathname();

    return (
        <>
            <header className='sticky top-0 w-full lg:flex-row items-center pt-4 md:py-2 flex bg-neutral-100 z-10'>
                <Link href={"/dashboard/orders"} className={'mr-4 md:mr-4 rounded-xl px-4 py-2 font-bold text-lg hover:bg-white' + (pathname == '/dashboard/orders' ? ' bg-white border-2 border-neutral-200' : '') + ' transition-all'} >Todos</Link>
                <Link href={"/dashboard/orders/pending"} className={'mr-4 md:mr-4 rounded-xl px-4 py-2 font-bold text-lg hover:bg-white' + (pathname == '/dashboard/orders/pending' ? ' bg-white border-2 border-neutral-200' : '') + ' transition-all'} >Pendientes</Link>
                <Link href={"/dashboard/orders/current"} className={'mr-4 md:mr-4 rounded-xl px-4 py-2 font-bold text-lg hover:bg-white' + (pathname == '/dashboard/orders/current' ? ' bg-white border-2 border-neutral-200' : '') + ' transition-all'} >En curso</Link>
                <Link href={"/dashboard/orders/finished"} className={'mr-4 md:mr-4 rounded-xl px-4 py-2 font-bold text-lg hover:bg-white' + (pathname == '/dashboard/orders/finished' ? ' bg-white border-2 border-neutral-200' : '') + ' transition-all'} >Terminados</Link>
            </header>
        </>
    )
}