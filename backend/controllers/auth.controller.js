import bcrypt from "bcrypt"
import { User } from "../models/user.model.js";

//user registration 
export const userRegister = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        //check email already exiist or not
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({
                message: "Email is already registered"
            });
        }

        //hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });
        await user.save();

        res.status(201).json({
            message: "registered successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }
};

//user login
export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        //chechk email or password empty
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and Password are required"
            });

        }

        //check user exiist or not
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        //match password
        const isMatchPassword = await bcrypt.compare(password, existingUser.password);
        if (!isMatchPassword) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        res.status(200).json({
            message: "Login successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }
};