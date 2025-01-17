import Course from "../../models/course";

export const getAllCourseAdminService = async (page: number) => {
  try {
    const limit = 8;
    const skip = (page - 1) * limit;
    const course = await Course.find({ approvalStatus: 'Approved' })
      .sort({ createdAt: -1 }).populate("approvedBy", "fullName")
      .skip(skip)
      .limit(limit);
    if (!course) {
      return { message: 'Không có course nào' };
    }
    const total = await Course.countDocuments({ approvalStatus: 'Approved' });
    const totalPages = Math.ceil(total / limit);
    return { course, total, totalPages };
  } catch (err) {
    throw new Error(err)
  }
}
