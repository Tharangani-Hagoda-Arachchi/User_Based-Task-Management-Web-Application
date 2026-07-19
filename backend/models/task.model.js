import mongoose from "mongoose";

//create task schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,

    },
    description: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        require: true,
        enum: ["pending", "completed"],
        default: "pending",
    },
    priority: {
        type: String,
        require: true,
        enum: ["low", "medium", "high"],
        default: "low",
    },
    dueDate: {
        type: Date,
        require: true,
    },
    owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
},

}, {
    timestamps: true,
}

);

export const Task = mongoose.model("Task", taskSchema);