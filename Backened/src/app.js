import express from "express";
import cors from "cors";
import foodRouter from "./routes/food.route.js";
import path from 'path';
import dotenv from 'dotenv';
import userRouter from "./routes/user.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

const __dirname = path.resolve();

//api endpoints
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use("/api/food", foodRouter);
app.use("/api/user",userRouter);

export { app };
