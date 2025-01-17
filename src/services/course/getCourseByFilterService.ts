import Course from "../../models/course";
export const getCourseByFilterService = async (option: string, page: number) => {
  try {
    const limit = 8;
    const skip = (page - 1) * limit;

    if (option === 'learn-most') {
      const course = await Course.find().sort({ view: -1 }).skip(skip).limit(limit)
      return course;
    }
    else if (option === 'rating') {
      const course = await Course.find().sort({ rating: -1 }).skip(skip).limit(limit)
      return course;
    }
    else if (option === 'new') {
      const course = await Course.find().sort({ createdAt: -1 }).skip(skip).limit(limit)
      return course;
    }
    else if (option === 'price-low') {
      const course = await Course.find().sort({ price: 1 }).skip(skip).limit(limit)
      return course;
    }
    else if (option === 'price-high') {
      const course = await Course.find().sort({ price: -1 }).skip(skip).limit(limit)
      return course;
    }
  } catch (err) {
    throw new Error(err);
  }
}
