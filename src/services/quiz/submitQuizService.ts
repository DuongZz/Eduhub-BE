import QuizAttempt from '../../models/quizAttempt';
import Quiz from '../../models/quiz';
import Question from '../../models/question';
import Answer from '../../models/answer';

export const submitQuizService = async (userId: string, courseId: string, quizId: string, userAnswers: any[]) => {
  try {
    // Lấy thông tin quiz
    const quiz = await Quiz.findById(quizId).populate('questions');
    if (!quiz) throw new Error('Quiz not found');

    let totalPoints = 0;
    let pointAchieved = 0;

    // Kiểm tra từng câu hỏi
    const answers = await Promise.all(
      userAnswers.map(async (userAnswer) => {
        const question = await Question.findById(userAnswer.questionId).populate('answers');
        if (!question) throw new Error('Question not found');

        const correctAnswer = question.answers.find((ans: any) => ans.isCorrect);
        const isCorrect = correctAnswer && correctAnswer._id.toString() === userAnswer.selectedAnswerId;

        // Cộng điểm nếu đúng
        if (isCorrect) pointAchieved += question.maxScore;
        totalPoints += question.maxScore;

        return {
          questionId: userAnswer.questionId,
          answerId: userAnswer.selectedAnswerId,
          isCorrect,
        };
      })
    );

    // Tính toán kết quả
    const conditionPass = quiz.maxScore * 0.7; // Điều kiện để đậu (VD: >= 70%)
    const isPassed = pointAchieved >= conditionPass;

    // Tạo bài thi
    const quizAttempt = new QuizAttempt({
      learnerId: userId,
      quizId,
      answers,
      pointAchieved,
      isPassed,
      conditionPass,
    });

    await quizAttempt.save();

    return {
      message: 'Quiz submitted successfully',
      quizAttempt,
    };
  } catch (error) {
    console.error('Error submitting quiz:', error);
    throw new Error(error.message || 'Failed to submit quiz');
  }
};
