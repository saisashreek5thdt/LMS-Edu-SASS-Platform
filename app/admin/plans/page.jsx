// app/admin/plans/page.jsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
export default async function AdminPlansPage() {
  const plans = await prisma.plan.findMany({
    include: {
      features: true,
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Plans</h1>
      <Link href="/admin/plans/add" className="mb-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        Add New Plan
      </Link>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Monthly Price</th>
            <th className="border px-4 py-2">Yearly Price</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan.id}>
              <td className="border px-4 py-2">{plan.title}</td>
              <td className="border px-4 py-2">₹{plan.priceMonthly}</td>
              <td className="border px-4 py-2">₹{plan.priceYearly}</td>
              <td className="border px-4 py-2 flex gap-2">
                <Link href={`/admin/plans/${plan.id}/edit`} className="bg-yellow-500 text-white px-3 py-1 rounded">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}