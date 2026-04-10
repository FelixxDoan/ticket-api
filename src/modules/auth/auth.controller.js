import { registerService, loginService } from "./auth.service.js"
import asyncHandler from './../../common/utils/asyncHandler.js';

export const registerController = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body
    const result = await registerService({ fullName, email, password })

    res.status(200).json({
        message: "Register success",
        result
    })
})

export const loginController = asyncHandler(async (req, res) => {
    const { password, email } = req.body
    const result = await loginService({ password, email })

    res.status(200).json({
        message: "Login success",
        result
    })
})