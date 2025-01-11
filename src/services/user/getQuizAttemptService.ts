import QuizAttempt from "../../models/quizAttempt";
import Quiz from "../../models/quiz";
import Answer from "../../models/answer";

export const getQuizAttemptService = async (quizId: string, userId: string) => {
  try {
    const quizAttempt = await QuizAttempt.findOne({ quizId, learnerId: userId })
      .populate({
        path: 'answers.questionId',
        select: 'questionText answers',
      })
      .populate({
        path: 'answers.answerId',
        select: 'text isCorrect',
      })

    if (!quizAttempt) {
      throw new Error("Quiz attempt not found.");
    }

    const quiz = await Quiz.findById(quizId).select('quizName');

    const result = {
      quizName: quiz.quizName,
      pointAchieved: quizAttempt.pointAchieved,
      isPassed: quizAttempt.isPassed,
      answers: await Promise.all(quizAttempt.answers.map(async (answer) => {
        const correctAnswer = await Answer.findOne({
          _id: { $in: answer.questionId.answers },
          isCorrect: true
        });

        return {
          questionId: answer.questionId._id,
          questionText: answer.questionId.questionText,
          userAnswer: answer.answerId.text,
          isCorrect: answer.answerId.isCorrect,
          correctAnswerText: correctAnswer ? correctAnswer.text : "No correct answer",
        };
      })),
    };

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};
