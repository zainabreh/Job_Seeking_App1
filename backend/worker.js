import mongoose from "mongoose";
import dotenv from "dotenv";
import { sendNewsLetters } from "./cron/newsLetterCron.js";

dotenv.config();

try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("DB Connected");

    await sendNewsLetters();

    console.log("Finished");

    process.exit(0);
} catch (error) {
    console.error(error);
    process.exit(1);
}