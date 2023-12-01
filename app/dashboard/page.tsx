import NavBar from '@/components/NavBar';
import { createClient } from '@/utils/supabase/server'
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

export default async function Page() {

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser()
    const admin = process.env.NEXT_PUBLIC_ADMIN_ID;
    console.log(user);
    
    if(user?.id !== admin) 
        redirect('/');

    return (
        <div className="w-full flex min-h-full h-full">
            
        </div>
    )
}