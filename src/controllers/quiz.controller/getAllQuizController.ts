import { Request, Response } from "express";
import { getAllQuizzesByCourseService } from "../../services/quiz/getAllQuizService";
import { StatusCodes } from "http-status-codes";

export const getAllQuizzesByCourseController = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const quizzes = await getAllQuizzesByCourseService(courseId, userId);

    res.status(StatusCodes.OK).json({
      message: "Quizzes fetched successfully",
      quizzes,
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to fetch quizzes",
      error: error.message,
    });
  }
};
