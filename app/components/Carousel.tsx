"use client";
import Image from "next/image";
import React, { useState, useRef, useMemo, useEffect } from "react";
type CarouselProps = {
  folder: string; // e.g. "gallery"
  count: number; // number of images in the folder
  ext?: string; // file extension, default "jpg"
  prefix?: string; // optional prefix for image paths
};
function Carousel({ folder, count, ext = "jpg", prefix = "" }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const images = useMemo(() => Array.from({ length: count }, (_, i) => `/${folder}/${prefix}${i + 1}.${ext}`), [folder, count, ext]);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mouse/touch start
  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    if ("touches" in e) {
      startX.current = e.touches[0].clientX;
    } else {
      startX.current = e.clientX;
    }
  };

  // Mouse/touch move
  const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || startX.current === null) return;
    let clientX = 0;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    setDragX(clientX - startX.current);
  };

  // Mouse/touch end
  const handleDragEnd = () => {
    setIsDragging(false);
    if (dragX > 50) {
      setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    } else if (dragX < -50) {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
    setDragX(0);
    startX.current = null;
  };

  // Convert dragX from px to percent of container width
  const dragXPercent = containerWidth ? (dragX / containerWidth) * 100 : 0;
  const transition = isDragging ? "none" : "transform 0.3s";
  if (images.length === 0) return null;
  return (
    <div className="flex flex-col items-center select-none p-0 m-0">
      <div
        ref={containerRef}
        className="relative h-[95vh] sm:h-[60vh] aspect-[9/16] flex items-center justify-center overflow-hidden p-0  m-0"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={isDragging ? handleDragEnd : undefined}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}>
        <div
          className="p-0 m-0 gap-0"
          style={{
            display: "flex",
            transform: `translateX(calc(${-current * 100}% + ${dragXPercent}% - ${current / 5}px))`,
            transition,
            width: `${images.length * 100}%`,
            height: "100%",
          }}>
          {images.map((src, idx) => (
            <div
              key={idx}
              style={{
                flex: "0 0 100%",
                width: "100%",
                minWidth: 0,
                height: "100%",
                position: "relative",
                overflow: "hidden", // <--- Add this
              }}>
              <Image
                fill
                src={src}
                alt={`Slide ${idx + 1}`}
                className="object-cover rounded"
                draggable={false}
                sizes="(max-width: 100vw) 100vw, 100vw"
                priority={idx === current}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full px-2 py-1">
          &#8592;
        </button>
        <button
          onClick={() => setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full px-2 py-1">
          &#8594;
        </button>
      </div>
      <div className="flex mt-2 space-x-1 md:space-x-4 mb-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 w-2 md:h-2 md:w-2 p-0 rounded-full ${current === idx ? "bg-gray-900" : "bg-gray-300"}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
