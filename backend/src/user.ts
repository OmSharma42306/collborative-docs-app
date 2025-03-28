import express from "express";
import {Request,Response} from "express"
import { signinInput,signupInput } from "./zodvalidation"; 
import { userModel } from "./models/userModel";
import jwt from "jsonwebtoken";
const app = express();
const PORT = 4000;


// User Related Stuff..

app.post("/signup",async(req:Request,res:Response)=>{
    // validation through zod
    const {success} = signupInput.safeParse(req.body);
    if(!success){
        res.json({msg:"Invalid Inputs!"});
        return;
    }

    const name:string = req.body.name;
    const email:string = req.body.email;
    const password:string = req.body.password;

    try{
        // todo do a database call and put the credentials.
        const checkExisting = await userModel.findOne({email:email});
        if(checkExisting){
            res.json({msg:"User Already Exists!"});
            return;
        }

        const newUser = new userModel({
            name:name,
            email:email,
            password:password
        })

        await newUser.save();

        res.status(200).json({msg:"Signup Done Successfully!"});
        return;


    }catch(error){
        res.json({msg:error})
        return;
    }



})

app.post('/login',async (req:Request,res:Response)=>{

const {success} = signinInput.safeParse(req.body);
if(!success){
    res.json({msg:"Invalid Inputs!"});
    return;
}
const email:string = req.body.email;
const password:string = req.body.password;

try{
    const checkUserExists = await userModel.findOne({email:email});
    if(!checkUserExists){
        res.json({msg:"User not exists, first create signup!"});
        return;
    }

    if(password !== checkUserExists?.password){
        res.json({msg:"Invalid Credentials!"})
        return;
    }


    const userId = checkUserExists?._id;

    const token = jwt.sign({userId},"my_secretkey");
    
    res.status(200).json({msg:"Login Successful!,token:",token});
    return;

}catch(error){
    res.json({msg:error});
    return;
}

})




app.listen(4000,()=>{
    console.log(`Server Started! at PORT : ${PORT}`)
})