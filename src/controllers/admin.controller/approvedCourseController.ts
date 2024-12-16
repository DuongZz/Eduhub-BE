import { approvedCourseService } from './../../services/admin/approvedCourseService';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

export const approvedCourseController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { alreadyApproved, course } = await approvedCourseService(id);

    if (alreadyApproved) {
      res.status(StatusCodes.OK).json({
        message: 'Course is already approved.',
        data: course,
      });
    }

    res.status(StatusCodes.OK).json({
      message: 'Approval course successfully',
      data: course,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error approving course',
      error: err.message,
    });
  }
};
