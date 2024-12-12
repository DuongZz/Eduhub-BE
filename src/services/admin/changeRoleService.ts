import config from "../../config/config";
import { transporter } from "../../config/configEmail";
import Application from "../../models/application";
import User from "../../models/user";
import Instructor from "../../models/instructor";

export const changeRoleService = async (applicationId: string) => {
  try {
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      throw new Error("Application not found.");
    }

    const userId = application.user;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found.");
    }

    const roleUpdated = await User.findByIdAndUpdate(
      userId,
      { role: 'INSTRUCTOR' },
      { new: true }
    );

    const newInstructor = await Instructor.create({
      user: userId,
      description: application.description,
      cv: application.cv,
      title: application.title,
      linkFb: application.linkFb || '',
      experience: application.experience || '',
      topic: application.topic || '',
    });

    await Application.findByIdAndUpdate(applicationId, { status: 'Approved' });

    const mailOptions = {
      from: config.email.sender_email,
      to: user.email,
      subject: "Role Update Notification",
      text: `Hello ${user.fullName},\n\nYour role has been updated to INSTRUCTOR. Your application has been approved.\n\nBest regards,\nEduhub Services`,
    };

    await transporter.sendMail(mailOptions);

    return {
      message: `User role updated to ${roleUpdated.role}, instructor data saved, application approved, and email sent successfully.`,
      instructor: newInstructor,
    };
  } catch (err: any) {
    throw new Error(err.message);
  }
};
