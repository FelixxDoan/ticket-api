import throwError from "../../common/utils/throwError.js";
import User from "../users/user.model.js";
import { generateToken } from './../../common/utils/jwt.js';

export const registerService = async ({ fullName, email, password }) => {
    if (!fullName || !email || !password) throwError(400, "Missing fields")

    const user = await User.findOne({ email })
    if (user) throwError(400,"Email was used")
    const newUser = (await User.create({ fullName, email, password })).toObject()

    const { password: userPass, ...userProfile } = newUser

    return userProfile
}


export const loginService = async ({password, email}) => {
    if (!email || !password) throwError(400, "Missing fields")

    const user = await User.findOne({ email }).select("+password")
    if (!user) throwError(404, "User not found")

    const isUser = await user.comparePassword(password)
    if (!isUser) throwError(401, "Wrong password")

    const userObj = user.toObject()

    const { password: hash, ...payload } = userObj

    const token = generateToken(payload)

    return { token, payload }
}
