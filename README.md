# Job Seeking Platform (MERN Stack)

A full-stack **Job Seeking Platform** built with the **MERN stack**, designed to connect job seekers and recruiters through role-based access, smart job matching, and automated email notifications.

The project focuses on **real-world backend engineering practices** including cron automation, email workflows, secure authentication, and scalable API architecture.

---

## Features

### Authentication & Authorization
- Secure login & registration using JWT and HTTP-only cookies
- Role-based access control (Job Seeker / Recruiter)
- Protected routes on both frontend and backend

### Job Management
- Recruiters can create, update, and manage job postings
- Jobs are categorized to enable niche-based matching
- Optimized MongoDB queries using population and filters

### Automated Job Alert Emails (Cron Jobs)
- Background cron job runs automatically on a schedule
- Detects newly posted jobs
- Matches jobs with users based on niche/category
- Sends personalized email alerts
- Ensures emails are sent only once per job using flags

### Email Automation
- SMTP-based email delivery using Nodemailer
- Centralized email utility
- Dynamic email subjects and content

### Job Applications
- Users can apply for jobs
- Update or delete applications
- Recruiters can update application status
- Optimistic UI updates using RTK Query cache updates

### Frontend State Management
- Redux Toolkit & RTK Query for API handling
- Automatic caching and invalidation
- Optimized re-fetching logic

---

## Tech Stack

**Frontend**
- React
- Redux Toolkit + RTK Query
- Material UI
- React Router

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- Node-Cron
- Nodemailer

**Other Tools**
- Cloudinary (media uploads)
- JWT & Cookies
- CORS & Environment-based configs

---

## Cron Job Automation (Reference)

The system runs a background cron task that:
- Finds newly created jobs
- Matches them against user niches
- Sends email alerts automatically

```js
cron.schedule("*/1 * * * *", async () => {
  const jobs = await Job.find({ jobNewEmail: false }).populate("category");

  for (const job of jobs) {
    const users = await User.find({
      niches: { $regex: job.category.categoryName, $options: "i" }
    });

    // send email logic here

    job.jobNewEmail = true;
    await job.save();
  }
});
```

---

## Email Service

```js
export const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD
    }
  });

  await transporter.sendMail({
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    text: message
  });
};
```

---

## API Architecture

- REST-based endpoints
- Modular routing structure
- Centralized error handling middleware
- Cookie-based authentication for secure sessions

### Example ofRTK Usage

```js
createApplication: builder.mutation({
  query: (data) => ({
    url: "/application/create",
    method: "POST",
    body: data
  })
});
```

---

## Learning Outcomes

- Designing scalable REST APIs
- Implementing cron-based background jobs
- Secure authentication & session handling
- Email automation with real production patterns
- Advanced Redux Toolkit & RTK Query usage
- Writing maintainable and modular backend code

---

### Author

**Zainab Rehman**
**MERN Stack Developer**
