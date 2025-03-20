import { User } from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const Register=async(req,res)=>{
    const {fullname,email,password}=req.body;
    try{
    if(!fullname|| !email|| !password){
        return res.status(401).json({
            message:"invalid data",
            success:false
        })
    }
    const user=await User.findOne({email});
    if(user){
        return res.status(401).json({
            message:"Email is already taken",
            success:false
        })
    }
    const hashedpass=bcryptjs.hashSync(password,10);
    await User.create({
        fullname,email,
        password:hashedpass
    });
    return res.status(200).json({
        message:"Account created",
        success:true
    })
}catch(error){
    return res.status(500).json({ error: "Internal server error" });
}

}

export const Login=async(req,res)=>{
    const {email,password}=req.body;
    try{
    if(!email|| !password){
        return res.status(401).json({
            message:"invalid data",
            success:false
        })
    }
    const user=await User.findOne({email});
    if(!user){
        return res.status(401).json({
            message:"Never loggedin before",
            success:false
        })
    }
    const isMatch=bcryptjs.compare(password,user.password);
    if(!isMatch){
        return res.status(401).json({
            message:"Incorrect password",
            success:false
        }) 
    }
    const token=jwt.sign({id:user._id,email:user.email},process.env.SECRET_KEY);

    return res.status(200).cookie("token",token,{httpOnly:true}).json({
        message:`Welcome back ${user.fullname}`,
        user,
        success:true
    })
}catch(error){
    return res.status(500).json({ error: "Internal server error" });
}
}

export const Logout=(req,res)=>{
    return res.status(200).clearCookie("token").json({
        message:"User logged out successfully",
        success:true
    })
}



export const Google=async(req,res)=>{
    
    try{
        

        
    const user=await User.findOne({email:req.body.email});
    if(user){
        const token=jwt.sign({id:user._id},process.env.SECRET_KEY);
        const {password: pass, ...rest}=user._doc;
        return res.status(200).cookie("token",token,{httpOnly:true}).json(rest);
    }
    else{
        const generatedPass=Math.random().toString(36).slice(-6)+Math.random().toString(36).slice(-6);
        const hashpass=bcryptjs.hashSync(generatedPass,10);
        const newuser=await User.create({fullname:req.body.name,email:req.body.email,password:hashpass,avatar:req.body.photo});
        const token=jwt.sign({id:newuser._id},process.env.SECRET_KEY);
        const {password: pass, ...rest}=newuser._doc;
        return res.status(200).cookie("token",token,{httpOnly:true}).json(rest);
    }
}catch(error){
    

        
    return res.status(500).json({ error: "Internal server error" });
    
}
}