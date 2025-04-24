"use client";
import { useParams } from "next/navigation";
import React from "react";
import { useRouter } from "next/navigation";

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
    </div>
  );
}