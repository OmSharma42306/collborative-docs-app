import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
const DATABASE_URL:string = process.env.MONGODB_URI || "";

if (!DATABASE_URL) {
    throw new Error("MONGODB_URI is not defined in environment variables.");
}


export function connectDB(){
    console.log(DATABASE_URL);
    mongoose.connect(DATABASE_URL).then(()=>{
        console.log("Database Connected!");
    })
}






