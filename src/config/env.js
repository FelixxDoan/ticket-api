import { configDotenv } from "dotenv"
configDotenv()


const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

const config = () => {
    return {
        PORT,
        MONGODB_URI,
        JWT_SECRET
    }
}

export default  config