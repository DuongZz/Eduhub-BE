import Course from '../../models/course';

export const getACourseBySlugService = async (slug: string) => {
  try {
    const course = await Course.findOne({ slug: slug });
    return course;
  } catch (err) {
    throw new Error(err)
  }
}
