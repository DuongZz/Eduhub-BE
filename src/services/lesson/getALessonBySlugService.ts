import Course from "../../models/course";
import Lesson from "../../models/lesson";

export const getALessonBySlugService = async (courseSlug: string, lessonId: string) => {
  try {
    const course = await Course.findOne({ slug: courseSlug });
    if (!course) {
      throw new Error('Course not found');
    }
    const lesson = await (await Lesson.findOne({ id: lessonId }))
      .populate({
        path: "courseId",
        select: "courseName approvedBy videos",
        populate: [
          {
            path: "approvedBy",
            select: "fullName, avatar"
          },
          {
            path: 'videos',
            select: 'lessonName'
          }
        ]
      })
    return lesson;
  } catch (err) {
    throw new Error(err);
  }
}
