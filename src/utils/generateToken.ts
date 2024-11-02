import jwt from 'jsonwebtoken';
import env from '../config/config'
export const generateAccessToken = (user) => {
  try {
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
  } catch (error) {
    console.error("Error generating access token:", error);
    throw new Error("Token generation failed");
  }
};

export const generateRefreshToken = (user) => {
  try {
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
  } catch (error) {
    console.error("Error generating refresh token:", error);
    throw new Error("Token generation failed");
  }
};
