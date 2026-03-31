import mongoose from "mongoose";
import readline from "readline";

/* This is a simple Node.js application using TypeScript and Mongoose to show the interaction 
between the application and the MongoDB database. */

type User = {
    id: number;
    name: string;
    age: number;
    status: string;
};
let option: string = "";

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
  status: String
});

const UserModel = mongoose.model("User", userSchema);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function addUser(): Promise<void> {
  let name: string = "";

  do {
    name = await question("Enter user name: ");
    if (!name.trim()) {
      console.log("Name cannot be empty.");
    }
  } while (!name.trim());

  let age: number = 0;

  do {
    const ageInput = await question("Enter user age: ");
    age = parseInt(ageInput);

    if (isNaN(age) || age <= 0) {
      console.log("Invalid age. Enter a positive number.");
    }
  } while (isNaN(age) || age <= 0);

  let status: string;
  if (age <= 25) status = "young";
  else if (age <= 60) status = "old";
  else status = "senior";

  await UserModel.create({
    name,
    age,
    status,
  });

  console.log("User created successfully!");
}

async function deleteUser(): Promise<void> {
  let userId: string = "";

  do {
    userId = await question("Enter user ID to delete: ");
    if (!userId.trim()) {
      console.log("User ID cannot be empty.");
    }
  } while (!userId.trim());

  await UserModel.findByIdAndDelete(userId);

  console.log("User deleted successfully!");
}

async function promptUser(): Promise<void> {
  let option = "";

  do {
    option = await question("1 to create user, 2 to delete user: ");

    if (option !== "1" && option !== "2") {
      console.log("Wrong option. Please enter 1 or 2.");
    }
  } while (option !== "1" && option !== "2");

  if (option === "1") {
    await addUser();
  } else {
    await deleteUser();
  }
}

async function PrintUsers(): Promise<void> {
  try {
    const users = await UserModel.find();

    console.log("Current Users:");

    users.forEach((user) => {
      console.log(
        `ID: ${user._id}, Name: ${user.name}, Age: ${user.age}, Status: ${user.status}`
      );
    });
  } catch (err) {
    console.error("Error fetching users:", err);
  }
}

async function main() {
  await connectDB();

  while (true) {
    await promptUser();
    await PrintUsers();

    const input = await question("Press ENTER to continue or type 'exit': ");

    if (input.toLowerCase() === "exit") break;
  }

  await mongoose.connection.close();
  rl.close();
  process.exit(0);
}

main();