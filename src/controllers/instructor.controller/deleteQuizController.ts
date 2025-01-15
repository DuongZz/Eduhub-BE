import { deleteQuizService } from "../../services/instructor/deleteQuizService";
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

export const deleteQuizController = async (req: Request, res: Response) => {
  try {
    const { quizId } = req.params;
    const quiz = await deleteQuizService(quizId);
    res.status(StatusCodes.OK).json("Delete quiz successfully");
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}
