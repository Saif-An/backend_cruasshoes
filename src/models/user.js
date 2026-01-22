import db from "../config/db.js";

// ==================== CREATE ====================
// Register user baru
export const createUser = async (
  nama,
  email,
  hashedPassword,
  phone,
  role = "customer",
) => {
  try {
    const [result] = await db.query(
      "INSERT INTO users (nama, email, password, phone, role) VALUES (?, ?, ?, ?, ?)",
      [nama, email, hashedPassword, phone, role],
    );
    return {
      id: result.insertId,
      name: nama,
      email: email,
      phone: phone,
      role,
    };
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error;
  }
};

// ==================== READ ====================
// Cari user berdasarkan email (untuk login)
export const findByEmail = async (email) => {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0]; // Return single user atau undefined
  } catch (error) {
    console.error("Error in findByEmail:", error);
    throw error;
  }
};

// Cari user berdasarkan id
export const findById = async (id) => {
  try {
    const [rows] = await db.query(
      "SELECT id, nama, email, phone, role, created_at FROM users WHERE id = ?",
      [id],
    );
    return rows[0];
  } catch (error) {
    console.error("Error in findById:", error);
    throw error;
  }
};

// Get all users (untuk admin)
export const getAllUsers = async () => {
  try {
    const [users] = await db.query(
      "SELECT id, nama, email, phone, role, created_at FROM users ORDER BY created_at DESC",
    );
    return users;
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    throw error;
  }
};

// Check if email exists (untuk validasi register)
export const emailExists = async (email) => {
  try {
    const [rows] = await db.query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);
    return rows.length > 0;
  } catch (error) {
    console.error("Error in emailExists:", error);
    throw error;
  }
};

// ==================== UPDATE ====================
// Update data user (name, email, phone)
export const updateUser = async (id, nama, email, phone) => {
  try {
    const [result] = await db.query(
      "UPDATE users SET nama = ?, email = ?, phone = ? WHERE id = ?",
      [nama, email, phone, id],
    );
    return result.affectedRows > 0; // true jika berhasil
  } catch (error) {
    console.error("Error in updateUser:", error);
    throw error;
  }
};

// Update password
export const updatePassword = async (id, hashedPassword) => {
  try {
    const [result] = await db.query(
      "UPDATE users SET password = ? WHERE id = ?",
      [hashedPassword, id],
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error in updatePassword:", error);
    throw error;
  }
};

// ==================== DELETE ====================
// Delete user
export const deleteUser = async (id) => {
  try {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows > 0; // true jika berhasil
  } catch (error) {
    console.error("Error in deleteUser:", error);
    throw error;
  }
};
