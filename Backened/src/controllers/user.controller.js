import { User } from "../models/user.models.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/email.js";

const createToken = (user) => {
    const payload = { id: user._id };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: '1h' };
    return jwt.sign(payload, secret, options);
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check for empty fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email"
            });
        }

        // Validate password length
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long"
            });
        }

        // Check if user already exists
        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user);

        //sending email to the user
        sendEmail(user.email,"Welcom To FoodFusion",`Hi ${user.name},\n\nThank you for registering to our platform.`)
        res.status(201).json({ success: true, token });
    } catch (error) {
        console.error("Error in registerUser:", error.message, error.stack);
        res.status(500).json({
            success: false,
            message: "Error occurred while registering user",
            error: error.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exist"
            });
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const token = createToken(user); // Pass the entire user object
        res.json({ success: true, token });

    } catch (error) {
        console.error("Error in loginUser:", error.message, error.stack);
        res.status(500).json({
            success: false,
            message: "Error occurred while logging in",
            error: error.message
        });
    }
};

export { registerUser, loginUser };
