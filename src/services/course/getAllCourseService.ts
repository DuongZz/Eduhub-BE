import Course from '../../models/course';
import Instructor from '../../models/instructor';

export const getAllCourseService = async () => {
  try {
    const topSoldCourse = await Course.find().sort({ sold: -1 }).limit(8);
    const topViewCourse = await Course.find().sort({ view: -1 }).limit(8);
    const topSaleCourse = await Course.find().sort({ discount: -1 }).limit(8);
    const newReleasedCourse = await Course.find().sort({ createdAt: -1 }).limit(8);

    const topInstructorsByStudents = await Instructor.aggregate([
      {
        $project: {
          user: 1,
          students: 1,
        },
      },
      { $sort: { students: -1 } },
      { $limit: 8 },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'instructorDetails',
        },
      },
      { $unwind: '$instructorDetails' },
      {
        $project: {
          _id: 0,
          instructorId: '$user',
          name: '$instructorDetails.fullName',
          students: 1,
        },
      },
    ]);

    return {
      topSoldCourse,
      topViewCourse,
      topSaleCourse,
      newReleasedCourse,
      topInstructorsByStudents,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};
