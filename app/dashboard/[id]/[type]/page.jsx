"use client";
import { useParams } from "next/navigation";
import React from "react";

export default function Dashboard() {

  const params = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold">Hello this is Dashboard</h1>
      <p>User ID: {params.id}</p>
      <p>User Type: {params.type}</p>
    </div>
  );
}
