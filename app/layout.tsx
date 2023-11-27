import './globals.css';
import { Montserrat, Poppins } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'], weight: ["900"] });
const poppins = Poppins({ subsets: ['latin'], weight: ["400", "600", "700"] })

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Donut',
  description: 'Tu sitio de personalizados',
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
      <body className={poppins.className + ' bg-neutral-100'}>
        {children}
      </body>
    </html>
  )
}
