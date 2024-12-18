import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { addCourseToWishListService } from '../../services/user/addCourseToWishListService';

export const addCourseToWishListController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const cart = await addCourseToWishListService(userId, id);
    res.status(StatusCodes.OK).json({
      message: "Course added to wishList successfully.",
      data: cart,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}
