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
router.get("/:id", auth, adminAuth, getLayananById);

// POST create new layanan
router.post("/", createLayanan);
// auth, adminAuth,
// PUT update layanan
router.put("/:id", updateLayanan);
//  auth, adminAuth,

// DELETE layanan
router.delete("/:id", deleteLayanan);
//  auth, adminAuth,
export default router;
