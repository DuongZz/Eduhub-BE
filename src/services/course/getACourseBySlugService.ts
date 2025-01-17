import Course from '../../models/course';
import Instructor from '../../models/instructor';

export const getACourseBySlugService = async (slug: string) => {
  try {
    const course = await Course.findOne({ slug: slug, approvalStatus: 'Approved' })
      .populate("approvedBy")
      .populate("videos", "lessonName");;

    if (course && course.approvedBy) {
      const instructor = await Instructor.findOne({ user: course.approvedBy._id })
        .populate('user')
        .exec();
      course.approvedBy = instructor;
    }
    return course;
  } catch (err) {
    throw new Error(err)
  }
}
