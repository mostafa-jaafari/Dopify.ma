'use client';
import { useRef, useState } from 'react';

export default function DragTest() {
  const boxRef = useRef(null);
  const itemRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setDragging(true);

    const item = itemRef.current;
    const rect = item.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;

    const box = boxRef.current.getBoundingClientRect();
    const item = itemRef.current.getBoundingClientRect();

    let newX = e.clientX - box.left - offset.x;
    let newY = e.clientY - box.top - offset.y;

    // Limit movement inside the box
    newX = Math.max(0, Math.min(newX, box.width - item.width));
    newY = Math.max(0, Math.min(newY, box.height - item.height));

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      ref={boxRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="relative w-[500px] h-[400px] border-4 border-dashed border-violet-500 mx-auto mt-10"
    >
      <div
        ref={itemRef}
        onMouseDown={handleMouseDown}
        className="absolute w-[100px] h-[100px] bg-violet-600 text-white flex items-center justify-center rounded-lg cursor-grab select-none"
        style={{
          left: position.x,
          top: position.y,
          transition: dragging ? 'none' : 'transform 0.2s',
        }}
      >
        Drag Me
      </div>
    </div>
  );
}
