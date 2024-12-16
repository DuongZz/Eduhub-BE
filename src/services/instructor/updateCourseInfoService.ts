import Course from '../../models/course';

export const updateCourseInfoService = async (courseId: string, updates: any) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(courseId, updates, { new: true });
    if (!updatedCourse) {
      throw new Error('Course not found');
    }
    return updatedCourse;
  } catch (error) {
    throw new Error(`Failed to update course: ${error.message}`);
  }
};
