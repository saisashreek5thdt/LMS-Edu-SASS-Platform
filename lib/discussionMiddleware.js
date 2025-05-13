import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma"; // Ensure this path is correct for your project

export const discussionMiddleware = async (req, requiredUserType) => {
  try {
    const authHeader = req.headers.get?.("authorization") || req.headers.authorization;
    console.log("🔐 Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { success: false, error: "Missing or invalid Authorization header" };
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("❌ JWT Verification Failed:", err.message);
      return { success: false, error: "Invalid or expired token" };
    }

    console.log("✅ Decoded JWT:", decoded);

    const userId = parseInt(decoded.id); // ✅ convert string ID to integer

    let user;
    if (requiredUserType === "teacher") {
      user = await prisma.teacher.findUnique({ where: { id: userId } });
    } else if (requiredUserType === "student") {
      user = await prisma.student.findUnique({ where: { id: userId } });
    }

    if (!user) {
      return { success: false, error: "Unauthorized access" };
    }

    const data = await req.json();
    console.log("✅ Request body:", data);

    return { success: true, data, user: { ...decoded, id: userId } }; // return id as integer
  } catch (err) {
    console.error("❌ Middleware Error:", err.message);
    return { success: false, error: "Internal server error" };
  }
};
