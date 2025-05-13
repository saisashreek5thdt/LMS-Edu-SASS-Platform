"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiChevronRight } from "react-icons/fi";
import { HiOutlineBeaker } from "react-icons/hi2";
import { FaRegCommentDots, FaArrowRight } from "react-icons/fa6";
import { MdOutlineGroup } from "react-icons/md";

// ✅ Utility to format "just now" or relative times
const formatRelativeTime = (dateString) => {
  const createdDate = new Date(dateString);
  const now = new Date();
  const diffMs = now - createdDate;
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
};

export default function DiscussionOverview() {
  const router = useRouter();
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDiscussions() {
      try {
        const res = await fetch("/api/discussions");
        if (!res.ok) throw new Error("Failed to load discussions");
        const data = await res.json();
        setDiscussions(data);
      } catch (err) {
        console.error("Failed to fetch discussions", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDiscussions();
  }, []);

  if (loading) return <p className="p-4 text-gray-600">Loading discussions...</p>;

  return (
    <div className="mt-3 w-full h-full">
      {/* Header */}
      <div className="m-3 p-2 flex justify-between items-start border-b-2">
        <h3 className="flex gap-2 justify-center items-center text-xl font-medium">
          <HiOutlineBeaker className="text-2xl" />
          Discussions
        </h3>
        <div className="flex gap-3 justify-center items-center">
          <button
            onClick={() => router.push(`/create-discussion`)}
            className="flex gap-2 justify-center items-center cursor-pointer text-lg border-2 rounded-full p-1 hover:border-slate-600"
          >
            Create Discussion
            <FiChevronRight className="text-xl" />
          </button>
        </div>
      </div>

      {/* All Discussions */}
      <div className="p-3 mt-4">
        <h3 className="text-xl font-bold mb-2">All Discussions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {discussions.map((discussion) => (
            <div
              key={discussion.id}
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => router.push(`/discussion/${discussion.id}`)}
            >
              <div className="flex items-start flex-col">
                <div className="flex items-center justify-between w-full">
                  <h3 className="text-xl font-semibold line-clamp-1">{discussion.title}</h3>
                  <div className="rounded-full text-white p-2 bg-green-500">
                    <FaArrowRight />
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {formatRelativeTime(discussion.createdAt)}
                </span>
              </div>

              <div className="flex items-start mt-2">
                <div className="flex items-center gap-2">
                  <FaRegCommentDots />
                  <span>{discussion.totalComments} Comments</span>
                </div>
              </div>

              {/* Status Tag */}
              <div className="mt-2 flex items-center justify-between">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    discussion.status === "open"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {discussion.status.charAt(0).toUpperCase() + discussion.status.slice(1)}
                </span>
                <div className="flex items-center gap-2">
                  <MdOutlineGroup />
                  <span>{discussion.totalParticipants} Participants</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
