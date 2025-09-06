import { Request , Response} from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req: Request, res:Response)=>{
   try{
      const {name,email,password} =req.body;
      if(!name || !email || !password)
      {
         return res.status(400).json({msg:"name,email and password are required"});
      }
      const existingUser =await User.findOne({email});
      if(existingUser){
         return res.status(400).json({msg:"User already exist"});
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword= await bcrypt.hash(password,salt);

     const user = new User({name,email,password:hashedPassword});
     await user.save();

     const token = jwt.sign({ id: user._id },process.env.JWT_SECRET as string,{ expiresIn: "1h" });     
     return res.status(201).json({
       msg:"User registered successfully",
       token,
       user:{
         id:user._id,
         name:user.name,
         email:user.email,
       }
     });
   }
   catch(error:any){
      return res.status(500).json({msg:"Internal server error",error:error.message})
   }
}


export const login = async (req:Request,res:Response)=>{
   try{
      const {email,password} = req.body;
      if(!email || !password){
         return res.status(400).json({msg:"email and password are required"});
      }
      const user = await User.findOne({email});
      if(!user){
         return res.status(400).json({msg:"User not found"});
      }
      const isMatch = await bcrypt.compare(password,user.password);
      if(!isMatch){
         return res.status(400).json({msg:"Invalid password"});
      }
      const token =jwt.sign({id:user._id},process.env.JWT_SECRET as string , {expiresIn:"7h"});
      return res.status(200).json({
         msg:"User Logged in successfully",
         token,
         user:{
            id:user._id,
            name:user.name,
            email:user.email,
         },
      })
 

   }
   catch(error:any){
      return res.status(500).json({msg:"Internal error",error:error.message});
   }
}