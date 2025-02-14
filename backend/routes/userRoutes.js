import express from 'express' 
import upload from '../middlewares/multer.js';
import { 
    createUser, 
    loginUser, 
    logoutCurrentUser, 
    getAllUsers, 
    getCurrentUserProfile, 
    updateCurentUserProfile,
    deleteUserById,
    getUserById,
    updateUserById,
    updateUserProfilePic
 } from '../controllers/userController.js';

import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';


const router = express.Router()


router.route("/").post(createUser).get(authenticate, authorizeAdmin, getAllUsers);
router.post('/auth', loginUser)
router.post('/logout', logoutCurrentUser)

router.route('/profile').get(authenticate, getCurrentUserProfile)

router.put("/profile/upload", authenticate, upload.single("profilePic"), updateUserProfilePic);

//Admin Routes
router.route('/:id').delete(authenticate, authorizeAdmin, deleteUserById).get(authenticate, authorizeAdmin, getUserById).put(authenticate, authorizeAdmin, updateUserById)

export default router;