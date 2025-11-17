import mongoose from "mongoose";
import dotenv from "dotenv";
import { newsLetterCron } from "./cron/newsLetterCron.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("WORKER CONNECTED TO DB");
    newsLetterCron(); // Start cron job
})
.catch(err => console.log("WORKER DB ERROR", err));
