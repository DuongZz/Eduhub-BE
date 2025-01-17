import Comment from "../../models/comment";
import Reply from "../../models/reply";

export const replyCommentService = async (commentId: string, userId: string, replyContent: string) => {
  try {
    const reply = await Reply.create({
      commentId,
      userId,
      replyContent
    })
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new Error('Comment not exist');
    }
    comment.replyComment.push(reply._id);
    await comment.save();
    return reply;
  } catch (err) {
    throw new Error(err);
  }
}
