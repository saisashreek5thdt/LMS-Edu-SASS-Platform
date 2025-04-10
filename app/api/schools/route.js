import { prisma } from "@/lib/prisma";
import { middleware } from "../middleware";

export async function GET(req) {
  const schools = await prisma.school.findMany();
  return Response.json(schools);
}

export async function POST(req) {
  const validate = await middleware(req, "school");
  if (!validate.success)
    return Response.json({ error: validate.error }, { status: 400 });

  const newSchool = await prisma.school.create({ data: validate.data });
  return Response.json({
    message: "School created successfully",
    data: newSchool,
  });
}
