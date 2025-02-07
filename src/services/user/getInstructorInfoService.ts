import { ObjectId } from "mongoose";
import Instructor from "../../models/instructor";

export const getAInstructorInfoService = async (id: string) => {
  try {
    const instructor = await Instructor.findOne({ user: id }).populate("user");
    if (!instructor) {
      throw new Error('Instructor not exist')
    }
    return instructor;
  } catch (err) {
    throw new Error(err);
  }
}
