// app/api/subscribe/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  const body = await request.json();
  const { userId, userType, planId } = body;

  if (!userId || !userType || !planId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    // Delete old subscription
    await prisma.subscription.deleteMany({
      where: {
        [userType === "school" ? "schoolId" : "tutorId"]: parseInt(userId),
      },
    });

    // Create new subscription
    const subscription = await prisma.subscription.create({
      data: {
        planId: parseInt(planId),
        [userType === "school" ? "schoolId" : "tutorId"]: parseInt(userId),
        status: "active",
      },
    });

    return NextResponse.json(subscription);
  } catch (error) {
    console.error("Error creating subscription:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}