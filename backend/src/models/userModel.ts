import mongoose from "mongoose";
import { connectDB } from "./db";


connectDB();

const userSchema = new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   }
});


export const userModel = mongoose.model('Users',userSchema);

