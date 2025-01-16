import Comment from "../../models/comment";

export const deleteCommentAdminService = async (id: string) => {
  try {
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      return { message: 'Bình luận không tồn tại' }
    }
    return { message: 'Xóa comment thành công', comment }
  } catch (err) {
    throw new Error(err);
  }
}
