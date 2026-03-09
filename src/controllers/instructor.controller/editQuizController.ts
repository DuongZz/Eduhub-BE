import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { editQuizService } from '../../services/instructor/editQuizService';

export const editQuizController = async (req: Request, res: Response) => {
  try {
    const { quizId } = req.params;
    const { quizName, courseId, durationTime, maxScore, questions } = req.body;

    const updatedQuiz = await editQuizService(quizId, {
      quizName,
      courseId,
      durationTime,
      maxScore,
      questions,
    });

    res.status(StatusCodes.OK).json({
      message: 'Quiz updated successfully',
      quiz: updatedQuiz,
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Failed to update quiz',
      error: error.message,
    });
  }
};
