import { Task } from "../models/task.model.js";

export const addTask = async (req, res, next) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;

        const task = new Task({
            title,
            description,
            status,
            priority,
            dueDate,
            owner: req.user._id
        });

        await task.save();

        res.status(201).json({
            message: "Task created successfully",

        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }
};
