import { prisma } from "@/lib/prisma";
import { validateModel } from "@/lib/validation";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userType, logo, name, email, otp, password, address, phone } = body;

    if (!otp || otp.length !== 6) {
        return Response.json({ error: "Invalid OTP" }, { status: 400 });
      }

    // Check if the school already exists
    const existingSchool = await prisma.school.findUnique({ where: { email } });

    if (!existingSchool) {
        return Response.json({ error: "No OTP request found for this email" }, { status: 404 });
      }

      // If already verified, don't allow re-registering
    if (existingSchool.isVerified) {
        return Response.json({ error: "Email already registered" }, { status: 400 });
      }


      if (
        existingSchool.otp !== otp ||
        new Date(existingSchool.otpExpiresAt) < new Date()
      ) {
        return Response.json({ error: "Invalid or expired OTP" }, { status: 400 });
      }

    // Hash the password
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the existing record with full data + mark verified
    const updatedSchool = await prisma.school.update({
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

    return Response.json(
      { message: "School registered successfully", data: updatedSchool },
      { status: 201 }
    );
  } catch (error) {
    console.error("School Registration Error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}