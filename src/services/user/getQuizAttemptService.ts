import QuizAttempt from "../../models/quizAttempt";
import Quiz from "../../models/quiz";
import Answer from "../../models/answer";
import { ObjectId } from "mongoose";

export const getQuizAttemptService = async (quizId: string, userId: ObjectId) => {
  try {
    const quizAttempt = await QuizAttempt.findOne({ quizId, learnerId: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: 'answers.questionId',
        select: 'questionText answers',
      })
      .populate({
        path: 'answers.answerId',
        select: 'text isCorrect',
      });

    if (!quizAttempt) {
      throw new Error("Quiz attempt not found.");
    }

    const quiz = await Quiz.findById(quizId).select('quizName questions');

    const result = {
      quizName: quiz.quizName,
      pointAchieved: quizAttempt.pointAchieved,
      isPassed: quizAttempt.isPassed,
      answers: await Promise.all(quizAttempt.answers.map(async (answer) => {
        const allAnswers = await Answer.find({
          _id: { $in: answer.questionId.answers }
        }).select('text isCorrect');

        const correctAnswer = allAnswers.find(ans => ans.isCorrect);

        return {
          questionId: answer.questionId._id,
          questionText: answer.questionId.questionText,
          userAnswer: answer.answerId.text,
          isCorrect: answer.answerId.isCorrect,
          correctAnswerText: correctAnswer ? correctAnswer.text : "No correct answer",
          allAnswers: allAnswers.map(ans => ({
            text: ans.text,
            isCorrect: ans.isCorrect,
          }))
        };
      })),
    };

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};
