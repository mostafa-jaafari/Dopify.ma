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
    Info,
    Download,
    Save,
    CheckCircle,
} from 'lucide-react';
import { MediaLibraryRenderSection } from "@/GlobalLinks";
import UploadBtn from "@/components/UploadBtn";
import Image from "next/image";
import CalculateImageSize from "@/Functions/CalculateImageSize";
import TemplatesTab from "./TemplatesTab";
import GlobalLogo from "@/components/GlobalLogo";

export default function DragDropWrapper({ ProductId }) {
    const [Notification, setNotification] = useState({ show: false, message: '', type: '' })
    // Show notification
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 5000);
  };
    // State to track the currently dragged item
    const [DraggedItem, setDraggedItem] = useState(null);
    // State to track the item dropped into the drop zone
    const [DroppedItem, setDroppedItem] = useState(null);
    // Accessing media library data from context
    const { MediaLibraryData, IsLoadingData } = useContext(MLData);

    // Function to handle drag start event
    const HandleDragStart = (e, design) => {
        setDraggedItem(design);
        e.dataTransfer.setData('image', JSON.stringify(design));
    };

    // Function to handle drag over event
    const HandleDragOver = (e) => {
        e.preventDefault();
    };

    // Function to handle drop event
    const HandleDrop = (e) => {
        try {
            e.preventDefault();
            const data = e.dataTransfer.getData('image');
            const designObject = JSON.parse(data);
            setDroppedItem(designObject);
            setDraggedItem(null);
            showNotification('Design added successfully', 'success');
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
        showNotification('Design reset successfully', 'infos');
    };

    // Function to delete the dropped design
    const HandleDeleteDesign = () => {
        setDraggedItem(null);
        setDroppedItem(null);
        showNotification('Design deleted successfully', 'error');
    };

    // Ref to track the image container for downloading
    const ImageToDownloadRef = useRef(null);

    const [IsDownloading, setIsDownloading] = useState(false);
    // Function to download the image as PNG
    const downloadImage = async () => {
        if (!ImageToDownloadRef.current) return;
        
        try {
            setIsDownloading(true);
            const dataUrl = await toPng(ImageToDownloadRef.current, {
                cacheBust: true,
                pixelRatio: 3,
                width: ImageToDownloadRef.current.offsetWidth,
                height: ImageToDownloadRef.current.offsetHeight
            });
    
            download(dataUrl, 'design.png');
        } catch (err) {
            alert('Something went wrong, please call support!');
        } finally {
            setIsDownloading(false);
            showNotification('Image downloaded successfully', 'success');
        }
    };
    
    const [ActiveTab, setActiveTab] = useState('templates');
    const HandleRenderTab = () => {
        switch (ActiveTab) {
            case 'templates':
                return (
                    <div className="w-full h-full">
                        <TemplatesTab HandleDragStart={HandleDragStart}/>
                    </div>
                );
            case 'upload':
                return (
                    <section>
                        <div className="w-full bg-neutral-500/10 px-10 py-2 border-b border-neutral-300">
                            <UploadBtn
                                buttonText="Uppload Now" 
                            />
                        </div>
                        {MediaLibraryData.length > 0 ? (
                            <div className="w-full grid grid-cols-3 gap-2 mt-2 px-6">
                                {MediaLibraryData.map((design, index) => {
                                    return (
                                        <div key={index}>
                                            <div
                                                draggable
                                                onDragStart={(e) => HandleDragStart(e, design)}
                                                className="relative cursor-grab overflow-hidden 
                                                w-20 h-20 rounded-lg border border-neutral-400 
                                                hover:shadow-lg hover:scale-105 transition-all duration-200">
                                                    <Image src={design} alt="" fill className="object-cover" />
                                            </div>
                                            <CalculateImageSize IMAGESELECTED={design} />
                                        </div>
                                    );
                                })}
                                </div>
                        ) : (
                            <div>
                                <h1 className="text-2xl font-semibold text-neutral-700">No Designs Found</h1>
                                <p className="text-sm text-neutral-500">Please upload your designs to the media library.</p>
                            </div>
                        )}
                    </section>
                )
            default:
                return null;
        }
    }
    
    return (
        <main className="w-full">
            <section className="w-full flex items-center justify-between 
            py-2 px-20 border-b border-neutral-200 bg-white">
                <GlobalLogo />
                <div className="space-x-2 flex items-center">
                    <button 
                        onClick={downloadImage} 
                        className={`bg-black hover:bg-black/80 text-white px-4 py-2 
                            rounded-lg font-semibold cursor-pointer min-w-[200px]
                            ${IsDownloading && 'LoadingButton'}`} 
                            style={{ '--my-gradient': 'linear-gradient(to right, transparent, #000000, transparent)' } as React.CSSProperties}>
                            {IsDownloading ? "Finalizing..." : (
                            <span className="flex items-center gap-1">
                                <Download size={20}/> Download Preview
                            </span>
                        )} 
                    </button>
                    <button className="bg-indigo-700 py-2 px-4 font-semibold 
                        text-white flex items-center gap-1 rounded-lg cursor-pointer hover:bg-indigo-700/80">
                        <Save size={20}/> Save Design
                    </button>
                </div>
            </section>
            <section className="w-full flex justify-center">
                <div className="w-max my-2 px-6 py-2 flex items-center gap-2 
                    rounded-full shadow text-sm bg-orange-200/90 border 
                    border-orange-200 text-neutral-600">
                    <Info size={18}/>
                    Make sure your design is at least 150 DPI and has a resolution of 
                    3000 pixels or more for the best printing results.
                </div>
            </section>
            <section className="w-full flex justify-start items-start gap-10 py-10 px-20">
                {/* Section for media library */}
                <section className="w-1/3 flex border border-neutral-200 bg-white h-120 rounded-lg overflow-hidden">
                    <ul className="h-full space-y-1 border-r border-neutral-200 p-2">
                        {MediaLibraryRenderSection.map((item, index) => {
                            const FiltredItem = item.label.toLocaleLowerCase().replace(' ','');
                            return (
                                <li 
                                    key={index}
                                    onClick={() => setActiveTab(FiltredItem)}
                                    className={`flex flex-col items-center border-b
                                        border-neutral-200 py-1 cursor-pointer px-1 py-2 text-xs
                                        ${ActiveTab.toLocaleLowerCase().replace(' ','') === FiltredItem ? 'bg-black shadow-lg rounded-lg text-white' : 'hover:bg-black/50 hover:rounded-lg hover:text-white'}`}>
                                        <item.icon />
                                        {item.label}
                                    </li>
                            )
                        })}
                    </ul>
                    <div className="w-full">
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
                    <div className="absolute -right-27 top-50 bg-white flex gap-1 border border-neutral-400 rounded-[50px] rotate-90 py-0.5 px-1">
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
            </section>
            {Notification.show && (
                <div className={`fixed bottom-4 right-4 p-3 rounded-lg shadow-lg flex items-center gap-2 z-50 transition-all duration-300 delay-200 
                ${Notification.type === 'error' ? 'bg-red-500 text-white' : 
                    Notification.type === 'success' ? 'bg-green-500 text-white' : 
                    'bg-blue-500 text-white'}`}
                >
                {Notification.message} {Notification.type === 'success' ? (<CheckCircle size={20} />) : (<Info size={20} />)}
                </div>
            )}
        </main>
    );
}