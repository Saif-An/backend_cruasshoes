import { getAllGallery, addGallery, deleteGallery } from "../models/galeri.js";

// Get semua gallery untuk website
export const getGallery = async (req, res) => {
  try {
    const gallery = await getAllGallery();

    res.json({
      success: true,
      data: gallery,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil gallery",
    });
  }
};

// Tambah gallery baru (admin only)
export const createGallery = async (req, res) => {
  try {

    const { title } = req.body;
    const image = req.file ? req.file.path : null;

    // Validasi
    if (!title || !image) {
      return res.status(400).json({
        success: false,
        message: "Judul dan gambar harus diisi",
      });
    }

    const newGallery = await addGallery(title, image);

    res.status(201).json({
      success: true,
      message: "Foto berhasil ditambahkan",
      data: newGallery,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Gagal menambah foto",
    });
  }
};

// Hapus gallery (admin only)
export const removeGallery = async (req, res) => {
  try {

    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID tidak valid",
      });
    }

    const deleted = await deleteGallery(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Foto tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "Foto berhasil dihapus",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Gagal menghapus foto",
    });
  }
};
