import mongoose, { Mongoose } from "mongoose";



const documentSchema = new mongoose.Schema({
    documentName:{
        type:String,
        required:true
    }
});


export const documentModel = mongoose.model('Document',documentSchema);