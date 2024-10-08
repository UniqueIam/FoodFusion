import { User } from "../models/user.models.js";


const addToCart = async(req,res) =>{
    try {
        let userData = await User.findOne({_id:req.body.userId});
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await User.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added to cart successfully"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error in adding the item to cart"});
    }
}

//remove items from user cart
const removeFromCart = async (req, res) => {
   try {
     let userData = await User.findById({_id:req.body.userId});
     let cartData = await userData.cartData;
     if(cartData[req.body.itemId]>0){
         cartData[req.body.itemId] -=1;
     }
     await User.findByIdAndUpdate(req.body.userId,{cartData});
     res.json({success:true,message:"Removed from cart"});
   } catch (error) {
    console.log(error);;
    res.json({success:false,message:"Error"});
   }
    
}

//fetch user cart data
const getCart = async (req, res) => {
   try {
     let userData = await User.findById(req.body.userId);
     let cartData = await userData.cartData;
     res.json({success:true,cartData})
   } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
   }
}

export { addToCart, removeFromCart, getCart }