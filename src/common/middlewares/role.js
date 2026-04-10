import throwError from '../utils/throwError.js';


const requireRole = (allowedRoles) => (req, res, next) => {
    const { role } = req.user

    try {
        if (!role) throwError(403, "Missing user's role")

        if (!allowedRoles.includes(role)) throwError(403, "Role not match")

        return next()
    } catch (error) {
        console.log(error)
        next(error)
    }

}

export default requireRole