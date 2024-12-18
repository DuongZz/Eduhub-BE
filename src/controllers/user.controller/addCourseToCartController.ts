import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { toggleCourseInCartService } from "../../services/user/addCourseToCartService";


export const toggleCourseInCartController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const { action, cart } = await toggleCourseInCartService(userId, id);

    res.status(StatusCodes.OK).json({
      message: `Course ${action} in cart successfully.`,
      data: cart,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};
