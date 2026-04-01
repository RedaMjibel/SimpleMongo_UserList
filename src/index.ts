import { connectDB } from "./db/connectDB.js";
import { setupGlobalExit } from "./cli/exit.js";
import { promptUser } from "./cli/prompt.js";
import { printUsers } from "./ui/printUsers.js";
import { question } from "./cli/input.js";

async function main() {
  await connectDB();

  setupGlobalExit();

  while (true) {
    await promptUser();
    await printUsers();

    console.log("\nPress ENTER to continue or ESC anytime to exit...");
    await question("");
  }
}

main();