import User from "../../models/user";
import { s3 } from '../../config/s3bucket'
import config from '../../config/config';

export const upAvatarService = async (userId: string, avatarUpdated: Express.Multer.File) => {
  let avatarUrl;
  if (avatarUpdated && avatarUpdated.buffer) {
    const params = {
      Bucket: config.s3.bucket,
      Key: `avatar/${Date.now()}-${avatarUpdated.originalname}`,
      Body: avatarUpdated.buffer,
      ContentType: avatarUpdated.mimetype,
      ACL: 'public-read',
    };
    const data = await s3.upload(params).promise();
    avatarUrl = data.Location;
  };
  try {
    const avtUpdated = await User.findByIdAndUpdate(userId,
      { avatar: avatarUrl },
      { new: true }
    );
    return avtUpdated;
  } catch (err) {
    throw new Error(err);
  }
}
