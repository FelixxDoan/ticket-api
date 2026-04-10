import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import User from "../src/modules/users/user.model.js";
import Ticket from "../src/modules/tickets/ticket.model.js";
import Comment from "../src/modules/comments/comment.model.js";

configDotenv();

const MONGODB_URI = process.env.MONGODB_URI;

const userSeeds = [
  { fullName: "Admin One", email: "admin1@gmail.com", password: "123123", role: "admin" },
  { fullName: "Admin Two", email: "admin2@gmail.com", password: "123123", role: "admin" },
  { fullName: "Staff One", email: "staff1@gmail.com", password: "123123", role: "staff" },
  { fullName: "Staff Two", email: "staff2@gmail.com", password: "123123", role: "staff" },
  { fullName: "Customer One", email: "customer1@gmail.com", password: "123123", role: "customer" },
  { fullName: "Customer Two", email: "customer2@gmail.com", password: "123123", role: "customer" },
];

const ticketSeeds = [
  {
    code: "TCK-1001",
    title: "Cannot log in to dashboard",
    description:
      "Customer cannot log in after resetting password and keeps seeing an invalid credential message.",
    category: "technical",
    priority: "high",
    status: "open",
    createdByKey: "customer1",
    assignedToKey: null,
  },
  {
    code: "TCK-1002",
    title: "Invoice total looks incorrect",
    description:
      "Customer reports that the monthly invoice total does not match the selected plan.",
    category: "billing",
    priority: "medium",
    status: "assigned",
    createdByKey: "customer1",
    assignedToKey: "staff1",
  },
  {
    code: "TCK-1003",
    title: "Profile image upload fails",
    description:
      "Upload request fails with a server error even when the file size is within the allowed limit.",
    category: "technical",
    priority: "high",
    status: "in_progress",
    createdByKey: "customer2",
    assignedToKey: "staff2",
  },
  {
    code: "TCK-1004",
    title: "Need help understanding plan features",
    description:
      "Customer wants clarification about the differences between available subscription features.",
    category: "general",
    priority: "low",
    status: "resolved",
    createdByKey: "customer2",
    assignedToKey: "staff1",
  },
  {
    code: "TCK-1005",
    title: "Cannot update account information",
    description:
      "Customer receives a validation error when trying to update profile details.",
    category: "account",
    priority: "medium",
    status: "closed",
    createdByKey: "customer1",
    assignedToKey: "staff2",
  },
  {
    code: "TCK-1006",
    title: "Duplicate charge on subscription",
    description:
      "Customer reports being charged twice for the same monthly subscription period.",
    category: "billing",
    priority: "high",
    status: "cancelled",
    createdByKey: "customer2",
    assignedToKey: "staff2",
  },
];

const commentSeeds = [
  {
    ticketCode: "TCK-1001",
    authorKey: "customer1",
    content: "I tried resetting my password twice but I still cannot access the dashboard.",
    visibility: "public",
  },
  {
    ticketCode: "TCK-1002",
    authorKey: "customer1",
    content: "Please check this invoice issue as soon as possible.",
    visibility: "public",
  },
  {
    ticketCode: "TCK-1002",
    authorKey: "staff1",
    content: "I have received this ticket and I am reviewing the billing calculation.",
    visibility: "public",
  },
  {
    ticketCode: "TCK-1002",
    authorKey: "admin1",
    content:
      "Verify whether the discount rule was applied correctly before replying to the customer.",
    visibility: "internal",
  },
  {
    ticketCode: "TCK-1003",
    authorKey: "customer2",
    content: "The upload fails for both JPG and PNG images.",
    visibility: "public",
  },
  {
    ticketCode: "TCK-1003",
    authorKey: "staff2",
    content: "I reproduced the issue on staging and I am checking the upload validation flow.",
    visibility: "public",
  },
  {
    ticketCode: "TCK-1004",
    authorKey: "staff1",
    content: "I explained the current feature differences and marked this ticket as resolved.",
    visibility: "public",
  },
  {
    ticketCode: "TCK-1004",
    authorKey: "customer2",
    content: "Thanks, the explanation was clear and helpful.",
    visibility: "public",
  },
  {
    ticketCode: "TCK-1005",
    authorKey: "admin2",
    content: "This case was already handled in a previous request. Closing for cleanup.",
    visibility: "internal",
  },
  {
    ticketCode: "TCK-1006",
    authorKey: "staff2",
    content: "Customer requested cancellation while billing team was still reviewing the charge.",
    visibility: "public",
  },
];

