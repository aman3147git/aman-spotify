import mongoose from 'mongoose';
const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        
    }
},{timestamps:true});
export const User=mongoose.model("User",userSchema);