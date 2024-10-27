import { NextFunction, Request, Response } from 'express';
import HttpError from '../utils/httpError';
import { jsonOne, jsonAll } from '../utils/general';
import { generateOtp, verifyOtp } from '../utils';
import MailService from '../services/mailService';
import { RoleType, OtpType } from '../utils/enums';
import User, { IUserModel } from '../models/user';
import otpMaster from '../models/otpMaster';
import { hash } from 'bcrypt';
import { IUser } from '../interfaces';

//EXPORT
export default {

};
