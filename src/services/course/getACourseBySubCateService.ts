import Course from '../../models/course';

export const getCourseBySubCategoryService = async (subCategories: string, page: number) => {
  try {
    const limit = 8;
    const skip = (page - 1) * limit;
    const courses = await Course.find({
      subCategories: { $in: [subCategories] }
    }).skip(skip).limit(limit);

    return courses;
  } catch (error) {
    throw new Error('Error retrieving courses: ' + error.message);
  }
};
