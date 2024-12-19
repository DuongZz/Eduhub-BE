import { Request, Response } from 'express';
import { getCoursePurchasedService } from '../../services/user/getCoursePurchasedService';

export const getCoursePurchasedController = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const courses = await getCoursePurchasedService(id);
    return res.status(200).json(courses);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message });
  }
};
