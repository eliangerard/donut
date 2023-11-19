import Link from 'next/link'
import Image from 'next/image'
import AuthButton from './AuthButton';
import { Montserrat } from 'next/font/google';
import Categories from './Categories';

const montserrat = Montserrat({ subsets: ['latin'], weight: ["900"] });

export default function Header() {

  return (
    <header className='sticky top-0 w-full flex-col lg:flex-row items-center px-0 md:px-12 pt-4 md:py-2 flex justify-between bg-neutral-50 z-10'>
      <div className='flex justify-between h-full w-full lg:w-fit items-center px-4 pb-4 md:pb-0 md:pr-0'>
        <Link href={"/"} className='flex' >
          <Image className='hidden md:block' src="/logo.png" alt="Donut" width={40} height={40} />
          <h1 className={`${montserrat.className} text-4xl ml-2`}>Donut</h1>
        </Link>
        <div className='flex lg:hidden items-center'>
          <AuthButton />
        </div>
      </div>
      {/* <div className='flex bg-white justify-between content-center rounded-full px-6 shadow-md md:w-2/4 outline-slate-300 focus-within:outline focus-within:outline-4 transition-all'>
          <input className='hidden md:block focus:outline-none w-full font-semibold' type="text" placeholder="Search" />
          <Link href="/search" className='h-full flex items-center'>
            <Image className='my-auto' src="/search.svg" alt="Search" width={20} height={20} />
          </Link>
        </div> */}
      <Categories />
      <div className='hidden lg:flex items-center'>
        <AuthButton />
      </div>
    </header>
  )
}
