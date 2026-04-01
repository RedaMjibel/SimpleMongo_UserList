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
import { addUser, deleteUser } from "../services/userService.js";
export function promptUser() {
    return __awaiter(this, void 0, void 0, function* () {
        let option = "";
        do {
            option = yield question("1 to create user, 2 to delete user: ");
            if (option !== "1" && option !== "2") {
                console.log("Wrong option. Please enter 1 or 2.");
            }
        } while (option !== "1" && option !== "2");
        if (option === "1") {
            yield addUser();
        }
        else {
            yield deleteUser();
        }
    });
}
//# sourceMappingURL=prompt.js.map