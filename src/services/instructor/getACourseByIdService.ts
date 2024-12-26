import Course from "../../models/course";

export const getACourseByIdService = async (courseId: string) => {
  try {
    const course = await Course.findById(courseId)
    if (!course) {
      throw new Error('No course found')
    }
    return course;
  } catch (err) {
    throw new Error(err);
  }
}
