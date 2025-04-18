import { prisma } from "@/lib/prisma";
import { middleware } from "../middleware";

export async function GET(req) {
  const teachers = await prisma.teacher.findMany();
  return Response.json(teachers);
}

export async function POST(req) {
  const validate = await middleware(req, "teacher");
  if (!validate.success)
    return Response.json({ error: validate.error }, { status: 400 });

  const newTeacher = await prisma.teacher.create({ data: validate.data });
  return Response.json({
    message: "Teacher created successfully",
    data: newTeacher,
  });
}
