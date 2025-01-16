import { IUser } from './../../interfaces/userInterface';
import User from "../../models/user";
import { s3 } from '../../config/s3bucket';
import config from '../../config/config';

export const editProfileService = async (userId: string, userProfile: IUser, avatarFile?: Express.Multer.File) => {
  try {
    const { fullName, gender, dateOfBirth, country, city, phone, email } = userProfile;

    let avatarUrl;

    if (avatarFile && avatarFile.buffer) {
      const params = {
        Bucket: config.s3.bucket,
        Key: `avatar/${Date.now()}-${avatarFile.originalname}`,
        Body: avatarFile.buffer,
        ContentType: avatarFile.mimetype,
        ACL: 'public-read',
      };
      const data = await s3.upload(params).promise();
      avatarUrl = data.Location;
    }

    const updatedProfile = await User.findByIdAndUpdate(
      userId,
      {
        fullName,
        gender,
        dateOfBirth,
        country,
        city,
        phone,
        email,
        ...(avatarUrl && { avatar: avatarUrl })
      },
      { new: true }
    );

    return updatedProfile;
  } catch (err) {
    throw new Error(err.message);
  }
};
