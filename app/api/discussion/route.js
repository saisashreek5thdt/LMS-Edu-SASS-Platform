import { prisma } from "@/lib/prisma";
import { discussionMiddleware } from "../../../lib/discussionMiddleware";

export async function POST(req) {
  try {
    console.log("✅ Reached POST /api/discussion");

    const validate = await discussionMiddleware(req, "teacher");
    console.log("✅ Middleware result:", validate);

    if (!validate.success) {
      return Response.json({ error: validate.error }, { status: 401 });
    }

    const { title, description, categoryId } = validate.data;
    console.log("✅ Received data:", { title, description, categoryId });

    if (!title || !description || !categoryId) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newDiscussion = await prisma.discussion.create({
      data: {
        title,
        description,
        categoryId: parseInt(categoryId),
        teacherId: validate.user.id,
      },
    });

    console.log("✅ Discussion created:", newDiscussion);

    return Response.json({
      message: "Discussion created successfully",
      data: newDiscussion,
    });

  } catch (error) {
    console.error("❌ Error in POST /api/discussion:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
