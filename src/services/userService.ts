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

  const deletedUser = await UserModel.findOneAndDelete({ name });
      console.log("User deleted!\n");
  return deletedUser !== null;

}
export async function updateUser() {
  let name = "";
  let error: string | null;
  while (true) {
    name = await question("Enter username: ");
    error = validateName(name);

    if (error) {
      console.log(error);
      continue;
    }

    break;
  }

  let updatedName = "";

  while (true) {
    updatedName = await question("Enter new username: ");
    error = validateName(updatedName);

    if (error) {
      console.log(error);
      continue;
    }

    break;
  }
  let updatedAge: number = 0;

  while (true) {
    const updatedAgeInput = await question("Enter new user age: ");
    updatedAge = parseInt(updatedAgeInput);

    if (isNaN(updatedAge) || updatedAge <= 0 || updatedAge >= 150) {
      console.log("Invalid age. Enter a number between 1 and 149.");
      continue;
    }

    break;
  }

  const updatedUser = await UserModel.findOneAndUpdate(
    { name },
    { name: updatedName, age: updatedAge },
    { returnDocument: "after" }
  );

  if (!updatedUser) {
    return false;
  }

  console.log("User updated!\n");
  return true;
}