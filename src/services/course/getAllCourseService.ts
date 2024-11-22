import Course from '../../models/course';

export const getAllCourseService = async () => {
  try {
    const course = await Course.find();
    return course;
  } catch (err) {
    throw new Error(err)
  }
}
