import * as layananModel from "../models/layanan.js";

// Get all layanan
export const getAllLayanan = async (req, res) => {
  try {
    const layanan = await layananModel.getAllLayanan();
    res.status(200).json({
      success: true,
      message: "Data layanan berhasil diambil",
      data: layanan,
    });
  } catch (error) {
    console.error("Error in getAllLayanan:", error);
    res
      .status(500)
      .json({ success: false, message: "Terjadi kesalahan server" });
  }
};

// Get layanan by ID
export const getLayananById = async (req, res) => {
  try {
    const { id } = req.params;
    const layanan = await layananModel.findById(id);
    if (!layanan) {
      return res
        .status(404)
        .json({ success: false, message: "Layanan tidak ditemukan" });
    }
    res.status(200).json({
      success: true,
      message: "Data layanan berhasil diambil",
      data: layanan,
    });
  } catch (error) {
    console.error("Error in getLayananById:", error);
    res
      .status(500)
      .json({ success: false, message: "Terjadi kesalahan server" });
  }
};

// Create new layanan
export const createLayanan = async (req, res) => {
  try {
    const { id, nama, deskripsi, harga } = req.body;

    // Validasi input
    if (!id || !nama || !harga) {
      return res
        .status(400)
        .json({ success: false, message: "ID, nama, dan harga wajib diisi" });
    }

    const newLayanan = await layananModel.createLayanan(
      id,
      nama,
      deskripsi,
      harga,
    );
    res.status(201).json({
      success: true,
      message: "Layanan berhasil ditambahkan",
      data: newLayanan,
    });
  } catch (error) {
    console.error("Error in createLayanan:", error);
    if (error.message === "ID sudah digunakan") {
      return res.status(400).json({ success: false, message: error.message });
    }
    res
      .status(500)
      .json({ success: false, message: "Terjadi kesalahan server" });
  }
};

// Update layanan
export const updateLayanan = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, deskripsi, harga } = req.body;

    // Validasi input
    if (!nama || !harga) {
      return res
        .status(400)
        .json({ success: false, message: "Nama dan harga wajib diisi" });
    }

    const updated = await layananModel.updateLayanan(
      id,
      nama,
      deskripsi,
      harga,
    );
    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Layanan tidak ditemukan" });
    }

    res.status(200).json({
      success: true,
      message: "Layanan berhasil diperbarui",
    });
  } catch (error) {
    console.error("Error in updateLayanan:", error);
    res
      .status(500)
      .json({ success: false, message: "Terjadi kesalahan server" });
  }
};

// Delete layanan
export const deleteLayanan = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await layananModel.deleteLayanan(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Layanan tidak ditemukan" });
    }

    res.status(200).json({
      success: true,
      message: "Layanan berhasil dihapus",
    });
  } catch (error) {
    console.error("Error in deleteLayanan:", error);
    res
      .status(500)
      .json({ success: false, message: "Terjadi kesalahan server" });
  }
};
