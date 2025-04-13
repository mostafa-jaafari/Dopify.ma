'use client';
import { useDraggable } from "@dnd-kit/core";
import { X } from "lucide-react";
import Image from "next/image";

export default function DraggableImage({ image, index, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: index,
    data: {
      image,
    },
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition: isDragging ? 'none' : 'transform 250ms ease',
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <div className="relative shadow overflow-hidden cursor-grab w-[90px] h-[90px] 
        border border-neutral-400 rounded-lg bg-white">
        <Image src={image} alt="" fill className="object-cover" />
        <X onClick={() => onDelete(index)} size={16} 
        className="bg-red-600 hover:bg-red-500 cursor-pointer 
          rounded-full text-white absolute right-1 top-1" />
      </div>
    </div>
  );
}
