import Course from '../../models/course';

export const createCourseService = async (courseData: { courseName: string; createdBy: string, slug: string }) => {
  try {
    const newCourse = new Course({
      courseName: courseData.courseName,
      approvedBy: courseData.createdBy,
      slug: courseData.slug,
      approvalStatus: 'Pending',
    });
    await newCourse.save();
    return newCourse;
  } catch (error) {
    throw new Error(`Failed to create course: ${error.message}`);
  }
};
