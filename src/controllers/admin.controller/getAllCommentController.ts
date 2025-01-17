import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { getAllCommentAdminService } from '../../services/admin/getAllCommentService';

export const getAllCommentAdminController = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;
    const pageNum = page ? Number(page) : 1;

    const { totalComment, totalPages, comment } = await getAllCommentAdminService(pageNum);
    res.status(StatusCodes.OK).json({ totalComment, totalPages, comment });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
} 
