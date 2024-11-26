// models/user.ts
import mongoose, { Document, Schema } from 'mongoose';
import { GENDER, ROLE } from './type';

// DEFINE USER SCHEMA
const UserSchema: Schema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: Object.values(GENDER),
            default: null,
        },
        country: {
            type: String,
            default: '',
        },
        province: {
            type: String,
            default: ''
        },
        province_city: {
            type: String,
            default: ''
        },
        dateOfBirth: {
            type: Date,
            default: null,
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
        phone: {
            type: String,
            default: ''
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

// EXPORT
export default mongoose.model('User', UserSchema);
