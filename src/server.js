import app from "./app.js";

import { configDotenv } from "dotenv";
import { connectDb } from "./config/db.js";

configDotenv()
const PORT = process.env.PORT || 3000



await connectDb()
app.listen(PORT, () => {
    console.log('server running on: ', PORT)
})