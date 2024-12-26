import { getACourseByIdService } from "../../services/instructor/getACourseByIdService";
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

export const getACourseByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await getACourseByIdService(id);
    res.status(StatusCodes.OK).json(course)
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}
