import Link from 'next/link'
import Image from 'next/image'
import AuthButton from './AuthButton';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ["900"] });

export default function Header() {
  
  return (
    <header className='sticky top-0 w-full p-6 pb-0 flex flex-col content-center bg-white z-10'>
      <div className='flex w-full justify-between'>
        <Link href={"/"} className='flex' >
          <Image className='hidden md:block' src="/logo.png" alt="Donut" width={40} height={40} />
          <h1 className={`${montserrat.className} text-4xl ml-2`}>Donut</h1>
        </Link>
        <div className='flex justify-between content-center rounded-full px-6 shadow-md md:w-2/4 outline-slate-300 focus-within:outline focus-within:outline-4 transition-all'>
          <input className='hidden md:block focus:outline-none w-full font-semibold' type="text" placeholder="Search" />
          <Link href="/search" className='h-full flex items-center'>
            <Image className='my-auto' src="/search.svg" alt="Search" width={20} height={20} />
          </Link>
        </div>
        <div className='flex'>
          <Link href="/cart" className='flex content-center h-full justify-center'>
            <Image className='my-auto' src="/cart.svg" alt="Cart" width={25} height={25} />
          </Link>
          <AuthButton />
        </div>
      </div>
      <div className='md:w-full overflow-x-scroll md:overflow-x-hidden flex md:justify-center my-3'>
        <Link className={'my-2 mx-4 rounded-xl px-4 py-2 font-bold text-lg hover:bg-hit-pink-300 hover:text-white transition-all'} href="/">Destacados</Link>
        <Link className={'my-2 mx-4 rounded-xl px-4 py-2 font-bold text-lg hover:bg-hit-pink-300 hover:text-white transition-all'} href="/clothes">Ropa</Link>
        <Link className={'my-2 mx-4 rounded-xl px-4 py-2 font-bold text-lg hover:bg-hit-pink-300 hover:text-white transition-all'} href="/stickers">Stickers</Link>
        <Link className={'my-2 mx-4 rounded-xl px-4 py-2 font-bold text-lg hover:bg-hit-pink-300 hover:text-white transition-all'} href="/vinyl">Viniles</Link>
        <Link className={'my-2 mx-4 rounded-xl px-4 py-2 font-bold text-lg hover:bg-hit-pink-300 hover:text-white transition-all'} href="/acrylics">Acrílicos</Link>
      </div>
    </header>
  )
}
