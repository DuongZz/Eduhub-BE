import Instructor from "../../models/instructor";

export const searchInstructorByNameService = async (nameInstructor: string, page: number) => {
  try {
    const limit = 8;
    const skip = (page - 1) * limit;
    const normalizedKeyword = nameInstructor.trim().replace(/\s+/g, ' ');
    const instructors = await Instructor.find({
      'user.fullName': { $regex: normalizedKeyword, $options: 'i' }, // Truy vấn tên trong user
    })
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'user',
        select: 'fullName avatar description', // Chọn các trường cần thiết từ user
      });
    return instructors;

  } catch (err) {
    throw new Error(err)
  }
}
