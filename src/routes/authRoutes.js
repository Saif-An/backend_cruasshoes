import express from "express";
import { register, login } from "../controllers/authController.js";
const router = express.Router();

// POST: Register user baru
router.post("/register", register);
// POST: Login user
router.post("/login", login);

export default router;
