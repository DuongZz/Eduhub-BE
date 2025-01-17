import Course from "../../models/course";
import Lesson from "../../models/lesson";
import { generateSlug } from "../../utils/generateSlug";
export const uploadLinkYoutubeService = async (courseId: string,
  lessonName: string, lessonContent: string) => {
  try {
    const newLesson = new Lesson({
      courseId,
      lessonName,
      lessonContent,
      slug: generateSlug(lessonName)
    })
    const lesson = await newLesson.save();
    const course = await Course.findById(courseId);
    if (!courseId) {
      throw new Error('Course not found');
    }
    course.videos.push(lesson._id);
    await course.save();
    return newLesson;
  } catch (err) {
    throw new Error(err);
  }
}
