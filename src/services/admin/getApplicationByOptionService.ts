import Application from "../../models/application";

export const getApplicationByOptionService = async (status: string, page: number) => {
  try {
    const limit = 8;
    const skip = (page - 1) * limit;
    const application = await Application.find({ status: status })
      .skip(skip)
      .limit(limit)
    if (!application) {
      return { message: 'Không có đơn ứng tuyển' };
    }
    return application;
  } catch (err) {
    throw new Error()
  }
}
