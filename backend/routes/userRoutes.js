import express from 'express'
import { createUser, loginUser, logoutCurrentUser } from '../controllers/userController.js';
import asyncHandler from '../middlewares/asyncHandler.js';
const router = express.Router()


router.route("/").post(createUser);
router.post('/auth', loginUser)
router.post('/logout', logoutCurrentUser)


export default router;