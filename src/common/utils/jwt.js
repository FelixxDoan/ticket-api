import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'

configDotenv()

const JWT_SECRET = process.env.JWT_SECRET

export const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, {expiresIn: 21600})
}

export const verifyToken = (token)=> {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) 
        return {valid: true, decoded} 
    } catch (error) {
        return {valid:false, error: error.message}
    }
}
