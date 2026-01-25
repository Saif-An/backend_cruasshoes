import express from "express";
import {
  getGallery,
  getGalleryForAdmin,
  createGallery,
  toggleStatus,
  removeGallery,
} from "../controllers/galeryController.js";

// GANTI INI: Gunakan middleware Cloudinary, bukan multer lokal
import { uploadCloudinary } from "../config/cloudinary.js";

const router = express.Router();

// Route untuk Website (Publik)
router.get("/", getGallery);

// Route untuk Admin
router.get("/admin", getGalleryForAdmin);

// POST: Upload gambar menggunakan Cloudinary
// Nama field "image" harus sama dengan yang dikirim dari Frontend
router.post("/", uploadCloudinary.single("image"), createGallery);

// PUT: Toggle status aktif/non-aktif galeri
router.put("/status/:id", toggleStatus);

// DELETE: Hapus galeri
router.delete("/:id", removeGallery);

export default router;
