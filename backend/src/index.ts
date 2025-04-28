import express from "express";
import { initWs } from "./ws";
import rootRouter from "./api/index"
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
const PORT = 3000;

// User Related Stuff..

initWs();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1",rootRouter)

app.listen(PORT,()=>{
    console.log(`Server Started! at PORT : ${PORT}`)
})
