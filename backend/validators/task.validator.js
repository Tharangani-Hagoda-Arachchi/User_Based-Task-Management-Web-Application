import Joi from "joi";

//add task validation schema
export const addTaskValidateSchema = Joi.object(
    {
        title: Joi.string().min(3).max(100).required()
            .messages({
                "string.empty": "Title is required",
                "string.min": "Title must be at least 3 characters",
                "string.max": "Title must be not exede 100 characters",
                "any.required": "Name is required"
            }),

        description: Joi.string().max(500).required()
            .messages({
                "string.empty": "description is required",
                "string.max": "descriptin must be not exede 500 characters",
                "any.required": "description is required"
            }),

        status: Joi.string().valid("pending", "completed").default("pending").required()
            .messages({
                "any.only": "Status must be either pending or completed",
                "any.required": "Status is required"
            }),

        priority: Joi.string().valid("low", "medium", "high").default("low").required()
            .messages({
                "any.only": "priority must be either low, medium or high",
                "any.required": "priority is required"
            }),

        dueDate: Joi.date().required()
            .messages({
                "date.base": "due date must be valid date",
                "any.required": "due date is required"
            }),
    }

);