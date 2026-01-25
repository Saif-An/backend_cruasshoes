import db from "../config/db.js";

const Testimonial = {
  // Create testimonial baru
  create: async (data) => {
    const { customer_name, rating, comment } = data;
    const [result] = await db.execute(
      "INSERT INTO testimonials (customer_name, rating, comment) VALUES (?, ?, ?)",
      [customer_name, rating, comment],
    );
    return result;
  },

  // Get testimoni yang sudah disetujui (untuk Landing Page)
  getActive: async () => {
    const [rows] = await db.execute(
      "SELECT * FROM testimonials WHERE is_approved = 1 ORDER BY created_at DESC",
    );
    return rows;
  },

  // Ambil semua testimoni masuk untuk Dashboard Admin
  getAllAdmin: async () => {
    const [rows] = await db.execute(
      "SELECT * FROM testimonials ORDER BY created_at DESC",
    );
    return rows;
  },

  // Update status approval
  updateStatus: async (id, status) => {
    const [result] = await db.execute(
      "UPDATE testimonials SET is_approved = ? WHERE id = ?",
      [status, id],
    );
    return result;
  },

  // Hapus testimonial
  delete: async (id) => {
    const [result] = await db.execute("DELETE FROM testimonials WHERE id = ?", [
      id,
    ]);
    return result;
  },
};

export default Testimonial;
