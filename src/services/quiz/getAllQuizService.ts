import Quiz from "../../models/quiz";
import QuizAttempt from "../../models/quizAttempt";

export const getAllQuizzesByCourseService = async (courseId: string, userId: string) => {
  try {
    const quizzes = await Quiz.find({ courseId }).select("quizName durationTime maxScore");

    if (!quizzes.length) {
      throw new Error("Không tìm thấy bài quiz nào cho khóa học này.");
    }

    const quizzesWithMaxScore = await Promise.all(
      quizzes.map(async (quiz) => {
        const highestAttempt = await QuizAttempt.findOne({
          quizId: quiz._id,
          learnerId: userId,
        })
          .sort({ pointAchieved: -1 })
          .select("pointAchieved");

        return {
          _id: quiz._id,
          quizName: quiz.quizName,
          durationTime: quiz.durationTime,
          maxScore: quiz.maxScore,
          highestScore: highestAttempt ? highestAttempt.pointAchieved : 0,
        };
      })
    );

    return quizzesWithMaxScore;
  } catch (error: any) {
    throw new Error(`Lỗi khi lấy danh sách quiz: ${error.message}`);
  }
};
