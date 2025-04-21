"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useUser } from "@/app/_Context/UserContext";

export default function BulkUploadForm() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, userType, userId } = useUser(); // Retrieve user context

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a CSV file.");
      return;
    }

    if (!isLoggedIn) {
      toast.error("You must be logged in to upload a CSV file.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Retrieve the JWT token from localStorage or sessionStorage
      const storedAuth = JSON.parse(localStorage.getItem("app-user-auth"));
      const token = storedAuth?.token;

      if (!token) {
        toast.error("Authentication token is missing. Please log in again.");
        return;
      }

      const response = await fetch("/api/upload-csv", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.error || "Failed to upload CSV file.");
      }
    } catch (error) {
      console.error("Error uploading CSV:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-2">
        <Label htmlFor="csv">Upload CSV File</Label>
        <Input
          id="csv"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Upload CSV"}
      </Button>
    </form>
  );
}