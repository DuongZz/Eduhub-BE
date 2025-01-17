import Application from "../../models/application";

export const getAllApplicationService = async (page: number) => {
  try {
    const limit = 8;
    const skip = (page - 1) * limit;
    const application = await Application.find({ status: "Pending" }).sort({ createdAt: -1 }).populate("user", "fullName").skip(skip).limit(limit);
    if (!application) {
      throw new Error('No Application');
    }
    const totalApp = await Application.countDocuments()
    const totalPages = Math.ceil(totalApp / limit);
    return { totalApp, totalPages, application };
  } catch (err) {
    throw new Error(err)
  }
}
