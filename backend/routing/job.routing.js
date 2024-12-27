import express from 'express'
import { createJob, deleteJob, getAlljobs, getjobByid, getMyJobs, updateJob } from '../controller/job.controller.js'
import { isAuthenticated, isAuthorized } from '../middleware/auth.middleware.js'

const router = express.Router()
router.route("/job/all").get(getAlljobs)
router.route("/job/singleJob/:id").get(getjobByid)
router.route("/job/newJob").post(isAuthenticated,isAuthorized("recuiter"),createJob)
router.route("/job/updateJob/:id").put(isAuthenticated,isAuthorized("admin","recuiter"),updateJob)
router.route("/job/deleteJob/:id").delete(isAuthenticated,isAuthorized("admin","recuiter"),deleteJob)
router.route("/job/getmyJobs").get(isAuthenticated,isAuthorized("recuiter"),getMyJobs)


export default router