import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ msg: "Token diperlukan" });

  const token = header.split(" ")[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ msg: "Token tidak valid" });
  }
};

// Middleware untuk cek role admin
export const adminAuth = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ msg: "Akses ditolak, hanya admin yang diizinkan" });
  }
  next();
};
