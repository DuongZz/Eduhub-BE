import { Request, Response, NextFunction } from 'express';
import Instructor from '../models/instructor';
import Application from '../models/application';

export const validateInstructorApplication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;

    const existingInstructor = await Instructor.findOne({ user: userId });
    if (existingInstructor) {
      return res.status(400).json({ message: 'You are already an instructor.' });
    }

    const existingApplication = await Application.findOne({ user: userId });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already submitted an application.' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error validating application.' });
  }
};
