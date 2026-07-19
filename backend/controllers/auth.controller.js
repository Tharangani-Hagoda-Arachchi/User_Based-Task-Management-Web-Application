import bcrypt from "bcrypt"
import { User } from "../models/user.model.js";
import dotenv from "dotenv";
import { createAccessToken, createRefreshToken } from "../utils/token.util.js";

dotenv.config()
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const cookieOptions = {
    httpOnly: true,
    sameSite: "strict",
    path: '/'
}

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

        //create tokens
        const paylod = { id: user._id };
        const accessToken = createAccessToken(paylod, ACCESS_TOKEN_SECRET, '15m');
        const refreshToken = createRefreshToken(paylod, REFRESH_TOKEN_SECRET, '7d');

        //save refresh token
        user.refreshToken.push(refreshToken);
        await user.save();

        //send refresh token as cookies
        res.cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

        res.status(201).json({
            message: "registered successfully",
            accessToken,
            refreshToken
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

        //create tokens
        const paylod = { id: existingUser._id };
        const accessToken = createAccessToken(paylod, ACCESS_TOKEN_SECRET, '15m');
        const refreshToken = createRefreshToken(paylod, REFRESH_TOKEN_SECRET, '7d');

        //save refresh token
        existingUser.refreshToken.push(refreshToken);
        await existingUser.save();

        //send refresh token as cookies
        res.cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

        res.status(200).json({
            message: "Login successfully",
            accessToken,
            refreshToken
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }
};

//get loged user
export const getUserProfile = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User detail fetch successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }
};