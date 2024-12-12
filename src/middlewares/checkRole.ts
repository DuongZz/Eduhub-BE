import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const checkRoleInstructor = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).send('User not authenticated');
  }
  if (user.role !== 'INSTRUCTOR') {
    return res.status(StatusCodes.FORBIDDEN).send('Access denied: You are not an instructor');
  }
  next();
};

export const checkRoleAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).send('User not authenticated');
  }
  if (user.role !== 'ADMIN') {
    return res.status(StatusCodes.FORBIDDEN).send('Access denied: You are not an admin');
  }
  next();
};
