import express from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { addTaskValidateSchema } from "../validators/task.validator.js";
import { protect } from "../middlewares/auth.middleware.js";
import { addTask } from "../controllers/task.controller.js";

export const taskRoute = express.Router();

//create new task
taskRoute.post('/tasks', validate(addTaskValidateSchema),protect, addTask);
