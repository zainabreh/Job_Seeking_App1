import cron from "node-cron"

import userModel from "../model/user.model.js"
import jobModel from "../model/user.model.js"

// it will execute no matter what even if the server is down
// seperation of concern 
// compare to setTime interval
export const newsLetterCron = ()=>{
    cron.schedule(" */1 * * * * ",async ()=>{
        console.log("News letter cron is running.........");
        
    })
}

