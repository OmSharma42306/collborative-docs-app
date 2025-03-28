import mongoose from "mongoose";

const DATABASE_URL:string = process.env.MONGODB_URI || "";

export function connectDB(){
    mongoose.connect(DATABASE_URL).then(()=>{
        console.log("Database Connected!");
    })
}






