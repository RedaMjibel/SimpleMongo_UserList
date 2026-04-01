import { question } from "./input.js";
import { addUser, deleteUser } from "../services/userService.js";

export async function promptUser() {
  let option = "";

  do {
    option = await question("1 to create user, 2 to delete user: ");

    if (option !== "1" && option !== "2") {
      console.log("Wrong option. Please enter 1 or 2.");
    }
  } while (option !== "1" && option !== "2");

  if (option === "1") {
    await addUser();
  } else {
    await deleteUser();
  }
}