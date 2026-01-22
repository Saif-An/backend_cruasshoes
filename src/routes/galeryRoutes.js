import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import {
  getGallery,
  createGallery,
  removeGallery,
} from "../controllers/galeryController.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Konfigurasi Cloudinary (hanya jika env vars tersedia)
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} else {
  console.warn("⚠️  Cloudinary env vars tidak ditemukan. Upload gambar akan gagal.");
}

// Setup multer dengan Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "gallery",
    format: async (req, file) => path.extname(file.originalname).slice(1), // otomatis format
    public_id: (req, file) => Date.now() + path.extname(file.originalname),
  },
});

const upload = multer({ storage: storage });

// ==================== ROUTES ====================
// GET: Semua gallery (public)
router.get("/", getGallery);

// POST: Tambah gallery baru (admin only)
router.post("/", auth, upload.single("image"), createGallery);

// DELETE: Hapus gallery (admin only)
router.delete("/:id", auth, removeGallery);

export default router;
