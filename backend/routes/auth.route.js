import express from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { userRegisterValidateSchema } from "../validators/user.validator.js";
import { getUserProfile, userLogin, userRegister } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

export const authRoute = express.Router();

//user registration route
authRoute.post('/auth/register', validate(userRegisterValidateSchema), userRegister);

//user login route
authRoute.post('/auth/login', userLogin);

//get loged user
authRoute.get('/auth/me', protect, getUserProfile);