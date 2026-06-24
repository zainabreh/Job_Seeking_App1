import userModel from "../model/user.model.js";
import jobModel from "../model/job.model.js";
import { sendEmail } from "../middleware/sendEmail.js";

export const sendNewsLetters = async () => {
    console.log("Newsletter job started");

    const jobs = await jobModel
        .find({ jobNewEmail: false })
        .populate("category");

    for (const job of jobs) {
        try {
            if (!job.category) {
                console.log(`Skipping ${job.position}`);
                continue;
            }

            const filteredUser = await userModel.find({
                niches: {
                    $elemMatch: {
                        $regex: new RegExp(
                            job.category.categoryName,
                            "i"
                        ),
                    },
                },
            });

            for (const user of filteredUser) {
                const subject = `Hot Job Alert: ${job.position} in ${job.category.categoryName}`;

                const message = `
Hi ${user.firstname},

A new job matching your niche has been posted.

Position: ${job.position}
Company: ${job.company}
Location: ${job.location}
Salary: ${job.salary}

Best Regards,
NicheNest Team
`;

                await sendEmail({
                    email: user.email,
                    subject,
                    message,
                });
            }

            if (filteredUser.length > 0) {
                job.jobNewEmail = true;
                await job.save();
            }
        } catch (error) {
            console.error(error);
        }
    }

    console.log("Newsletter job completed");
};