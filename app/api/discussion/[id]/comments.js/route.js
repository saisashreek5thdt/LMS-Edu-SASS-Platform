import { prisma } from "@/lib/prisma";

export async function GET(_, { params }) {
  const comments = await prisma.comment.findMany({
    where: { discussionId: parseInt(params.id) },
    include: {
      student: true,
      teacher: true,
    },
  });

  return Response.json(comments);
}