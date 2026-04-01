import { UserModel } from "../db/userModel.js";
import { question } from "../cli/input.js";
import { validateName } from "./validateName.js";


export async function addUser() {
  let name = "";
let error: string | null;

while (true) {
  name = await question("Enter user name: ");
  error = validateName(name);

  if (error) {
    console.log(error);
    continue;
  }

  break;
}

  let age: number = 0;
  let status: string = "";

  do {
    const ageInput = await question("Enter user age: ");
    age = parseInt(ageInput);

    if (isNaN(age) || age <= 0 || age >= 150) {
      console.log("Invalid age. Enter a positive number between 1 and 149.");
    }
  } while (isNaN(age) || age <= 0 || age >= 150);



  if (age <= 25) status = "young";
  else if (age <= 60 ) status = "old";
  else if (age < 150 && age >= 61) status = "senior";

  await UserModel.create({
    name,
    age,
    status,
  });

  console.log("User created successfully!");
}

export async function deleteUser() {
  let name = "";
  let error: string | null;

  do {
    name = await question("Enter username: ");
    error = validateName(name);
    if (error) {
    console.log(error);
    continue;
  }
  } while (!name.trim() || error);

  await UserModel.findOneAndDelete({ name });

  console.log("User deleted!");
}