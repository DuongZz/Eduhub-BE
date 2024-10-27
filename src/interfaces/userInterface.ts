import { GENDER, ROLE } from "../models/type";
export interface IUser {
    uuid: string;
    firstName: string;
    lastName: string;
    gender: GENDER;
    dateOfBirth: Date;
    residence: string;
    avatar: string;
    email: string;
    password: string;
    role: ROLE;
}
