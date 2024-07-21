import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const createConnection = async() =>{
     try {
           const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
           console.log(`MongoDB connected Successfully:`);
     } catch (error) {
        console.log("MongoDB Connection Failed");
     }
};

export default createConnection;


// 829065
// abhi