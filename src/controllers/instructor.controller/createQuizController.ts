import { createQuizService } from '../../services/instructor/createQuizService';

export const createQuizController = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const { quizName, courseId, durationTime, maxScore, questions } = req.body;

    const quiz = await createQuizService(instructorId, {
      quizName,
      courseId,
      durationTime,
      maxScore,
      questions,
    });

    res.status(201).json({
      message: 'Quiz created successfully',
      quiz,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
