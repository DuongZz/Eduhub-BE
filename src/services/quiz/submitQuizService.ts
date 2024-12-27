import Quiz from "../../models/quiz";
import Question from "../../models/question";

export const submitQuizService = async (quizId: string, userAnswers: any[]) => {
  try {
    // Lấy dữ liệu bài quiz
    const quiz = await Quiz.findById(quizId).populate({
      path: "questions",
      populate: { path: "answers" }, // Lấy cả danh sách đáp án
    });

    if (!quiz) {
      throw new Error("Quiz not found");
    }

    let totalScore = 0;
    const results = [];

    // Duyệt qua từng câu hỏi
    for (const question of quiz.questions) {
      const userAnswer = userAnswers.find((ans) => ans.questionId === question._id.toString());
      const correctAnswer = question.answers.find((answer) => answer.isCorrect);

      const isCorrect = correctAnswer && userAnswer?.selectedAnswerId === correctAnswer._id.toString();
      const score = isCorrect ? question.maxScore : 0;

      totalScore += score;

      results.push({
        questionId: question._id,
        questionText: question.questionText,
        isCorrect,
        selectedAnswerId: userAnswer?.selectedAnswerId || null,
        correctAnswerId: correctAnswer?._id || null,
        score,
      });
    }

    return {
      quizId,
      totalScore,
      maxScore: quiz.maxScore,
      results,
    };
  } catch (error) {
    throw new Error(`Failed to submit quiz: ${error.message}`);
  }
};
