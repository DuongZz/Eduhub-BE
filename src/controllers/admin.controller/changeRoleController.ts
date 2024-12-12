import { changeRoleService } from "../../services/admin/changeRoleService";
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

export const changeRoleController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await changeRoleService(id);
    res.status(StatusCodes.OK).json(result)
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}
