"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ✅ Use this default slides array inside the component
const defaultSlides = [
  {
    type: "image",
    src: "/slider/images/slide1.jpg",
    title: "Welcome to the Event",
    caption: "This is an awesome event image.",
  },
  {
    type: "image",
    src: "/slider/images/slide2.jpg",
    title: "Great Speakers",
    caption: "Meet top professionals from the industry.",
  },
  {
    type: "video",
    src: "/slider/videos/slider.mp4",
    title: "Event Teaser",
    caption: "Watch the official teaser video.",
  },
  {
    type: "image",
    src: "/slider/images/slide3.jpg",
    title: "Amazing Location",
    caption: "Hosted in a beautiful city.",
  },
  {
    type: "image",
    src: "/slider/images/slide4.jpg",
    title: "More Moments",
    caption: "Captured from the event.",
  },
  {
    type: "video",
    src: "/slider/videos/slider.mp4",
    title: "Highlights",
    caption: "Experience the energy.",
  },
];

export default function AnimatedSlider({ slides = defaultSlides }) {
  const [[index, direction], setIndex] = useState([0, 0]);

  const paginate = (dir) => {
    setIndex(([prev]) => {
      const next = (prev + dir + slides.length) % slides.length;
      return [next, dir];
    });
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => paginate(1),
    onSwipedRight: () => paginate(-1),
    trackMouse: true,
  });

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir < 0 ? 300 : -300, opacity: 0 }),
  };

  if (!slides || !slides.length || index >= slides.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No slides available.
      </div>
    );
  }

  const slide = slides[index];

  return (
    <div
      className="relative w-full max-w-full mx-auto overflow-hidden"
      {...handlers}
    >
      <div className="relative h-[400px] overflow-hidden shadow-lg">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="absolute w-full h-full top-0 left-0 flex items-center justify-center bg-black"
          >
            {slide.type === "image" ? (
              <img
                src={slide.src}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={slide.src}
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute bottom-0 left-0 w-full bg-black/50 p-4 text-white">
              <h2 className="text-xl font-bold">{slide.title}</h2>
              <p className="text-sm">{slide.caption}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 left-2 -translate-y-1/2 z-10"
        onClick={() => paginate(-1)}
      >
        <ChevronLeft />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-2 -translate-y-1/2 z-10"
        onClick={() => paginate(1)}
      >
        <ChevronRight />
      </Button>

      {/* Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex([i, i > index ? 1 : -1])}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              i === index ? "bg-primary" : "bg-gray-300"
            )}
          />
        ))}
      </div>
    </div>
  );
}
