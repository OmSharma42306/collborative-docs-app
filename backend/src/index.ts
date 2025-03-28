import express from "express";
import { initWs } from "./ws";

const app = express();
const PORT = 4000;


// User Related Stuff..

initWs();




app.listen(4000,()=>{
    console.log(`Server Started! at PORT : ${PORT}`)
})
