import {Request,Response,NextFunction} from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

// Creating Extending Request Method.

interface authRequest extends Request{
    userId?:string;
}

async function authMiddleware(req:authRequest,res:Response,next:NextFunction){
    const my_secretkey:string = process.env.JWT_SECRET || "";
    const authHeader = req.headers["authorization"];

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        res.status(401).json({msg:"Headers Missing!"})
        return;
    }

    const token = authHeader?.split(' ')[1];
    try{
        const decoded = jwt.verify(token,my_secretkey) as JwtPayload;
        req.userId = decoded.userId;
     
        next();
    }catch(error){
        res.status(400).json({msg:"JWT ERROR",error});
    }

}