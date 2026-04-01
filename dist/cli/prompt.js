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
import { printUsers } from "../ui/printUsers.js";
export function promptUser() {
    return __awaiter(this, void 0, void 0, function* () {
        let option = "";
        do {
            option = yield question("1 to create user, 2 to delete user, 3 to print users: ");
            if (option !== "1" && option !== "2" && option !== "3") {
                console.log("Wrong option. Please enter 1, 2 or 3.");
            }
        } while (option !== "1" && option !== "2" && option !== "3");
        if (option === "1") {
            yield addUser();
        }
        else if (option === "2") {
            let deleted = yield deleteUser();
            while (!deleted) {
                console.log("No user found with that name.");
                deleted = yield deleteUser();
            }
        }
        else {
            yield printUsers();
        }
    });
}
//# sourceMappingURL=prompt.js.map