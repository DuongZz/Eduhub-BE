import { Response, Request } from "express";
import { StatusCodes } from 'http-status-codes'

import USER from "../../models/user";

export const getUserInfo = async (req: Request, res: Response) => {
    try {
        const user = await USER.findById(req.user.id).select("-password")

        res.status(StatusCodes.OK).json({
            userInfo: user
        })
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
} 