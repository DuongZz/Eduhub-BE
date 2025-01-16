import Application from "../../models/application";

export const getAllApplicationService = async (page: number) => {
  try {
    const limit = 8;
    const skip = (page - 1) * limit;
    const application = await Application.find().skip(skip).limit(limit);
    if (!application) {
      throw new Error('No Application');
    }
    return application;
  } catch (err) {
    throw new Error(err)
  }
}
