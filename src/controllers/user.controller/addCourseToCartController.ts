import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { addToCartService } from '../../services/user/addCourseToCartService';

export const addCourseToCartController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const cart = await addToCartService(userId, id);
    res.status(StatusCodes.OK).json({
      message: "Course added to cart successfully.",
      data: cart,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}
