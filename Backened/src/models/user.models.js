import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {  // Corrected the field name
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: Object,
        default: {}
    },
}, { minimize: false });

export const User = mongoose.models.User || mongoose.model("User", userSchema);
