import { FoodModel } from "../models/food.models.js";

//add items to user cart

const addToCart = async (req, res) => {

    // Add items to user cart
    const addToCart = async (req, res) => {
        try {
            const userId = req.body.userId;
            console.log(`Received userId: ${userId}`);
    
            // Check if userId is provided
            if (!userId) {
                return res.status(400).json({ success: false, message: "User ID is required" });
            }
    
            // Find user data by ID
            let userData = await FoodModel.findOne({ _id: userId });
            console.log(`User data: ${userData}`);
    
            // Ensure userData exists
            if (!userData) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
    
            // Ensure cartData is initialized
            let cartData = userData.cartData || {};
    
            // Add item to cart
            if (!cartData[req.body.itemId]) {
                cartData[req.body.itemId] = 1;
            } else {
                cartData[req.body.itemId] += 1;
            }
    
            // Update user cart data in the database
            await FoodModel.findByIdAndUpdate(userId, { cartData });
    
            // Send success response
            res.json({ success: true, message: "Added to cart" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Error adding to cart" });
        }
    }
}
//remove items from user cart

const removeFromCart = async (req, res) => {

}

//fetch user cart data

const getCart = async (req, res) => {

}

export { addToCart, removeFromCart, getCart }