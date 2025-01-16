import { ILesson } from '../../interfaces';
import Lesson from '../../models/lesson';
import Course from '../../models/course';

export const updateLessonService = async (courseId: string, lessonId: string, updatedData: ILesson) => {
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course không tồn tại!");
    }

    const lesson = await Lesson.findOneAndUpdate(
      { _id: lessonId, courseId: courseId },
      updatedData,
      { new: true }
    );

    if (!lesson) {
      throw new Error("Lesson không tồn tại!");
    }

    return lesson;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
