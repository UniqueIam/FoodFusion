import { Order } from "../models/order.models.js";
import { User } from "../models/user.models.js";
import Stripe from "stripe";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_url = `http://localhost:5173`;

    try {
        const newOrder = new Order({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });

        await newOrder.save();
        await User.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "USD",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity // Correct the typo from qunatity to quantity
        }));

        line_items.push({
            price_data: {
                currency: "USD",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100
            },
            quantity: 1 // Correct the typo from qunatity to quantity
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        res.json({
            success: true,
            session_url: session.url
        });
    } catch (error) {
        console.error("Error placing order:", error); // Log the error
        res.status(500).json({
            success: false,
            message: "Error placing order",
            error: error.message // Include the error message for debugging
        });
    }
};

 const verifyOrder = async (req,res) => {
    const { orderId,success } = req.body
    try {
        if(success == "true"){
            await Order.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"})
        }
        else{
            await Order.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not Paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    } 
}

const userOrders = async (req,res) =>{
    try {
        const orders = await Order.find({userId:req.body.userId}); 
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        })
    }
}

//listing orders for admin panel
const listOrders = async(req,res) =>{
    try {
        const orders = await Order.find({});
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:true,message:"Error"});
    }

}

export { placeOrder,verifyOrder,userOrders,listOrders };
