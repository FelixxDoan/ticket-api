import throwError from "../../common/utils/throwError.js"
import User from "./user.model.js"


export const profileService = async(email) => {

    if(!email) throwError(400, "Missing credential")

    const user = await User.findOne({email})

    if(!user) throwError(404, "User not exist")

    return user
} 

export const checkRole = async(_id, role) => {
    return await User.findOne({_id, role, status: "active"})
}