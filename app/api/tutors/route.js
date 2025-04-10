import { prisma } from "@/lib/prisma";
import { middleware } from "../middleware";

export async function GET(req) {
  const tutors = await prisma.tutor.findMany();
  return Response.json(tutors);
}

export async function POST(req) {
  const validate = await middleware(req, "tutor");
  if (!validate.success)
    return Response.json({ error: validate.error }, { status: 400 });

  const newTutor = await prisma.tutor.create({ data: validate.data });
  return Response.json({
    message: "Tutor created successfully",
    data: newTutor,
  });
}
