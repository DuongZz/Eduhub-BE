import Course from "../../models/course";
export const getCourseByFilterService = async (category: string, option: string, page: number) => {
  try {
    const limit = 8;
    const skip = (page - 1) * limit;

    if (option === 'learn-most') {
      const course = await Course.find({ category: category }).sort({ view: -1 }).skip(skip).limit(limit)
      return course;
    }
    else if (option === 'rating') {
      const course = await Course.find({ category: category }).sort({ rating: -1 }).skip(skip).limit(limit)
      return course;
    }
    else if (option === 'new') {
      const course = await Course.find({ category: category }).sort({ createdAt: -1 }).skip(skip).limit(limit)
      return course;
    }
    else if (option === 'price-low') {
      const course = await Course.find({ category: category }).sort({ price: 1 }).skip(skip).limit(limit)
      return course;
    }
    else if (option === 'price-high') {
      const course = await Course.find({ category: category }).sort({ price: -1 }).skip(skip).limit(limit)
      return course;
    }
  } catch (err) {
    throw new Error(err);
  }
}
