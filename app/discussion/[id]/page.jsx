// app/discussion/[id]/page.js
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";

export default function DiscussionDetails({ params }) {
  const router = useRouter();
  const { id } = params;
  const [discussion, setDiscussion] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setIsTeacher(decoded.role === "teacher");

        const res = await fetch(`/api/discussion/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setDiscussion(data);

        const commentsRes = await fetch(`/api/discussion/${id}/comments`);
        const commentsData = await commentsRes.json();
        setComments(commentsData);
      } catch (e) {
        console.error("Error fetching data", e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    const token = localStorage.getItem("token");

    const res = await fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        discussionId: parseInt(id),
        content: newComment,
      }),
    });

    if (res.ok) {
      const newCommentData = await res.json();
      setComments([...comments, newCommentData.data]);
      setNewComment("");
    } else {
      alert("Failed to post comment");
    }
  };

  const handleCloseDiscussion = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`/api/discussion/${id}/close`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const updated = await res.json();
      setDiscussion(updated.data);
    } else {
      alert("Failed to close discussion");
    }
  };

  if (loading) return <p>Loading discussion...</p>;
  if (!discussion) return <p>Discussion not found.</p>;

  return (
    <div className="mt-14 px-4 sm:px-3 md:px-5 lg:px-28 xl:px-28 w-full h-full p-4">
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-lg font-medium text-gray-600 hover:text-gray-800"
        >
          <FiChevronLeft /> Back
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-4">{discussion.title}</h1>
      <p className="text-gray-600 mb-4">{discussion.description}</p>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>{discussion.author}</span>
        <span>•</span>
        <span>{discussion.createdAt}</span>
      </div>

      {isTeacher && discussion.status !== "closed" && (
        <button
          onClick={handleCloseDiscussion}
          className="text-red-500 mt-4"
        >
          Close Discussion
        </button>
      )}

      {/* Add Comment Section */}
      <div className="mt-8 flex flex-col gap-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Type your comment here..."
          className="w-full border p-2 mt-1 resize-none min-h-[20px]"
        ></textarea>
        <button
          onClick={handleCommentSubmit}
          className="bg-blue-500 text-white p-2 w-full sm:w-1/6 rounded-md"
          disabled={!newComment.trim()}
        >
          Post Comment
        </button>
      </div>

      {/* Comments Section */}
      <div className="mt-8 w-full">
        <h2 className="text-xl font-bold mb-4">{comments.length} Comments</h2>
        {comments.length === 0 && <p>No comments yet.</p>}
        {comments.map((comment) => (
          <div key={comment.id} className="bg-slate-100 shadow-md rounded-lg p-4 mt-4">
            <div className="flex items-center gap-2">
              <span className="font-medium">{comment.author}</span>
              <span className="text-sm text-gray-500">{comment.createdAt}</span>
            </div>
            <p className="mt-2">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}