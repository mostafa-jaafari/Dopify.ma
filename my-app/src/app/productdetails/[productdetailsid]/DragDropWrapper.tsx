'use client';
import { useDroppable } from "@dnd-kit/core";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Move, ZoomOut, ZoomIn, RefreshCcw, Trash2, Undo } from "lucide-react";
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import MediaLibraryComponent from "./MediaLibraryComponent";
import Loading from "@/components/Loading";

function DropZone({ image, onRemoveImage }: { image: string | null, onRemoveImage: () => void }) {
  const { setNodeRef, isOver } = useDroppable({
    id: "drop-zone",
  });
  
  // State for resize functionality
  const [imageSize, setImageSize] = useState(100); // Size as percentage
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  
  // Refs for smooth dragging
  const imageRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(imagePosition);
  
  // Update ref when state changes
  useEffect(() => {
    positionRef.current = imagePosition;
  }, [imagePosition]);
  
  // Function to handle resizing image
  const handleResize = (changeAmount: number) => {
    setImageSize(prev => {
      const newSize = prev + changeAmount;
      return Math.min(Math.max(newSize, 30), 200); // Limit between 30% and 200%
    });
  };
  
  // Function to handle image repositioning with requestAnimationFrame
  const startDrag = (e) => {
    e.preventDefault(); // Prevent text selection during drag
    setIsDragging(true);
    setDragStartPos({
      x: e.clientX - positionRef.current.x,
      y: e.clientY - positionRef.current.y
    });
  };
  
  const onDrag = (e) => {
    if (!isDragging) return;
    
    // Use requestAnimationFrame for smooth animation
    requestAnimationFrame(() => {
      const newX = e.clientX - dragStartPos.x;
      const newY = e.clientY - dragStartPos.y;
      
      // Apply position directly to DOM for smoother movement
      if (imageRef.current) {
        // Update the state for when the drag ends
        setImagePosition({ x: newX, y: newY });
        positionRef.current = { x: newX, y: newY };
      }
    });
  };
  
  const endDrag = () => {
    setIsDragging(false);
  };
  
  // Add event listeners for drag
  useEffect(() => {
    const handleMouseMove = (e) => onDrag(e);
    const handleMouseUp = () => endDrag();
    
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStartPos]);
  
  // Reset all transformations
  const resetTransformations = () => {
    setImageSize(100);
    setImagePosition({ x: 0, y: 0 });
    positionRef.current = { x: 0, y: 0 };
    setRotation(0);
  };
  
  // Handle rotation
  const rotateImage = () => {
    setRotation(prev => (prev + 90) % 360);
  };
  
  return (
    <section className="w-full relative">
        <div
            ref={setNodeRef}
            className={`w-full h-[250px] transition-colors duration-200
            ${isOver ? "border-2 border-blue-500 bg-blue-600/50" : image ? "border-1 border-blue-600 border-dashed" : "border-2 border-dashed text-blue-500 border-blue-600 bg-blue-500/20"}
            rounded-lg flex items-center justify-center relative overflow-hidden`}
        >
        {image ? (
            <>
            <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{ touchAction: 'none' }}
            >
                <div
                ref={imageRef}
                className="relative cursor-move"
                style={{
                    transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) rotate(${rotation}deg) scale(${imageSize/100})`,
                    transition: isDragging ? 'none' : 'transform 0.2s ease',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    willChange: 'transform' // Optimizes transform animations
                }}
                onMouseDown={startDrag}
                onTouchStart={(e) => {
                  e.preventDefault();
                  const touch = e.touches[0];
                  startDrag({ clientX: touch.clientX, clientY: touch.clientY, preventDefault: () => {} });
                }}
                >
                <Image 
                    src={image} 
                    alt="Dropped design" 
                    width={200} 
                    height={200}
                    className="object-cover"
                    draggable="false" // Prevent browser's native drag
                />
                </div>
            </div>
            </>
        ) : (
            <span className="text-blue-100 font-semibold flex items-center gap-2">
            <ZoomIn size={18} /> Drop image here
            </span>
        )}
        </div>
        {/* Control toolbar */}
        {image && (
            <div className="absolute -bottom-9 left-1/2 transform -translate-x-1/2 
            backdrop-blur-sm rounded-full px-3 py-1 shadow-lg 
            border border-neutral-200 flex gap-2 text-blue-100">
                    <button 
                    onClick={() => handleResize(10)}
                    className="p-1 border border-transparent hover:border hover:border-neutral-100 cursor-pointer rounded-full" 
                    title="Increase size"
                    >
                    <ZoomIn size={16} />
                    </button>
                    <button 
                    onClick={() => handleResize(-10)}
                    className="p-1 border border-transparent hover:border hover:border-neutral-100 cursor-pointer rounded-full" 
                    title="Decrease size"
                    >
                    <ZoomOut size={16} />
                    </button>
                    <button 
                    onClick={rotateImage}
                    className="p-1 border border-transparent hover:border hover:border-neutral-100 cursor-pointer rounded-full" 
                    title="Rotate"
                    >
                    <RefreshCcw size={16} />
                    </button>
                    <button 
                    onClick={resetTransformations}
                    className="p-1 border border-transparent hover:border hover:border-neutral-100 cursor-pointer rounded-full" 
                    title="Reset"
                    >
                    <Undo size={16} />
                    </button>
                    <button 
                    onClick={onRemoveImage}
                    className="p-1 hover:bg-red-100 text-red-600 rounded-full" 
                    title="Remove"
                    >
                    <Trash2 size={16} />
                    </button>
                </div>
        )}
    </section>
  );
}


export default function DragDropWrapper({ PRODUCTID }) {
  const [droppedImage, setDroppedImage] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const raw = localStorage.getItem("Template-Products");
    if (raw) {
      try {
        const templates = JSON.parse(raw);
        const selected = templates.find((product) => product.id.toString() === PRODUCTID.toString());
        setSelectedTemplate(selected);
      } catch (error) {
        console.error("Failed to parse localStorage:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [PRODUCTID]);

  const handleDragEnd = (event) => {
    const { over, active } = event;
    
    if (over && over.id === "drop-zone") {
      setDroppedImage(active.data.current.image);
    }
  };

  const handleRemoveImage = () => {
    setDroppedImage(null);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <main className="w-full flex items-start">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <MediaLibraryComponent />
        <section className="grow flex flex-col items-center">
          {IsLoading ? (
            <div className="grow min-h-50 flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            <div className="relative w-[450px] h-[450px] rounded-lg border border-neutral-200 overflow-hidden shadow-lg">
              <Image src={selectedTemplate.image} alt="" fill className="object-cover" />
              <section className="absolute left-0 top-0 w-full flex flex-col justify-center items-center px-6 h-full">
                <DropZone image={droppedImage} onRemoveImage={handleRemoveImage} />
              </section>
            </div>
          )}
        </section>
      </DndContext>
    </main>
  );
}