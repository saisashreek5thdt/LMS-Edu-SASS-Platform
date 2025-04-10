import { prisma } from "@/lib/prisma";
import { middleware } from "../../middleware";

export async function GET(_, { params }) {
  const school = await prisma.school.findUnique({
    where: { id: parseInt(params.id) },
  });
  return Response.json(school);
}

export async function PUT(req, { params }) {
  const validate = await middleware(req, "school");
  if (!validate.success)
    return Response.json({ error: validate.error }, { status: 400 });

  const updated = await prisma.school.update({
    where: { id: parseInt(params.id) },
    data: validate.data,
  });
  return Response.json({
    message: "School updated successfully",
    data: updated,
  });
}

export async function DELETE(_, { params }) {
  await prisma.school.delete({ where: { id: parseInt(params.id) } });
  return Response.json({ message: "School deleted successfully" });
}
