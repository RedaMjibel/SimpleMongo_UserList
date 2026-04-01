import { question } from "./input.js";
import { addUser, deleteUser, updateUser } from "../services/userService.js";
import { printUsers } from "../ui/printUsers.js";

export async function promptUser() {
  let option = "";

  do {
    option = await question("1 to create user, 2 to delete user, 3 to update users, 4 to print users: ");

    if (option !== "1" && option !== "2" && option !== "3" && option !== "4") {
      console.log("Wrong option. Please enter 1, 2, 3 or 4.");
    }
  } while (option !== "1" && option !== "2" && option !== "3" && option !== "4");

  if (option === "1") {
    await addUser();
  } else  if (option === "2") {
    let deleted = await deleteUser();
    while (!deleted) {
      console.log("No user found with that name.");
      deleted = await deleteUser();
    }
  } else if (option === "3") {
    let updated = await updateUser();
    while (!updated) {
      console.log("No user found with that name.");
      const retry = await question("User not found. Try again? (y/n): ");

    if (retry.toLowerCase() !== "y") break;
      updated = await updateUser();
    }
  } else {
    await printUsers();
  }
}