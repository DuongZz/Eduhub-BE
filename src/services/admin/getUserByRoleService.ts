import User from "../../models/user";

export const getUserByRoleService = async (role: string, page: number) => {
  try {
    const limit = 8;
    const skip = (page - 1) * limit;
    const user = await User.find({ role: role }).skip(skip).limit(limit);
    return user;
  } catch (err) {
    throw new Error(err);
  }
}
