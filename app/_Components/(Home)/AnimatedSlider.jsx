"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);

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

  const textVariants = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: 0.3, duration: 0.5 } },
    exit: { y: 30, opacity: 0, transition: { duration: 0.3 } },
  };

  useEffect(() => {
    if (isPaused) return;
    timeoutRef.current = setTimeout(() => paginate(1), 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [index, isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

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
      className="relative w-full overflow-hidden"
      {...handlers}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-[400px] sm:h-[300px] overflow-hidden">
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
                playsInline
                className="w-full h-full object-cover"
              />
            )}

            <motion.div
              className="absolute bottom-0 left-0 w-full bg-black/50 px-4 py-3 text-white"
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.h2 className="text-xl sm:text-base font-bold">
                {slide.title}
              </motion.h2>
              <motion.p className="text-sm sm:text-xs">{slide.caption}</motion.p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 left-2 -translate-y-1/2 z-10 sm:left-1"
        onClick={() => paginate(-1)}
      >
        <ChevronLeft />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-2 -translate-y-1/2 z-10 sm:right-1"
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
