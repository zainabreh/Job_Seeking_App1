import express from 'express'
import 'dotenv/config'
import { connectDB } from './config/connectdb.js'
import userRouter from "./routing/user.routing.js"
import authRouter from "./routing/auth.routing.js"
import jobRouter from "./routing/job.routing.js"
import categoryRouter from "./routing/category.routing.js"
import applicationRouter from "./routing/application.routing.js"
import { errorHandler } from './middleware/error.middleware.js'
// import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from "cors"
import { v2 as cloudinary } from 'cloudinary';

const corsOptions = {
    origin: "http://localhost:5173",
    credentials:true
}
const app = express()

connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Listning on port ${process.env.PORT}`);
        
    })
}).catch((err)=>{
    console.log("DB connection failed in script file", err);
    
})



app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors(corsOptions))


 // Configuration
 cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY 
});


// app.use(bodyParser.json())
app.use(cookieParser())





app.use("/",userRouter)
app.use("/",authRouter)
app.use("/",jobRouter)
app.use("/",applicationRouter)
app.use("/",categoryRouter)


app.use(errorHandler)

