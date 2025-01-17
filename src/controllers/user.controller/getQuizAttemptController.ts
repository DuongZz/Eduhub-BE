import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getQuizAttemptService } from "../../services/user/getQuizAttemptService";

export const getQuizAttemptController = async (req: Request, res: Response) => {
  try {
    const { quizId } = req.params;
    const userId = req.user.id;

    const result = await getQuizAttemptService(quizId, userId);

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};
