import db from "../config/db.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [order] = await db.query("SELECT COUNT(*) as total FROM orders");
    const [revenue] = await db.query(
      "SELECT SUM(total_price) as total FROM orders",
    );
    const [service] = await db.query("SELECT COUNT(*) as total FROM layanan");
    const [recent] = await db.query(
      "SELECT * FROM orders ORDER BY created_at DESC LIMIT 5",
    );

    res.json({
      success: true,
      data: {
        totalOrders: order[0].total,
        totalRevenue: revenue[0].total || 0,
        totalServices: service[0].total,
        recentOrders: recent,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
