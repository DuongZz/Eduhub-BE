import Quiz from "../../models/quiz";

export const getAllQuizzesByCourseService = async (courseId: string) => {
  try {
    const quizzes = await Quiz.find({ courseId }).select("quizName durationTime maxScore");

    if (!quizzes.length) {
      throw new Error("No quizzes found for the specified course.");
    }

    return quizzes;
  } catch (error) {
    throw new Error(`Failed to fetch quizzes: ${error.message}`);
  }
};
