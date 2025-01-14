import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { getChatWithGeminiService } from '../../services/user/getChatWithGeminiService';

export const getChatWithGeminiController = async (req: Request, res: Response) => {
  try {
    const id = req.user.id;
    const chat = await getChatWithGeminiService(id);
    res.status(StatusCodes.OK).json(chat);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}
