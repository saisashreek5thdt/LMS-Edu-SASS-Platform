import { prisma } from "@/lib/prisma";
import { middleware } from "../../middleware";

export async function GET(_, { params }) {
  const tutor = await prisma.tutor.findUnique({
    where: { id: parseInt(params.id) },
  });
  return Response.json(tutor);
}

export async function PUT(req, { params }) {
  const validate = await middleware(req, "tutor");
  if (!validate.success)
    return Response.json({ error: validate.error }, { status: 400 });

  const updated = await prisma.tutor.update({
    where: { id: parseInt(params.id) },
    data: validate.data,
  });
  return Response.json({
    message: "Tutor updated successfully",
    data: updated,
  });
}

export async function DELETE(_, { params }) {
  await prisma.tutor.delete({ where: { id: parseInt(params.id) } });
  return Response.json({ message: "Tutor deleted successfully" });
}
