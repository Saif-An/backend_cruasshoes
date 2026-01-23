import express from "express";
import multer from "multer";
import path from "path";
import {
  getGallery,
  createGallery,
  removeGallery,
} from "../controllers/galeryController.js";
import { auth, adminAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Setup upload gambar sederhana
const storage = multer.diskStorage({
  destination: "uploads/gallery/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// ==================== ROUTES ====================
// GET: Semua gallery (public)
router.get("/", getGallery);

// POST: Tambah gallery baru (admin only)
router.post("/", auth, adminAuth, upload.single("image"), createGallery);

// DELETE: Hapus gallery (admin only)
router.delete("/:id", auth, adminAuth, removeGallery);

export default router;
