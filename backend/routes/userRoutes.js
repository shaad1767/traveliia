import express from "express";
import upload from "../middleware/uploadMiddleware.js";

import {
  getProfile,
  updateProfile,
  uploadImage,
  deleteProfileImage,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/profile/:id", getProfile);
router.post("/upload/:id", upload.single("profilePic"), uploadImage);

router.put("/update/:id", updateProfile);
router.delete("/delete-image/:id", deleteProfileImage);

export default router;