import { prisma } from "@/lib/prisma";
import { middleware } from "../../middleware";

export async function GET(_, { params }) {
  const student = await prisma.student.findUnique({
    where: { id: parseInt(params.id) },
  });
  return Response.json(student);
}

export async function PUT(req, { params }) {
  const validate = await middleware(req, "student");
  if (!validate.success)
    return Response.json({ error: validate.error }, { status: 400 });

  const updated = await prisma.student.update({
    where: { id: parseInt(params.id) },
    data: validate.data,
  });
  return Response.json({
    message: "Student updated successfully",
    data: updated,
  });
}

export async function DELETE(_, { params }) {
  await prisma.student.delete({ where: { id: parseInt(params.id) } });
  return Response.json({ message: "Student deleted successfully" });
}
