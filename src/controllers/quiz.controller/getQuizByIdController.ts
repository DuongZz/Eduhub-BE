import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getQuizByIdService } from "../../services/quiz/getQuizByIdService";

export const getQuizByIdController = async (req: Request, res: Response) => {
  try {
    const { quizId, courseId } = req.params;

    const quiz = await getQuizByIdService(courseId, quizId);

    res.status(StatusCodes.OK).json(quiz);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to fetch quiz",
      error: error.message,
    });
  }
};
