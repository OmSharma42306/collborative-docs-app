import express from "express";
import { Request,Response } from "express";
import { createDocument } from "../zodvalidation";
import { JwtPayload } from "jsonwebtoken";
const router = express.Router();

interface authRequest extends Request{
    userId?:string;
}



router.post("/create-doc",async(req:authRequest,res:Response)=>{
    const documentName = req.body.documentName;
    const {success} = createDocument.safeParse(documentName);
    const userId = req.userId;
    if(!success){
        res.json({msg:"Invalid Format!"});
        return;
    }
    try{
        
    }catch(error){

    }
    return;
})

router.post("/delete-doc",async(req:Request,res:Response)=>{
    try{

    }catch(error){

    }
    return;
})

router.get("/get-all-docs",async(req:Request,res:Response)=>{
    try{

    }catch(error){

    }
    return;
})




export default router;