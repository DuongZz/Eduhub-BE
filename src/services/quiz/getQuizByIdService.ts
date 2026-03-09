import Quiz from "../../models/quiz";

export const getQuizByIdService = async (courseId: string, quizId: string) => {
  try {
    const quiz = await Quiz.findById(quizId)
      .populate({
        path: "questions",
        populate: {
          path: "answers",
          select: "text isCorrect",
        },
        select: "questionText maxScore",
      })
      .select("quizName durationTime maxScore questions");

    if (!quiz) {
      throw new Error("Quiz not found");
    }

    return quiz;
  } catch (error) {
    throw new Error(`Failed to fetch quiz: ${error.message}`);
  }
};
