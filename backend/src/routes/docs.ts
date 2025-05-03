import express from "express";
import { Request,Response } from "express";
import { createDocument, deleteDocument } from "../zodvalidation";
import { documentModel } from "../models/documentModel"; 
import authMiddleware from "../middlewares/middleware";
const router = express.Router();

interface authRequest extends Request{
    userId?:string;
}

router.post("/create-doc",authMiddleware,async(req:authRequest,res:Response)=>{
    const documentName = req.body.documentName;
    const content = req.body.content || "";

    const {success} = createDocument.safeParse({documentName,content});
    const userId = req.userId;
    if(!success){
        res.status(400).json({msg:"Invalid Format!"});
        return;
    }
    try{
        const createDocument = await documentModel.create({documentName:documentName,content:content,userId:userId});
        await createDocument.save();
        res.status(200).json({msg:"Document Created Successfully!"});
        
    }catch(error){
        res.status(400).json({error})
    }
    return;
})

router.post("/delete-doc",authMiddleware,async(req:authRequest,res:Response)=>{
    const documentName = req.body.documentName;
    const userId = req.userId;
    const {success} = deleteDocument.safeParse({documentName});

    if(!success){
        res.status(400).json({msg:"Invalid Document Format!"});
        return;
    }
    try{
        const findDocument = await documentModel.findOneAndDelete({documentName:documentName,userId:userId});
        if(!findDocument){
            res.status(404).json({msg:"Document not Exists!"});
            return;
        }
        res.status(200).json({msg:"Document Deleted Successfully!"});
        
        

    }catch(error){
        res.status(400).json({error});
        
    }
    return;
})

router.get("/get-all-docs",authMiddleware,async(req:authRequest,res:Response)=>{
    const userId = req.userId;
    try{
        // It replaces the user ID with the full user object. Without it, user will just be the ObjectId.
        // If you don’t need the full user details and just want to filter by ID, you can skip .populate().
        const allDocs = await documentModel.find({userId:userId})
        res.status(200).json({allDocs:allDocs});
        
    }catch(error){
        res.status(400).json({error});
    }
    return;
})




export default router;