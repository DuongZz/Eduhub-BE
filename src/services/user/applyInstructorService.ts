// services/application/applyInstructorService.ts
import Application from '../../models/application';
import Instructor from '../../models/instructor';
import { IApplication } from '../../interfaces/applicationInterface';

export const applyInstructorService = async (userId: string, data: IApplication) => {
  const { description, cv, title, linkFb, experience, topic } = data;

  const existingInstructor = await Instructor.findOne({ user: userId });
  if (existingInstructor) {
    throw new Error('You are already an instructor.');
  }

  const existingApplication = await Application.findOne({ user: userId });
  if (existingApplication) {
    throw new Error('You have already submitted an application.');
  }

  const application = await Application.create({
    user: userId,
    description,
    cv,
    title,
    linkFb,
    experience,
    topic,
  });

  return application;
};
