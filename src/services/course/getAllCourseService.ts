import Course from '../../models/course';
import User from '../../models/user';

export const getAllCourseService = async () => {
  try {
    const topSoldCourse = await Course.find().sort({ sold: -1 }).limit(8);
    const topViewCourse = await Course.find().sort({ view: -1 }).limit(8);
    const topSaleCourse = await Course.find().sort({ discount: -1 }).limit(8);
    const newReleasedCourse = await Course.find().sort({ createdAt: -1 }).limit(8);
    const topAuthors = await Course.aggregate([
      {
        $group: {
          _id: '$approvedBy',
          totalView: { $sum: '$view' },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'authorDetails',
        },
      },
      { $unwind: '$authorDetails' },
      { $sort: { totalView: -1 } },
      { $limit: 4 },
      {
        $project: {
          _id: 0,
          authorId: '$_id',
          name: '$authorDetails.name',
          totalView: 1,
        },
      },
    ]);

    return { topSoldCourse, topViewCourse, topSaleCourse, newReleasedCourse, topAuthors };
  } catch (err) {
    throw new Error(err)
  }
}
