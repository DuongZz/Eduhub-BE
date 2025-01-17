import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getAllCommentService } from "../../services/comment/getAllCommentService";

export const getAllCommentController = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const allComment = await getAllCommentService(courseId);
    res.status(StatusCodes.OK).json(allComment);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}
