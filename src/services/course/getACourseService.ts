import Course from '../../models/course';

export const getACourseService = async (courseId: string) => {
  try {
    const course = await Course.findById(courseId);
    return course;
  } catch (err) {
    throw new Error(err)
  }
}
