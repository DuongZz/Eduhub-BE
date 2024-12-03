import Course from '../../models/course';

export const getCourseByCategoryService = async (category: string) => {
  try {
    const courses = await Course.find({ category: category });
    return courses;
  } catch (err) {
    throw new Error(err.message);
  }
};
