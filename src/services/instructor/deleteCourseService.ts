import Course from "../../models/course";

export const deleteCourseService = async (courseId: string) => {
  try {
    const course = await Course.findByIdAndDelete(courseId);
    if (!course) {
      throw new Error("Course không tồn tại !")
    }
    return course;
  } catch (err) {
    throw new Error(err);
  }
}
