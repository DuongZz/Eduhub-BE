import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import env from '../config/config';
import { generateAccessToken } from '../utils/generateToken';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.cookies);

    const accessToken = req.cookies['accessToken'];
    const refreshToken = req.cookies['refreshToken'];

    if (accessToken && refreshToken) {
        jwt.verify(accessToken, env.token.access, (err, user) => {
            if (err) {
                // Nếu accessToken hết hạn, kiểm tra refreshToken
                jwt.verify(refreshToken, env.token.refresh, (err, user) => {
                    if (err) {
                        return res.status(401).json({ message: 'Login session has expired.' });
                    } else {
                        // Tạo mới accessToken
                        const newAccessToken = generateAccessToken(user.id);
                        res.cookie('accessToken', newAccessToken, { httpOnly: true });
                        next();
                    }
                });
            } else {
                req.user = user;
                next();
            }
        });
    } else {
        res.status(403).json({ message: 'No access.' });
    }
};
