import { prisma } from "@/lib/prisma";
import { middleware } from "../middleware";

export async function GET(req) {
  const students = await prisma.student.findMany();
  return Response.json(students);
}

export async function POST(req) {
  const validate = await middleware(req, "student");
  if (!validate.success)
    return Response.json({ error: validate.error }, { status: 400 });

  const newStudent = await prisma.student.create({ data: validate.data });
  return Response.json({
    message: "Student created successfully",
    data: newStudent,
  });
}
