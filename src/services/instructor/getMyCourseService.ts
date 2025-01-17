import Course from "../../models/course";

export const getMyCourseService = async (instructorId: string) => {
  try {
    const course = await Course.find({ approvedBy: instructorId });
    if (!course) {
      throw new Error('No course found');
    }
    return course;
  } catch (err) {
    throw new Error(err);
  }
}
