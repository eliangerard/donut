"use client"

import { v4 as uuidv4 } from 'uuid';
import { useEffect, useRef, useState } from 'react';
import { useFabricJSEditor, FabricJSCanvas } from 'fabricjs-react';
import { fabric } from 'fabric';

const imagenes = [
    'https://cf.shopee.com.mx/file/57ca00788517873f4764d6b4ebe61c4f',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZvPxOindKfTLcmTiJE_pHgstNl970cJWZl8WHQJYHgl0dSFMEmRpXY6aCBSrjLY94HvM&usqp=CAU',
    'https://cdn1.coppel.com/images/catalog/mkp/7005/3000/70051994-1.jpg',
];

const Home = ({ imagenes = [{ url: "" }] }: { imagenes: any[] }) => {

    const fileInput = useRef<HTMLInputElement>(null);

    const { editor, onReady } = useFabricJSEditor();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageObjects, setImageObjects] = useState([] as unknown as { [key: string]: { img: fabric.Image, index: number } });
    const [filesArray, setFilesArray] = useState([] as unknown as { id: string, groupIndex: number, imageUrl: string }[]);

    console.log("i", imagenes);

    const handleExportClick = () => {
        if (editor && editor.canvas) {

            const canvasData: Array<{ imageData: string }> = [];
            for (let i = 0; i < imagenes.length; i++) {
                const canvas = new fabric.Canvas(null, { width: editor?.canvas.width, height: editor?.canvas.height });

                console.log(imagenes[i].url);

                fabric.Image.fromURL(
                    imagenes[i].url,
                    (img) => {
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
                        }
                    },
                    { crossOrigin: 'anonymous' }
                );
            }
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                            index: currentImageIndex
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
                    img.scaleToWidth(editor?.canvas?.width ? editor?.canvas?.width : 0);
                    img.scaleToHeight(editor?.canvas?.height ? editor?.canvas?.height : 0);
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
                        //zIndex: 1,
                    });

                    // Limpiar el canvas antes de cargar la nueva imagen
                    editor.canvas.setBackgroundImage(img, editor.canvas.renderAll.bind(editor.canvas));
                },
                { crossOrigin: 'anonymous' }
            );
        }

        editor?.canvas.setWidth(500);
        editor?.canvas.setHeight(500);
    }, [editor]);

    return (
        <div className={`flex min-h-screen w-2/3 h-full justify-center`}>
            <div className={`flex flex-col w-3/5 h-full bg-cover bg-center`}>
                <FabricJSCanvas className={`flex bg-neutral-200 w-full h-5/6 rounded-xl p-8`} onReady={onReady} />
                <div className={`flex w-full h-1/6 items-center overflow-x-scroll`}>
                    {
                        imagenes.map((imagen, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center cursor-pointer"
                                onClick={() => handleImageClick(index)}
                            >
                                <img src={imagen.url} alt={`imagen-${index}`} className="w-28 h-28 object-cover rounded-xl bg-neutral-200 mt-4 mr-4 p-2" />
                            </div>
                        ))}
                </div>
            </div>
            <div className={`flex ml-10 w-2/5 h-5/6`}>
                <input ref={fileInput} type="file" accept="image/*" className={`hidden`} onChange={handleInputChange} />
                <button
                    className={`bg-neutral-200 rounded-xl w-28 h-28 mr-4 my-4 text-4xl text-neutral-500 hover:text-neutral-600 font-black transition-all`}
                    onClick={() => { fileInput.current?.click() }}>
                    +
                </button>
                <div className='flex overflow-x-scroll py-4'>
                    <div className={`flex w-fit`}>
                        {filesArray.map((inputFile, index) => (
                            inputFile.groupIndex == currentImageIndex &&
                            <div key={index} className={`relative mb-2 bg-neutral-200 p-2 rounded-xl w-28 h-28 object-contain mr-4`}>
                                <img src={inputFile.imageUrl} alt={`user-image-${index}`} className={`w-full h-full object-contain`} />
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
                {/* <div className={`flex-col bg-blue-300 w-full h-1/4`}>
                    <button className={`bg-blue-500 text-white p-2`} onClick={handleExportClick}>
                        Exportar Canvas
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default Home;