// app/api/plans/[id]/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, { params }) {
  const { id } = params;
  const data = await request.json();

  // Delete old features
  await prisma.feature.deleteMany({ where: { planId: parseInt(id) } });

  const plan = await prisma.plan.update({
    where: { id: parseInt(id) },
    data: {
      title: data.title,
      subtitle: data.subtitle,
      priceMonthly: data.priceMonthly,
      priceYearly: data.priceYearly,
      rate: data.rate,
      popular: data.popular || false,
      features: {
        create: data.features.map(text => ({ text })),
      },
    },
  });

  return NextResponse.json(plan);
}