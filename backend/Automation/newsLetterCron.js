import cron from "node-cron"
import mongoose from "mongoose"
import userModel from "../model/user.model.js"
import jobModel from "../model/job.model.js"
import { sendEmail } from "../middleware/sendEmail.js"

// it will execute no matter what even if the server is down
// seperation of concern 
// compare to setTime interval
export const newsLetterCron = ()=>{
    cron.schedule(" */1 * * * * ",async ()=>{
        console.log("NewsLetterCron.........");
        
    const jobs = await jobModel.find({jobNewEmail:false}).populate("category");   


    for (const job of jobs){
        try {
            if (!job.category) {
                console.log(`Skipping job ${job.position}, category not found.`);
                continue;
            }
            const filteredUser = await userModel.find({
                niches:  { $elemMatch: { $regex: new RegExp(job.category.categoryName, "i") } }
            });


            
            for (const user of filteredUser){
                const subject =  `Hot Job Alert: ${job.position} in ${job.category.categoryName} Available Now`
                const message = `Hi ${user.firstname},\n\nGreat news! A new job that fits your niche has just been posted. The position is for a ${job.position} with ${job.company}, and they are looking to hire immediately.\n\nJob Details:\n- **Position:** ${job.position}\n- **Company:** ${job.company}\n- **Location:** ${job.location}\n- **Salary:** ${job.salary}\n\nDon’t wait too long! Job openings like these are filled quickly. \n\nWe’re here to support you in your job search. Best of luck!\n\nBest Regards,\nNicheNest Team`
                
                await sendEmail({
                    email:user.email,
                    subject,
                    message
                })
            }

            if(filteredUser.length > 0){

                job.jobNewEmail = true
                await job.save()
            }
        } catch (error) {
            console.log("ERROR IN NODE CRON CATCH BLOCK.....",error);
           
        }
    }
    })
}

