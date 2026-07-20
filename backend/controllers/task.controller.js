import mongoose from "mongoose";
import { Task } from "../models/task.model.js";

//create new task
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

//create new task
export const getAllTask = async (req, res, next) => {
    try {
        const tasks = await Task.find({
            owner: req.user._id
        }).sort({
            dueDate: 1
        });

        const priorityOrder = {
            high: 1,
            medium: 2,
            low: 3,
        }

        //sort tasks by piority first and then due date
        tasks.sort((a, b) => {
            if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }
            return new Date(a.dueDate) - new Date(b.dueDate)
        });

        res.status(200).json({
            totalTasks: tasks.length,
            tasks

        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }
};

//delete task
export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;

        //check validation of object id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid task ID"
            });
        }

        //find task by id 
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        //check ownership
        if (task.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to delete this task"
            });
        }

        //delete task
        await Task.findByIdAndDelete(id)

        res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }
};

//update tast status
export const updateTaskStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["pending", "completed"].includes(status)) {
            return res.status(400).json({
                message: "Invalid status"
            });
        }

        //check validation of object id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid task ID"
            });
        }

        //find task by id 
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        //check ownership
        if (task.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to delete this task"
            });
        }

        //update status
        task.status = status;
        await task.save();

        res.status(200).json({
            message: "Task status updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }
};