async function connectDB() {
  if (!MONGODB_URI) throw new Error("Missing MONGODB_URI in .env");
  await mongoose.connect(MONGODB_URI);
  console.log("DB connected");
}

async function closeDB() {
  await mongoose.connection.close();
  console.log("DB closed");
}

async function clearDatabase() {
  await Comment.deleteMany({});
  await Ticket.deleteMany({});
  await User.deleteMany({});
  console.log("Old demo data cleared");
}

async function seedUsers() {
  await Promise.all(userSeeds.map((user) => User.create(user)));
  console.log(`Seeded ${userSeeds.length} users`);
}

async function buildUserMap() {
  const users = await User.find({
    email: {
      $in: [
        "admin1@gmail.com",
        "admin2@gmail.com",
        "staff1@gmail.com",
        "staff2@gmail.com",
        "customer1@gmail.com",
        "customer2@gmail.com",
      ],
    },
  });

  const userMap = {
    admin1: users.find((user) => user.email === "admin1@gmail.com"),
    admin2: users.find((user) => user.email === "admin2@gmail.com"),
    staff1: users.find((user) => user.email === "staff1@gmail.com"),
    staff2: users.find((user) => user.email === "staff2@gmail.com"),
    customer1: users.find((user) => user.email === "customer1@gmail.com"),
    customer2: users.find((user) => user.email === "customer2@gmail.com"),
  };

  for (const [key, value] of Object.entries(userMap)) {
    if (!value) throw new Error(`Missing seeded user: ${key}`);
  }

  return userMap;
}

async function seedTickets(userMap) {
  const payload = ticketSeeds.map((ticket) => ({
    code: ticket.code,
    title: ticket.title,
    description: ticket.description,
    category: ticket.category,
    priority: ticket.priority,
    status: ticket.status,
    createdBy: userMap[ticket.createdByKey]._id,
    assignedTo: ticket.assignedToKey ? userMap[ticket.assignedToKey]._id : null,
  }));

  await Ticket.insertMany(payload);
  console.log(`Seeded ${payload.length} tickets`);
}

async function buildTicketMap() {
  const tickets = await Ticket.find({
    code: { $in: ticketSeeds.map((ticket) => ticket.code) },
  });

  const ticketMap = Object.fromEntries(tickets.map((ticket) => [ticket.code, ticket]));

  for (const seed of ticketSeeds) {
    if (!ticketMap[seed.code]) throw new Error(`Missing seeded ticket: ${seed.code}`);
  }

  return ticketMap;
}

async function seedComments(userMap, ticketMap) {
  const payload = commentSeeds.map((comment) => ({
    ticketId: ticketMap[comment.ticketCode]._id,
    authorId: userMap[comment.authorKey]._id,
    content: comment.content,
    visibility: comment.visibility,
  }));

  await Comment.insertMany(payload);
  console.log(`Seeded ${payload.length} comments`);
}

async function main() {
  try {
    await connectDB();
    await clearDatabase();

    await seedUsers();
    const userMap = await buildUserMap();

    await seedTickets(userMap);
    const ticketMap = await buildTicketMap();

    await seedComments(userMap, ticketMap);

    console.log("Seed completed successfully");
  } catch (error) {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  } finally {
    await closeDB();
  }
}

main();