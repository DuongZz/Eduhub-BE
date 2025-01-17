import Quiz from "../../models/quiz";

export const getCourseQuizService = async (courseId: string) => {
  try {
    const quiz = await Quiz.find({ courseId: courseId });

    if (!quiz) {
      throw new Error('Quiz not found');
    }
    return quiz;
  } catch (err) {
    throw new Error(err);
  }
}
