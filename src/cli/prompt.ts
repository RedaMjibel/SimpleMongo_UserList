import { question } from "./input.js";
import { addUser, deleteUser } from "../services/userService.js";
import { printUsers } from "../ui/printUsers.js";

export async function promptUser() {
  let option = "";

  do {
    option = await question("1 to create user, 2 to delete user, 3 to print users: ");

    if (option !== "1" && option !== "2" && option !== "3") {
      console.log("Wrong option. Please enter 1, 2 or 3.");
    }
  } while (option !== "1" && option !== "2" && option !== "3");

  if (option === "1") {
    await addUser();
  } else  if (option === "2") {
    await deleteUser();
  } else {
    await printUsers();
  }
}