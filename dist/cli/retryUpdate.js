var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { question } from "./input.js";
import { updateUser } from "../services/userService.js";
export function retryUpdate(option) {
    return __awaiter(this, void 0, void 0, function* () {
        while (!option) {
            console.log("No user found with that name.");
            const retry = yield question("User not found. Try again? (y/n): ");
            if (retry.toLowerCase() !== "y")
                break;
            option = yield updateUser();
        }
        return option;
    });
}
//# sourceMappingURL=retryUpdate.js.map