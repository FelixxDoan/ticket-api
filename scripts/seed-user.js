// seeds/user.seed.js
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import User from '../src/modules/users/user.model.js';

configDotenv()

const MONGODB_URI = process.env.MONGODB_URI ;

const users =[
  {
    fullName: "admin",
    email: "admin@gmail.com",
    role: "admin",
    password: "123123"
  },
  {
    fullName: "staff",
    email: "staff@gmail.com",
    role: "staff",
    password: "123123"
  },
  {
    fullName: "customer",
    email: "customer@gmail.com",
    role: "customer",
    password: "123123"
  },
]

async function connectDB() {
  await mongoose.connect(MONGODB_URI);
  console.log("DB connected");
}

async function closeDB() {
  await mongoose.connection.close();
  console.log("DB closed");
}

async function seedUsers() {
  for(const user of users) {
    const exist = await User.findOne({email: user.email})
    if(exist) continue
    await User.create(user)
  }
}

async function main() {
  try {
    await connectDB();
    await seedUsers();
    console.log("Seed completed");
  } catch (error) {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  } finally {
    await closeDB();
  }
}

main();