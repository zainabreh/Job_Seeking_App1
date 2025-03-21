import express from "express"
import { createNewUser, deleteUser, getAllUsers, getProfile, getSingleUser, updateUser, updateUserRole } from "../controller/user.controller.js"
import { isAuthenticated, isAuthorized } from "../middleware/auth.middleware.js"

const router = express.Router()

// router.route("/user/all").get(isAuthenticated,isAuthorized('admin','user'),getAllUsers)
router.route("/user/all").get(isAuthenticated,isAuthorized("admin"),getAllUsers)
router.route("/user/singleuser/:id").get(getSingleUser)
router.route("/getUserProfile").get(isAuthenticated,getProfile)
router.route("/user/createuser").post(isAuthenticated,isAuthorized("admin"),createNewUser)
router.route("/user/updateuser/:id").put(isAuthenticated,updateUser)
router.route("/user/deleteUser").delete(isAuthenticated,isAuthorized("admin"),deleteUser)
router.route("/user/updateUserRole/:id/:role").put(isAuthenticated,isAuthorized("admin"),updateUserRole)

export default router