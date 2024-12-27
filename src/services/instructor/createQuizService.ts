import mongoose from 'mongoose';
import Quiz from '../../models/quiz';
import Question from '../../models/question';
import Answer from '../../models/answer';

export const createQuizService = async (instructorId: string, data: any) => {
  const session = await mongoose.startSession(); // Bắt đầu session
  session.startTransaction(); // Bắt đầu transaction

  try {
    const { quizName, courseId, durationTime, maxScore, questions } = data;

    if (!quizName || !courseId || !durationTime || !maxScore || !Array.isArray(questions)) {
      throw new Error('Invalid input data');
    }

    const questionIds = [];
    for (const questionData of questions) {
      const { text, maxScore: questionMaxScore, answers } = questionData;

      if (!text || !Array.isArray(answers) || answers.length < 2 || !questionMaxScore) {
        throw new Error('Each question must have text, maxScore, and at least two answers');
      }

      const answerIds = [];
      for (const answerData of answers) {
        const answer = await Answer.create([answerData], { session });
        answerIds.push(answer[0]._id);
      }

      const question = await Question.create(
        [{ questionText: text, answers: answerIds, maxScore: questionMaxScore }],
        { session }
      );
      questionIds.push(question[0]._id);
    }

    const quiz = await Quiz.create(
      [{
        quizName,
        instructorId,
        courseId,
        durationTime,
        maxScore,
        questions: questionIds,
      }],
      { session }
    );

    await session.commitTransaction(); // Commit nếu tất cả thành công
    session.endSession();

    return quiz[0];
  } catch (error) {
    await session.abortTransaction(); // Rollback nếu có lỗi
    session.endSession();
    console.error('Error creating quiz:', error);
    throw new Error(error.message || 'Failed to create quiz');
  }
};
