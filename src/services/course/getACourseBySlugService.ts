import Course from '../../models/course';

export const getACourseBySlugService = async (slug: string) => {
  try {
    const course = await Course.findOne({ slug: slug })
      .populate("approvedBy", "fullName")
      .populate("videos", "lessonName");;
    return course;
  } catch (err) {
    throw new Error(err)
  }
}
