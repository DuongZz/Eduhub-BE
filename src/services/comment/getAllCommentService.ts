import Comment from "../../models/comment";

export const getAllCommentService = async (courseId: string) => {
  try {
    const allCmt = await Comment.find({ courseId })
      .sort({ commentedDate: -1 })
      .populate([
        {
          path: "replyComment",
          populate: {
            path: "userId",
            select: "fullName avatar"
          },
        },
        {
          path: "userId",
          select: "fullName avatar"
        },
      ]);
    if (!allCmt) {
      throw new Error("No comment");
    }
    return allCmt;
  } catch (err) {
    throw new Error(err);
  }
}
