import { Request, Response } from 'express';
import { getRevenueService } from '../../services/admin/getRevenueService';

export const getRevenueController = async (req: Request, res: Response) => {
  try {
    const { year } = req.query;

    if (!year) {
      return res.status(400).json({ message: 'Year is required' });
    }

    const revenueByMonth = await getRevenueService(Number(year));

    res.status(200).json({
      message: 'Monthly paid orders fetched successfully',
      data: revenueByMonth
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
