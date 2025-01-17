import Course from '../../models/course';

export const getCourseByOptionService = async (option: string, page: number) => {
  try {
    const limit = 8;
    const skip = (page - 1) * limit;

    let courses: any;

    if (option === 'top-ban-chay') {
      courses = await Course.find({ approvalStatus: 'Approved' }).sort({ sold: -1 }).skip(skip).limit(limit);
    } else if (option === 'top-uu-dai') {
      courses = await Course.find({ approvalStatus: 'Approved' }).sort({ discount: -1 }).skip(skip).limit(limit);
    } else if (option === 'khoa-hoc-duoc-xem-nhieu') {
      courses = await Course.find({ approvalStatus: 'Approved' }).sort({ view: -1 }).skip(skip).limit(limit);
    } else if (option === 'khoa-hoc-moi-ra-mat') {
      courses = await Course.find({ approvalStatus: 'Approved' }).sort({ createdAt: -1 }).skip(skip).limit(limit);
    }

    return courses;
  } catch (err) {
    throw new Error(err.message);
  }
};
