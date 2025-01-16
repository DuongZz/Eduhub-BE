import Course from '../../models/course';

export const getUnapprovedCourseService = async (page: number) => {
  try {
    const limit = 8;
    const skip = (page - 1) * limit;
    const course = await Course.find({ approvalStatus: 'Pending' })
      .skip(skip)
      .limit(limit)
    return course;
  } catch (err) {
    throw new Error(err)
  }
}
