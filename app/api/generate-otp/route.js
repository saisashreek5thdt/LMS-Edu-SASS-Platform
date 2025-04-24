import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendOTPEmail } from "@/lib/mailer";


export async function POST(req) {
  try {
    const {name, email,phone, address, userType, password } = await req.json();

    // Validate input
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return Response.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    if (userType === "school") {
      await prisma.school.upsert({
        where: { email },
        update: { otp, otpExpiresAt, isVerified: false},
        create: { email,name,phone,address,isVerified: false, password,otp, otpExpiresAt },
      });
    } else if (userType === "tutor") {
      await prisma.tutor.upsert({
        where: { email },
        update: { otp, otpExpiresAt,isVerified: false},
        create: { email,name,phone,address,isVerified: false, password,otp, otpExpiresAt},
      });
    } else {
      return Response.json({ error: "Invalid user type" }, { status: 400 });
    }
    await sendOTPEmail(email, otp);
    // Simulate sending OTP via email
    console.log(`OTP sent to ${email}: ${otp}`);
    return Response.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error generating OTP:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}