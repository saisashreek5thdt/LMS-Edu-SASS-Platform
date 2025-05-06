'use client';

import { motion } from 'framer-motion';
import { BookOpenCheck, LibraryBig, SquarePlay } from 'lucide-react';

const cardData = [
  {
    id: 1,
    title: 'Find Your Module/Course',
    description: 'Choose your course from our library and start learning today.',
    icon: <BookOpenCheck strokeWidth={1} className="h-16 w-16 mb-48 text-indigo-600" />,
  },
  {
    id: 2,
    title: 'Explore Course Details',
    description: 'Select and explore detailed course information to find what suits you.',
    icon: <LibraryBig strokeWidth={1} className="h-16 w-16 mb-48 text-indigo-600" />,
  },
  {
    id: 3,
    title: 'Enroll in Your Course',
    description: 'Complete enrollment and begin your learning journey with us.',
    icon: <SquarePlay strokeWidth={1} className="h-16 w-16 mb-48 text-indigo-600" />,
  },
];

export default function NewCardHover() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Section Title */}
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12 tracking-tight">
          HOW IT WORKS
        </h2>
        {/* Card Grid */}
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center items-center">
            {cardData.map((card) => (
              <motion.div
                key={card.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-lg transition-all duration-300 ease-in-out h-[300px] w-[300px] bg-gradient-to-b from-indigo-50 to-white"
              >
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Icon (Moves to Top on Hover) */}
                <motion.div
                  initial={{ top: '50%', left: '50%', x: '-50%', y: '-50%' }} // Initially centered
                  whileHover={{ top: '20%', left: '50%', x: '-50%', y: 0, scale: 1.2 }} // Moves to top-center and scales up
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="absolute z-10 flex justify-center items-center"
                >
                  {card.icon}
                </motion.div>

                {/* Content (Visible on Hover) */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }} // Starts hidden and below
                  whileHover={{ opacity: 1, y: 0 }} // Fades in and moves to center
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="relative z-10 p-4 flex flex-col justify-center items-center h-full text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                >
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    {card.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}