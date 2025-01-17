// services/application/applyInstructorService.ts
import Application from '../../models/application';
import { IApplication } from '../../interfaces/applicationInterface';

export const applyInstructorService = async (userId: string, data: IApplication) => {
  const { cv, title, linkFb, experience, topic } = data;

  const application = await Application.create({
    user: userId,
    cv,
    title,
    linkFb,
    experience,
    topic,
  });

  return application;
};
