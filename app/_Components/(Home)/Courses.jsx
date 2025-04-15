import React from "react";
import CourseCard from "../Courses/CourseCard";

const dummyCourses = [
  {
    slug: 1,
    title: "Next.js Mastery",
    description: "Become a full-stack Next.js developer.",
    price: 49.99,
    skills: ["Next.js", "React", "API Routes"],
    highlights: ["Build SSR apps", "Learn API routing", "Deploy to Vercel"],
    instructor: "John Smith",
  },
  {
    slug: 2,
    title: "TailwindCSS Pro",
    description: "Design fast, responsive UIs effortlessly.",
    price: 29.99,
    skills: ["Tailwind", "Responsive Design"],
    highlights: ["Utility classes", "Real projects", "Dark mode"],
    instructor: "Sara Lee",
  },
  {
    slug: 3,
    title: "Next.js Mastery",
    description: "Become a full-stack Next.js developer.",
    price: 49.99,
    skills: ["Next.js", "React", "API Routes"],
    highlights: ["Build SSR apps", "Learn API routing", "Deploy to Vercel"],
    instructor: "John Smith",
  },
  {
    slug: 4,
    title: "TailwindCSS Pro",
    description: "Design fast, responsive UIs effortlessly.",
    price: 29.99,
    skills: ["Tailwind", "Responsive Design"],
    highlights: ["Utility classes", "Real projects", "Dark mode"],
    instructor: "Sara Lee",
  },
  {
    slug: 5,
    title: "Next.js Mastery",
    description: "Become a full-stack Next.js developer.",
    price: 49.99,
    skills: ["Next.js", "React", "API Routes"],
    highlights: ["Build SSR apps", "Learn API routing", "Deploy to Vercel"],
    instructor: "John Smith",
  },
  {
    slug: 6,
    title: "TailwindCSS Pro",
    description: "Design fast, responsive UIs effortlessly.",
    price: 29.99,
    skills: ["Tailwind", "Responsive Design"],
    highlights: ["Utility classes", "Real projects", "Dark mode"],
    instructor: "Sara Lee",
  },
  {
    slug: 7,
    title: "Next.js Mastery",
    description: "Become a full-stack Next.js developer.",
    price: 49.99,
    skills: ["Next.js", "React", "API Routes"],
    highlights: ["Build SSR apps", "Learn API routing", "Deploy to Vercel"],
    instructor: "John Smith",
  },
  {
    slug: 8,
    title: "TailwindCSS Pro",
    description: "Design fast, responsive UIs effortlessly.",
    price: 29.99,
    skills: ["Tailwind", "Responsive Design"],
    highlights: ["Utility classes", "Real projects", "Dark mode"],
    instructor: "Sara Lee",
  },
  {
    slug: 9,
    title: "Next.js Mastery",
    description: "Become a full-stack Next.js developer.",
    price: 49.99,
    skills: ["Next.js", "React", "API Routes"],
    highlights: ["Build SSR apps", "Learn API routing", "Deploy to Vercel"],
    instructor: "John Smith",
  },
  {
    slug: 10,
    title: "TailwindCSS Pro",
    description: "Design fast, responsive UIs effortlessly.",
    price: 29.99,
    skills: ["Tailwind", "Responsive Design"],
    highlights: ["Utility classes", "Real projects", "Dark mode"],
    instructor: "Sara Lee",
  },
  // Add more as needed
];

export default function Courses() {
  return (
    <section className="mt-20 px-4 sm:px-8 lg:px-16">
      <h1 className="text-center text-2xl sm:text-3xl mb-10 font-semibold text-gray-700">
        UPCOMING COURSES
      </h1>

      <div className="flex flex-col items-center justify-center p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dummyCourses.map((course, idx) => (
            <CourseCard key={idx} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
}
