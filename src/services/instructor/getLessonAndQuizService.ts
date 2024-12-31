import Lesson from "../../models/lesson";
import Quiz from "../../models/quiz";

export const getLessonAndQuizService = async (courseId: string) => {
  try {
    const lesson = await Lesson.find({ courseId: courseId });
    const quiz = await Quiz.find({ courseId: courseId });
    if (!lesson) {
      throw new Error('Lesson not found');
    }
    if (!quiz) {
      throw new Error('Quiz not found');
    }
    return {
      lesson, quiz
    };
  } catch (err) {
    throw new Error(err);
  }
}
