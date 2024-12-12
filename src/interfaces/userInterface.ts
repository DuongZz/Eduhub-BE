import { GENDER, ROLE } from "../type";
import { Schema } from "mongoose";

export interface IUser {
    id: Schema.Types.ObjectId;
    fullName: string;
    gender: GENDER;
    dateOfBirth: Date;
    country: string;
    province: string;
    province_city: string;
    phone: string;
    avatar: string;
    email: string;
    password: string;
    role: ROLE;
}
