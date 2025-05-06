// File: app/api/subscribe/[type]/[id]/route.js

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request, { params }) {
  const { type, id } = params;

  const validTypes = ["school", "tutor"];
  const userId = parseInt(id);

  // Validate type and ID
  if (!validTypes.includes(type)) {
    return NextResponse.json({ error: "Invalid subscription type" }, { status: 400 });
  }

  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  try {
    const subscription = await prisma.subscription.findFirst({
      where: {
        [type === "school" ? "schoolId" : "tutorId"]: userId,
        status: "ACTIVE",
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
