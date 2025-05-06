// app/admin/plans/add/page.jsx
"use client";
import { useState } from "react";

export default function AddPlanPage() {
  const [features, setFeatures] = useState([""]);

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addFeature = () => setFeatures([...features, ""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const planData = {
      ...data,
      priceMonthly: parseInt(data.priceMonthly),
      priceYearly: parseInt(data.priceYearly),
      popular: data.popular === "on",
      features: features.filter(f => f.trim()),
    };

    const res = await fetch("/api/plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(planData),
    });

    if (res.ok) {
      alert("Plan added!");
      window.location.href = "/admin/plans";
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Plan</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Title" className="w-full p-2 border rounded" required />
        <input name="subtitle" placeholder="Subtitle" className="w-full p-2 border rounded" />
        <input name="priceMonthly" placeholder="Monthly Price" className="w-full p-2 border rounded" type="number" />
        <input name="priceYearly" placeholder="Yearly Price" className="w-full p-2 border rounded" type="number" />
        <input name="rate" placeholder="Rate (e.g., 2.5%)" className="w-full p-2 border rounded" />

        <label><input type="checkbox" name="popular" /> Popular</label>

        <h3 className="font-semibold mt-4">Features</h3>
        {features.map((feature, index) => (
          <input
            key={index}
            value={feature}
            onChange={(e) => handleFeatureChange(index, e.target.value)}
            placeholder={`Feature ${index + 1}`}
            className="w-full p-2 border rounded"
          />
        ))}
        <button type="button" onClick={addFeature} className="bg-green-500 text-white px-3 py-1 rounded">
          Add Feature
        </button>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Plan
        </button>
      </form>
    </div>
  );
}