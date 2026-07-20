import express from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { addTaskValidateSchema } from "../validators/task.validator.js";
import { protect } from "../middlewares/auth.middleware.js";
import { addTask, deleteTask, getAllTask, getSingleTask, updateTask, updateTaskStatus } from "../controllers/task.controller.js";

export const taskRoute = express.Router();

//create new task
taskRoute.post('/tasks', validate(addTaskValidateSchema),protect, addTask);

//get all  task
taskRoute.get('/tasks',protect, getAllTask);

//get single task
taskRoute.get('/tasks/:id',protect, getSingleTask);

//delete  task
taskRoute.delete('/tasks/:id',protect, deleteTask);

//update  task status
taskRoute.patch('/tasks/:id/status',protect, updateTaskStatus);

//update  task
taskRoute.put('/tasks/:id',protect, updateTask);
