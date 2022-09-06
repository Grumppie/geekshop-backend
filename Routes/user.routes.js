import express from "express"
import { authUser, getUserProfile, registerUser, updataUserProfile } from "../Controllers/user.controller.js"
import { protect } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updataUserProfile)
router.route('/').post(registerUser)

export default router