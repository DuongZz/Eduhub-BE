import Application from "../../models/application";
import User from "../../models/user";

export const getAApplicationService = async (appId: string) => {
  try {
    const application = await Application.findOne({ appId: appId }).populate('user', '-password');
    return application;
  } catch (err) {
    throw new Error(err);
  }
}
