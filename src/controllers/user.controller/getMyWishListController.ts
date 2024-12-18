import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getMyWishListService } from '../../services/user/getMyWishListService';

export const getMyWishListController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const myWishList = await getMyWishListService(userId);
    res.status(StatusCodes.OK).json(myWishList)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
