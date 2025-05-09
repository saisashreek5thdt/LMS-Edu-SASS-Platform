"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";

export default function TopicDetails({ params }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { id, topicId } = params;

    // Simulated topics data
    const topics = [
        {
            id: 1,
            title: "How to create a design system?",
            description:
                "A comprehensive guide to building scalable and maintainable design systems.",
            author: "design New Member",
            createdAt: "25 minutes ago",
            likes: 2,
            comments: [],
        },
        {
            id: 2,
            title: "User testing feedback important?",
            description:
                "Discuss the importance of user testing in the design process.",
            author: "ux researcher",
            createdAt: "20 minutes ago",
            likes: 1,
            comments: [
                {
                    id: 1,
                    author: "Maciej Korsan",
                    content: "Absolutely crucial for UX improvements.",
                    createdAt: "1 hour ago",
                    likes: 5,
                },
                {
                    id: 2,
                    author: "Pawel Kadysz",
                    content: "Agreed! It helps identify usability issues early.",
                    createdAt: "30 minutes ago",
                    likes: 3,
                },
            ],
        },
        {
            id: 3,
            title: "Collaborating in Figma with remote teams?",
            description:
                "Tips and best practices for effective collaboration in Figma with remote teams.",
            author: "product manager",
            createdAt: "15 minutes ago",
            likes: 3,
            comments: [],
        },
    ];

    // Find the current topic
    const currentTopic = topics.find((topic) => topic.id === parseInt(topicId));

    // State to manage comments
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState(currentTopic?.comments || []);

    // Handle comment submission
    const handleCommentSubmit = () => {
        if (!newComment.trim()) return;

        const newCommentObj = {
            id: Date.now(),
            author: "You",
            content: newComment,
            createdAt: "Just now",
            likes: 0,
        };

        setComments((prevComments) => [...prevComments, newCommentObj]);
        setNewComment(""); // Clear input field
    };

    return (
        <div className="mt-14 px-4 sm:px-3 md:px-5 lg:px-28 xl:px-28 w-full h-full p-4">
            {/* Back Button */}
            <div className="flex items-center gap-2 mb-4">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-lg font-medium text-gray-600 hover:text-gray-800"
                >
                    <FiChevronLeft /> Back
                </button>
            </div>

            {/* Topic Details */}
            <div>
                <h1 className="text-2xl font-bold mb-4">{currentTopic?.title}</h1>
                <p className="text-gray-600 mb-4">{currentTopic?.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{currentTopic?.author}</span>
                    <span>•</span>
                    <span>{currentTopic?.createdAt}</span>
                </div>
            </div>

            {/* Add Comment Section */}
            <div className="mt-8 flex flex-col gap-4">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Type your comment here..."
                    className="w-full border p-2 mt-1  sm:w-full md:w-2/3 lg:w-2/3 xl:w-2/3 resize-none min-h-[20px]"
                ></textarea>
                <button
                    onClick={handleCommentSubmit}
                    className="bg-blue-500 text-white p-2 mt-2 w-full sm:w-full md:w-2/3 lg:w-1/6 xl:w-1/6 rounded-md"
                    disabled={!newComment.trim()}
                >
                    Post Comment
                </button>
            </div>

            {/* Comments Section */}
            <div className="mt-8 w-full sm:w-full md:w-2/3 lg:w-2/3 xl:w-2/3" >
                <h2 className="text-xl font-bold mb-4">{comments.length} Comments </h2>
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="bg-slate-100 shadow-md rounded-lg p-4 mt-4"
                    >
                        <div className="flex items-center gap-2">
                            <span className="font-medium">{comment.author}</span>
                            <span className="text-sm text-gray-500">
                                {comment.createdAt}
                            </span>
                        </div>
                        <p className="mt-2">{comment.content}</p>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                            <span>Reply</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}