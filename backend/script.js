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
import cookieParser from 'cookie-parser';
import cors from "cors"
import { v2 as cloudinary } from 'cloudinary';
import { newsLetterCron } from './Automation/newsLetterCron.js'

const app = express()

const corsOptions = {
    origin: process.env.FRONTEND_URL, 
    credentials: true, 
  };
  app.use(cors(corsOptions));
  
  newsLetterCron()
connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Listning on port ${process.env.PORT}`);
        
    })
})



app.use(express.json({limit: '5000mb'}));
app.use(express.urlencoded({limit: '5000mb'}));


 // Configuration
 cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY 
});


// app.use(bodyParser.json())
app.use(cookieParser());




app.use("/",userRouter)
app.use("/",authRouter)
app.use("/",jobRouter)
app.use("/",applicationRouter)
app.use("/",categoryRouter)


app.use(errorHandler)

