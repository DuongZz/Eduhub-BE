import { Request, Response } from "express";
import { rateACourseService } from "../../services/user/rateACourseService";
import { StatusCodes } from "http-status-codes";

export const rateACourseController = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const { rating, content } = req.body;
    const userId = req.user.id;
    const newRate = await rateACourseService(slug, rating, content, userId);

    res.status(StatusCodes.OK).json({
      message: "Đánh giá khóa học thành công",
      rate: newRate,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}
