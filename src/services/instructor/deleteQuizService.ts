import Quiz from "../../models/quiz";

export const deleteQuizService = async (quizId: string) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(quizId);
    if (!quiz) {
      throw new Error('Quiz không tồn tại !');
    }
    return quiz;
  } catch (err) {
    throw new Error(err);
  }
}
