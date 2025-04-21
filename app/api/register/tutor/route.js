import { prisma } from "@/lib/prisma";
import { validateModel } from "@/lib/validation";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { logo, name, email, otp, password, address, phone } = body;

    validateModel("tutor", { name, email, password, address, phone });

    const existingTutor = await prisma.tutor.findUnique({ where: { email } });
    if (existingTutor && existingTutor.isVerified) {
      return Response.json({ error: "Email already registered" }, { status: 400 });
    }

    if (existingTutor?.otp !== otp || new Date(existingTutor.otpExpiresAt) < new Date()) {
      return Response.json({ error: "Invalid or expired OTP" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newTutor = await prisma.tutor.update({
      where: { email },
      data: {
        name,
        logo,
        phone,
        address,
        password: hashedPassword,
        isVerified: true,
        otp: null,
        otpExpiresAt: null,
      },
    });

    return Response.json({ message: "Tutor registered successfully", data: newTutor }, { status: 201 });
  } catch (error) {
    console.error("Error during tutor registration:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
