import express from "express";
import {
  getOrders,
  getOrder,
  createNewOrder,
  updateOrder,
  removeOrder,
} from "../controllers/orderController.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ==================== ROUTES ====================
// GET: Semua orders (admin only)
router.get("/admin", auth, getOrders);

// GET: Order by ID (admin only)
router.get("/admin:id", auth, getOrder);

// POST: Buat order baru (public)
router.post("/", createNewOrder);

// PUT: Update order status (admin only)
router.put("/admin/:id", auth, updateOrder);

// DELETE: Hapus order (admin only)
router.delete("/admin/:id", auth, removeOrder);

export default router;
