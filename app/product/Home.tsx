"use client"

import { v4 as uuidv4 } from 'uuid';
import { useEffect, useRef, useState } from 'react';
import { useFabricJSEditor, FabricJSCanvas } from 'fabricjs-react';
import { fabric } from 'fabric';
import Image from 'next/image';
import { FunctionExpression } from 'typescript';
import { createClient } from '@/utils/supabase/client';
import { ToastContainer, toast } from 'react-toastify';

const imagenes = [
    'https://cf.shopee.com.mx/file/57ca00788517873f4764d6b4ebe61c4f',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZvPxOindKfTLcmTiJE_pHgstNl970cJWZl8WHQJYHgl0dSFMEmRpXY6aCBSrjLY94HvM&usqp=CAU',
    'https://cdn1.coppel.com/images/catalog/mkp/7005/3000/70051994-1.jpg',
];

interface imageObjects {
    [key: string]: {
        img: fabric.Image,
        index: number,
        imageData: string
    }
}

const Home = ({ imagenes = [{ url: "" }], product }: { imagenes: any[], product: { name: string, price: number, categories: { name: string } } }) => {

    const fileInput = useRef<HTMLInputElement>(null);

    const { editor, onReady } = useFabricJSEditor();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageObjects, setImageObjects] = useState<imageObjects>({});
    const [filesArray, setFilesArray] = useState([] as unknown as { id: string, groupIndex: number, imageUrl: string }[]);

    const handleExportClick = () => {
        if (editor && editor.canvas) {

            const canvasData: Array<{ imageData: string }> = [];
            for (let i = 0; i < imagenes.length; i++) {
                const canvas = new fabric.Canvas(null, { width: editor?.canvas.width, height: editor?.canvas.height });

                console.log(imagenes[i].url);

                fabric.Image.fromURL(
                    imagenes[i].url,
                    async (img) => {
                        img.scaleToWidth(canvas.width ?? 0);
                        img.set({
                            originX: 'left',
                            originY: 'top',
                            evented: false,
                            lockMovementX: true,
                            lockMovementY: true,
                            lockRotation: true,
                            lockScalingX: true,
                            lockScalingY: true,
                            lockUniScaling: true,
                        });

                        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));

                        for (const objectId in imageObjects) {
                            if (imageObjects.hasOwnProperty(objectId)) {
                                const object = imageObjects[objectId];
                                if (object.index === i) {
                                    canvas.add(object.img);
                                    canvas.bringToFront(object.img);
                                }
                            }
                        }
                        // Add your canvas-specific objects here

                        // Get canvas data
                        const canvasDataItem = {
                            imageData: canvas.toDataURL({ format: 'png', quality: 1 }),
                            // Add other properties as needed
                        };

                        canvasData.push(canvasDataItem);

                        // Show JSON in the console after processing all canvases
                        if (i === imagenes.length - 1) {
                            console.log(JSON.stringify(canvasData, null, 2));
                            try {
                                const res = await fetch('/api/orders', { method: 'POST', body: JSON.stringify({ canvasData, product }) }).then(res => res.json());
                                console.log(res);
                                if (res.error)
                                    toast.error(res.error, {
                                        position: "bottom-left",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                    });
                                else
                                    toast.success(res.data, {
                                        position: "bottom-left",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                    });
                            } catch (e) {
                                console.log(e);
                            }

                        }
                    },
                    { crossOrigin: 'anonymous' }
                );
            }


        }
    };

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        const idGenerated = uuidv4();
        if (files && files.length > 0 && editor) {
            const newFiles = Array.from(files).map((file) => ({
                id: idGenerated, // Puedes utilizar alguna función para generar un ID único
                groupIndex: currentImageIndex,
                imageUrl: URL.createObjectURL(file),
            }));

            setFilesArray((prevFilesArray) => [...prevFilesArray, ...newFiles]);

            newFiles.forEach(({ imageUrl }) => {
                fabric.Image.fromURL(imageUrl, function (oImg) {
                    oImg.scaleToWidth(editor?.canvas?.width ? editor?.canvas?.width / 3 : 0);
                    const offsetX = editor?.canvas?.width ? editor?.canvas?.width / 2 : 0;
                    const offsetY = editor?.canvas?.height ? editor?.canvas?.height / 2 : 0;
                    oImg.set({
                        left: offsetX,
                        top: offsetY,
                        originX: 'center',
                        originY: 'center',
                    });

                    editor.canvas.add(oImg);
                    editor.canvas.bringToFront(oImg);

                    setImageObjects(prevImageObjects => ({
                        ...prevImageObjects,
                        [idGenerated]: {
                            img: oImg,
                            index: currentImageIndex,
                            imageData: imageUrl
                        }
                    }))
                });
            });

        }

        console.log(imageObjects);
    };

    const handleImageClick = (index: number) => {
        if (editor && editor.canvas) {
            if (index === currentImageIndex) {
                // Si el índice clickeado es el mismo que el índice actual, no hagas nada
                return;
            }

            // Setear el nuevo currentImageIndex
            setCurrentImageIndex(index);

            // Filtrar los elementos de filesArray por el nuevo currentImageIndex
            const filteredFilesArray = filesArray.filter((file) => file.groupIndex === index);

            // Limpiar el canvas antes de agregar las nuevas imágenes
            editor.canvas.clear();
            for (const objectId in imageObjects) {
                if (imageObjects.hasOwnProperty(objectId)) {
                    const object = imageObjects[objectId];
                    if (object.index === index) {
                        editor.canvas.add(object.img);
                        editor.canvas.bringToFront(object.img);
                    }
                }
            }
            // Agregar las nuevas imágenes al canvas
        }
    };

    const handleDeleteImage = (id: string) => {
        const toDelete = imageObjects[id].img;
        console.log(toDelete);
        if (editor && editor.canvas) {
            if (toDelete) {
                // Remove the corresponding element from filesArray
                setFilesArray((prevFilesArray) =>
                    prevFilesArray.filter((file) => file.id !== id)
                );
                setImageObjects((prevImageObjects) => {
                    const updatedImageObjects = { ...prevImageObjects };
                    delete updatedImageObjects[id];
                    return updatedImageObjects;
                });

                editor.canvas.remove(toDelete);
            }
        }
    };

    // useEffect(() => {
    //     if (editor && editor.canvas) {
    //         // Crear una imagen de fondo
    //         fabric.Image.fromURL(
    //             imagenes[currentImageIndex],
    //             (img) => {
    //                 img.scaleToWidth(500);
    //                 img.scaleToHeight(500);
    //                 img.set({
    //                     originX: 'left',
    //                     originY: 'top',
    //                     evented: false,
    //                     lockMovementX: true,
    //                     lockMovementY: true,
    //                     lockRotation: true,
    //                     lockScalingX: true,
    //                     lockScalingY: true,
    //                     lockUniScaling: true,
    //                     //zIndex: 1,
    //                 });

    //                 // Limpiar el canvas antes de cargar la nueva imagen
    //                 editor.canvas.clear();
    //                 editor.canvas.setBackgroundImage(img, editor.canvas.renderAll.bind(editor.canvas));
    //             },
    //             { crossOrigin: 'anonymous' }
    //         );
    //     }
    // }, []);

    useEffect(() => {
        if (editor && editor.canvas) {
            console.log(imagenes[currentImageIndex]);
            // Crear una imagen de fondo
            fabric.Image.fromURL(
                imagenes[currentImageIndex].url,
                (img) => {

                    if (img.height! > img.width! && screen.width > 768)
                        img.scaleToHeight(editor?.canvas?.height ? editor?.canvas?.height - 32 : 0);
                    else
                        img.scaleToWidth(editor?.canvas?.width ? editor?.canvas?.width - 32 : 0);

                    img.set({
                        originX: 'center',
                        originY: 'center',
                        top: editor.canvas.getCenter().top,
                        left: editor.canvas.getCenter().left,
                        evented: false,
                        lockMovementX: true,
                        lockMovementY: true,
                        lockRotation: true,
                        lockScalingX: true,
                        lockScalingY: true,
                        lockUniScaling: true,
                        //zIndex: 1,
                    });

                    // Limpiar el canvas antes de cargar la nueva imagen
                    editor.canvas.setBackgroundImage(img, editor.canvas.renderAll.bind(editor.canvas));
                },
                { crossOrigin: 'anonymous' }
            );
        }
        editor?.canvas.setWidth(screen.width < 768 ? screen.width - 32 : 500);
        editor?.canvas.setHeight(500);
    }, [editor]);

    return (
        <>
            <ToastContainer
            />
            <div className={`flex flex-col md:flex-row w-full 2xl:w-2/3 justify-center p-4 pt-0 2xl:mt-8 2xl:pt-4`}>

                <div className={`flex flex-col w-full md:w-1/2 h-5/6 bg-cover bg-center`}>
                    <FabricJSCanvas className={`flex bg-neutral-200 w-full h-5/6 rounded-xl justify-center`} onReady={onReady} />
                    <div className={`flex w-full h-1/6 items-center overflow-x-auto`}>
                        {
                            imagenes.map((imagen, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-center cursor-pointer"
                                    onClick={() => handleImageClick(index)}
                                >
                                    <img src={imagen.url} alt={`imagen-${index}`} className="w-28 h-28 object-cover rounded-xl bg-neutral-200 mt-4 mr-4 p-2" />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={`md:ml-4 w-full md:h-5/6 mt-4 md:mt-0`}>
                    <div className='flex bg-white rounded-xl p-8 justify-between items-end'>
                        <div>
                            <p className='font-semibold text-neutral-400'>{product?.categories.name}</p>
                            <p className='font-bold text-4xl text-neutral-800'>{product?.name}</p>
                        </div>
                        <p className='text-6xl font-black text-turquoise-700'>${product?.price}</p>
                    </div>
                    <div className='bg-white rounded-xl p-8 justify-between items-end mt-4'>
                        <div className='flex w-full flex-col md:flex-row'>
                            <div className='flex w-1/2'>
                                <div>
                                    <p className='font-bold text-neutral-800 text-xl pb-4'>Color</p>
                                    <div className='flex'>
                                        <div className='rounded-xl bg-hit-pink-800 h-12 w-12 mr-2'></div>
                                        <div className='rounded-xl bg-hit-pink-700 h-12 w-12 mr-2'></div>
                                        <div className='rounded-xl bg-hit-pink-600 h-12 w-12 mr-2'></div>
                                        <div className='rounded-xl bg-hit-pink-500 h-12 w-12 mr-2'></div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex mt-4 md:mt-0 md:ml-4 w-1/2'>
                                <div>
                                    <p className='font-bold text-neutral-800 text-xl pb-4'>Talla</p>
                                    <div className='flex'>
                                        <div className='rounded-xl bg-neutral-100 mr-2 font-black w-12 h-12 flex items-center justify-center'>S</div>
                                        <div className='rounded-xl bg-neutral-100 mr-2 font-black w-12 h-12 flex items-center justify-center'>M</div>
                                        <div className='rounded-xl bg-neutral-100 mr-2 font-black w-12 h-12 flex items-center justify-center'>L</div>
                                        <div className='rounded-xl bg-neutral-100 mr-2 font-black w-12 h-12 flex items-center justify-center'>XL</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className='font-bold text-neutral-800 text-xl mt-4'>Imágenes</p>
                        <div className="w-full flex">
                            <input ref={fileInput} type="file" accept="image/*" className={`hidden`} onChange={handleInputChange} />
                            <button
                                className={`bg-neutral-200 rounded-xl w-min-28 w-28 h-28 mr-4 my-4 text-4xl text-neutral-500 hover:text-neutral-600 font-black transition-all`}
                                onClick={() => { fileInput.current?.click() }}>
                                +
                            </button>
                            <div className='flex flex-1 overflow-x-auto py-4'>
                                <div className={`flex w-fit`}>
                                    {filesArray.map((inputFile, index) => (
                                        inputFile.groupIndex == currentImageIndex &&
                                        <div key={index} className={`relative mb-2 bg-neutral-200 p-2 rounded-xl w-28 h-28 object-contain mr-4`}>
                                            <img src={inputFile.imageUrl} alt={`user-image-${index}`} className={`w-full h-full object-contain rounded-lg`} />
                                            <button
                                                className={`absolute top-[-8px] right-[-8px] h-8 w-8 bg-neutral-400 rounded-full text-white px-1 rotate-45 hover:bg-neutral-500 hover:rotate-[-315deg] font-black transition-all`}
                                                onClick={() => { handleDeleteImage(inputFile.id) }}
                                            >
                                                +
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='flex bg-turquoise-50 rounded-t-xl md:rounded-xl p-4 md:p-8 justify-end md:justify-between items-center mt-4 fixed bottom-0 md:static w-full left-0'>

                        <div className='hidden md:block'>
                            <p className='text-neutral-800 font-bold pb-1 opacity-70'>Cantidad</p>
                            <div className='flex p-1 bg-white rounded-xl'>
                                <button className='w-12 font-black text-turquoise-700'>-</button>
                                <p className='font-bold px-4'>1</p>
                                <button className='w-12 font-black text-turquoise-700'>+</button>
                            </div>
                        </div>

                        <div className="flex">
                            <button className='bg-white md:hover:bg-neutral-50 active:bg-hit-pink-50 flex items-center md:h-12 w-12 justify-center rounded-xl'>
                                <Image className='my-auto mr-1' src="/cart.svg" alt="Cart" width={25} height={25} />
                            </button>
                            <button
                                onClick={handleExportClick}
                                className='bg-turquoise-500 hover:bg-turquoise-600 md:h-12 active:bg-turquoise-700 text-white py-2 px-4 rounded-xl font-bold ml-4 transition-all'
                            >
                                Pedir ahora
                            </button>
                        </div>
                    </div>
                    {/* <div className={`flex-col bg-blue-300 w-full h-1/4`}>
                    <button className={`bg-blue-500 text-white p-2`} onClick={handleExportClick}>
                        Exportar Canvas
                    </button>
                </div> */}
                </div>
            </div>
        </>
    );
};

export default Home;