import Course from '../../models/course';
import Instructor from '../../models/instructor';

export const getAllCourseService = async () => {
  try {
    const topSoldCourse = await Course.find({ approvalStatus: 'Approved' })
      .sort({ sold: -1 })
      .limit(8)
      .populate("approvedBy", "fullName");
    const topViewCourse = await Course.find({ approvalStatus: 'Approved' })
      .sort({ view: -1 })
      .limit(8)
      .populate("approvedBy", "fullName");
    const topSaleCourse = await Course.find({ approvalStatus: 'Approved' })
      .sort({ discount: -1 })
      .limit(8)
      .populate("approvedBy", "fullName");
    const newReleasedCourse = await Course.find({ approvalStatus: 'Approved' })
      .sort({ createdAt: -1 })
      .limit(8)
      .populate("approvedBy", "fullName");

    const topInstructorsByStudents = await Instructor.aggregate([
      {
        $project: {
          user: 1,
          students: 1,
          title: 1,
          rating: 1
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
          avatar: '$instructorDetails.avatar',
          title: 1,
          rating: 1,
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
