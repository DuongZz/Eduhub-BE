import Rate from "../../models/rate";

export const getRateService = async (courseId: string) => {
  try {
    const rate = await Rate.find({ course: courseId }).sort({ createdAt: -1 }).populate("user", "fullName avatar");
    if (!rate) {
      throw new Error("Chưa có đánh giá");
    }
    return rate;
  } catch (err) {
    throw new Error(err);
  }
}
