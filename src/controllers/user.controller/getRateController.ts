import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getRateService } from "../../services/user/getRateService";

export const getRateController = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const rate = await getRateService(courseId);
    res.status(StatusCodes.OK).json(rate);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}
