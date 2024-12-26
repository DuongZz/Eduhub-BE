import Comment from "../../models/comment";

export const createCommentService = async (courseId: string, userId: string, commentContent: string) => {
  try {
    const newComment = await Comment.create({
      courseId,
      userId,
      commentContent,
    })
    return newComment;
  } catch (err) {
    throw new Error(err);
  }
}
