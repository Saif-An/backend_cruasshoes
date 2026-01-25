import express from "express";
import {
  postTestimonial,
  getPublicTestimonials,
  getAdminTestimonials,
  approveTestimonial,
} from "../controllers/testimonialController.js";
// Pastikan folder dan nama file sesuai (middleware atau middlewares)
import { auth, adminAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 1. Publik: Menampilkan yang sudah disetujui
router.get("/", getPublicTestimonials);

// 2. User Login: Kirim testimoni baru
router.post("/", auth, postTestimonial);

// 3. Admin: Ambil semua data testimoni
router.get("/admin/all", auth, adminAuth, getAdminTestimonials);

// 4. Admin: Approve atau Update status testimoni
router.put("/admin/approve/:id", auth, adminAuth, approveTestimonial);

export default router;
