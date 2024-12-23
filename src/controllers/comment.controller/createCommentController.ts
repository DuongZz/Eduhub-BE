import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createCommentService } from "../../services/comment/createCommentService";

export const createCommentController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { commentContent } = req.body;
    const { courseId } = req.params;
    const comment = await createCommentService(courseId, userId, commentContent);
    res.status(StatusCodes.OK).json(comment)
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}
