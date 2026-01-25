import db from "../config/db.js";

// Ambil semua order (Admin)
export const getAllOrders = async () => {
  const [rows] = await db.execute(`
    SELECT o.*, u.nama AS customer_name, l.nama AS service_name
    FROM orders o
    LEFT JOIN users u ON o.customer_id = u.id
    LEFT JOIN layanan l ON o.service_id = l.id
    ORDER BY o.created_at DESC
  `);
  return rows;
};

// Buat order baru
export const createOrder = async (orderData) => {
  const {
    customer_id,
    service_id,
    notes,
    alamat,
    phone,
    quantity,
    total_price,
  } = orderData;
  const [result] = await db.execute(
    `INSERT INTO orders 
      (customer_id, service_id, notes, alamat, phone, quantity, total_price, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', NOW())`,
    [
      customer_id,
      service_id,
      notes || "-",
      alamat,
      phone,
      quantity,
      total_price,
    ],
  );
  return { id: result.insertId, ...orderData };
};

// Update status saja (Admin)
export const updateOrderStatus = async (id, status) => {
  await db.execute("UPDATE orders SET status = ? WHERE id = ?", [status, id]);
  return { id, status };
};

// Ambil riwayat order milik user tertentu
export const getOrdersByCustomerId = async (customerId) => {
  const [rows] = await db.execute(
    `SELECT o.*, l.nama AS layanan_nama 
     FROM orders o
     LEFT JOIN layanan l ON o.service_id = l.id
     WHERE o.customer_id = ? ORDER BY o.created_at DESC`,
    [customerId],
  );
  return rows;
};

// Hapus order
export const deleteOrder = async (id) => {
  await db.execute("DELETE FROM orders WHERE id = ?", [id]);
  return { id };
};

// Detail order berdasarkan ID
export const getOrderById = async (id) => {
  const [rows] = await db.execute("SELECT * FROM orders WHERE id = ?", [id]);
  return rows[0];
};
