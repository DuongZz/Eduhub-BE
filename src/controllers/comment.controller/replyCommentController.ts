import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { replyCommentService } from "../../services/comment/replyCommentService";

export const replyCommentController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { replyContent } = req.body;
    const { commentId } = req.params;
    const reply = await replyCommentService(commentId, userId, replyContent);
    res.status(StatusCodes.OK).json(reply)
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}
