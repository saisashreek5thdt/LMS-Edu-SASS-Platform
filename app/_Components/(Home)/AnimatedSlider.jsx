"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";

const defaultSlides = [
  { src: "/slider/images/slide1.jpg" },
  { src: "/slider/images/slide2.jpg" },
  { src: "/slider/images/slide3.jpg" },
  { src: "/slider/images/slide4.jpg" },
];

export default function AnimatedImageSlider({ images = defaultSlides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const maxImages = images.slice(0, 5);
  const intervalRef = useRef(null);

  const goToNext = () => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev + 1) % maxImages.length);
  };

  const goToPrev = () => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev - 1 + maxImages.length) % maxImages.length);
  };

  useEffect(() => {
    intervalRef.current = setInterval(goToNext, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const image = new Image();
    image.src = maxImages[currentIndex].src;
    image.onload = () => setIsLoading(false);
  }, [currentIndex]);

  return (
    <div className="relative w-full max-w-full mx-auto overflow-hidden shadow-md">
      <div className="relative h-64 md:h-96 flex items-center justify-center bg-black/10">
        {isLoading ? (
          <Loader className="w-10 h-10 animate-spin text-blue-600" />
        ) : (
          <motion.img
            key={currentIndex}
            src={maxImages[currentIndex].src}
            alt={`Slide ${currentIndex}`}
            initial={{ opacity: 0.5, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute w-full h-full object-cover"
          />
        )}

        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full z-10 hover:bg-black/70 transition"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full z-10 hover:bg-black/70 transition"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-4 pb-4">
        {maxImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setIsLoading(true);
              setCurrentIndex(idx);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "bg-blue-600 scale-125" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
