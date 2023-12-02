import Link from 'next/link'
import { headers, cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import localFont from 'next/font/local'
const montserrat = Montserrat({ subsets: ['latin'], weight: ['600', '900'] });

const tangoBold = localFont({ src: '../../public/tango-bold.woff2' });
const tango = localFont({ src: '../../public/tango.woff2' });

export default function Login({
    searchParams,
}: {
    searchParams: { message: string }
}) {

    const signWithGoogle = async (formData: FormData) => {
        'use server'

        const cookieStore = cookies()
        const supabase = createClient(cookieStore)

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        })

        console.log(data);

        if (error) {
            return redirect('/login?message=Could not authenticate user')
        }

        return redirect(data.url);
    }

    const signUp = async (formData: FormData) => {
        'use server'

        const origin = headers().get('origin')
        const name = formData.get('name') as string
        const phone = formData.get('phone') as string
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${origin}/auth/callback`,
            },
        })

        console.log("auth", data, error);

        if (error) {
            return redirect('/signup?message=Could not authenticate user')
        }

        const { error: insertError } = await supabase
            .from('users')
            .insert(
                {
                    id: data.user?.id,
                    name,
                    phone,
                    email,
                }
            )

        if (insertError) {
            return redirect('/login?message=Could not populate user')
        }

        return redirect('/login?message=Check email to continue sign in process')
    }

    return (
        <div className={`flex flex-col items-center justify-center bg-hit-pink-100 h-screen`}>
            <div className='h-full w-full flex justify-center items-center p-4 md:justify-between'>
                <div className='h-full p-14 pl-32 hidden md:flex flex-col justify-between w-3/5'>
                    <Link href={"/"} className='flex mb-8' >
                        <Image src="/logo.png" alt="Donut" width={48} height={48} />
                        <h1 className={`${tangoBold.className} font-black text-4xl md:ml-3 pt-0.5`}>Donut</h1>
                    </Link>
                    <div className='my-auto py-10'>
                        <h2 className='font-bold text-4xl xl:text-5xl py-4'>¡Tu sitio de personalizados!</h2>
                        <p className={`${montserrat.className}  text-xl lg:text-2xl pb-8 opacity-60`}>Tu estilo, tu diseño, tu historia.</p>
                        <Image className='ml-16' src="/login.png" alt="Woman" quality={100} width={700} height={600} />
                    </div>
                </div>
                <div className="flex flex-col w-full h-full justify-between bg-white md:w-5/12 rounded-lg p-8 md:px-20">
                    <Link href={"/"} className='flex md:hidden mb-8' >
                        <Image src="/logo.png" alt="Donut" width={48} height={48} />
                        <h1 className={`${tangoBold.className} font-black text-4xl ml-3 pt-0.5`}>Donut</h1>
                    </Link>
                    <div className='my-auto flex flex-col'>
                        <h1 className={`${tangoBold.className} text-4xl font-bold mb-3 2xl:mb-8`}>Regístrate</h1>
                        <button formAction={signWithGoogle} className='bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 font-semibold p-3 2xl:p-5 flex rounded-md w-fit transition-all'>
                            <Image src='/google-icon.png' alt='Google' width={24} height={24} />
                            <p className='px-4'>Inicia sesión con Google</p>
                        </button>
                        <hr className='my-3 2xl:my-8' />
                        <form
                            action={signUp}
                            className='flex flex-col'
                        >
                            <input
                                className="rounded-md font-semibold p-3 2xl:p-5 bg-neutral-100 mb-6"
                                name="name"
                                placeholder="Nombre completo"
                                type='text'
                                required
                            />
                            <input
                                className="rounded-md font-semibold p-3 2xl:p-5 bg-neutral-100 mb-6"
                                name="phone"
                                placeholder="Teléfono"
                                type='tel'
                                required
                            />
                            <input
                                className="rounded-md font-semibold p-3 2xl:p-5 bg-neutral-100 mb-6"
                                name="email"
                                placeholder="Email"
                                type='email'
                                required
                            />
                            <input
                                className="rounded-md font-semibold p-3 2xl:p-5 bg-neutral-100 mb-6"
                                type="password"
                                name="password"
                                placeholder="Contraseña"
                                required
                            />
                            <button className="bg-turquoise-500 hover:bg-turquoise-600 active:bg-turquoise-700 text-white mb-6 p-3 2xl:p-5 rounded-lg font-bold transition-all">
                                Registrarse
                            </button>
                        </form>
                        <p className='flex'>
                            ¿Ya tienes una cuenta?
                            <Link
                                className='font-bold'
                                href={"/login"}
                            >
                                &nbsp;Inicia sesión
                            </Link>
                        </p>
                        {searchParams?.message && (
                            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                                {searchParams.message}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div >
    )
}
