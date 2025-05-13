import { prisma } from "@/lib/prisma";
import { discussionMiddleware } from "../../../../../lib/discussionMiddleware";

export async function PATCH(req, { params }) {
  const validate = await discussionMiddleware(req, "teacher");
  if (!validate.success)
    return Response.json({ error: validate.error }, { status: 401 });

  const discussionId = parseInt(params.id);

  const discussion = await prisma.discussion.findUnique({
    where: { id: discussionId },
  });

  if (!discussion) {
    return Response.json({ error: "Discussion not found" }, { status: 404 });
  }

  if (discussion.teacherId !== validate.user.id) {
    return Response.json({ error: "Not authorized to close this discussion" }, { status: 403 });
  }

  const updated = await prisma.discussion.update({
    where: { id: discussionId },
    data: { status: "closed" },
  });

  return Response.json({
    message: "Discussion closed successfully",
    data: updated,
  });
}