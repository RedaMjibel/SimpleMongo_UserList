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
});
const UserModel = mongoose.model("User", userSchema);
const users = [
    { id: 1, name: "Alice", age: 30 },
    { id: 2, name: "Bob", age: 25 },
    { id: 3, name: "Charlie", age: 35 },
];
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        yield UserModel.create({
            name: user.name,
            age: user.age,
        });
    });
}
function PrintUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield UserModel.find();
        console.log("Current Users:");
        users.forEach((user) => {
            console.log(`ID: ${user._id}, Name: ${user.name}, Age: ${user.age}`);
        });
    });
}
function promptUser() {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        let name;
        do {
            name = yield new Promise((resolveName) => {
                rl.question("Enter user name: ", resolveName);
            });
            if (!name.trim()) {
                console.log("Name cannot be empty. Please enter a valid name.");
            }
        } while (!name.trim());
        let age;
        do {
            const ageInput = yield new Promise((resolveAge) => {
                rl.question("Enter user age: ", resolveAge);
            });
            age = parseInt(ageInput);
            if (isNaN(age) || age <= 0) {
                console.log("Invalid age input. Please enter a positive number.");
            }
        } while (isNaN(age) || age <= 0);
        rl.close();
        resolve({ id: 0, name, age });
    }));
}
// Main execution
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield connectDB();
        const newUser = yield promptUser();
        yield addUser(newUser);
        console.log("User added!");
        yield PrintUsers();
        process.exit();
    });
}
main();
//# sourceMappingURL=index.js.map