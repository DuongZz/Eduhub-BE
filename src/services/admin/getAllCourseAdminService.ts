import Course from "../../models/course";

export const getAllCourseAdminService = async (page: number) => {
  try {
    const limit = 8;
    const skip = (page - 1) * limit;
    const course = await Course.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    if (!course) {
      return { message: 'Không có course nào' };
    }
    return course;
  } catch (err) {
    throw new Error(err)
  }
}
