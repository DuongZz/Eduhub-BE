import { IUser } from './../../interfaces/userInterface';
import User from "../../models/user";

export const editProfileService = async (userId: string, userProfile: IUser) => {
  try {
    const { fullName, gender, dateOfBirth, country, province,
      province_city, phone, avatar, email } = userProfile;

    const updatedProfile = await User.findByIdAndUpdate(userId,
      {
        fullName: fullName,
        gender: gender,
        dateOfBirth: dateOfBirth,
        country: country,
        province: province,
        province_city: province_city,
        phone: phone,
        avatar: avatar,
        email: email,
      }
    )
    return updatedProfile;
  } catch (err) {
    throw new Error(err);
  }
} 
