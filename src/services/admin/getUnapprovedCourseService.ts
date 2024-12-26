import Course from '../../models/course';

export const getUnapprovedCourseService = async () => {
  try {
    const course = await Course.find({ approvalStatus: 'Pending' });
    return course;
  } catch (err) {
    throw new Error(err)
  }
}
