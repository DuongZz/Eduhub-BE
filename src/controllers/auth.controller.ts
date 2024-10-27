import { NextFunction, Request, Response } from 'express';
import HttpError from '../utils/httpError';
import { jsonOne } from '../utils/general';
import { matchedData } from 'express-validator';
import User, { IUserModel } from '../models/user';
import { generateJWT } from '../utils';
import generateResetPasswordTemplate from '../templates/resetPasswordTemplate';
import MailService from '../services/mailService';
import { generateOtp, verifyOtp } from '../utils';
import otpMaster from '../models/otpMaster';
import { OtpType } from '../utils/enums';
import { compare, hash } from 'bcrypt';
import { AuthInterface } from '../interfaces/authInterface';


//EXPORT
export default {

};
