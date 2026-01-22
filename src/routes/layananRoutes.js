import express from "express";
import {
  getAllLayanan,
  getLayananById,
  createLayanan,
  updateLayanan,
  deleteLayanan,
} from "../controllers/layananController.js";

const router = express.Router();

// GET all layanan
router.get("/", getAllLayanan);

// GET layanan by ID
router.get("/admin/:id", getLayananById);

// POST create new layanan
router.post("/admin", createLayanan);

// PUT update layanan
router.put("/admin/:id", updateLayanan);

// DELETE layanan
router.delete("/admin/:id", deleteLayanan);

export default router;
