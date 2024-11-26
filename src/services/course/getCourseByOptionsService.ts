import Course from '../../models/course';

export const getCourseByOptionService = async (option: string, page: number) => {
  try {
    const limit = 8;
    const skip = (page - 1) * limit;

    let courses: any;

    if (option === 'top-sold') {
      courses = await Course.find().sort({ sold: -1 }).skip(skip).limit(limit);
    } else if (option === 'top-sale') {
      courses = await Course.find().sort({ discount: -1 }).skip(skip).limit(limit);
    } else if (option === 'top-viewed') {
      courses = await Course.find().sort({ view: -1 }).skip(skip).limit(limit);
    } else if (option === 'new-released') {
      courses = await Course.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    }

    return courses;
  } catch (err) {
    throw new Error(err.message);
  }
};
