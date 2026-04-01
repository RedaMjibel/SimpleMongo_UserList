import mongoose from "mongoose";
import { rl } from "./input.js";

export function setupGlobalExit() {
  process.stdin.setRawMode(true);
  process.stdin.resume();

  process.stdin.on("data", async (key) => {
    if (key[0] === 27) {
      console.log("\nClosing connection...");
      await mongoose.connection.close();
      rl.close();
      process.exit(0);
    }
  });
}