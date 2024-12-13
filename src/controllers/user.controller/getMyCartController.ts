import { Request, Response } from 'express';
import { getMyCartService } from '../../services/user/getMyCartService';
import { StatusCodes } from 'http-status-codes';

export const getMyCartController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const myCart = await getMyCartService(userId);
    res.status(StatusCodes.OK).json(myCart)
  } catch (error) {
    throw new Error(error.message);
  }
};
