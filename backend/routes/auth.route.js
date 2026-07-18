import express from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { userRegisterValidateSchema } from "../validators/user.validator.js";
import { userRegister } from "../controllers/auth.controller.js";

export const authRoute = express.Router();

//user registration route
authRoute.post('/auth/register', validate(userRegisterValidateSchema), userRegister)