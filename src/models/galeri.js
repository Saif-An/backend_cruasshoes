import db from "../config/db.js";

// 1. GET semua gallery untuk Admin
export const getAllGalleryAdmin = async () => {
  try {
    const [rows] = await db.query(
      "SELECT id, title, image, is_active FROM gallery ORDER BY id DESC",
    );
    return rows;
  } catch (error) {
    console.error("Error in getAllGalleryAdmin:", error);
    throw error;
  }
};

// 2. GET semua gallery untuk User
export const getAllGallery = async () => {
  try {
    const [rows] = await db.query(
      "SELECT id, title, image FROM gallery WHERE is_active = 1 ORDER BY id DESC",
    );
    return rows;
  } catch (error) {
    console.error("Error in getAllGallery:", error);
    throw error;
  }
};

// 3. POST tambah gallery
export const addGallery = async (title, image) => {
  try {
    const fixedImagePath = image.replace(/\\/g, "/");
    const [result] = await db.query(
      "INSERT INTO gallery (title, image, is_active) VALUES (?, ?, 1)",
      [title, fixedImagePath],
    );
    return { id: result.insertId, title, image: fixedImagePath };
  } catch (error) {
    throw error;
  }
};

// 4. Update Status (Tampilkan/Sembunyikan) gallery
export const updateStatusGallery = async (id, status) => {
  try {
    const [result] = await db.query(
      "UPDATE gallery SET is_active = ? WHERE id = ?",
      [status, id],
    );
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

// 5. Hapus gallery
export const deleteGallery = async (id) => {
  try {
    const [result] = await db.query("DELETE FROM gallery WHERE id = ?", [id]);
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};
