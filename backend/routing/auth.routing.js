import express from "express"
import { login, logout, signup } from "../controller/auth.controller.js"

const router = express.Router()

router.route("/auth/signup").post(signup)
router.route("/auth/login").post(login)
router.route("/auth/logout").get(logout)

export default router