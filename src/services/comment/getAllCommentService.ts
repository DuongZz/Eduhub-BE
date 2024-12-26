import Comment from "../../models/comment";

export const getAllCommentService = async (courseId: string) => {
  try {
    const allCmt = await Comment.find({ courseId }).populate("replyComment");
    if (!allCmt) {
      throw new Error("No comment");
    }
    return allCmt;
  } catch (err) {
    throw new Error(err);
  }
}
