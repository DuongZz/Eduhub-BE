import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getALessonBySlugService } from '../../services/lesson/getALessonBySlugService';
import COURSE from '../../models/course';

export const getInfoCourse = async (req: Request, res: Response) => {
    try {
        const { courseSlug } = req.params;
        const course = await COURSE.findOne({ slug: courseSlug })
            .populate([
                {
                    path: "approvedBy",
                    select: "fullName, avatar"
                },
                {
                    path: 'videos',
                    select: 'lessonName'
                }
            ]);
        if (!course) {
            throw new Error('Course not found');
        }
        return res.status(StatusCodes.OK).json(course)
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}
