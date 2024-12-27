import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { submitQuizService } from "../../services/quiz/submitQuizService";

export const submitQuizController = async (req: Request, res: Response) => {
  try {
    const { quizId, userAnswers } = req.body;

    if (!quizId || !Array.isArray(userAnswers)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid request data",
      });
    }

    const result = await submitQuizService(quizId, userAnswers);

    res.status(StatusCodes.OK).json({
      message: "Quiz submitted successfully",
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to submit quiz",
      error: error.message,
    });
  }
};
