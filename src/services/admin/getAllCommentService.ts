import Comment from "../../models/comment";

export const getAllCommentAdminService = async (page: number) => {
  try {
    const limit = 8;
    const skip = (page - 1) * limit;
    const comment = await Comment.find().populate("userId", "fullName")
      .sort({ commentedDate: -1 })
      .skip(skip)
      .limit(limit);
    if (!comment) {
      return { message: 'Không có comment nào' };
    }
    const totalComment = await Comment.countDocuments().sort({ createdAt: -1 })
    const totalPages = Math.ceil(totalComment / limit);
    return { totalComment, totalPages, comment };
  } catch (err) {
    throw new Error(err)
  }
}
