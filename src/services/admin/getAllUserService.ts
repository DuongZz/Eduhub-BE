import User from "../../models/user";

export const getAllUserService = async (page: number) => {
  try {
    const limit = 8;
    const skip = (page - 1) * limit;
    const user = await User.find().skip(skip).limit(limit);
    return user;
  } catch (err) {
    throw new Error(err);
  }
}
