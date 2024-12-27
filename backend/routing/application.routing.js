import express from 'express'
import { createApplication, deleteApplication, getEmployerApplication, getRecuiterApplication, getSingleApplication, updateApplication, updateApplicationStatus,  } from '../controller/application.controller.js'
import { isAuthenticated, isAuthorized } from '../middleware/auth.middleware.js'

const router = express.Router()

router.route('/applications/employerAll').get(isAuthenticated,isAuthorized("user"),getEmployerApplication)

router.route('/applications/recuiterAll').get(isAuthenticated,isAuthorized("recuiter"),getRecuiterApplication)

router.route('/applications/:id').get(isAuthenticated,isAuthorized("user","recuiter"),getSingleApplication)

router.route('/application/create').post(isAuthenticated,isAuthorized("user"),createApplication)

router.route('/application/update/:id').put(isAuthenticated,isAuthorized("user"),updateApplication)

router.route('/application/update/:id/:status').put(isAuthenticated,isAuthorized("recuiter"),updateApplicationStatus)

router.route('/application/delete/:id').delete(isAuthenticated,isAuthorized("user",'admin'),deleteApplication)

export default router