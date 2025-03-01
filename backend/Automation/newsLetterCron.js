import cron from "node-cron"

import userModel from "../model/user.model.js"
import jobModel from "../model/user.model.js"
import { sendEmail } from "../middleware/sendEmail.js"

// it will execute no matter what even if the server is down
// seperation of concern 
// compare to setTime interval
export const newsLetterCron = ()=>{
    cron.schedule(" */1 * * * * ",async ()=>{
    const jobs = await jobModel.find({jobNewEmail:false})   
    
    for (const job of jobs){
        try {
            const filteredUser = await userModel.find({
                $or:[{
                    "niches.firstNiche":job.jobNiches
                }]
            })

            for (const user of filteredUser){
                const subject = ''
                const message = ''

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

