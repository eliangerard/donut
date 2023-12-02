import Header from '@/components/Header'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className="w-full flex flex-col justify-center items-center min-h-full h-full">
        {children}
      </div>
      {/* <Footer /> */}
    </>
  )
}
