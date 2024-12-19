import User from "../../models/user";

export const getCoursePurchasedService = async (userId: string) => {
  try {
    const coursePurchased = await User.findById(userId)
      .populate({
        path: 'coursePurchased',
        select: 'courseName approvedBy',
        populate: {
          path: 'approvedBy',
          select: 'fullName',
        },
      });
    return coursePurchased;
  } catch (err) {
    throw new Error(err);
  }
}
