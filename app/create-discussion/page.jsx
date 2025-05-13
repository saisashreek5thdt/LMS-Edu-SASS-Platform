"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Category mapping (should match backend DB IDs)
const categoryMap = {
  Design: 1,
  Development: 2,
  "Product Management": 3,
};

export default function CreateDiscussion() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Choose your subject");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !description || category === "Choose your subject") {
      setError("Please fill all required fields including category.");
      return;
    }

    const categoryId = categoryMap[category];
    if (!categoryId) {
      setError("Invalid category selected.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You are not logged in. Please login first.");
      return;
    }

    try {
      const res = await fetch("/api/discussion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, categoryId }),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/discussion/${data.data.id}`);
      } else {
        const errData = await res.json();
        setError(errData.error || "Failed to create discussion");
      }
    } catch (err) {
      console.error("Error creating discussion:", err);
      setError("Something went wrong while creating the discussion.");
    }
  };

  return (
    <div className="mt-14 px-4 sm:px-3 md:px-5 lg:px-28 xl:px-28 w-full h-full p-4">
      <h2 className="text-2xl font-bold mb-4">Create new discussion</h2>
      <p className="text-gray-600 mb-4">
        Start a conversation, ask a question, or share your idea.
      </p>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title here"
            className="w-full border p-2 mt-1"
            required
          />
        </label>

        <label className="block mb-2">
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add as many details as possible..."
            className="w-full border p-2 mt-1"
            required
          ></textarea>
        </label>

        <label className="block mb-2">
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2 mt-1"
            required
          >
            <option disabled>Choose your subject</option>
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
            type="button"
            onClick={() => router.back()}
            className="mt-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 border border-gray-400 rounded-md shadow"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-black text-white hover:bg-gray-900 font-semibold py-2 px-4 mt-4 rounded-md"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
