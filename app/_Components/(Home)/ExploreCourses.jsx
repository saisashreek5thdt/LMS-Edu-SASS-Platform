import React from "react";
import CoursesLists from "./CoursesLists";

const dummyData = [
  {
    image: "https://dummyjson.com/image/200x100",
    title: "React for Beginners",
    shortInfo: "Start your frontend journey with React basics.",
    instructorPhoto: "https://randomuser.me/api/portraits/men/32.jpg",
    description:
      "This course introduces core React concepts like components, props, state, and hooks.",
    duration: "4 Weeks",
    hours: "20 Hours",
    bulletPoints: [
      "JSX and Rendering",
      "React Hooks",
      "State Management",
      "Component Lifecycle",
    ],
  },
  {
    image: "https://dummyjson.com/image/200x100",
    title: "Master JavaScript",
    shortInfo:
      "Deep dive into modern JavaScript from fundamentals to advanced.",
    instructorPhoto: "https://randomuser.me/api/portraits/women/45.jpg",
    description:
      "Comprehensive course covering ES6+, closures, promises, and async programming.",
    duration: "6 Weeks",
    hours: "30 Hours",
    bulletPoints: [
      "ES6 Syntax",
      "Async/Await",
      "DOM Manipulation",
      "APIs & Fetch",
    ],
  },
  {
    image: "https://dummyjson.com/image/200x100",
    title: "UI/UX Design",
    shortInfo: "Design intuitive interfaces with Figma and design systems.",
    instructorPhoto: "https://randomuser.me/api/portraits/men/25.jpg",
    description:
      "Learn user-centered design principles, wireframing, and prototyping with tools.",
    duration: "3 Weeks",
    hours: "15 Hours",
    bulletPoints: [
      "Design Thinking",
      "Figma Prototyping",
      "User Testing",
      "Accessibility",
    ],
  },
  {
    image: "https://dummyjson.com/image/200x100",
    title: "React for Advanced",
    shortInfo: "Start your frontend journey with React basics.",
    instructorPhoto: "https://randomuser.me/api/portraits/men/32.jpg",
    description:
      "This course introduces core React concepts like components, props, state, and hooks.",
    duration: "4 Weeks",
    hours: "20 Hours",
    bulletPoints: [
      "JSX and Rendering",
      "React Hooks",
      "State Management",
      "Component Lifecycle",
    ],
  },
  {
    image: "https://dummyjson.com/image/200x100",
    title: "UI/UX Design",
    shortInfo: "Design intuitive interfaces with Figma and design systems.",
    instructorPhoto: "https://randomuser.me/api/portraits/men/25.jpg",
    description:
      "Learn user-centered design principles, wireframing, and prototyping with tools.",
    duration: "3 Weeks",
    hours: "15 Hours",
    bulletPoints: [
      "Design Thinking",
      "Figma Prototyping",
      "User Testing",
      "Accessibility",
    ],
  },
  {
    image: "https://dummyjson.com/image/200x100",
    title: "React for Advanced",
    shortInfo: "Start your frontend journey with React basics.",
    instructorPhoto: "https://randomuser.me/api/portraits/men/32.jpg",
    description:
      "This course introduces core React concepts like components, props, state, and hooks.",
    duration: "4 Weeks",
    hours: "20 Hours",
    bulletPoints: [
      "JSX and Rendering",
      "React Hooks",
      "State Management",
      "Component Lifecycle",
    ],
  },
  {
    image: "https://dummyjson.com/image/200x100",
    title: "UI/UX Design",
    shortInfo: "Design intuitive interfaces with Figma and design systems.",
    instructorPhoto: "https://randomuser.me/api/portraits/men/25.jpg",
    description:
      "Learn user-centered design principles, wireframing, and prototyping with tools.",
    duration: "3 Weeks",
    hours: "15 Hours",
    bulletPoints: [
      "Design Thinking",
      "Figma Prototyping",
      "User Testing",
      "Accessibility",
    ],
  },
  {
    image: "https://dummyjson.com/image/200x100",
    title: "React for Advanced",
    shortInfo: "Start your frontend journey with React basics.",
    instructorPhoto: "https://randomuser.me/api/portraits/men/32.jpg",
    description:
      "This course introduces core React concepts like components, props, state, and hooks.",
    duration: "4 Weeks",
    hours: "20 Hours",
    bulletPoints: [
      "JSX and Rendering",
      "React Hooks",
      "State Management",
      "Component Lifecycle",
    ],
  },
];

export default function ExploreCourses() {
  return (
    <>
      <div className="px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Explore Our Courses
        </h1>
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {dummyData.map((course, index) => (
              <CoursesLists key={index} {...course} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
