import config from "../../config/config";
import { transporter } from "../../config/configEmail";
import Application from "../../models/application";
import User from "../../models/user";
export const changeRoleService = async (applicationId: string) => {
  try {
    const application = await Application.findOne({ _id: applicationId });
    const userId = application.user;
    const user = await User.findById(userId)
    const roleUpdated = await User.findByIdAndUpdate(userId, { role: 'INSTRUCTOR' }, { new: true });
    const mailOptions = {
      from: config.email.sender_email,
      to: user.email,
      subject: "Role Update Notification",
      text: `Hello ${user.fullName},\n\nYour role has been updated to INSTRUCTOR.\n\nBest regards,\nEduhub Services`,
    };

    await transporter.sendMail(mailOptions);
    return { message: `User role updated to ${roleUpdated.role} and email sent successfully.` }
  } catch (err: any) {
    throw new Error(err);
  }
}
