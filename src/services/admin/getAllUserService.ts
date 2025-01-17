import User from "../../models/user";

export const getAllUserService = async (page: number) => {
  try {
    const limit = 8;
    const skip = (page - 1) * limit;
    const user = await User.find().skip(skip).limit(limit);
    const totalUser = await User.countDocuments({})
    const totalPages = Math.ceil(totalUser / limit);
    return { totalUser, totalPages, user };
  } catch (err) {
    throw new Error(err);
  }
}
