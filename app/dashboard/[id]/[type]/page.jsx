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
} from "react-icons/fi";
import OverviewInfo from "@/app/_Components/(Dashboard)/OverviewInfo";
import MyCourses from "@/app/_Components/(Dashboard)/MyCourses";

const tabsData = [
  {
    id: "Overview",
    name: "Overview",
    icon: <FiGrid />,
    content: (
      <>
        <OverviewInfo />
        <MyCourses />
      </>
    ),
  },
  {
    id: "MyCourses",
    name: "MyCourses",
    icon: <FiBook />,
    content: <p>This is MyCourse Section</p>,
  },
  {
    id: "Assesment",
    name: "Assesment",
    icon: <FiFileText />,
    content: <p>This is Assesment Section</p>,
  },
  {
    id: "Discussion",
    name: "Discussion",
    icon: <FiMessageCircle />,
    content: <p>This is Discussion Section</p>,
  },
  {
    id: "Certificate",
    name: "Certificate",
    icon: <FiBookOpen />,
    content: <p>This is Certificate Section</p>,
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

  const [activeTab, setActiveTab] = useState(tabsData[0].id);
  const activeContent = tabsData.find((tab) => tab.id === activeTab)?.content;

  return (
    <div>
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
        {/* Tabs */}
        <div className="flex flex-wrap justify-start gap-2 mb-6 border-b-2">
          {tabsData.map((tab) => (
            <h2
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 text-base sm:text-lg font-semibold cursor-pointer ${
                activeTab === tab.id ? "text-[#e9327c]" : "text-gray-800"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              <span>{tab.name}</span>
            </h2>
          ))}
        </div>

        {/* Active Content */}
        <div className="p-2 text-gray-700">{activeContent}</div>
      </div>
    </div>
  );
}
