import { prisma } from "@/lib/prisma";
import { middleware } from "../../middleware";

export async function GET(_, { params }) {
  const teacher = await prisma.teacher.findUnique({
    where: { id: parseInt(params.id) },
  });
  return Response.json(teacher);
}

export async function PUT(req, { params }) {
  const validate = await middleware(req, "teacher");
  if (!validate.success)
    return Response.json({ error: validate.error }, { status: 400 });

  const updated = await prisma.teacher.update({
    where: { id: parseInt(params.id) },
    data: validate.data,
  });
  return Response.json({
    message: "Teacher updated successfully",
    data: updated,
  });
}

export async function DELETE(_, { params }) {
  await prisma.teacher.delete({ where: { id: parseInt(params.id) } });
  return Response.json({ message: "Teacher deleted successfully" });
}
