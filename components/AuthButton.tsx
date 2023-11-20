import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Profile from './Profile'
import Image from 'next/image'

export default async function AuthButton() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log(user);
  const signOut = async () => {
    'use server'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    await supabase.auth.signOut()
    return redirect('/login')
  }

  return user ? (
    <>
      <Link href="/cart" className='flex content-center h-full justify-center'>
        <Image className='my-auto mr-4' src="/cart.svg" alt="Cart" width={25} height={25} />
      </Link>
      <form action={signOut}>
        <button className="p-2 rounded-full no-underline bg-turquoise-100 w-12 h-12 hover:bg-turquoise-200 active:bg-turquoise-300 hover:outline-4 transition-all group">
          <Profile />
        </button>
      </form>
    </>
  ) : (
    <Link
      href="/login"
      className='bg-turquoise-500 hover:bg-turquoise-600 active:bg-turquoise-700 text-white py-2 px-4 rounded-xl font-bold ml-4 transition-all'
    >
      Iniciar Sesión
    </Link>
  )
}
