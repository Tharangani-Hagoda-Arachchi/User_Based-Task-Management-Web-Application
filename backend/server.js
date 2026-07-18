import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.config.js";
import { authRoute } from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

//connect DB
connectDB();

app.get("/", (req, res) =>{
    res.status(200).json({
        message: "Task management backend API is running.",
    });
});

//auth route
app.use('/api',authRoute)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log (`server running on http://localhost:${PORT} `);
})
