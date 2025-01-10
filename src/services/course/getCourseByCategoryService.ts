import Course from '../../models/course';

export const getCourseByCategoryService = async (category: string, page: number) => {
  try {
    const limit = 8;
    const skip = (page - 1) * limit;

    const courses = await Course.find({ category }).skip(skip).limit(limit);
    const total = await Course.countDocuments({ category });
    const totalPages = Math.ceil(total / limit);
    const suggestedCourses = await Course.find({ _id: { $nin: courses.map(c => c._id) } })
      .sort({ view: -1 })
      .limit(8);
    return { courses, suggestedCourses, total, totalPages };
  } catch (err) {
    throw new Error(err.message);
  }
};
