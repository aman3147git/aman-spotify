import express from "express";
import dotenv from 'dotenv';
import db from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoute from './routes/userRoute.js';
import adminRoute from "./routes/adminRoute.js";
import albumRoute from "./routes/albumRoute.js";
import songRoute from "./routes/songRoute.js";
import statRoute from "./routes/statRoute.js";
import cors from "cors";

import fileUpload from "express-fileupload";
import path from "path";

dotenv.config();

const __dirname=path.resolve();

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(fileUpload({
   useTempFiles:true,
   tempFileDir:path.join(__dirname,"tmp"),
   createParentPath:true,
   limits:{
    fileSize:15*1024*1024
   }
}));

db();
const corsopt={
    origin:process.env.FRONTEND_URL,
    credentials:true
}
app.use(cors(corsopt));

app.use('/api/user',userRoute);
app.use('/api/admin',adminRoute);
app.use('/api/album',albumRoute);
app.use('/api/song',songRoute);
app.use('/api/stat',statRoute);

app.listen(process.env.PORT,()=>{
    console.log("server started on port(:8080");
})
