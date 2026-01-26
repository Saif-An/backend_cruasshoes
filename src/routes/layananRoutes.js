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
router.post("/", auth, adminAuth, createLayanan);
// auth, adminAuth,
// PUT update layanan
router.put("/:id", auth, adminAuth, updateLayanan);
//  auth, adminAuth,

// DELETE layanan
router.delete("/:id", auth, adminAuth, deleteLayanan);
//  auth, adminAuth,
export default router;
