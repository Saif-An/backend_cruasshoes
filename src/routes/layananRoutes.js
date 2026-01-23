import express from "express";
import {
  getAllLayanan,
  getLayananById,
  createLayanan,
  updateLayanan,
  deleteLayanan,
} from "../controllers/layananController.js";
import { auth, adminAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET all layanan
router.get("/", getAllLayanan);

// GET layanan by ID
router.get("/admin/:id", auth, adminAuth, getLayananById);

// POST create new layanan
router.post("/admin", auth, adminAuth, createLayanan);

// PUT update layanan
router.put("/admin/:id", auth, adminAuth, updateLayanan);

// DELETE layanan
router.delete("/admin/:id", auth, adminAuth, deleteLayanan);

export default router;
