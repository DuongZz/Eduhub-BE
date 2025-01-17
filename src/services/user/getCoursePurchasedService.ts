import User from "../../models/user";

export const getCoursePurchasedService = async (userId: string) => {
  try {
    const coursePurchased = await User.findById(userId)
      .populate({
        path: 'coursePurchased',
        select: 'courseName slug poster approvedBy videos',
        populate: [
          {
            path: 'approvedBy',
            select: 'fullName',
          },
          {
            path: 'videos',
            select: 'lessonName'
          }
        ]
      });
    return coursePurchased;
  } catch (err) {
    throw new Error(err);
  }
}
