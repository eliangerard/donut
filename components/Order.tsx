"use client"

import Image from "next/image"

export default function Order({ uploadImageWithImages }: { uploadImageWithImages: any }) {
    return (
        <>

            <form action={uploadImageWithImages}>
                <button
                    type='submit'
                    className='bg-turquoise-500 hover:bg-turquoise-600 md:h-12 active:bg-turquoise-700 text-white py-2 px-4 rounded-xl font-bold ml-4 transition-all'
                >
                    Pedir ahora
                </button>
            </form >
        </>
    )
}
