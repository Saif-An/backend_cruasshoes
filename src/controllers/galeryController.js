import {
  getAllGalleryAdmin,
  getAllGallery,
  addGallery,
  updateStatusGallery,
  deleteGallery,
} from "../models/galeri.js";

// Ambil semua foto untuk Website (Hanya yang is_active = 1)
export const getGallery = async (req, res) => {
  try {
    const data = await getAllGallery();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Ambil semua foto untuk Admin
export const getGalleryForAdmin = async (req, res) => {
  try {
    const data = await getAllGalleryAdmin();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Tambah foto baru (Disesuaikan untuk Cloudinary)
export const createGallery = async (req, res) => {
  try {
    const { title } = req.body;

    /** * Saat menggunakan multer-storage-cloudinary:
     * req.file.path akan otomatis berisi URL lengkap dari Cloudinary
     * (Contoh: https://res.cloudinary.com/...)
     */
    const imagePath = req.file ? req.file.path : null;

    if (!title || !imagePath) {
      return res.status(400).json({
        success: false,
        message:
          "Judul dan gambar wajib diisi. Pastikan file terkirim dengan field name 'image'",
      });
    }

    const newEntry = await addGallery(title, imagePath);

    res.status(201).json({
      success: true,
      message: "Foto berhasil diunggah ke Cloudinary dan disimpan ke database!",
      data: newEntry,
    });
  } catch (error) {
    console.error("Create Gallery Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Gagal memproses unggahan" });
  }
};

// Update status (Tampilkan/Sembunyikan)
export const toggleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_active } = req.body;

    const updated = await updateStatusGallery(id, is_active);
    if (updated) {
      res.json({ success: true, message: "Status galeri diperbarui" });
    } else {
      res.status(404).json({ success: false, message: "Data tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Hapus foto
export const removeGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteGallery(id);
    if (deleted) {
      res.json({
        success: true,
        message: "Foto berhasil dihapus dari database",
      });
    } else {
      res.status(404).json({ success: false, message: "Foto tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
