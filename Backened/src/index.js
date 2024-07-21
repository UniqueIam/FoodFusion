import dotenv from "dotenv";
import createConnection from "./db/db.js";
import { app } from './app.js';

dotenv.config({
    path:'./.env'
}) 

const port = process.env.PORT || 8000

createConnection()
.then(()=>{
    app.on("error",(error)=>{
        console.log("ERROR:",error);
        throw error
        })
    app.listen(port,()=>{
        console.log(`Server is Running at port: ${port}`);
    })
})
.catch(()=>{
    console.log("Mongo DB connection failed");
})
