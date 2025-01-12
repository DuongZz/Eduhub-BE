import Rate from "../../models/rate";
import Course from "../../models/course";
import User from "../../models/user";

export const rateACourseService = async (slug: string, rating: string, content: string, userId: string) => {
  try {
    const course = await Course.findOne({ slug });
    if (!course) {
      throw new Error("Course not found");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const newRate = new Rate({
      rating,
      content,
      course: course._id,
      user: user._id,
    });

    await newRate.save();

    return newRate;
  } catch (err) {
    throw new Error(err.message);
  }
};
