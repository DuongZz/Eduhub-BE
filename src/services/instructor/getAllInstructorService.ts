import Instructor from "../../models/instructor";
export const getAllInstructorService = async (page: number) => {
  try {
    const limit = 25;
    const skip = (page - 1) * limit;
    const instructor = await Instructor.find().skip(skip).limit(limit).populate("user");
    return instructor;
  } catch (err) {
    throw new Error(err);
  }
}
