import db from "../config/db.js";

// 1. Cari layanan berdasarkan ID
export const findById = async (id) => {
  try {
    const [rows] = await db.query(
      "SELECT id, nama, deskripsi, harga FROM layanan WHERE id = ?",
      [id],
    );
    return rows[0];
  } catch (error) {
    console.error("Error in findById:", error);
    throw error;
  }
};

// 2. Get semua layanan
export const getAllLayanan = async () => {
  try {
    const [rows] = await db.query(
      "SELECT id, nama, deskripsi, harga FROM layanan ORDER BY id ASC",
    );
    return rows;
  } catch (error) {
    console.error("Error in getAllLayanan:", error);
    throw error;
  }
};

// 3. Tambah layanan baru
export const createLayanan = async (id, nama, deskripsi, harga) => {
  try {
    // Validasi duplikat ID
    const existing = await findById(id);
    if (existing) {
      throw new Error("ID sudah digunakan");
    }

    await db.query(
      "INSERT INTO layanan (id, nama, deskripsi, harga) VALUES (?, ?, ?, ?)",
      [id, nama, deskripsi, harga],
    );

    return { id, nama, deskripsi, harga };
  } catch (error) {
    console.error("Error in createLayanan:", error);
    throw error;
  }
};

// 4. Cari layanan berdasarkan nama (untuk validasi tambahan jika perlu)
export const findByName = async (nama) => {
  try {
    const [rows] = await db.query(
      "SELECT id, nama FROM layanan WHERE LOWER(nama) = LOWER(?)",
      [nama],
    );
    return rows[0];
  } catch (error) {
    console.error("Error in findByName:", error);
    throw error;
  }
};

// 5. Update data layanan
export const updateLayanan = async (id, nama, deskripsi, harga) => {
  try {
    const [result] = await db.query(
      "UPDATE layanan SET nama = ?, deskripsi = ?, harga = ? WHERE id = ?",
      [nama, deskripsi, harga, id],
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error in updateLayanan:", error);
    throw error;
  }
};

// 6. Hapus layanan
export const deleteLayanan = async (id) => {
  try {
    const [result] = await db.query("DELETE FROM layanan WHERE id = ?", [id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error in deleteLayanan:", error);
    throw error;
  }
};
