import db from "../config/db.js";

// Get semua gallery untuk website
export const getAllGallery = async () => {
  try {
    const [rows] = await db.query(
      "SELECT id, title, image FROM gallery ORDER BY id DESC",
    );
    return rows;
  } catch (error) {
    console.error("Error in getAllGallery:", error);
    throw error;
  }
};

// Tambah foto ke gallery
export const addGallery = async (title, image) => {
  try {
    const [result] = await db.query(
      "INSERT INTO gallery (title, image) VALUES (?, ?)",
      [title.trim(), image],
    );

    return {
      id: result.insertId,
      title: title.trim(),
      image,
    };
  } catch (error) {
    console.error("Error in addGallery:", error);
    throw error;
  }
};

// Hapus gallery
export const deleteGallery = async (id) => {
  try {
    const [result] = await db.query("DELETE FROM gallery WHERE id = ?", [id]);

    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error in deleteGallery:", error);
    throw error;
  }
};
