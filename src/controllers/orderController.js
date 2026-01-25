import * as OrderModel from "../models/orders.js";

// 1. GET: Semua order (Admin Only)
export const getOrders = async (req, res) => {
  try {
    const orders = await OrderModel.getAllOrders();
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Gagal mengambil data" });
  }
};

// 2. GET: Detail satu order berdasarkan ID
export const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderModel.getOrderById(id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order tidak ditemukan" });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Gagal mengambil detail order" });
  }
};

// 3. POST: Buat order baru (Customer)
export const createNewOrder = async (req, res) => {
  try {
    const { service_id, total_price, quantity, notes, alamat, phone } =
      req.body;
    const customer_id = req.user?.id;

    if (!customer_id)
      return res.status(401).json({ success: false, message: "Silakan login" });

    if (!service_id || !alamat || !phone) {
      return res.status(400).json({
        success: false,
        message: "Layanan, Alamat, dan No HP wajib diisi!",
      });
    }

    const newOrder = await OrderModel.createOrder({
      customer_id,
      service_id,
      notes,
      alamat,
      phone,
      quantity: Number(quantity) || 1,
      total_price: Number(total_price),
    });

    res
      .status(201)
      .json({ success: true, message: "Order Berhasil!", data: newOrder });
  } catch (error) {
    console.error("Create Order Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Gagal memproses pesanan" });
  }
};

// 4. PUT: Update status order (Admin)
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res
        .status(400)
        .json({ success: false, message: "Status harus diisi" });
    }

    await OrderModel.updateOrderStatus(id, status);
    res.json({
      success: true,
      message: "Status diperbarui",
      data: { id, status },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Gagal update status" });
  }
};

// 5. DELETE: Hapus order (Admin)
export const removeOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await OrderModel.deleteOrder(id);
    res.json({ success: true, message: "Order dihapus" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Gagal menghapus order" });
  }
};

// 6. GET: Riwayat order user yang login (Customer)
export const getMyOrders = async (req, res) => {
  try {
    const orders = await OrderModel.getOrdersByCustomerId(req.user.id);
    res.json({ success: true, data: orders });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Gagal mengambil riwayat" });
  }
};
