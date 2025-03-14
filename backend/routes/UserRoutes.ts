import express from "express";

import { getCurrentUser, login, registerAdminUser, registerUser, updateProfile } from "../controllers/UserController";

import authGuard from "../middlewares/authGuard";
import validate from "../middlewares/handleValidation";
import { imageUpload } from "../middlewares/imageUpload";

const router = express.Router();

router.post("/register/user", validate, registerUser);
router.post("/register/admin", authGuard, registerAdminUser);
router.post("/login", validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put("/:id", authGuard, validate, imageUpload.single("profileImage"), updateProfile);

export default router