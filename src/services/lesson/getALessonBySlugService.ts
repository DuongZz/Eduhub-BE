import Course from "../../models/course";
import Lesson from "../../models/lesson";

export const getALessonBySlugService = async (courseSlug: string, lessonSlug: string) => {
  try {
    const course = await Course.findOne({ slug: courseSlug });
    if (!course) {
      throw new Error('Course not found');
    }
    const lesson = await Lesson.findOne({ slug: lessonSlug, courseId: course._id });
    return lesson;
  } catch (err) {
    throw new Error(err);
  }
}
