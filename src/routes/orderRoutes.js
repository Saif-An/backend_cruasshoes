import express from "express";
import {
  getOrders,
  getOrder,
  createNewOrder,
  updateOrder,
  removeOrder,
  getMyOrders,
} from "../controllers/orderController.js";
import { auth, adminAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 1. GET: Orders milik user yang sedang login
router.get("/my-orders", auth, getMyOrders);

// 2. GET: Semua orders (admin only)
router.get("/", auth, adminAuth, getOrders);

// 3. POST: Buat order baru (User login)
router.post("/", auth, createNewOrder);

// 4. GET: Order berdasarkan ID (admin only)
router.get("/:id", auth, adminAuth, getOrder);

// 5. PUT: Update order status (admin only)
router.put("/:id", auth, adminAuth, updateOrder);

// 6. DELETE: Hapus order (admin only)
router.delete("/:id", auth, adminAuth, removeOrder);

export default router;
