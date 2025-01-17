import Lesson from "../../models/lesson";

export const getCourseLessonService = async (courseId: string) => {
  try {
    const lesson = await Lesson.find({ courseId: courseId });
    if (!lesson) {
      throw new Error('Lesson not found');
    }

    return lesson;
  } catch (err) {
    throw new Error(err);
  }
}
