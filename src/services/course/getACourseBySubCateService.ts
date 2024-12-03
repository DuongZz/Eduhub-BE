import Course from '../../models/course';

export const getCourseBySubCategoryService = async (subCategories: string) => {
  try {
    const courses = await Course.find({
      subCategories: { $in: [subCategories] }
    });

    return courses;
  } catch (error) {
    throw new Error('Error retrieving courses: ' + error.message);
  }
};
