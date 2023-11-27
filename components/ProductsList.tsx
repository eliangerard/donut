"use client"

import { Montserrat } from "next/font/google";
import Image from "next/image"
import Link from "next/link";
import { redirect } from "next/navigation";
import { ToastContainer, toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const montserrat = Montserrat({ subsets: ['latin'], weight: ["900"] });

export default function ProductsList({ products } : { products: any[] | null }) {

    const onClick = () => {
        redirect('/product');
    }

    return (
        <>
            
            {
                products?.map((product) => (
                    <Link href={'/product/?id=' + product.id} onClick={onClick} className="bg-[length:200%_300%] hover:bg-[center_top_100%] hover:bg-[length:100%_200%] bg-gradient-to-br from-turquoise-50 to-turquoise-200 hover:cursor-pointer w-full md:w-60 h-80 rounded-xl p-4 flex flex-col justify-between group transition-all" key={product.id}>
                        <div className="flex flex-row-reverse">
                            <Image src='/heart.png' width={24} height={24} alt="" quality={100} />
                        </div>
                        <div className="w-full flex justify-center h-3/6 relative">
                            <Image className="static" src={product.thumbnail} alt="" layout={'fill'} objectFit={'contain'} />
                        </div>
                        <div>
                            <p className="font-bold">{product.name}</p>
                            <p className="text-slate-500 font-semibold">{product.categories?.name}</p>
                            <div className="flex justify-between h-8">
                                <p className={"font-black text-lg text-turquoise-800 " + montserrat.className}>${product.price}</p>
                                <div className="flex">
                                    <button className="opacity-0 group-hover:opacity-100 bg-turquoise-500 hover:bg-turquoise-600 text-white p-1 rounded-full font-bold ml-2 w-8 h-8 transition-all">
                                        ↗
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </>
    )
}