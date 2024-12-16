// models/user.ts
import mongoose, { Document, Schema } from 'mongoose';
import { GENDER, ROLE } from './type';

// DEFINE USER SCHEMA
const UserSchema: Schema = new Schema(
    {
        avatar: {
            type: String,
            default: '',
        },
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            default: '',
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 8,
        },
        gender: {
            type: String,
            enum: Object.values(GENDER),
            default: 'MALE',
        },
        country: {
            type: String,
            default: '',
        },
        city: {
            type: String,
            default: '',
        },
        dateOfBirth: {
            type: Date,
            required: true
        },
        role: {
            type: String,
            enum: Object.values(ROLE),
            default: 'LEARNER',
        },
    },
    { timestamps: true }
);

// EXPORT
export default mongoose.model('User', UserSchema);
