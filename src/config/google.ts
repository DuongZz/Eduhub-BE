import passport from "passport"
import { StatusCodes } from 'http-status-codes'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import USER from "../models/user";

import { generateRandomPassword } from "../utils/generateRandomPassword";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken";

export default function PassportGoogle(app) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "http://localhost:5000/auth/google/callback",
            },
            (accessToken, refreshToken, profile, done) => {
                return done(null, profile);
            }
        )
    );

    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));

    app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

    app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "http://localhost:3000/login" }), async (req, res) => {
        try {
            const { displayName, emails, photos } = req.user;
            const email = emails[0].value
            const avatar = photos[0].value

            const user = await USER.findOne({ email })

            if (user) {
                const accessToken = generateAccessToken(user);
                const refreshToken = generateRefreshToken(user);

                res.cookie("refreshToken", refreshToken, {
                    path: "/",
                    secure: false,
                    httpOnly: true,
                });

                res.cookie("accessToken", accessToken, {
                    path: "/",
                    secure: false,
                    httpOnly: true,
                });

                return res.redirect("http://localhost:3000/info");
            } else {
                const password = await generateRandomPassword();

                const newUser = new USER({
                    avatar: avatar,
                    fullName: displayName,
                    email: email,
                    password: password,
                })

                await newUser.save();

                const accessToken = generateAccessToken(newUser);
                const refreshToken = generateRefreshToken(newUser);

                res.cookie("refreshToken", refreshToken, {
                    path: "/",
                    secure: false,
                    httpOnly: true,
                });

                res.cookie("accessToken", accessToken, {
                    path: "/",
                    secure: false,
                    httpOnly: true,
                });

                return res.redirect("http://localhost:3000/info");
            }
        } catch (error) {
            console.error("Error during Google login:", error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
        }
    });
};