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
            dueDate:1
        });

        const priorityOrder ={
            high: 1,
            medium: 2,
            low: 3,
        }

        //sort tasks by piority first and then due date
        tasks.sort((a,b) =>{
            if(priorityOrder[a.priority] !== priorityOrder[b.priority]){
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

