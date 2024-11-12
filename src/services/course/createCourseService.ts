import Course from '../../models/course';
import { ICourse } from '../../interfaces/courseInterface';

export const createCourseService = async (courseData: ICourse) => {
  try {
    const newCourse = new Course(courseData);
    await newCourse.save();
    return newCourse;
  } catch (error) {
    throw new Error(`Failed to create course: ${error.message}`);
  }
};
