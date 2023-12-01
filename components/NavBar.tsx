"use client"

import Image from "next/image";
import Link from "next/link";
import localFont from 'next/font/local';
import { usePathname } from "next/navigation";

const tangoBold = localFont({ src: '../public/tango-bold.woff2' });


export const NavBar = () => {

    const pathname = usePathname();

    return (
        <nav className="fixed left-0 top-0 h-full w-64 bg-white p-4 flex flex-col">
            <Link href={"/dashboard/"} className='flex md:w-48 my-12 pl-2' >
                <Image className='hidden md:block' src="/logo.png" alt="Donut" width={48} height={48} />
                <h1 className={`${tangoBold.className} text-4xl md:ml-3 pt-0.5`}>Donut</h1>
            </Link>

            <Link className={"flex items-center text-lg text-neutral-400 my-1 py-6 pl-6 rounded-xl px-2 font-bold h-8 w-full selected:bg-neutral-200 transition-all" + (pathname == '/dashboard/orders' ? ' bg-hit-pink-300  text-white' : ' hover:bg-neutral-100 hover:text-neutral-800')} href={"/dashboard/orders"}>Pedidos</Link>
            <Link className={"flex items-center text-lg text-neutral-400 my-1 py-6 pl-6 rounded-xl px-2 font-bold h-8 w-full selected:bg-neutral-200 transition-all" + (pathname == '/dashboard/categories' ? ' bg-hit-pink-300  text-white' : ' hover:bg-neutral-100 hover:text-neutral-800')} href={"/dashboard/categories"}>Categorías</Link>
            <Link className={"flex items-center text-lg text-neutral-400 my-1 py-6 pl-6 rounded-xl px-2 font-bold h-8 w-full selected:bg-neutral-200 transition-all" + (pathname == '/dashboard/products' ? ' bg-hit-pink-300  text-white' : ' hover:bg-neutral-100 hover:text-neutral-800')} href={"/dashboard/products"}>Productos</Link>
            <Link className={"flex items-center text-lg text-neutral-400 my-1 py-6 pl-6 rounded-xl px-2 font-bold h-8 w-full selected:bg-neutral-200 transition-all" + (pathname == '/dashboard/seasons' ? ' bg-hit-pink-300  text-white' : ' hover:bg-neutral-100 hover:text-neutral-800')} href={"/dashboard/seasons"}>Temporadas</Link>
        </nav>
    )
}

export default NavBar;