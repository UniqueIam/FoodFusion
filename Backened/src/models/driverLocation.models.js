import mongoose from "mongoose";

const driverLocationSchema = new mongoose.Schema({
    driverId:String,
    lattitude:Number,
    longitude:Number,
    updatedAt:{type:Date,default:Date.now}
});

export const DriverLocation = mongoose.model("DriverLocation",driverLocationSchema);