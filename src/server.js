import express from "express";
import cors from "cors";
import db from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import layananRoutes from "./routes/layananRoutes.js";
import galeryRoutes from "./routes/galeryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
const port = process.env.DB_PORT;

// Test database connection (non-blocking)
db.getConnection()
  .then(() => console.log("✅ MySQL Connected"))
  .catch((err) => {
    console.log("⚠️  MySQL Connection Failed:", err.message);
    console.log(
      "ℹ️  Server will continue running without database functionality",
    );
  });

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/layanan", layananRoutes);
app.use("/api/galeri", galeryRoutes);
app.use("/api/orders", orderRoutes);
// PENTING: Agar browser bisa mengakses file di uploads/galeri/foto.jpg
app.use("/uploads", express.static("uploads"));

// Gunakan routes
app.use("/api/galeri", galeryRoutes);

app.use("/api/testimonials", testimonialRoutes);
app.use("/api/admin", adminRoutes);

// Tambahkan ini agar halaman utama tidak kosong/error
app.get("/", (req, res) => {
  res.json({
    message: "Backend CRUAS SHOES API is running!",
    status: "Online",
  });
});

app.listen(port, () => console.log(`Server Running on Port ${port}`));

// Export for Vercel serverless
export default app;
