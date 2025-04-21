import mongoose, { Mongoose } from "mongoose";


const documentSchema = new mongoose.Schema({
    userId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:false
    },

    documentName:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});


export const documentModel = mongoose.model('Document',documentSchema);