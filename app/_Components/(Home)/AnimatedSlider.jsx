"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const defaultSlides = [
  {
    src: "/slider/images/slide1.jpg",
    title: "Welcome to the Event",
    caption: "This is an awesome event image.",
  },
  {
    src: "/slider/images/slide2.jpg",
    title: "Great Speakers",
    caption: "Meet top professionals from the industry.",
  },
  {
    src: "/slider/images/slide3.jpg",
    title: "Amazing Location",
    caption: "Hosted in a beautiful city.",
  },
  {
    src: "/slider/images/slide4.jpg",
    title: "More Moments",
    caption: "Captured from the event.",
  },
];

export default function AnimatedImageSlider({ slides = defaultSlides }) {
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

  const imageVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      scale: 1.05,
      opacity: 0,
    }),
    center: {
      x: 0,
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
    exit: (dir) => ({
      x: dir < 0 ? 100 : -100,
      scale: 0.95,
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    }),
  };

  const captionVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { delay: 0.4, duration: 0.6, ease: "easeOut" },
    },
    exit: { y: 20, opacity: 0, transition: { duration: 0.3 } },
  };

  useEffect(() => {
    if (isPaused) return;
    timeoutRef.current = setTimeout(() => paginate(1), 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [index, isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const slide = slides[index];

  return (
    <div
      className="relative w-full overflow-hidden"
      {...handlers}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-[600px] sm:h-[400px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute w-full h-full top-0 left-0 flex items-center justify-center bg-black"
          >
            <img
              src={slide.src}
              alt={slide.title}
              className="w-full h-full object-cover rounded-md shadow-lg"
            />

            {/* Captions */}
            <motion.div
              className="absolute bottom-0 left-0 w-full bg-black/60 px-4 py-5 text-white backdrop-blur-sm"
              variants={captionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <h2 className="text-2xl sm:text-lg font-semibold">{slide.title}</h2>
              <p className="text-sm sm:text-xs">{slide.caption}</p>

              {/* Dots under captions */}
              <div className="flex justify-center mt-3 gap-1">
                {slides.map((_, i) => (
                  <motion.span
                    key={i}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      i === index ? "bg-white scale-110" : "bg-white/40"
                    )}
                    animate={{ opacity: i === index ? 1 : 0.5 }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
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
    </div>
  );
}
