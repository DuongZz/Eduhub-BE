import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { getAInstructorInfoService } from '../../services/user/getInstructorInfoService';

export const getAInstructorInfoController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await getAInstructorInfoService(id);
    res.status(StatusCodes.OK).json(course)
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}
