import express from "express";
import {
  getOrders,
  getOrder,
  createNewOrder,
  updateOrder,
  removeOrder,
} from "../controllers/orderController.js";
import { auth, adminAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ==================== ROUTES ====================
// GET: Semua orders (admin only)
router.get("/admin", auth, adminAuth, getOrders);

// GET: Order by ID (admin only)
router.get("/admin/:id", auth, adminAuth, getOrder);

// POST: Buat order baru (public)
router.post("/", createNewOrder);

// PUT: Update order status (admin only)
router.put("/admin/:id", auth, adminAuth, updateOrder);

// DELETE: Hapus order (admin only)
router.delete("/admin/:id", auth, adminAuth, removeOrder);

export default router;
