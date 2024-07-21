import { User } from "../models/user.models.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{ expiresIn: '1h' })
}

const registerUser = async(req,res) =>{
    //steps:-
    //check all the fields are field or not
    //check whether the user already exists or not :-email
    //validating the format of email and strong password
    //register the user

    const {name,email,password} = req.body;

 try {
        if(name === ""){
           return res.status(400).json({
                success:false,
                message:"User name is required"
            })
        }
        else if(email === ""){
         return  res.status(400).json({
                success:false,
                message:"Email is required"
            })
        }
        else if(password === ""){
           return res.status(400).json({
                success:false,
                message:"Password is required"
            })
        }
    
        const existedUser = await User.findOne({email})
        if(existedUser){
           return res.json({
                success:false,
                message:"User already exists"
            })
        }
    
        //validating format of email and strong password
        if(!validator.isEmail(email)){
            return res.json({
                success:false,
                message:"Please enter a valid email"
            })
        }
        if(password.length<8){
            return res.status(400).json({
                success:false,
                message:"Password must be at least 8 characters long"
            });
        }
        //before registering the account in the database encrypt the password
        const salt = await bcrypt.genSalt(10);
        if (typeof salt !== 'string') {
          throw new Error('Salt generation failed');
        }
    
        const hashedPassword = await bcrypt.hash(password, salt);
        if (typeof hashedPassword !== 'string') {
          throw new Error('Password hashing failed');
        }
    
        const newUser = await new User({
            name:name,
            email:email,
            password:hashedPassword
        })
    
        const user = await newUser.save()
        const token = createToken(user._id)
        res.status(201).json({success:true,token})
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:"Error occurred while registering user"})
  }
}

const loginUser = async(req,res) =>{
    //steps:-
    //check all the fields are filled or not
    //check the registered email and password
    //login the user
   try {
     const {email,password} = req.body;
 
     if(email === ""){
         return res.status(400).json({
             success:false,
             message:"Email is required"
         })
     }
     else if(password === ""){
         return res.status(400).json({
              success:false,
              message:"Password is required"
          })
      }
 
      if(!validator.isEmail(email)){
        return res.json({
            success:false,
            message:"Please enter a valid email"
        })
    }
        const user = await User.findOne({email})
 
        if(!user){
         return res.status(400).json({
             success:false,
             message:"User doesn't exist"
         })
        }
 
        const isPasswordMatched = await bcrypt.compare(password,user.password);
        if(!isPasswordMatched){
         return res.status(400).json({
             success:false,
             message:"Invalid Credentials"
         })
        }
        const token = createToken(user._id);
        res.json({success:true,token})
 
   } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error Occurred"})
   }
       
}

export { registerUser,loginUser }