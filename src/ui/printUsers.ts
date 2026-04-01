import { UserModel } from "../db/userModel.js";

export async function printUsers() {
  const users = await UserModel.find();

  console.log("Current Users:");

  users.forEach((u) => {
    console.log(`ID: ${u._id}, Name: ${u.name}, Age: ${u.age}, Status: ${u.status}`);
  });
}