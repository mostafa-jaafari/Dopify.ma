'use client';
import { MLData } from "@/components/MediaLibraryProvider";
import { toPng } from "html-to-image";
import { useContext, useRef, useState } from "react";
import download from 'downloadjs';
import {
    ZoomIn,
    ZoomOut,
    RotateCw,
    RefreshCcw,
    Trash2,
} from 'lucide-react';
import { MediaLibraryRenderSection } from "@/GlobalLinks";

export default function DragDropWrapper({ ProductId }) {
    // State to track the currently dragged item
    const [DraggedItem, setDraggedItem] = useState(null);
    // State to track the item dropped into the drop zone
    const [DroppedItem, setDroppedItem] = useState(null);
    // Accessing media library data from context
    const { MediaLibraryData } = useContext(MLData);

    // Function to handle drag start event
    const HandleDragStart = (e, design) => {
        setDraggedItem(design);
        e.dataTransfer.setData('image', design);
    };

    // Function to handle drag over event
    const HandleDragOver = (e) => {
        e.preventDefault();
    };

    // Function to handle drop event
    const HandleDrop = (e) => {
        try {
            e.preventDefault();
            setDroppedItem(DraggedItem);
            setDraggedItem(null);
        } catch {
            alert('Something went wrong, please call support!');
        }
    };

    // State to store templates from localStorage
    const [storedData, setStoredData] = useState<any[]>(() => {
        const savedTemplates = localStorage.getItem("Template-Products");
        return savedTemplates ? JSON.parse(savedTemplates) : [];
    });

    // Find the selected template based on ProductId
    const SelectedTemplate = storedData.find((temp) => temp.id === Number(ProductId));

    // State to track the position of the dropped item
    const [position, setPosition] = useState({ x: 100, y: 20 });
    // State to track if the item is being dragged
    const [isDragging, setIsDragging] = useState(false);

    // Function to handle mouse down event for dragging
    const handleMouseDown = (e) => {
        setIsDragging(true);
    };

    // Function to handle mouse up event to stop dragging
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Function to handle mouse move event for dragging
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        setPosition((prev) => ({
            x: prev.x + e.movementX,
            y: prev.y + e.movementY,
        }));
    };

    // State to track zoom level
    const [zoom, setZoom] = useState(1);
    // State to track rotation angle
    const [rotate, setRotate] = useState(0);

    // Function to handle zoom in
    const HandleZoom = () => {
        setZoom(prev => prev + 0.12);
    };

    // Function to handle zoom out
    const HandleZoomOut = () => {
        setZoom(prev => prev - 0.12);
    };

    // Function to handle rotation
    const HandleRotate = () => {
        setRotate(prev => prev + 45);
    };

    // Function to reset zoom, rotation, and position
    const HandleReset = () => {
        setZoom(1);
        setRotate(0);
        setPosition({ x: 100, y: 20 });
    };

    // Function to delete the dropped design
    const HandleDeleteDesign = () => {
        setDraggedItem(null);
        setDroppedItem(null);
    };

    // Ref to track the image container for downloading
    const ImageToDownloadRef = useRef(null);

    // Function to download the image as PNG
    const downloadImage = () => {
        if (!ImageToDownloadRef.current) return;

        toPng(ImageToDownloadRef.current, {
            cacheBust: true,
            pixelRatio: 3, // Higher value for better quality
            width: ImageToDownloadRef.current.offsetWidth,
            height: ImageToDownloadRef.current.offsetHeight
        })
            .then((dataUrl) => {
                download(dataUrl, 'design.png');
            })
            .catch((err) => {
                console.error('Error generating image:', err);
            });
    };
    const [ActiveTab, setActiveTab] = useState('media');
        // State for the Image That will deploy to Cloudinary then Firestore
    const [SelectedFile, setSelectedFile] = useState(null);
        // State for a Preview Image
    const [ImagePreview, setImagePreview] = useState(null);
    const HandleChooseFile = (e) => {
        const file = e.target.files[0];
        if(file){
            setSelectedFile(file);
            const URLImage = URL.createObjectURL(file);
            setImagePreview(URLImage);
        }
    }
    const HandleRenderTab = () => {
        switch (ActiveTab) {
            case 'media':
                return (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                        <h1 className="text-2xl font-semibold text-neutral-700">Media Library</h1>
                    </div>
                );
            case 'upload':
                return (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                        Upload Media
                    </div>
                )
            default:
                return null;
        }
    }
    return (
        <main className="w-full flex justify-start items-start gap-10">
            {/* Section for media library */}
            <section className="w-1/3 flex border border-neutral-200 bg-white h-120 rounded-lg overflow-hidden">
                <ul className="h-full border-r border-neutral-200">
                    {MediaLibraryRenderSection.map((item, index) => {
                        const FiltredItem = item.label.toLocaleLowerCase().replace(' ','');
                        return (
                            <li 
                                key={index}
                                onClick={() => setActiveTab(FiltredItem)}
                                className={`flex flex-col items-center border-b 
                                    border-neutral-200 px-2 py-1 cursor-pointer ${ActiveTab.toLocaleLowerCase().replace(' ','') === FiltredItem ? 'bg-neutral-900/40 text-white' : ''}`}>
                                    <item.icon />
                                    {item.label}
                                </li>
                        )
                    })}
                </ul>
                <div>
                    {HandleRenderTab()}
                </div>
            </section>

    {/* Section for the drop zone and design manipulation */}
    <section className="relative w-120 h-120 flex flex-col items-center gap-2">
    {/* Container for the selected template */}
    <section
        ref={ImageToDownloadRef}
        style={{
            backgroundImage: `url(${SelectedTemplate?.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}
        className="w-full h-full rounded-lg flex justify-center items-center overflow-hidden"
    >
        {/* Drop zone for dragging and dropping designs */}
        <div
            onDrop={HandleDrop}
            onDragOver={HandleDragOver}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="relative w-full h-full flex flex-col justify-center items-center overflow-hidden"
        >
            {DroppedItem !== null ? (
                <div
                    style={{
                        position: 'absolute',
                        top: position.y,
                        left: position.x,
                        width: `${480 * zoom}px`,
                        height: `${480 * zoom}px`,
                        transform: `rotate(${rotate}deg)`,
                        transformOrigin: 'center center',
                    }}
                    onMouseDown={handleMouseDown}
                >
                    {/* Render the dropped design */}
                    <img
                        src={DroppedItem}
                        alt=""
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                        style={{ width: '100%', height: '100%' }}
                        className="rounded-lg object-contain"
                    />
                </div>
            ) : (
                <div className="w-[90%] h-60 font-semibold flex gap-1 
                    justify-center items-center border border-dashed 
                    border-blue-600 text-blue-600 rounded-lg bg-blue-600/20">
                    <ZoomIn size={20} /> Drop You Design Here...
                </div>
            )}
        </div>
    </section>

    {/* Controls for zoom, rotate, reset, and delete */}
    {DroppedItem !== null && (
        <div className="absolute -right-27 bg-white flex gap-1 border border-neutral-400 rounded-[50px] rotate-90 py-0.5 px-1">
            <ZoomIn
                onClick={HandleZoom}
                size={28}
                className="text-neutral-700 cursor-pointer border border-transparent rounded-full 
                    hover:border-neutral-500 p-1 -rotate-90" />
            <ZoomOut
                onClick={HandleZoomOut}
                size={28}
                className="text-neutral-700 cursor-pointer border border-transparent rounded-full 
                    hover:border-neutral-500 p-1 -rotate-90" />
            <RotateCw
                onClick={HandleRotate}
                size={28}
                className="text-neutral-700 cursor-pointer border border-transparent rounded-full 
                    hover:border-neutral-500 p-1 -rotate-90" />
            <RefreshCcw
                onClick={HandleReset}
                size={28}
                className="text-neutral-700 cursor-pointer border border-transparent rounded-full 
                    hover:border-neutral-500 p-1 -rotate-90" />
            <Trash2
                onClick={HandleDeleteDesign}
                size={28}
                className="text-red-600 -rotate-90 p-1.5 rounded-full 
                    cursor-pointer hover:bg-red-600 hover:text-white" />
        </div>
    )}
</section>

        </main>
    );
}