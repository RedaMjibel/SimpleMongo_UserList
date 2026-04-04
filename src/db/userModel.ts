import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  status: String,
  createdAt: { type: Date,
    default: Date.now,
    immutable: true
  }
});

export const UserModel = mongoose.model("User", userSchema);