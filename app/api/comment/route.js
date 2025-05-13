import { prisma } from "@/lib/prisma";
import { discussionMiddleware } from "../../../lib/discussionMiddleware";

export async function POST(req) {
  const validate = await discussionMiddleware(req, "student");
  const isStudent = validate.success;

  if (!isStudent) {
    const teacherValidate = await discussionMiddleware(req, "teacher");
    if (!teacherValidate.success)
      return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { content, discussionId } = teacherValidate.data;
    if (!content || !discussionId)
      return Response.json({ error: "Missing content or discussion ID" }, { status: 400 });

    const discussion = await prisma.discussion.findUnique({
      where: { id: parseInt(discussionId) },
    });

    if (!discussion || discussion.status === "closed") {
      return Response.json({ error: "Discussion is closed or doesn't exist" }, { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        discussionId: parseInt(discussionId),
        teacherId: teacherValidate.user.id,
      },
    });

    return Response.json({ message: "Comment posted", data: comment });
  }

  const { content, discussionId } = validate.data;
  if (!content || !discussionId)
    return Response.json({ error: "Missing content or discussion ID" }, { status: 400 });

  const discussion = await prisma.discussion.findUnique({
    where: { id: parseInt(discussionId) },
  });

  if (!discussion || discussion.status === "closed") {
    return Response.json({ error: "Discussion is closed or doesn't exist" }, { status: 400 });
  }

  const comment = await prisma.comment.create({
    data: {
      content,
      discussionId: parseInt(discussionId),
      studentId: validate.user.id,
    },
  });

  return Response.json({ message: "Comment posted", data: comment });
}