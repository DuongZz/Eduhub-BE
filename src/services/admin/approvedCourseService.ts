import Course from '../../models/course';

export const approvedCourseService = async (courseId: string) => {
  try {
    const course = await Course.findById(courseId);

    if (course.approvalStatus === 'Approved') {
      return { alreadyApproved: true, course };
    }

    course.approvalStatus = 'Approved';
    await course.save();

    return { alreadyApproved: false, course };
  } catch (err) {
    throw new Error(err.message);
  }
};
