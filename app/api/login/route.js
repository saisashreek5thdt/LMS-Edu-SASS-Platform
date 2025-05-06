import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Validate required fields
    if (!email || !password) {
      return Response.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Find the user in the database
    let user;
    user = await prisma.school.findUnique({ where: { email } });
    let userType = user ? "school" : null;

    if (!user) {
      user = await prisma.tutor.findUnique({ where: { email } });
      if (user) userType = "tutor";
    }

    if (!user) {
      user = await prisma.teacher.findUnique({ where: { email } });
      if (user) userType = "teacher";
    }

    if (!user) {
      user = await prisma.student.findUnique({ where: { email } });
      if (user) userType = "student";
    }

    if (!user) {
      return Response.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Check if the user is verified
    if (!user.isVerified) {
      return Response.json(
        { error: "Account not verified. Please verify your account using the OTP sent to your email." },
        { status: 403 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return Response.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id.toString(),
        email: user.email,
        userType: userType,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Return success response with token
    return Response.json(
      {
        message: "Login successful",
        token,
        id: user.id.toString(),
        userType: userType,
        logo: user.logo,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}