import Comment from "../../models/comment";

export const getAllCommentAdminService = async (page: number) => {
  try {
    const limit = 8;
    const skip = (page - 1) * limit;
    const comment = await Comment.find()
      .sort({ commentedDate: -1 })
      .skip(skip)
      .limit(limit);
    if (!comment) {
      return { message: 'Không có comment nào' };
    }
    return comment;
  } catch (err) {
    throw new Error(err)
  }
}
