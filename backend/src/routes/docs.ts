import express from "express";
import { Request,Response } from "express";
import { createDocument } from "../zodvalidation";
import { documentModel } from "../models/documentModel"; 

const router = express.Router();

interface authRequest extends Request{
    userId?:string;
}



router.post("/create-doc",async(req:authRequest,res:Response)=>{
    const documentName = req.body.documentName;
    const content = req.body.content || "";
    const {success} = createDocument.safeParse(documentName);
    const userId = req.userId;
    if(!success){
        res.json({msg:"Invalid Format!"});
        return;
    }
    try{
        const createDocument = await documentModel.create({documentName:documentName,content:content,userId:userId});
        await createDocument.save();
        res.json({msg:"Document Created Successfully!"});
        
    }catch(error){
        res.json({error})
    }
    return;
})

router.post("/delete-doc",async(req:authRequest,res:Response)=>{
    const documentName = req.body.documentName;
    const userId = req.body.userId;
    const {success} = createDocument.safeParse(documentName);
    if(!success){
        res.json({msg:"Invalid Document Format!"});
        return;
    }
    try{
        const findDocument = await documentModel.findOneAndDelete({documentName:documentName,userId:userId});
        if(!findDocument){
            res.json({msg:"Document not Exists!"});
            return;
        }
        res.json({msg:"Document Deleted Successfully!"});
        
        

    }catch(error){
        res.json({error});
        
    }
    return;
})

router.get("/get-all-docs",async(req:authRequest,res:Response)=>{
    const userId = req.params.userId;
    try{
        const allDocs = await documentModel.find({userId:userId}).populate('userId');
        console.log("all docs",allDocs);
        res.json({allDocs:allDocs});
        
    }catch(error){
        res.json({error});
    }
    return;
})




export default router;