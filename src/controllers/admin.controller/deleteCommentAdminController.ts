import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { deleteCommentAdminService } from '../../services/admin/deleteCommentAdminService';

export const deleteCommentAdminController = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;

    const userOrder = await deleteCommentAdminService(commentId);
    res.status(StatusCodes.OK).json(userOrder);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
} 
