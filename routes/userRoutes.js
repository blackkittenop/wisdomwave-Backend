import express from "express";
import {addToPlaylist, changePassword, deleteMyProfile, deleteUser, forgetPassword, getAllUsers, getMyProfile, login, logout, register, removeFromPlaylist, resetPassword, updateProfile, updateProfilePicture, updateUserRole}  from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

// register
router.route("/register").post(singleUpload , register);

// login
router.route("/login").post(login);

// logout
router.route("/logout").get(logout);

// getProfile
router.route("/me").get(isAuthenticated, getMyProfile);

// Delete My Profile
router.route("/me").delete(isAuthenticated, deleteMyProfile);

// changePassword
router.route("/changepassword").put(isAuthenticated , changePassword);

// updateProfile
router.route("/updateprofile").put(isAuthenticated , updateProfile);

// updateProfilePicture
router.route("/updateprofilepicture").put(isAuthenticated ,singleUpload, updateProfilePicture);

// forgetPassword
router.route("/forgetpassword").post(forgetPassword);

//resetPassword
router.route("/resetpassword/:token").put(resetPassword);

//Add to playlist
router.route("/addtoplaylist").post(isAuthenticated , addToPlaylist);

//Remove from playlist
router.route("/removefromplaylist").delete(removeFromPlaylist);


// ADMIN ROUTES
router.route("/admin/users").get(isAuthenticated,authorizeAdmin,getAllUsers);

router.route("/admin/users/:id").put(isAuthenticated,authorizeAdmin,updateUserRole).delete(isAuthenticated,authorizeAdmin,deleteUser);


export default router;