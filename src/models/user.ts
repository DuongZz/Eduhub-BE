import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from '../interfaces';
import { v4 as uuidv4 } from 'uuid';
import { GENDER, ROLE } from './type';

//EXPORT INTERFACE WITH MONGOOSE DOCUMENT
export interface IUserModel extends IUser, Document { }

//DEFINE USER SCHEMA
const UserSchema: Schema = new Schema(
    {
        firstName: {
            type: String,
            default: '',
        },
        lastName: {
            type: String,
            default: '',
        },
        gender: {
            type: String,
            enum: Object.values(GENDER),
            default: null,
        },
        dateOfBirth: {
            type: Date,
            default: null,
        },
        residence: {
            type: String,
            default: '',
        },
        avatar: {
            type: String,
            default: '',
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 8,
        },
        role: {
            type: String,
            enum: Object.values(ROLE),
            default: 'LEARNER',
        },
    },
    { timestamps: true }
);

//EXPORT
export default mongoose.model<IUserModel>('User', UserSchema);

