import Course from "../../models/course";

export const searchCourseByNameService = async (nameCourse: string) => {
  try {
    const normalizedKeyword = nameCourse.trim().replace(/\s+/g, ' ');
    const courses = await Course.find({
      courseName: { $regex: normalizedKeyword, $options: 'i' },
    });

    return courses;
  } catch (err) {
    throw new Error(err);
  }
};
