import asyncHandler from "../../common/utils/asyncHandler.js";
import { profileService } from './user.service.js';

export const profileController = asyncHandler(async (req, res) => {
    const { email } = req.user

    const result = await profileService(email)

    res.status(200).json({
        message: "Get profile success",
        result
    })
})

