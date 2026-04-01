import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    status: String,
});
export const UserModel = mongoose.model("User", userSchema);
//# sourceMappingURL=userModel.js.map