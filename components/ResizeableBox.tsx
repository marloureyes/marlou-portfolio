"use client";
import Image from "next/image";
import { useState, useRef, Dispatch, SetStateAction, useEffect } from "react";
interface Props {
  width: number;
  height: number;
  src: string;
  alt: string;
  reset: boolean;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}
export default function ResizableBox({
  width,
  height,
  src,
  alt,
  show,
  reset,
  setShow,
}: Props) {
  const boxRef = useRef(null);
  const [size, setSize] = useState({ width: width, height: height });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reset) {
      setSize({ width: width, height: height });
      setPosition({ x: 0, y: 0 });
    }
  }, [reset, width, height, show]);

  const handleResize = (direction, e) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;
    const startXPos = position.x;
    const startYPos = position.y;

    if (startX || startY) {
      setShow(true);
    }

    const onMouseMove = (e) => {
      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startXPos;
      let newY = startYPos;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (direction.includes("right")) newWidth = startWidth + dx;
      if (direction.includes("left")) {
        newWidth = startWidth - dx;
        newX = startXPos + dx;
      }

      if (direction.includes("bottom")) newHeight = startHeight + dy;
      if (direction.includes("top")) {
        newHeight = startHeight - dy;
        newY = startYPos + dy;
      }

      setSize({
        width: Math.max(50, newWidth),
        height: Math.max(50, newHeight),
      });
      setPosition({ x: newX, y: newY });
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const handleClasses = "absolute w-4 h-4 bg-white border-2 border-black z-50";

  // === DRAGGING ===
  const handleDragMouseDown = (e) => {
    e.preventDefault();

    const startX = e.clientX;
    const startY = e.clientY;
    const startLeft = position.x;
    const startTop = position.y;

    const onMouseMove = (e) => {
      const newX = startLeft + (e.clientX - startX);
      const newY = startTop + (e.clientY - startY);
      if (newX || newY) {
        setShow(true);
      }
      setPosition({ x: newX, y: newY });
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <>
      <div
        ref={boxRef}
        className="relative border-2 border-black cursor-move select-none"
        onMouseDown={handleDragMouseDown}
        style={{
          top: `${position.y}px`,
          left: `${position.x}px`,
          width: `${size.width}px`,
          height: `${size.height}px`,
        }}
      >
        <Image
          src={src}
          width={size.width}
          height={size.height}
          className="w-full h-full object-fill pointer-events-none"
          alt={alt}
        />

        {/* Corners */}
        <div
          className={`${handleClasses} top-0 left-0 -mt-2 -ml-2 cursor-nwse-resize`}
          onMouseDown={(e) => handleResize("top left", e)}
        />
        <div
          className={`${handleClasses} top-0 right-0 -mt-2 -mr-2 cursor-nesw-resize`}
          onMouseDown={(e) => handleResize("top right", e)}
        />
        <div
          className={`${handleClasses} bottom-0 left-0 -mb-2 -ml-2 cursor-nesw-resize`}
          onMouseDown={(e) => handleResize("bottom left", e)}
        />
        <div
          className={`${handleClasses} bottom-0 right-0 -mr-2 -mb-2 cursor-nwse-resize`}
          onMouseDown={(e) => handleResize("bottom right", e)}
        />

        {/* Sides */}
        <div
          className={`${handleClasses} top-0 left-1/2 -translate-x-1/2 -mt-2 cursor-ns-resize`}
          onMouseDown={(e) => handleResize("top", e)}
        />
        <div
          className={`${handleClasses} bottom-0 left-1/2 -translate-x-1/2 -mb-2 cursor-ns-resize`}
          onMouseDown={(e) => handleResize("bottom", e)}
        />
        <div
          className={`${handleClasses} left-0 top-1/2 -translate-y-1/2 -ml-2 cursor-ew-resize`}
          onMouseDown={(e) => handleResize("left", e)}
        />
        <div
          className={`${handleClasses} right-0 top-1/2 -translate-y-1/2 -mr-2 cursor-ew-resize`}
          onMouseDown={(e) => handleResize("right", e)}
        />
      </div>
    </>
  );
}
