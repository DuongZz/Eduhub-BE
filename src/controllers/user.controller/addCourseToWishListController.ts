import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { toggleCourseInWishListService } from "../../services/user/addCourseToWishListService";

export const toggleCourseInWishListController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const { action, wishList } = await toggleCourseInWishListService(userId, id);

    res.status(StatusCodes.OK).json({
      message: `Course ${action} to wishList successfully.`,
      data: wishList,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};
