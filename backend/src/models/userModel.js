import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    clerkID: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
