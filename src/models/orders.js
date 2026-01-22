import db from "../config/db.js";

// Get all orders
export const getAllOrders = async () => {
  const [rows] = await db.execute(`
    SELECT o.*, l.nama as layanan_nama, l.harga as layanan_harga
    FROM orders o
    LEFT JOIN layanan l ON o.layanan_id = l.id
    ORDER BY o.created_at DESC
  `);
  return rows;
};

// Get order by ID
export const getOrderById = async (id) => {
  const [rows] = await db.execute(
    `
    SELECT o.*, l.nama as layanan_nama, l.harga as layanan_harga
    FROM orders o
    LEFT JOIN layanan l ON o.layanan_id = l.id
    WHERE o.id = ?
  `,
    [id],
  );
  return rows[0];
};

// Create new order
export const createOrder = async (orderData) => {
  const { layanan_id, nama, email, telepon, alamat, tanggal, catatan } =
    orderData;
  const [result] = await db.execute(
    `
    INSERT INTO orders (layanan_id, nama, email, telepon, alamat, tanggal, catatan, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
  `,
    [layanan_id, nama, email, telepon, alamat, tanggal, catatan],
  );

  return { id: result.insertId, ...orderData };
};

// Update order status
export const updateOrderStatus = async (id, status) => {
  await db.execute(
    `
    UPDATE orders SET status = ?, updated_at = NOW() WHERE id = ?
  `,
    [status, id],
  );
  return { id, status };
};

// Delete order
export const deleteOrder = async (id) => {
  await db.execute("DELETE FROM orders WHERE id = ?", [id]);
  return { id };
};
