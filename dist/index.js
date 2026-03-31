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
import readline from "readline";
let option = "";
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose.connect("mongodb://127.0.0.1:27017/testDB");
            console.log("Connected to MongoDB");
        }
        catch (err) {
            console.error("Connection error:", err);
        }
    });
}
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    status: String
});
const UserModel = mongoose.model("User", userSchema);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function question(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}
function addUser() {
    return __awaiter(this, void 0, void 0, function* () {
        let name = "";
        do {
            name = yield question("Enter user name: ");
            if (!name.trim()) {
                console.log("Name cannot be empty.");
            }
        } while (!name.trim());
        let age = 0;
        do {
            const ageInput = yield question("Enter user age: ");
            age = parseInt(ageInput);
            if (isNaN(age) || age <= 0) {
                console.log("Invalid age. Enter a positive number.");
            }
        } while (isNaN(age) || age <= 0);
        let status;
        if (age <= 25)
            status = "young";
        else if (age <= 60)
            status = "old";
        else
            status = "senior";
        yield UserModel.create({
            name,
            age,
            status,
        });
        console.log("User created successfully!");
    });
}
function deleteUser() {
    return __awaiter(this, void 0, void 0, function* () {
        let userId = "";
        do {
            userId = yield question("Enter user ID to delete: ");
            if (!userId.trim()) {
                console.log("User ID cannot be empty.");
            }
        } while (!userId.trim());
        yield UserModel.findByIdAndDelete(userId);
        console.log("User deleted successfully!");
    });
}
function promptUser() {
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
function PrintUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield UserModel.find();
            console.log("Current Users:");
            users.forEach((user) => {
                console.log(`ID: ${user._id}, Name: ${user.name}, Age: ${user.age}, Status: ${user.status}`);
            });
        }
        catch (err) {
            console.error("Error fetching users:", err);
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield connectDB();
        yield promptUser();
        yield PrintUsers();
        rl.close();
        process.exit();
    });
}
main();
//# sourceMappingURL=index.js.map