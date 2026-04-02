import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/testDB");
    console.log("Connected to MongoDB");
  } catch (err) {
  const error = err as Error;
  console.error("Failed to connect to MongoDB:", error.message);
  process.exit(1);
}
}