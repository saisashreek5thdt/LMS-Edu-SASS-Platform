// app/api/subscribe/[type]/[id]/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request, { params }) {
  const { type, id } = params; // 'school' or 'tutor', and user ID

  try {
    const subscription = await prisma.subscription.findFirst({
      where: {
        [type === "school" ? "schoolId" : "tutorId"]: parseInt(id),
      },
      include: {
        plan: {
          include: {
            features: true,
          },
        },
      },
    });

    return NextResponse.json({ plan: subscription?.plan || null });
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return NextResponse.json({ error: "Failed to fetch plan" }, { status: 500 });
  }
}