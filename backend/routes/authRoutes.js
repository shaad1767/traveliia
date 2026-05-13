import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// Signup / Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

export default router;