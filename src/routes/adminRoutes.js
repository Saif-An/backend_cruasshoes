import express from "express";
import { getDashboardStats } from "../controllers/adminController.js";

const router = express.Router();

// GET: Statistik dashboard admin
router.get("/stats", getDashboardStats);

export default router;
