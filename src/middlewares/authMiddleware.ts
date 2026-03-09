import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import env from '../config/config';
import { generateAccessToken } from '../utils/generateToken';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies['accessToken'];
    const refreshToken = req.cookies['refreshToken'];

    const isProd = process.env.NODE_ENV === 'production';
    const accessMaxAgeMs = 15 * 24 * 60 * 60 * 1000; // 15 days
    const cookieOptions = {
        path: '/',
        httpOnly: true,
        secure: isProd,
        sameSite: (isProd ? 'none' : 'lax') as 'none' | 'lax',
    };

    // Case 1: access token is present and valid
    if (accessToken) {
        jwt.verify(accessToken, env.token.access, (err, user) => {
            if (!err && user) {
                req.user = user;
                return next();
            }

            // Case 2: access token invalid/expired -> try refresh
            if (!refreshToken) {
                return res.status(401).json({ message: 'Login session has expired.' });
            }

            jwt.verify(refreshToken, env.token.refresh, (refreshErr, refreshUser) => {
                if (refreshErr || !refreshUser) {
                    return res.status(401).json({ message: 'Login session has expired.' });
                }

                req.user = refreshUser;
                const newAccessToken = generateAccessToken(refreshUser);
                res.cookie('accessToken', newAccessToken, { ...cookieOptions, maxAge: accessMaxAgeMs });
                return next();
            });
        });

        return;
    }

    // Case 3: no access token, but refresh token exists -> mint a new access token
    if (refreshToken) {
        jwt.verify(refreshToken, env.token.refresh, (refreshErr, refreshUser) => {
            if (refreshErr || !refreshUser) {
                return res.status(401).json({ message: 'Login session has expired.' });
            }

            req.user = refreshUser;
            const newAccessToken = generateAccessToken(refreshUser);
            res.cookie('accessToken', newAccessToken, { ...cookieOptions, maxAge: accessMaxAgeMs });
            return next();
        });

        return;
    }

    return res.status(401).json({ message: 'No access.' });
};
