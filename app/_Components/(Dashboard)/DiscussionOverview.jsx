"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FiChevronRight } from "react-icons/fi";
import { HiOutlineBeaker } from "react-icons/hi2";
import { FaRegCommentDots, FaArrowRight } from "react-icons/fa6";
import { MdOutlineGroup } from "react-icons/md";

export default function DiscussionOverview() {
    const router = useRouter();

    const discussions = [
        {
            id: 1,
            title: "Design Popular 2024",
            date: "01 Feb 2024",
            participants: 1200,
            comments: 50,
            status: "open",
        },
        {
            id: 2,
            title: "Update Dev Figma",
            date: "04 Feb 2024",
            participants: 534,
            comments: 30,
            status: "open",
        },
        {
            id: 3,
            title: "Program Language",
            date: "24 Jan 2024",
            participants: 890,
            comments: 40,
            status: "closed",
        },
        {
            id: 4,
            title: "New Feature Proposal",
            date: "15 Mar 2024",
            participants: 750,
            comments: 60,
            status: "closed",
        },
        {
            id: 5,
            title: "Bug Fixes in v1.2",
            date: "05 Feb 2024",
            participants: 950,
            comments: 70,
            status: "open",
        },
    ];

    return (
        <div className="mt-3 w-full h-full">
            {/* Header */}
            <div className="m-3 p-2 flex justify-between items-start border-b-2">
                <h3 className="flex gap-2 justify-center items-center text-xl font-medium">
                    <HiOutlineBeaker className="text-2xl" />
                    Discussions
                </h3>
                <div className="flex gap-3 justify-center items-center">
                    <button className="flex gap-2 justify-center items-center cursor-pointer text-lg border-2 rounded-full p-1 hover:border-slate-600">
                        Create Discussion
                        <FiChevronRight className="text-xl" />
                    </button>
                </div>
            </div>

            {/* Combined Discussions */}
            <div className="p-3 mt-4">
                <h3 className="text-xl font-bold mb-2">All Discussions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {discussions.map((discussion) => (
                        <div
                            key={discussion.id}
                            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => router.push(`/discussion/${discussion.id}`)}
                        >
                            <div className="flex items-start flex-col">
                                <div className="flex items-center justify-between w-full">
                                    <h3 className="text-xl font-semibold">{discussion.title}</h3>
                                    <div className="rounded-full text-white p-2 bg-green-500">
                                        <FaArrowRight />
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500">{discussion.date}</span>
                            </div>
                            <div className="flex items-start mt-2">
                                <div className="flex items-center gap-2">
                                    <FaRegCommentDots />
                                    <span>{discussion.comments} Comments</span>
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
                                    <span>{discussion.participants} Participants</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* View More Card */}
                    <div
                        className="bg-red-500 text-white shadow-md rounded-lg p-4 cursor-pointer hover:bg-red-600 transition-colors"
                        onClick={() => router.push("/all-discussions")}
                    >
                        <div className="flex items-start justify-between mt-2">
                            <div>
                                <h2 className="text-3xl font-bold">219+</h2>
                                <p className="text-xl">Discussions</p>
                            </div>
                            <div className="rounded-full text-red-500 p-2 bg-white">
                                <FaArrowRight />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}