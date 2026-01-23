import db from "../config/db.js";

// Get all orders
export const getAllOrders = async () => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        o.id, 
        o.customer_id, 
        o.quantity, 
        o.total_price, 
        o.notes, 
        o.alamat,
        o.status, 
        o.created_at,
        l.nama AS layanan_nama, 
        l.harga AS layanan_harga
      FROM orders o
      LEFT JOIN layanan l ON o.service_id = l.id
      ORDER BY o.created_at DESC
    `);
    return rows;
  } catch (error) {
    console.error("Error dalam getAllOrders:", error.message);
    throw error;
  }
};

// Get order by ID
export const getOrderById = async (id) => {
  try {
    const [rows] = await db.execute(
      `
      SELECT o.*, l.nama as layanan_nama, l.harga as layanan_harga
      FROM orders o
      LEFT JOIN layanan l ON o.service_id = l.id
      WHERE o.id = ?
    `,
      [id],
    );
    return rows[0];
  } catch (error) {
    console.error("Error dalam getOrderById:", error.message);
    throw error;
  }
};

// Create new order
export const createOrder = async (orderData) => {
  try {
    const {
      customer_id,
      service_id,
      total_price,
      quantity,
      notes,
      alamat,
      status = "pending",
    } = orderData;

    const [result] = await db.execute(
      `
      INSERT INTO orders 
        (customer_id, service_id, total_price, quantity, notes, alamat, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
      `,
      [customer_id, service_id, total_price, quantity, notes, alamat, status],
    );

    return {
      id: result.insertId,
      customer_id,
      service_id,
      total_price,
      quantity,
      notes,
      alamat,
      status,
      created_at: new Date(),
    };
  } catch (error) {
    console.error("Error dalam createOrder:", error.message);
    throw error;
  }
};

// Update order
export const updateOrder = async (id, orderData) => {
  try {
    const {
      customer_id,
      service_id,
      total_price,
      quantity,
      notes,
      alamat,
      status,
    } = orderData;

    await db.execute(
      `
      UPDATE orders 
      SET customer_id = ?, 
          service_id = ?, 
          total_price = ?, 
          quantity = ?, 
          notes = ?, 
          alamat = ?, 
          status = ?
      WHERE id = ?
      `,
      [
        customer_id,
        service_id,
        total_price,
        quantity,
        notes,
        alamat,
        status,
        id,
      ],
    );

    return { id, ...orderData };
  } catch (error) {
    console.error("Error dalam updateOrder:", error.message);
    throw error;
  }
};

// Update order status
export const updateOrderStatus = async (id, status) => {
  try {
    await db.execute(
      `
      UPDATE orders SET status = ?  WHERE id = ?
      `,
      [status, id],
    );
    return { id, status };
  } catch (error) {
    console.error("Error dalam updateOrderStatus:", error.message);
    throw error;
  }
};

// Delete order
export const deleteOrder = async (id) => {
  try {
    await db.execute("DELETE FROM orders WHERE id = ?", [id]);
    return { id };
  } catch (error) {
    console.error("Error dalam deleteOrder:", error.message);
    throw error;
  }
};
