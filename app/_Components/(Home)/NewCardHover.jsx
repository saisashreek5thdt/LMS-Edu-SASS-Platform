'use client';

import { motion } from 'framer-motion';
import { BookOpenCheck, LibraryBig, SquarePlay } from 'lucide-react';

const cardData = [
  {
    id: 1,
    title: 'Find Your Module/Course',
    description: 'Choose your course from our library',
    icon: <BookOpenCheck strokeWidth={1} className="h-10 w-10 text-indigo-600" />,
  },
  {
    id: 2,
    title: 'Explore Course Details',
    description: 'Select and explore detailed course information',
    icon: <LibraryBig strokeWidth={1} className="h-10 w-10 text-indigo-600" />,
  },
  {
    id: 3,
    title: 'Enroll in Your Course',
    description: 'Complete enrollment and start learning',
    icon: <SquarePlay strokeWidth={1} className="h-10 w-10 text-indigo-600" />,
  },
];

export default function NewCardHover() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">HOW IT WORKS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center items-center">
          {cardData.map((card) => (
            <motion.div
              key={card.id}
              whileTap={{ scale: 0.98 }} // On click scale for mobile
              whileHover={{ scale: 1.02 }}
              className="group relative bg-gray-100 rounded-2xl shadow-md p-8 cursor-pointer hover:bg-white hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col justify-between h-[300px]"
            >
              {/* Card Body: Show on hover */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="flex flex-col justify-between"
              >
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
              </motion.div>

              {/* Icon in footer initially */}
              <motion.div
                initial={{ y: 0 }}
                whileHover={{ y: 40 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              >
                {card.icon}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
