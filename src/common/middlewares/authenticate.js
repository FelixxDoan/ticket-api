import jwt from 'jsonwebtoken'
import config from './../../config/env.js';
import throwError from '../utils/throwError.js';

const { JWT_SECRET } = config()

const authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"]

    try {

        if (!authHeader || !authHeader.startsWith('Bearer ')) throwError(401, "Missing token")

        const token = authHeader.split(' ')[1]
        const payload = jwt.verify(token, JWT_SECRET)

        req.user = { ...payload }

        return next()
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export default authenticate