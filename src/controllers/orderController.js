import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} from "../models/orders.js";

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data orders",
    });
  }
};

// Get order by ID
export const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await getOrderById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order tidak ditemukan",
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data order",
    });
  }
};

// Create new order
export const createNewOrder = async (req, res) => {
  try {
    const {
      customer_id,
      service_id,
      total_price,
      quantity,
      notes,
      alamat,
      status,
    } = req.body;

    // Validasi input
    if (
      !customer_id ||
      !service_id ||
      !total_price ||
      !quantity ||
      !notes ||
      !alamat ||
      !status
    ) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi",
      });
    }

    const newOrder = await createOrder({
      customer_id,
      service_id,
      total_price,
      quantity,
      alamat,
      notes,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Order berhasil dibuat",
      data: newOrder,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Gagal membuat order",
    });
  }
};

// Update order status
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status harus diisi",
      });
    }

    const validStatuses = [
      "pending",
      "confirmed",
      "in_progress",
      "completed",
      "cancelled",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status tidak valid",
      });
    }

    await updateOrderStatus(id, status);

    res.json({
      success: true,
      message: "Status order berhasil diupdate",
      data: { id, status },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Gagal update status order",
    });
  }
};

// Delete order
export const removeOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteOrder(id);

    res.json({
      success: true,
      message: "Order berhasil dihapus",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Gagal menghapus order",
    });
  }
};
