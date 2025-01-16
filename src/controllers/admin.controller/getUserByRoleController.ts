import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { getUserByRoleService } from '../../services/admin/getUserByRoleService';

export const getUserByRoleController = async (req: Request, res: Response) => {
  try {
    const { role, page } = req.query;
    const pageNum = page ? Number(page) : 1;
    const user = await getUserByRoleService(role as string, pageNum);
    res.status(StatusCodes.OK).json(user);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}
