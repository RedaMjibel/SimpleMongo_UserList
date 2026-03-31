import mongoose from "mongoose";
import readline from "readline";

/* This is a simple Node.js application using TypeScript and Mongoose to show the interaction 
between the application and the MongoDB database. */

type User = {
    id: number;
    name: string;
    age: number;
};

async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/testDB");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Connection error:", err);
  }
}

  const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const UserModel = mongoose.model("User", userSchema);

async function addUser(user: User): Promise<void> {
  await UserModel.create({
    name: user.name,
    age: user.age,
  });
}

async function PrintUsers(): Promise<void> {
  const users = await UserModel.find();

  console.log("Current Users:");
  users.forEach((user) => {
    console.log(`ID: ${user._id}, Name: ${user.name}, Age: ${user.age}`);
  });
}

function promptUser(): Promise<User> {
    return new Promise(async (resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        let name: string;
        do {
            name = await new Promise<string>((resolveName) => {
                rl.question("Enter user name: ", resolveName);
            });
            if (!name.trim()) {
                console.log("Name cannot be empty. Please enter a valid name.");
            }
        } while (!name.trim());

        let age: number;
        do {
            const ageInput = await new Promise<string>((resolveAge) => {
                rl.question("Enter user age: ", resolveAge);
            });
            age = parseInt(ageInput);
            if (isNaN(age) || age <= 0) {
                console.log("Invalid age input. Please enter a positive number.");
            }
        } while (isNaN(age) || age <= 0);

        rl.close();
        resolve({ id: 0, name, age });
    });
}

async function main() {
    await connectDB();
    const newUser = await promptUser();
    await addUser(newUser);
    console.log("User added!");
    await PrintUsers();
    process.exit();
}

main();
