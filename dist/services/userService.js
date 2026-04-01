var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserModel } from "../db/userModel.js";
import { question } from "../cli/input.js";
import { validateName } from "./validateName.js";
export function addUser() {
    return __awaiter(this, void 0, void 0, function* () {
        let name = "";
        let error;
        while (true) {
            name = yield question("Enter user name: ");
            error = validateName(name);
            if (error) {
                console.log(error);
                continue;
            }
            break;
        }
        let age = 0;
        let status = "";
        do {
            const ageInput = yield question("Enter user age: ");
            age = parseInt(ageInput);
            if (isNaN(age) || age <= 0 || age >= 150) {
                console.log("Invalid age. Enter a positive number between 1 and 149.");
            }
        } while (isNaN(age) || age <= 0 || age >= 150);
        if (age <= 25)
            status = "young";
        else if (age <= 60)
            status = "old";
        else if (age < 150 && age >= 61)
            status = "senior";
        yield UserModel.create({
            name,
            age,
            status,
        });
        console.log("User created successfully!");
    });
}
export function deleteUser() {
    return __awaiter(this, void 0, void 0, function* () {
        let name = "";
        let error;
        do {
            name = yield question("Enter username: ");
            error = validateName(name);
            if (error) {
                console.log(error);
                continue;
            }
        } while (!name.trim() || error);
        yield UserModel.findOneAndDelete({ name });
        console.log("User deleted!");
    });
}
//# sourceMappingURL=userService.js.map