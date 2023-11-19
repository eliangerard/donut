"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Categories() {

    const pathname = usePathname();

    return (
        <div className='w-full md:w-fit overflow-x-scroll md:overflow-x-hidden flex md:justify-center pb-3 md:mb-0 md:py-3'>
            <Link className={'mx-4 md:mx-4 rounded-xl px-4 py-2 font-bold text-lg hover:bg-hit-pink-300 hover:text-white' + (pathname == '/' ? ' bg-hit-pink-300 text-white' : '') + ' transition-all'} href="/">Destacados</Link>
            <Link className={'mx-4 md:mx-4 rounded-xl px-4 py-2 font-bold text-lg hover:bg-hit-pink-300 hover:text-white' + (pathname == '/clothes' ? ' bg-hit-pink-300 text-white' : '') + ' transition-all'} href="/clothes">Ropa</Link>
            <Link className={'mx-4 md:mx-4 rounded-xl px-4 py-2 font-bold text-lg hover:bg-hit-pink-300 hover:text-white' + (pathname == '/stickers' ? ' bg-hit-pink-300 text-white' : '') + ' transition-all'} href="/stickers">Stickers</Link>
            <Link className={'mx-4 md:mx-4 rounded-xl px-4 py-2 font-bold text-lg hover:bg-hit-pink-300 hover:text-white' + (pathname == '/vinyl' ? ' bg-hit-pink-300 text-white' : '') + ' transition-all'} href="/vinyl">Viniles</Link>
            <Link className={'mx-4 md:mx-4 rounded-xl px-4 py-2 font-bold text-lg hover:bg-hit-pink-300 hover:text-white' + (pathname == '/acrylics' ? ' bg-hit-pink-300 text-white' : '') + ' transition-all'} href="/acrylics">Acrílicos</Link>
        </div>
    )
}