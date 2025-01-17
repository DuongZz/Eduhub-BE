import Lesson from "../../models/lesson";
import Course from "../../models/course";

export const deleteLessonService = async (lessonId: string, courseId: string) => {
  try {
    const lesson = await Lesson.findOne({ _id: lessonId, courseId: courseId });

    if (!lesson) {
      throw new Error("Lesson không tồn tại!");
    }

    const course = await Course.findOne({ _id: courseId });

    if (!course) {
      throw new Error("Course không tồn tại!");
    }

    course.videos = course.videos.filter(videoId => videoId.toString() !== lessonId);

    await course.save();

    await Lesson.deleteOne({ _id: lessonId });

    return { message: "Bài học đã được xóa thành công !" };
  } catch (err) {
    throw new Error(err.message || "Có lỗi xảy ra khi xóa bài học");
  }
};
