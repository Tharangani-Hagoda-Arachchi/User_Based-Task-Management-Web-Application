import mongoose from "mongoose";

//create user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    }

}, {
    timestamps: true,
}

);

export const User = mongoose.model("User", userSchema);