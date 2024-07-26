import { Order } from "../models/order.models.js";
import { User } from "../models/user.models.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SCERET_KEY);

const placeOrder = async(req,res) =>{

    const frontened_url = `http://localhost:5173`;
    try {
        const newOrder = new Order({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })

        await newOrder.save();
        await User.findByIdAndUpdate(req.body.userId,{cartData:{}});

        //logic behind payment
        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"USD",
                product_data:{
                    name:item.name,
                },
                unit_amount:item.price*100
            },
            qunatity:item.qunatity
        }))

        line_items.push({
            price_data:{
                currency:"USD",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100
            },
            qunatity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontened_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontened_url}/verify?success=false&orderId=${newOrder._id}`
        })
        res.json({
            success:true,
            session_url:session.url
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        })
    }
}

export {placeOrder}