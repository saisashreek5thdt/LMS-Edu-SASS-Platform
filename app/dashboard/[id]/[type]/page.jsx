"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FeatureList from "../../../_Components/(Home)/FeatureList";
import {
  FiGrid,
  FiBook,
  FiFileText,
  FiMessageCircle,
  FiBookOpen,
  FiUserPlus,
  FiTool,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import OverviewInfo from "@/app/_Components/(Dashboard)/OverviewInfo";
import MyCourses from "@/app/_Components/(Dashboard)/MyCourses";
import MyCertifications from "@/app/_Components/(Dashboard)/MyCertifications";
import CourseList from "@/app/_Components/(Dashboard)/CourseList";
import Assesment from "@/app/_Components/(Dashboard)/Assesment";
import Discussion from "@/app/_Components/(Dashboard)/Discussion";

// Tab Data
const tabsData = [
  {
    id: "Overview",
    name: "Overview",
    icon: <FiGrid />,
    content: (
      <>
        <OverviewInfo />
        <MyCourses />
        <CourseList />
        <Assesment />
        <Discussion/>
      </>
    ),
  },
  {
    id: "MyCourses",
    name: "MyCourses",
    icon: <FiBook />,
    content: (
      <>
        <MyCourses />
        <CourseList />
      </>
    ),
  },
  {
    id: "Assesment",
    name: "Assesment",
    icon: <FiFileText />,
    content: <Assesment />,
  },
  {
    id: "Discussion",
    name: "Discussion",
    icon: <FiMessageCircle />,
    content: (
      <>
        <Discussion/>
      </>
    ),
  },
  {
    id: "Certificate",
    name: "Certificate",
    icon: <FiBookOpen />,
    content: (
      <>
        <MyCertifications />
      </>
    ),
  },
  {
    id: "Create Users",
    name: "Create Users",
    icon: <FiUserPlus />,
    content: <p>This is New Users Section</p>,
  },
  {
    id: "Access Permissions",
    name: "Access Permissions",
    icon: <FiTool />,
    content: <p>This is Permissions Section</p>,
  },
];

export default function Dashboard() {
  const params = useParams();
  const router = useRouter();

  // Extract user ID and type from params
  const userId = params.id;
  const userType = params.type;

  // Function to navigate to the bulk upload route
  const handleBulkUpload = () => {
    router.push("/upload"); // Navigate to the bulk upload route
  };

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const nextTab = () =>
    setActiveTabIndex((prev) => (prev + 1) % tabsData.length);
  const prevTab = () =>
    setActiveTabIndex((prev) => (prev - 1 + tabsData.length) % tabsData.length);

  return (
    <div className="px-2 w-full mt-14">
      <h1 className="text-2xl font-bold">Hello, this is Dashboard</h1>
      <p>User ID: {userId}</p>
      <p>User Type: {userType}</p>

      {/* Show bulk upload button only if the user type is "school" */}
      {userType === "school" && (
        <button
          onClick={handleBulkUpload}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Bulk Upload Students/Teachers
        </button>
      )}

      <FeatureList />

      <div className="mt-3 w-full min-h-screen bg-slate-50 px-4">
        {/* Mobile Tabs with Arrows */}
        <div className="flex items-center justify-between mb-4 sm:hidden">
          <button
            onClick={prevTab}
            className="p-2 rounded-full bg-gray-200 text-gray-700"
            aria-label="Previous Tab"
          >
            <FiChevronLeft size={20} />
          </button>
          <div className="flex-grow flex justify-center items-center text-[#e9327c]">
            <span className="mr-2">{tabsData[activeTabIndex].icon}</span>
            <span className="text-sm font-medium">
              {tabsData[activeTabIndex].name}
            </span>
          </div>
          <button
            onClick={nextTab}
            className="p-2 rounded-full bg-gray-200 text-gray-700"
            aria-label="Next Tab"
          >
            <FiChevronRight size={20} />
          </button>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden sm:flex flex-wrap gap-2 mb-6 border-b-2 overflow-x-auto">
          {tabsData.map((tab, index) => (
            <h2
              key={tab.id}
              onClick={() => setActiveTabIndex(index)}
              className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 text-base sm:text-lg font-semibold cursor-pointer ${
                activeTabIndex === index ? "text-[#e9327c]" : "text-gray-800"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              <span>{tab.name}</span>
            </h2>
          ))}
        </div>

        {/* Swipeable Tab Content */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTabIndex}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ type: "tween", duration: 0.3 }}
              className="p-2 text-gray-700  w-full"
            >
              {tabsData[activeTabIndex].content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
