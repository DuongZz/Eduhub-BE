import Course from '../../models/course';

export const getCourseByCategoryService = async (category: string, page: number) => {
  try {
    const limit = 1;
    const skip = (page - 1) * limit;
    const courses = await Course.find({ category: category }).skip(skip).limit(limit);
    return courses;
  } catch (err) {
    throw new Error(err.message);
  }
};
