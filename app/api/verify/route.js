import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(`${process.env.BASE_URL}/verify-error?error=missing_token`);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;

    const student = await prisma.student.updateMany({
      where: { email },
      data: { verified: true },
    });

    const teacher = await prisma.teacher.updateMany({
      where: { email },
      data: { verified: true },
    });

    if (student.count === 0 && teacher.count === 0) {
      return NextResponse.redirect(`${process.env.BASE_URL}/verify-error?error=user_not_found`);
    }

    return NextResponse.redirect(`${process.env.BASE_URL}/verify-success`);
  } catch (error) {
    console.error("Verification failed:", error.message);
    return NextResponse.redirect(`${process.env.BASE_URL}/verify-error?error=invalid_token`);
  }
}