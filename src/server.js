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

// PERBAIKAN 1: Port untuk Vercel/Produksi
// Vercel akan mengatur port secara otomatis, atau gunakan 5000 untuk lokal
const port = process.env.PORT || 5000;

// Test database connection (Aiven MySQL)
db.getConnection()
  .then(() => console.log("✅ MySQL Connected (Aiven)"))
  .catch((err) => {
    console.log("⚠️ MySQL Connection Failed:", err.message);
  });

app.use(cors());
app.use(express.json());

// PERBAIKAN 2: Rute Utama (Mencegah "Cannot GET /")
app.get("/", (req, res) => {
  res.json({
    message: "Backend CRUAS SHOES API is running!",
    status: "Online",
    database: "Connected to Aiven",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/layanan", layananRoutes);
app.use("/api/galeri", galeryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/admin", adminRoutes);

// Jalankan server
app.listen(port, () => console.log(`🚀 Server Running on Port ${port}`));

export default app;
