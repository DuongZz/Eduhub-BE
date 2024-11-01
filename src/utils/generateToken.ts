import jwt from 'jsonwebtoken';
import env from '../config/config'
export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id || user._id,
      role: user.role,
    },
    env.token.access,
    {
      expiresIn: '1D'
    }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    env.token.refresh,
    {
      expiresIn: '360D',
    }
  );
};
