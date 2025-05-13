import { prisma } from "@/lib/prisma";

export async function GET(_, { params }) {
  const discussion = await prisma.discussion.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      comments: {
        include: {
          student: true,
          teacher: true,
        },
      },
    },
  });

  if (!discussion) {
    return Response.json({ error: "Discussion not found" }, { status: 404 });
  }

  const totalComments = discussion.comments.length;
  const participantIds = new Set();

  discussion.comments.forEach((c) => {
    if (c.studentId) participantIds.add(c.studentId);
    if (c.teacherId) participantIds.add(c.teacherId);
  });

  return Response.json({
    ...discussion,
    totalComments,
    totalParticipants: participantIds.size,
  });
}