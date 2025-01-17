import Course from "../../models/course";

export const searchCourseService = async (nameCourse: string) => {
  try {
    const normalizedKeyword = nameCourse.trim().replace(/\s+/g, ' ');
    const courses = await Course.find({
      courseName: { $regex: normalizedKeyword, $options: 'i' }, approvalStatus: 'Approved'
    }).limit(8);

    return { courses };
  } catch (err) {
    throw new Error(err);
  }
};
