import Course from '../../models/course';
import Instructor from '../../models/instructor';

export const approvedCourseService = async (courseId: string) => {
  try {
    const course = await Course.findById(courseId);

    if (course.approvalStatus === 'Approved') {
      return { alreadyApproved: true, course };
    }

    course.approvalStatus = 'Approved';
    await course.save();
    if (course.approvedBy) {
      await Instructor.findOneAndUpdate(
        { user: course.approvedBy },
        { $inc: { courseAmount: 1 } },
        { new: true }
      );
    }

    return course;
  } catch (err) {
    throw new Error(err.message);
  }
};
