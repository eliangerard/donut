import { Dispatch, SetStateAction } from "react";

export default function AddPanel({setAdding} : {setAdding: Dispatch<SetStateAction<boolean>>}) {
    return (
        <div className="w-screen h-screen fixed top-0 left-0 bg-shader z-20 flex items-center justify-center">
            <div className="flex flex-col rounded-xl p-8 bg-white relative">
                <button onClick={() => setAdding(false)} className="flex items-center justify-center rotate-45 absolute right-6 top-4 text-white bg-neutral-300 hover:bg-neutral-400 w-6 h-6 text-lg font-black rounded-full transition-all">+</button>
                <h3 className="py-4 text-2xl font-bold">Agregar producto</h3>
                <input type="text" placeholder="name" />
                <input type="text" placeholder="category" />
                <input type="text" placeholder="price" />
                <input type="file" multiple placeholder="images" />
                <button className='bg-turquoise-500 hover:bg-turquoise-600 active:bg-turquoise-700 text-white py-2 px-4 rounded-lg font-bold mt-4 transition-all'>Agregar</button>
            </div>
        </div>
    )
}