import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const URI = process.env.MONGODB_URI;

export const connectDb = async () => {
  try {
    if (!URI) {
      throw new Error("MONGODB_URI is not defined");
    }

    await mongoose.connect(URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};