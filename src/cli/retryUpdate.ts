import { question } from "./input.js";
import { updateUser } from "../services/userService.js";

export async function retryUpdate(option: boolean): Promise<boolean> {
    while (!option) {
      console.log("No user found with that name.");
      const retry = await question("User not found. Try again? (y/n): ");

    if (retry.toLowerCase() !== "y") break;
      option = await updateUser();
    }

    return option;
}