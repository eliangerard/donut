import { Montserrat, Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

const montserrat = Montserrat({ subsets: ['latin'], weight: ["900"] });
const poppins = Poppins({ subsets: ['latin'], weight: ["400", "600", "700"] })


export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className={poppins.className + ' transition-all'}>
        <Header />
        <div className="w-full flex flex-col justify-center items-center min-h-full h-full">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
