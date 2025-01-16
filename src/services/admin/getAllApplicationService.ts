import Application from "../../models/application";

export const getAllApplicationService = async () => {
  try {
    const application = await Application.find().populate("user", "fullName");
    if (!application) {
      throw new Error('No Application');
    }
    return application;
  } catch (err) {
    throw new Error(err)
  }
}
