import { prisma } from "@/lib/prisma";

export async function GET(req) {
  const discussions = await prisma.discussion.findMany({
    where: { status: "open" },
    include: {
      comments: true,
    },
  });

  const enhancedDiscussions = discussions.map((d) => ({
    ...d,
    totalComments: d.comments.length,
    totalParticipants: new Set([
      ...d.comments.map((c) => c.studentId || c.teacherId),
    ]).size,
  }));

  return Response.json(enhancedDiscussions);
}