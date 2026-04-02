import { UserModel } from "../db/userModel.js";

export async function printUsers() {
  const users = await UserModel.find();

  console.log("Current Users:");

  users.forEach((u) => {
    console.log(`Name: ${u.name}, Age: ${u.age}, Status: ${u.status}`);
  });
}