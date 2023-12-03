'use client'

import ProductsList from "@/components/ProductsList"
import { useState } from "react";
import AddPanel from "./AddPanel";

export default function AddProduct({ products }: { products: any[] | null }) {

    const [adding, setAdding] = useState(false);

    return (
        <>
            { adding && (<AddPanel setAdding={setAdding}/>)}
            <div className="w-fit grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <button onClick={() => setAdding(true)} className="bg-[length:200%_300%] hover:bg-[center_top_100%] hover:bg-[length:100%_200%] bg-gradient-to-br from-turquoise-50 to-turquoise-200 hover:cursor-pointer w-full md:w-60 h-80 rounded-xl p-4 flex flex-col justify-center items-center group transition-all">
                    <div className="w-full flex justify-center relative">
                        <p className="text-8xl m-0 p-0 font-black text-turquoise-800">+</p>
                    </div>
                    <div>
                        <p className="font-bold text-turquoise-800">Nuevo Producto</p>
                        <div className="flex justify-between h-8">
                            <div className="flex">
                                {/* <button className="opacity-0 group-hover:opacity-100 bg-turquoise-500 hover:bg-turquoise-600 text-white p-1 rounded-full font-bold ml-2 w-8 h-8 transition-all">
                                    +
                                </button> */}
                            </div>
                        </div>
                    </div>
                </button>
                <ProductsList products={products} />
            </div>
        </>
    )
}