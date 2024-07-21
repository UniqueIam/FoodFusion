import { FoodModel } from "../models/food.models.js";
import fs from 'fs';

const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const food = new FoodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.status(201).json({
            success: true,
            message: "Food added successfully"
        });
    } catch (error) {
        console.error("Error adding food:", error);
        res.status(500).json({
            success: false,
            message: "Error adding food",
            error: error.message
        });
    }
};

const foodList = async (req, res) => {
    try {
        const foods = await FoodModel.find({});
        res.json({
            success: true,
            data: foods
        });
    } catch (error) {
        console.error("Error fetching food list:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching food list",
            error: error.message
        });
    }
};

const removeFood = async (req, res) => {
    try {
        const food = await FoodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food not found"
            });
        }

        fs.unlinkSync(`uploads/${food.image}`);

        await FoodModel.findByIdAndDelete(req.body.id);
        res.json({
            success: true,
            message: "Food removed successfully"
        });
    } catch (error) {
        console.error("Error removing food:", error);
        res.status(500).json({
            success: false,
            message: "Error removing food",
            error: error.message
        });
    }
};

export { addFood,foodList,removeFood }