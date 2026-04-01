var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import { rl } from "./input.js";
export function setupGlobalExit() {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on("data", (key) => __awaiter(this, void 0, void 0, function* () {
        if (key[0] === 27) {
            console.log("\nClosing connection...");
            yield mongoose.connection.close();
            rl.close();
            process.exit(0);
        }
    }));
}
//# sourceMappingURL=exit.js.map