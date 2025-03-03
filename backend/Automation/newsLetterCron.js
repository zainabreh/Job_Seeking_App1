import cron from "node-cron"

import userModel from "../model/user.model.js"
import jobModel from "../model/job.model.js"
import { sendEmail } from "../middleware/sendEmail.js"

// it will execute no matter what even if the server is down
// seperation of concern 
// compare to setTime interval
export const newsLetterCron = ()=>{
    cron.schedule(" */1 * * * * ",async ()=>{
        console.log("NewsLetterCron.........");
        
    const jobs = await jobModel.find({jobNewEmail:false})   

    console.log("jobs,,,,,,,,,,,,,,,,",jobs);
    
    
    for (const job of jobs){
        try {
            const filteredUser = await userModel.find({
                niches: job.category.toString()
            });

            console.log("filtered users,,,,,,,,,,,,,,",filteredUser);
            

            for (const user of filteredUser){
                const subject =  `Hot Job Alert: ${job.position} in ${job.category} Available Now`
                const message = `Hi ${user.firstname},\n\nGreat news! A new job that fits your niche has just been posted. The position is for a ${job.position} with ${job.company}, and they are looking to hire immediately.\n\nJob Details:\n- **Position:** ${job.position}\n- **Company:** ${job.company}\n- **Location:** ${job.location}\n- **Salary:** ${job.salary}\n\nDon’t wait too long! Job openings like these are filled quickly. \n\nWe’re here to support you in your job search. Best of luck!\n\nBest Regards,\nNicheNest Team`

                sendEmail({
                    email:user.email,
                    subject,
                    message
                })
            }
            job.jobNewEmail = true
            await job.save()
        } catch (error) {
            console.log("ERROR IN NODE CRON CATCH BLOCK.....");
            return next(new Error("some error in cron..."))
        }
    }
    })
}

