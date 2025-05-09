"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MdCancel } from "react-icons/md";

export default function CreateTopic({ params }) {
    const router = useRouter();
    const { id } = params;

    // State for form inputs
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Choose your subject");
    const [tags, setTags] = useState("");

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulate adding the new topic
        const newTopic = {
            id: Date.now(), // Unique ID using current timestamp
            title,
            author: "You",
            createdAt: "Just now",
            likes: 0,
            comments: 0,
            category,
            tags: tags.split(",").map((tag) => tag.trim()),
        };

        // Send the new topic back to the parent page (you can use localStorage or API here)
        console.log("New Topic Created:", newTopic);

        // Redirect back to the discussion details page
        router.back();
    };

    return (
        <div className="mt-14 px-4 sm:px-3 md:px-5 lg:px-28 xl:px-28 w-full h-full p-4">
            <h2 className="text-2xl font-bold mb-4">Create new topic</h2>
            <p className="text-gray-600 mb-4">
                Start a conversation, ask a question, or share your idea.
            </p>

            {/* Form fields */}
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                    Title
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title here"
                        className="w-full border p-2 mt-1"
                    />
                </label>

                <label className="block mb-2">
                    Description
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add as many details as possible, by providing details you’ll make it easier for others to reply"
                        className="w-full border p-2 mt-1"
                    ></textarea>
                </label>

                <label className="block mb-2">
                    Category
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border p-2 mt-1"
                    >
                        <option>Choose your subject</option>
                        <option>Design</option>
                        <option>Development</option>
                        <option>Product Management</option>
                    </select>
                </label>

                <label className="block mb-2">
                    Tags (Optional)
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="Add tags"
                        className="w-full border p-2 mt-1"
                    />
                </label>
 
             <div className="flex justify-between items-center mt-4">
             <button
                    type="submit"
                    className="bg-black text-white hover:bg-gray-900 font-semibold py-2 px-4 mt-4 rounded-md"
                >
                    Create
                </button>

                <button
                onClick={() => router.back()}
                className="mt-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 border border-gray-400 rounded-md shadow"
                 >
                Cancel
            </button>
             </div>
                 
            </form>

            {/* Cancel Button */}
            
        </div>
    );
}