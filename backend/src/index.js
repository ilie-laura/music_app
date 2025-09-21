import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import {clerkMiddleware} from '@clerk/express'
import userRoutes from './routes/userRoute.js';
import adminRoutes from './routes/adminRoute.js';
import authRoutes from './routes/authRoute.js';
import songRoutes from './routes/songRoute.js';
import albumRoutes from './routes/albumRoute.js';
import statRoutes from './routes/statRoute.js';
import  connectDB from './lib/db.js';
import fileUpload from 'express-fileupload';
dotenv.config();

const PORT=process.env.PORT||5000;
const app=express();
const __dirname=path.resolve();

app.use(express.json());//for req.body
app.use(clerkMiddleware());//for clerk auth

app.use(fileUpload(
    {
        useTempFiles:true,
        tempFileDir:path.join(__dirname,"/tmp"),
        createParentPath:true,
        limits:{fileSize:10*1024*1024},
    }
));

app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/songs",songRoutes);
app.use("/api/albums",albumRoutes);
app.use("/api/stats",statRoutes);

app.use((err,req,res,next)=>{

    console.log("Error occurred:", err);
    res.status(500).json({ message: NODE_ENV === 'production' ? 'Server Error' : err.message });
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})