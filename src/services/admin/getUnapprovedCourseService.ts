import Course from '../../models/course';

export const getUnapprovedCourseService = async (page: number) => {
  try {
    const limit = 8;
    const skip = (page - 1) * limit;
    const course = await Course.find({ approvalStatus: 'Pending' }).populate("approvedBy", "fullName")
      .skip(skip)
      .limit(limit)
    const total = await Course.countDocuments({ approvalStatus: 'Pending' });
    const totalPages = Math.ceil(total / limit);
    return { course, total, totalPages };
  } catch (err) {
    throw new Error(err)
  }
}
