// app/admin/plans/[id]/edit/page.jsx
"use client";
import { useEffect, useState } from "react";

export default function EditPlanPage({ params }) {
  const { id } = params;
  const [plan, setPlan] = useState(null);
  const [features, setFeatures] = useState([""]);

  useEffect(() => {
    fetch(`/api/plans`)
      .then(res => res.json())
      .then(plans => {
        const selected = plans.find(p => p.id == id);
        setPlan(selected);
        setFeatures(selected.features.map(f => f.text));
      });
  }, [id]);

  if (!plan) return <div>Loading...</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const updatedPlan = {
      ...data,
      priceMonthly: parseInt(data.priceMonthly),
      priceYearly: parseInt(data.priceYearly),
      popular: data.popular === "on",
      features: features.filter(f => f.trim()),
    };

    const res = await fetch(`/api/plans/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPlan),
    });

    if (res.ok) {
      alert("Plan updated!");
      window.location.href = "/admin/plans";
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Plan</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" defaultValue={plan.title} className="w-full p-2 border rounded" required />
        <input name="subtitle" defaultValue={plan.subtitle} className="w-full p-2 border rounded" />
        <input name="priceMonthly" defaultValue={plan.priceMonthly} className="w-full p-2 border rounded" type="number" />
        <input name="priceYearly" defaultValue={plan.priceYearly} className="w-full p-2 border rounded" type="number" />
        <input name="rate" defaultValue={plan.rate} className="w-full p-2 border rounded" />

        <label><input type="checkbox" name="popular" defaultChecked={plan.popular} /> Popular</label>

        <h3 className="font-semibold mt-4">Features</h3>
        {features.map((feature, index) => (
          <input
            key={index}
            value={feature}
            onChange={(e) => {
              const newFeatures = [...features];
              newFeatures[index] = e.target.value;
              setFeatures(newFeatures);
            }}
            placeholder={`Feature ${index + 1}`}
            className="w-full p-2 border rounded"
          />
        ))}

        <button type="button" onClick={() => setFeatures([...features, ""])} className="bg-green-500 text-white px-3 py-1 rounded">
          Add Feature
        </button>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Plan
        </button>
      </form>
    </div>
  );
}