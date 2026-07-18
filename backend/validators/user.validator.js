import Joi from "joi";

//user registration validation schema
export const userRegisterValidateSchema = Joi.object(
    {
        name: Joi.string().min(3).required()
        .messages({
                "string.empty": "Name is required",
                "string.min": "Name must be at least 3 characters",
                "any.required": "Name is required"
            }),

        email: Joi.string().email().required()
            .messages({
                "string.empty": "Email is required",
                "string.email": "Invalid email format",
                "any.required": "Email is required"
            }),
        password: Joi.string().min(6).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/).required()
            .messages({
                "string.empty": "Password is required",
                "string.min": "password must be at least 6 characters long",
                "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                "any.required": "Password is required"
            })
    }

);