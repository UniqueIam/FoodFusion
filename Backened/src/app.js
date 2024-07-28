import express from "express";
import cors from "cors";
import foodRouter from "./routes/food.route.js";
import path from 'path';
import dotenv from 'dotenv';
import userRouter from "./routes/user.route.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";

dotenv.config();

const app = express();

app.use(express.json());
const allowedOrigins = process.env.CORS_ORIGIN.split(',');

const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };
  
  app.use(cors(corsOptions));

const __dirname = path.resolve();

//api endpoints
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use("/api/food", foodRouter);
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

export { app };
