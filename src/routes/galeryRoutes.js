import express from "express";
import {
  getGallery,
  getGalleryForAdmin,
  createGallery,
  toggleStatus,
  removeGallery,
} from "../controllers/galeryController.js";
import upload from "../middlewares/upload.js"; // Pastikan path middleware multer benar

const router = express.Router();

// Route untuk Website (Publik)
router.get("/", getGallery);

// Route untuk Admin
router.get("/admin", getGalleryForAdmin);
// POST: Upload gambar galeri baru
router.post("/", upload.single("image"), createGallery);
// PUT: Toggle status aktif/non-aktif galeri
router.put("/status/:id", toggleStatus);
// DELETE: Hapus galeri berdasarkan ID
router.delete("/:id", removeGallery);

export default router;
