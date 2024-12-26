import Course from "../../models/course";

export const searchCourseByNameService = async (nameCourse: string, page: number) => {
  try {
    const limit = 8;
    const skip = (page - 1) * limit;
    const normalizedKeyword = nameCourse.trim().replace(/\s+/g, ' ');
    const courses = await Course.find({
      courseName: { $regex: normalizedKeyword, $options: 'i' },
    }).skip(skip).limit(limit);

    return { courses };
  } catch (err) {
    throw new Error(err);
  }
};
