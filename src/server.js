import express from "express";
import cors from "cors";
import db from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import layananRoutes from "./routes/layananRoutes.js";
import galeryRoutes from "./routes/galeryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import upload from "./middlewares/multer.js";

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
app.use("/uploads", express.static("uploads/gallery"));

app.use("/api/auth", authRoutes);
app.use("/api/layanan", layananRoutes);
app.use("/api/galery", galeryRoutes);
app.use("/api/orders", orderRoutes);
app.post("/api/upload", upload.single("image"), (req, res) => {
  res.json({
    message: "File uploaded successfully",
  });
});

app.listen(port, () => console.log(`Server Running on Port ${port}`));

// Export for Vercel serverless
export default app;
