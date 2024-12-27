import { submitQuizService } from '../../services/quiz/submitQuizService';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const submitQuizController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { courseId, quizId, userAnswers } = req.body;

    if (!courseId || !quizId || !Array.isArray(userAnswers)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid data' });
    }

    const result = await submitQuizService(userId, courseId, quizId, userAnswers);

    res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    console.error('Error in Submit Quiz Controller:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
